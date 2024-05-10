# SLTSearch
A react webapp that allows its users to search for startups and match investors with startups accordingly. 

![website search page picture](pictures/website1.png)

## Architecture 
![solution architecture](pictures/architecture.svg)

## Prerequisites
- [VS Code](https://code.visualstudio.com/Download)
- [Python](https://www.python.org/)
- [Node.js](https://nodejs.org/en)
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-create-service-portal)

## Usage
### Setup Environment Variables
Once an Azure AI Search resource has been created, create a `.env` file containing the following: 
```
search_endpoint = "<YOUR-AZURE-AI-SEARCH-ENDPOINT>"
index_name = "<NAME-OF-INDEX>"
search_api_key="<YOUR-AZURE-SEARCH-API-KEY>"
openapi_key = "<YOUR-OPEN-AI-API-KEY>"
startupscsv = "<YOUR-CSV-FILE-PATH>"
```

Create another `.env` file inside the search-website folder containing the following: 
```
REACT_APP_search_endpoint=<YOUR-AZURE-AI-SEARCH-ENDPOINT>
REACT_APP_index_name=<NAME-OF-INDEX>
REACT_APP_search_api_key=<YOUR-AZURE-SEARCH-API-KEY>
REACT_APP_openapi_key=<YOUR-OPEN-AI-API-KEY>
```

### Data source preparation
Create a `.csv` file of the startups following the format below: 
```
Name,StartupName,Location,StartupStage,Industry
Aliah,Startup 1,Singapore,Seed,Material Technology
```

### Index Creation
Use the [slt_startup_vector_search notebook](./slt_startup_vector_search.ipynb) to create the search index.

### Running the App
To use the webapp, run the following code inside the search-website folder:
```
npm install
npm run start
```

##    
This repository contains my solution for Microsoft Code; Without Barriers Hackathon 2024 -
She Loves Tech Problem Statement 2: Automate Investor-Startup Matching Solution. 

