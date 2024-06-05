import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import startupsService from "../services/startups";
import Notification from "../components/Notification";
import { useEffect, useState } from "react";

const Search = () => {
    const [query, setQuery] = useState("Startup in Singapore");
    const [count, setCount] = useState(5);
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        getStartups(query, count);
    }, []);

    const handleStartupChange = (event) => {
        setQuery(event.target.value);
    };

    const handleCountChange = (event) => {
        setCount(event.target.value);
    };

    const getStartups = async (query, top) => {
        const startups = await startupsService.getStartups(query, top);
        setResults(startups);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!count || !query) {
            setMessage("Please insert a query");
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        } else if (Number(count) !== parseInt(count)) {
            setMessage("Please insert an integer");
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        } else {
            getStartups(query, count);
        }
    };

    return (
        <div className="Search">
            <div className="container mt-4">
                <h1>Search for Startups</h1>
                <Notification message={message} type={"danger"} />
                <SearchBar
                    handleStartupChange={handleStartupChange}
                    handleCountChange={handleCountChange}
                    handleSubmit={handleSubmit}
                    count={count}
                    query={query}
                />
                <SearchResults results={results} />
            </div>
        </div>
    );
};

export default Search;
