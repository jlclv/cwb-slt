import SearchBar from "../components/SearchBar";
import StartupsListVector from "../components/StartupsListVector";
import AlertInstruction from "../components/AlertInstructions";
import { useState,useEffect } from "react";

function VectorSearch() {
    const [query, setQuery] = useState("Singapore");
    const [vectorquery, setVectorquery] = useState([]);
    const [startups, setStartups] = useState([]);
    
    const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
    const {OpenAI} = require('openai');

    const endpoint = process.env.REACT_APP_search_endpoint;
    const indexName = process.env.REACT_APP_index_name;
    const searchKey = process.env.REACT_APP_search_api_key;
    const openapiKey = process.env.REACT_APP_openapi_key;

    const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(searchKey));
    const openai = new OpenAI({apiKey: openapiKey, dangerouslyAllowBrowser: true});

    async function getEmbeddings() {
        const embedding = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: query,
        });
        setVectorquery(embedding.data[0].embedding)
      }

      useEffect(() => {
        getEmbeddings();
    }, []);


    const getStartupsVector = async() => {
        let startupList = [];
        const searchResults = await client.search("*",{
            vectorSearchOptions: {
              queries: [
                {
                  kind: "vector",
                  fields: ["DescriptionVector"],
                  kNearestNeighborsCount: 5,
                  vector: vectorquery,
                }
              ],
            },
          });
      
          for await (const result of searchResults.results) {
            let newStartup = {...result.document}
            newStartup.score = result.score
            startupList.push(newStartup)
          }
          console.log(startupList)
          setStartups(startupList)
    }
    
    function handleChange(event) {
        setQuery(event.target.value);
    }

    function handleSearch(event) {
        event.preventDefault();
        getEmbeddings();
        getStartupsVector();
    }

    return(
        <>
            <SearchBar query={query} onChange={handleChange} onSubmit={handleSearch} />
            <AlertInstruction text="Only the top 5 results will be shown"/>
            <StartupsListVector startups={startups}/>
            
        </>
    )
}

export default VectorSearch;