const SearchBar = ({
    handleSubmit,
    handleStartupChange,
    handleCountChange,
    count,
    query,
}) => {
    return (
        <div className="SearchBar">
            <form className="row g-3 " onSubmit={handleSubmit}>
                <div className="col-md">
                    <input
                        className="form-control"
                        placeholder="Search Startup"
                        type="search"
                        onChange={handleStartupChange}
                        value={query}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Count"
                        onChange={handleCountChange}
                        value={count}
                    />
                </div>
                <div className="col-md-1">
                    <button className="btn btn-outline-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
