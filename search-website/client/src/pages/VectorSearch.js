import SearchBar from "../components/SearchBar";
import StartupsListVector from "../components/StartupsListVector";
import AlertInstruction from "../components/AlertInstructions";
import { useState,useEffect } from "react";
import axios from "axios";

function VectorSearch() {
    const [query, setQuery] = useState("");
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        getStartupsVector();
    }, []);


    const getStartupsVector = async() => {
        const api = process.env.REACT_APP_api;
        const result = await axios.post(`${api}/vectorsearch`,{"query": query, "count":5})
        setStartups(result.data)
    }

    function handleChange(event) {
        setQuery(event.target.value);
    }

    function handleSearch(event) {
        event.preventDefault();
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