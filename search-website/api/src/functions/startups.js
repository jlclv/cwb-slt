const { app } = require("@azure/functions");
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
const { OpenAI } = require("openai");

app.http("startups", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        try {
            context.log(
                `Http function processed request for url "${request.url}"`
            );

            const query =
                request.query.get("query") || (await request.text()) || "*";
            const filter = request.query.get("filter") || "";
            const top = parseInt(request.query.get("top")) || 5;
            const count = parseInt(request.query.get("count")) || 5;
            const includeAll = request.query.get("includeAll") || "";
            const vectorFields = includeAll
                ? ["LocationVector", "IndustryVector", "StartupStageVector"]
                : ["IndustryVector"];
            const startups = [];
            const openai = new OpenAI({ apiKey: process.env["OpenAIAPIKey"] });
            const embedding = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: query,
            });
            const client = new SearchClient(
                process.env["SearchEndpoint"],
                process.env["SearchIndexName"],
                new AzureKeyCredential(process.env["SearchApiQueryKey"])
            );

            const options = {
                select: [
                    "StartupID",
                    "Name",
                    "StartupName",
                    "Location",
                    "StartupStage",
                    "Industry",
                ],
                top: top,
                queryType: "semantic",
                vectorSearchOptions: {
                    queries: [
                        {
                            kind: "vector",
                            fields: vectorFields,
                            kNearestNeighborsCount: count,
                            vector: embedding.data[0].embedding,
                        },
                    ],
                },
                semanticSearchOptions: {
                    configurationName: "slt-semantic-config",
                },
            };
            if (filter) {
                options["filter"] = filter;
            }
            console.log(options);
            const searchResults = await client.search(query, options);

            for await (const result of searchResults.results) {
                let newStartup = { ...result.document };
                newStartup.score = result.score;
                newStartup.rerankerScore = result.rerankerScore;
                startups.push(newStartup);
            }

            return { jsonBody: startups };
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
