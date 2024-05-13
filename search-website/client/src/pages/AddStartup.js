import axios from "axios";
import { useEffect, useState } from "react";
import StartupExample from "../components/StartupExample";

function AddStartup(){
    const [typeError, setTypeError] = useState();
    const handleSubmission = () => {}
    const handleFile = () => {}
    return (
        <div className="wrapper">
            <h2 className="ms-4 mt-4 mb-2">Add startups</h2>
            <p className="ms-4 mb-2">Upload the excel file (.xlsx) to start. Please follow the format below: </p>
            <StartupExample />
            
            <form className="form-group custom-form ms-4 me-4" onSubmit={handleSubmission}>
                <div className="d-flex">
                    <input type="file" className="form-control" required onChange={handleFile} />
                    <button type="submit" className="btn btn-success btn-md ms-2">Upload</button>
                </div>
                {typeError&&(
                    <div className="alert alert-danger mt-2" role="alert">{typeError}</div>
                )}
            </form>
        </div>
    )
}

export default AddStartup;