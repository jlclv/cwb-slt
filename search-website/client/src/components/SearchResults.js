const SearchResults = ({ results }) => {
    if (results) {
        return (
            <div className="SearchResults ">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Startup Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Startup Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Industry</th>
                            <th scope="col">Startup Stage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((startup) => (
                            <tr key={startup.StartupID}>
                                <td>{startup.StartupID}</td>
                                <td>{startup.Name}</td>
                                <td>{startup.StartupName}</td>
                                <td>{startup.Location}</td>
                                <td>{startup.Industry}</td>
                                <td>{startup.StartupStage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    return null;
};

export default SearchResults;
