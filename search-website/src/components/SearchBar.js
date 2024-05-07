function SearchBar(props) {
    return (
        <div className="SearchBar" onSubmit={props.onSubmit}>
    <form className="d-flex py-4 px-5">
      <input className="form-control me-2" type="search" placeholder="Search Startup" aria-label="Search" 
      onChange={props.onChange}/>
      <button className="btn btn-outline-primary" type="submit" 
      onClick={ props.onSubmit}>Search</button>
    </form>
        </div>
    );
}

export default SearchBar;
