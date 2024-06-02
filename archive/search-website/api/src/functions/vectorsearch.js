const { app } = require("@azure/functions");
const { OpenAI } = require("openai");

app.http("vectorsearch", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        try {
            const openai = new OpenAI({ apiKey: process.env["openaiKey"] });
            const {
                SearchClient,
                AzureKeyCredential,
            } = require("@azure/search-documents");

            const endpoint = process.env["searchEndpoint"];
            const indexName = process.env["indexName"];
            const searchKey = process.env["searchApiKey"];

            const body = await request.json();
            let query = body.query;
            let count = body.count;
            const startups = [];

            const embedding = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: query,
            });

            const client = new SearchClient(
                endpoint,
                indexName,
                new AzureKeyCredential(searchKey)
            );

            const searchResults = await client.search("*", {
                vectorSearchOptions: {
                    queries: [
                        {
                            kind: "vector",
                            fields: ["DescriptionVector"],
                            kNearestNeighborsCount: count,
                            vector: embedding.data[0].embedding,
                        },
                    ],
                },
            });

            for await (const result of searchResults.results) {
                let newStartup = { ...result.document };
                newStartup.score = result.score;
                startups.push(newStartup);
            }
            context.log(
                `Http function processed request for url "${request.url}"`
            );

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
