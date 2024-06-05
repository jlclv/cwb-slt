import stagesService from "../services/stages";
import { useEffect, useState } from "react";

const UploadFormNotes = () => {
    const [stages, setStages] = useState({});
    useEffect(() => {
        const result = async () => {
            const stageResults = await stagesService.getStages();
            setStages(stageResults);
        };
        result();
    }, []);

    return (
        <div className="UploadFormNotes">
            <h4>Instructions</h4>
            <ul>
                <li key="stage">
                    Set the StartupStage as a range with the following stages:
                    <p>
                        {Object.keys(stages).map((stage) => (
                            <span key={stage}>{stage}, </span>
                        ))}
                    </p>
                </li>
                <li key="file">
                    The Excel File should follow the format below:
                </li>
            </ul>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Regions</th>
                        <th scope="col">StartupStage</th>
                        <th scope="col">Industry</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key="investor">
                        <td>John Doe</td>
                        <td>Company 1</td>
                        <td>Asia Pacific</td>
                        <td>Seed-Series A</td>
                        <td>Deeptech</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UploadFormNotes;
