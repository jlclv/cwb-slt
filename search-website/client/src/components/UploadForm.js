const UploadForm = ({
    handleFileChange,
    handleTopChange,
    handleSubmit,
    Top,
}) => {
    return (
        <div className="UploadForm">
            <form onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-md">
                        <label htmlFor="file-upload" className="form-label">
                            Excel Upload
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="file-upload"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="top" className="form-label">
                            Top
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="top"
                            onChange={handleTopChange}
                            value={Top}
                            placeholder="1"
                        />
                    </div>
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
};

export default UploadForm;
