import { useState } from "react";
import AlertInstructions from "../components/AlertInstructions";

function Match() {
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [excelData, setExcelData] = useState(null);

    const handleFile = (event) => {
        let selectedFile = event.target.files[0];
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if(selectedFile) {
            if(selectedFile && fileTypes.includes(selectedFile.type)){
                console.log(selectedFile)
                setTypeError(null);

                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(event)=>{
                    setExcelFile(event.target.result);
                }

            } else{
                setTypeError("Please upload an excel file.")
                setExcelFile(null);
            }
        } else{
            console.log('Please select your file')
        }
    }

    return(
        <div className="wrapper">
            <h2 className="ms-4 mt-4 mb-2">Match startups and investors</h2>
            <p className="ms-4 mb-2">Upload the excel file (.xlsx) to start. Please follow the format below: </p>
            <table className="table ms-4 me-4 mb-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Regions</th>
                        <th>Stage</th>
                        <th>Industry</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Company 1</td>
                        <td>Asia Pacific</td>
                        <td>Seed-Series A</td>
                        <td>Impact, Sustainability / Climate, Deeptech</td>
                    </tr>
                </tbody>
            </table>
            <form className="form-group custom-form ms-4 me-4">
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

export default Match;