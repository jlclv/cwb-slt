const { app } = require('@azure/functions');

app.http('search', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
            
            const endpoint = process.env["searchEndpoint"];
            const indexName = process.env["indexName"];
            const searchKey = process.env["searchApiKey"];

            const body = await request.json();
            let query = body.query;
            const startups = []

            const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(searchKey));
            const searchResults = await client.search(query);

            for await (const result of searchResults.results) {
                startups.push(result.document)            
            }
            
            context.log(`Http function processed request for url "${request.url}"`);
            
            
            return { jsonBody: startups };
            
        } catch (error) {
            return {
                status: 500,
                jsonBody: {
                    innerStatusCode: error.statusCode || error.code,
                    error: error.details || error.message,
                    stack: error.stack
                }
            }
        }
    }
});
