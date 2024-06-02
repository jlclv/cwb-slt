function AppHeader(page) {
    let searchActive, matchActive, vectorsearchActive, addStartupActive;
    switch (page.active) {
        case "/":
            searchActive = "nav-link active";
            matchActive = "nav-link";
            vectorsearchActive = "nav-link";
            addStartupActive = "nav-link";
            break;
        case "/match":
            searchActive = "nav-link";
            matchActive = "nav-link active";
            vectorsearchActive = "nav-link";
            addStartupActive = "nav-link";
            break;
        case "/vectorsearch":
            searchActive = "nav-link";
            matchActive = "nav-link";
            vectorsearchActive = "nav-link active";
            addStartupActive = "nav-link";
            break;
        case "/addstartup":
            searchActive = "nav-link";
            matchActive = "nav-link";
            vectorsearchActive = "nav-link";
            addStartupActive = "nav-link active";
            break;
    }
    return (
        <div className="AppHeader">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        SLT Startups
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav">
                            <a className={searchActive} href="/">
                                Search
                            </a>
                            <a
                                className={vectorsearchActive}
                                href="/vectorsearch"
                            >
                                Vector Search
                            </a>
                            <a className={matchActive} href="/match">
                                Match
                            </a>
                            <a className={addStartupActive} href="/addstartup">
                                Add
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default AppHeader;
