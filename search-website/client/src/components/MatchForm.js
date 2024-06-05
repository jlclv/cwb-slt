const MatchForm = ({
    handleRegionChange,
    handleIndustryChange,
    handleStartStageChange,
    handleEndStageChange,
    handleTopChange,
    handleSubmit,
    Region,
    Industry,
    StartStage,
    EndStage,
    Stages,
    Top,
}) => {
    return (
        <div className="MatchForm">
            <form onSubmit={handleSubmit}>
                <div className="row g-5">
                    <div className="col-md">
                        <label htmlFor="region" className="form-label">
                            Region
                        </label>
                        <input
                            type="text"
                            id="region"
                            className="form-control"
                            placeholder="South East Asia"
                            onChange={handleRegionChange}
                            value={Region}
                        />
                    </div>

                    <div className="col-md">
                        <label htmlFor="industry" className="form-label">
                            Industry
                        </label>
                        <input
                            type="text"
                            id="industry"
                            className="form-control"
                            placeholder="Material Technology"
                            onChange={handleIndustryChange}
                            value={Industry}
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="startupstage1" className="form-label">
                            Start Stage
                        </label>
                        <select
                            className="form-select"
                            id="startupstage1"
                            onChange={handleStartStageChange}
                            value={StartStage}
                        >
                            {Object.keys(Stages).map((stage) => (
                                <option
                                    key={Stages[stage]}
                                    value={Stages[stage]}
                                >
                                    {stage}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="startupstage2" className="form-label">
                            End Stage
                        </label>
                        <select
                            className="form-select"
                            id="startupstage2"
                            onChange={handleEndStageChange}
                            value={EndStage}
                        >
                            {Object.keys(Stages).map((stage) => (
                                <option
                                    key={Stages[stage]}
                                    value={Stages[stage]}
                                >
                                    {stage}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-1">
                        <label htmlFor="top" className="form-label">
                            Top
                        </label>
                        <input
                            type="number"
                            id="top"
                            className="form-control"
                            placeholder="1"
                            onChange={handleTopChange}
                            value={Top}
                        />
                    </div>
                </div>
                <button className="mt-2 btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default MatchForm;
