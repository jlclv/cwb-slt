const { app } = require("@azure/functions");
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

async function find(it) {
    for await (const value of it) {
        if (value) {
            return value.document;
        }
    }
}

app.http("regions", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        try {
            context.log(
                `Http function processed request for url "${request.url}"`
            );

            const query =
                request.query.get("query") ||
                (await request.text()) ||
                "Global";
            const top = parseInt(request.query.get("top")) || 1;
            const regions = [];

            const client = new SearchClient(
                process.env["SearchEndpoint"],
                process.env["SearchRegionsIndexName"],
                new AzureKeyCredential(process.env["SearchApiQueryKey"])
            );

            const options = {
                select: ["id", "grouping_code", "grouping_name", "countries"],
                top: top,
                queryType: "semantic",
                semanticSearchOptions: {
                    configurationName: "slt-regions-semantic-config",
                },
                filter: `grouping_name eq '${query}' or grouping_code eq '${query}'`,
            };

            let searchResults = await client.search(query, options);

            const isEmpty = await find(searchResults.results);

            searchResults = await client.search(query, options);
            if (!isEmpty) {
                delete options["filter"];
                console.log(options);
                searchResults = await client.search(query, options);
            }

            for await (const result of searchResults.results) {
                let newRegion = { ...result.document };
                newRegion.score = result.score;
                newRegion.rerankerScore = result.rerankerScore;
                regions.push(newRegion);
            }

            return { jsonBody: regions };
        } catch (error) {
            return {
                status: 500,
                jsonBody: {
                    innerStatusCode: error.statusCode || error.code,
                    error: error.details || error.message,
                    stack: error.stack,
                },
            };
        }
    },
});
