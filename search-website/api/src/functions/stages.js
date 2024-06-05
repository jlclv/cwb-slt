const { app } = require("@azure/functions");
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

app.http("stages", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        try {
            const stages = process.env["Stages"].split(",");
            let result = {};
            stages.forEach((stage, index) => {
                result[stage] = index;
            });
            return { jsonBody: result };
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
