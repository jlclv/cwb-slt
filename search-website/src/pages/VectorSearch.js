import SearchBar from "../components/SearchBar";
import StartupsList from "../components/StartupsList";
import { useState,useEffect } from "react";

function VectorSearch() {
    const [query, setQuery] = useState("");
    
    const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
    const [startups, setStartups] = useState([]);

    const endpoint = process.env.REACT_APP_search_endpoint;
    const indexName = process.env.REACT_APP_index_name;
    const searchKey = process.env.REACT_APP_search_api_key;

    const client = new SearchClient(endpoint, indexName, new AzureKeyCredential(searchKey));
    
    useEffect(() => {
        getStartups()
    }, []);

    const getStartups = async() => {
        const searchResults = await client.search(query);
        let startupList = [];
        for await (const result of searchResults.results) {
            startupList.push(result.document)            
        }
        setStartups(startupList);
    }

    
    function handleChange(event) {
        setQuery(event.target.value);
    }

    function handleSearch(event) {
        event.preventDefault();
        getStartups()
        console.log(query);
    }

    return(
        <>
            <SearchBar query={query} onChange={handleChange} onSubmit={handleSearch} />
            <StartupsList startups={startups}/>
        </>
    )
}

export default VectorSearch;