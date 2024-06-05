const Header = () => {
    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        SLTSearch
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <CustomLink
                                    className="nav-link"
                                    aria-current="page"
                                    href="/"
                                >
                                    Search
                                </CustomLink>
                            </li>
                            <li className="nav-item">
                                <CustomLink className="nav-link" href="/match">
                                    Match
                                </CustomLink>
                            </li>
                            <li className="nav-item dropdown">
                                <CustomLink
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Add
                                </CustomLink>
                                <ul className="dropdown-menu">
                                    <li>
                                        <CustomLink
                                            className="dropdown-item"
                                            href="/addstartup"
                                        >
                                            Startup
                                        </CustomLink>
                                    </li>
                                    <li>
                                        <CustomLink
                                            className="dropdown-item"
                                            href="/addregion"
                                        >
                                            Region
                                        </CustomLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <CustomLink
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Remove
                                </CustomLink>
                                <ul className="dropdown-menu">
                                    <li>
                                        <CustomLink
                                            className="dropdown-item"
                                            href="/removestartup"
                                        >
                                            Startup
                                        </CustomLink>
                                    </li>
                                    <li>
                                        <CustomLink
                                            className="dropdown-item"
                                            href="/removeregion"
                                        >
                                            Region
                                        </CustomLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

function CustomLink({ href, children, className, ...props }) {
    const path = window.location.pathname;
    return (
        <a
            href={href}
            className={path === href ? `${className} active` : `${className}`}
            {...props}
        >
            {children}
        </a>
    );
}

export default Header;
