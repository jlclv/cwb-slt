const RegionForm = ({
    handleFormSubmit,
    handleRegionCodeChange,
    handleRegionNameChange,
    handleCountriesChange,
    regionCode,
    regionName,
    countries,
}) => {
    return (
        <div className="RegionForm">
            <form className="row g-3" onSubmit={handleFormSubmit}>
                <div className="col-md-4">
                    <label htmlFor="inputRegionCode" className="form-label">
                        Region Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputRegionCode"
                        placeholder="APAC"
                        onChange={handleRegionCodeChange}
                        value={regionCode}
                    />
                </div>

                <div className="col-md-8">
                    <label htmlFor="inputRegionName" className="form-label">
                        Region Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputRegionName"
                        placeholder="Asia Pacific"
                        onChange={handleRegionNameChange}
                        value={regionName}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputCountries" className="form-label">
                        Countries
                    </label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="inputCountries"
                        placeholder="Singapore,Philippines,Malaysia,..."
                        onChange={handleCountriesChange}
                        value={countries}
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegionForm;
