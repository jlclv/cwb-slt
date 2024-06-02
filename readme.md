# SLTSearch

A react webapp that allows its users to search for startups and match investors with startups accordingly.

![website search page picture](pictures/website1.png)

## Architecture

![solution architecture](pictures/architecture.svg)

## Prerequisites

-   [VS Code](https://code.visualstudio.com/Download)
-   [Python](https://www.python.org/)
-   [Node.js](https://nodejs.org/en)
-   [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-create-service-portal)
-   [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/)
-   [Open AI](https://openai.com/index/openai-api/)

## Usage

### Setup Environment Variables

Once an Azure AI Search resource has been created, create a `.env` file containing the following:

```
search_endpoint = "<YOUR-AZURE-AI-SEARCH-ENDPOINT>"
index_name = "<NAME-OF-INDEX>"
regions_index = "<NAME-OF-REGION-INDEX>"
search_api_key="<YOUR-SEARCH-API-KEY>"
openapi_key = "<YOUR-OPEN-AI-API-KEY>"
startupscsv = "<YOUR-CSV-FILE-PATH>"
stages = "<STARTUP-STAGES>" # e.g. Pre-Seed,Seed,Pre-A,...
```

To run the website locally, create and setup a `search-website/api/local.settings.json` file with the following values respectively:

```
{
  ...,
  "Values": {
    ...,
    "SearchEndpoint": "<YOUR-AZURE-AI-SEARCH-ENDPOINT>",
    "SearchIndexName": "<NAME-OF-INDEX>",
    "SearchRegionsIndexName": "<NAME-OF-REGION-INDEX>",
    "SearchApiQueryKey": "<YOUR-SEARCH-API-KEY>",
    "OpenAIAPIKey": "<YOUR-OPEN-AI-API-KEY>",
    "Stages": "<STARTUP-STAGES>" // e.g. Pre-Seed,Seed,Pre-A,...
  }
}

```

### Data source preparation

Create a `.csv` file of the startups following the format below:

```
Name,StartupName,Location,StartupStage,Industry
Aliah,Startup 1,Singapore,Seed,Material Technology
```

### Index Creation

Use the [slt_startup_vector_search_semantic notebook](./slt_startup_vector_search_semantic.ipynb) to create the search index.

The notebook will create two (2) search indexes, one for the startups and one for the regions. The startups index allows for vector search and semantic search of the given startups. The regions index allows for better filtration of the countries given the region.

### Running the App

To use the webapp, run the code below inside the `search-website/client` and `search-website/api` folder

```
npm install
npm run start
```

### Deploying the app

To depoloy, you may follow the steps here: [azure-search-react-template-deployment](https://github.com/dereklegenzoff/azure-search-react-template?tab=readme-ov-file#deploying-this-sample)

##

This repository contains my solution for Microsoft Code; Without Barriers Hackathon 2024 -
She Loves Tech Problem Statement 2: Automate Investor-Startup Matching Solution.
