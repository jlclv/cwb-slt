const { app } = require("@azure/functions");
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
const { OpenAI } = require("openai");

const randomId = () => {
    return Math.floor(Math.random() * Math.pow(10, 5));
};

async function generateEmbedding(text) {
    const openai = new OpenAI({ apiKey: process.env["OpenAIAPIKey"] });
    const embedding = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
    });
    return embedding.data[0].embedding;
}

app.http("index", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        try {
            context.log(
                `Http function processed request for url "${request.url}"`
            );

            const body = await request.json();

            let bodyJSON;

            if (body.searchaction) {
                bodyJSON = JSON.stringify({ value: [body] }).replace(
                    "searchaction",
                    "@search.action"
                );
            } else {
                if (Object.keys(body).includes("countries"))
                    body.id = String(randomId());
                else {
                    body.StartupID = String(randomId());
                    body.IndustryVector = await generateEmbedding(
                        body.Industry
                    );
                    body.LocationVector = await generateEmbedding(
                        body.Location
                    );
                    body.StartupStageVector = await generateEmbedding(
                        body.StartupStage
                    );
                }

                bodyJSON = JSON.stringify({ value: [body] });
            }

            const index_name = Object.keys(body).includes("id")
                ? process.env["SearchRegionsIndexName"]
                : process.env["SearchIndexName"];

            const url = `${process.env["SearchEndpoint"]}/indexes/${index_name}/docs/index?api-version=2020-06-30`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env["SearchApiQueryKey"],
                },
                body: bodyJSON,
            });

            const result = await response.json();
            return { jsonBody: body };
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
