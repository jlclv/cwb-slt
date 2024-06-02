import SearchBar from "../components/SearchBar";
import StartupsList from "../components/StartupsList";
import { useState,useEffect } from "react";
import axios from "axios";


function Search() { 
    const [query, setQuery] = useState("");
    const [startups, setStartups] = useState([]);
    
    useEffect(() => {
        getStartups()
    }, []);

    const getStartups = async() => {
        const api = process.env.REACT_APP_api;
        const result = await axios.post(`${api}/search`,{"query": query})
        setStartups(result.data)
    }

    
    function handleChange(event) {
        setQuery(event.target.value);
    }

    function handleSearch(event) {
        event.preventDefault();
        getStartups()
    }

    return(
        <>
            <SearchBar query={query} onChange={handleChange} onSubmit={handleSearch} />
            <StartupsList startups={startups}/>
        </>
    )
}

export default Search;