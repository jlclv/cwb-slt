const StartupForm = ({
    handleNameChange,
    handleStartupNameChange,
    handleStartupStageChange,
    handleLocationChange,
    handleIndustryChange,
    handleSubmit,
    Name,
    StartupName,
    StartupStage,
    Location,
    Industry,
    Stages,
}) => {
    return (
        <div className="startupform">
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="John"
                            className="form-control"
                            id="name"
                            onChange={handleNameChange}
                            value={Name}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="startupname" className="form-label">
                            Startup Name
                        </label>
                        <input
                            type="text"
                            placeholder="Startup1"
                            className="form-control"
                            id="startupname"
                            onChange={handleStartupNameChange}
                            value={StartupName}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="startupstage" className="form-label">
                            Startup Stage
                        </label>
                        <select
                            className="form-select"
                            id="startupstage"
                            onChange={handleStartupStageChange}
                            value={StartupStage}
                        >
                            {Object.keys(Stages).map((stage) => (
                                <option key={Stages[stage]} value={stage}>
                                    {stage}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <label htmlFor="location" className="form-label">
                            Location
                        </label>
                        <input
                            type="text"
                            placeholder="Singapore"
                            className="form-control"
                            id="location"
                            onChange={handleLocationChange}
                            value={Location}
                        />
                    </div>
                    <div className="col-md">
                        <label htmlFor="industry" className="form-label">
                            Industry
                        </label>
                        <input
                            type="text"
                            placeholder="Medical Technology"
                            className="form-control"
                            id="industry"
                            onChange={handleIndustryChange}
                            value={Industry}
                        />
                    </div>
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
};

export default StartupForm;
