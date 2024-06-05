import UploadForm from "./UploadForm";
import UploadFormNotes from "./UploadFormNotes";
import Notification from "./Notification";
import { useState } from "react";
import { saveAs } from "file-saver";
import startupsService from "../services/startups";
import stagesService from "../services/stages";
import regionsService from "../services/regions";
const XLSX = require("xlsx");

function getStartups(resultStartups) {
    let startups = {};
    resultStartups.forEach((startup, index) => {
        startups = {
            ...startups,
            ...Object.fromEntries(
                Object.entries(startup).map(([k, v]) => [`${k}${index}`, v])
            ),
        };
    });
    return startups;
}

const ProgressBar = ({ progress }) => {
    if (progress)
        return (
            <div class="progress mt-2" style={{ height: 20 }}>
                <div
                    class="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        );
    return null;
};

const MatchMultiple = () => {
    const [message, setMessage] = useState(null);
    const [notifType, setNotifType] = useState("danger");
    const [upload, setUpload] = useState({
        excelFile: null,
        top: 3,
    });
    const [excelData, setExcelData] = useState([]);
    const [progress, setProgress] = useState(0);

    function setNotification(nType, msg, timeout = 2000) {
        setNotifType(nType);
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, timeout);
    }

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

        saveAs(blob, `Investor-Startup-Top${upload.top}.xlsx`);
    };

    const getMatches = async () => {
        const workbook = XLSX.read(upload.excelFile, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        const datacount = Object.keys(data).length;
        let newData = [];

        if (
            ["Regions", "StartupStage", "Industry"].every((el) =>
                Object.keys(data[0]).includes(el)
            )
        ) {
            try {
                for (const investor of data) {
                    setProgress((progress) => progress + 100 / datacount);
                    let StartStage, EndStage, filter;
                    const stageRange =
                        await stagesService.getStageNumberFromRange(
                            investor.StartupStage
                        );
                    [StartStage, EndStage] = stageRange;
                    const regions = await regionsService.getCountries(
                        investor.Regions
                    );
                    const countries = regions[0]
                        ? regions.map((region) => region.countries)
                        : "";

                    filter = startupsService.generateFilter(
                        investor.Regions,
                        countries,
                        StartStage,
                        EndStage
                    );

                    const resultStartups = await startupsService.matchStartups(
                        investor.Industry,
                        upload.top,
                        filter
                    );

                    const startups = getStartups(resultStartups);
                    newData = [...newData, { ...investor, ...startups }];
                }
                setExcelData(newData);
                setProgress(0);
            } catch (error) {
                setNotification("danger", "Please re-check your input");
            }
        } else {
            setNotification(
                "danger",
                "Please check if your file follows the format including the capitalization of the headers"
            );
        }
    };

    const handleFileChange = (event) => {
        setExcelData([]);
        let uploadedFile = event.target.files[0];
        const fileTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ];

        if (uploadedFile) {
            if (uploadedFile && fileTypes.includes(uploadedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(uploadedFile);
                reader.onload = (event) => {
                    setUpload({ ...upload, excelFile: event.target.result });
                };
            } else {
                setNotification("danger", "Please upload an excel file");
                setUpload({ ...upload, excelFile: null });
            }
        } else {
            setNotification("danger", "Please upload an excel file");
        }
    };

    const handleTopChange = (event) => {
        setUpload({ ...upload, top: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Number(upload.top) === parseInt(upload.top) && upload.excelFile) {
            getMatches();
        } else {
            setNotification("danger", "Please check if your inputs are valid");
        }
    };

    return (
        <div className="match-upload mt-4">
            <h1>Upload Investors</h1>
            <UploadFormNotes />
            <Notification message={message} type={notifType} />

            <UploadForm
                handleFileChange={handleFileChange}
                handleTopChange={handleTopChange}
                handleSubmit={handleSubmit}
                ExcelFile={upload.excelFile}
                Top={upload.top}
            />
            <ProgressBar progress={progress} />
            {excelData[0] && (
                <button
                    className="btn btn-success mt-2"
                    onClick={exportToExcel}
                >
                    Download Results
                </button>
            )}
        </div>
    );
};

export default MatchMultiple;
