import StartupForm from "../components/StartupForm";
import Notification from "../components/Notification";
import startupsService from "../services/startups";
import stagesService from "../services/stages";
import { useState, useEffect } from "react";

const AddStartup = () => {
    const [stages, setStages] = useState({});
    const [startup, setStartup] = useState({
        Name: "",
        StartupName: "",
        StartupStage: "",
        Location: "",
        Industry: "",
        StageNumber: 0,
    });
    const [message, setMessage] = useState(null);
    const [notifType, setNotifType] = useState("danger");

    useEffect(() => {
        const getStages = async () => {
            const result = await stagesService.getStages();
            setStages(result);
            setStartup({
                ...startup,
                StartupStage: Object.keys(result).find(
                    (key) => result[key] === 0
                ),
            });
        };
        getStages();
    }, []);

    function setNotification(nType, msg, timeout) {
        setNotifType(nType);
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, timeout);
    }

    async function createStartup() {
        const result = await startupsService.addStartup(startup);
        setNotification(
            `success`,
            `Added ${result.StartupName} with id ${result.StartupID}`,
            5000
        );
    }

    const handleNameChange = (event) => {
        setStartup({ ...startup, Name: event.target.value });
    };
    const handleStartupNameChange = (event) => {
        setStartup({ ...startup, StartupName: event.target.value });
    };
    const handleStartupStageChange = (event) => {
        const stage = event.target.value;
        setStartup({
            ...startup,
            StartupStage: stage,
            StageNumber: stages[stage],
        });
    };
    const handleLocationChange = (event) => {
        setStartup({ ...startup, Location: event.target.value });
    };
    const handleIndustryChange = (event) => {
        setStartup({ ...startup, Industry: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            !startup.Name ||
            !startup.StartupName ||
            !startup.Location ||
            !startup.Industry
        ) {
            setNotification("danger", "Please fill in the form", 2000);
        } else {
            createStartup();
            setStartup({
                Name: "",
                StartupName: "",
                StartupStage: Object.keys(stages).find(
                    (key) => stages[key] === 0
                ),
                Location: "",
                Industry: "",
                StageNumber: 0,
            });
        }
    };

    return (
        <div className="AddStartup">
            <div className="container mt-4">
                <div className="add-form">
                    <h1>Add Startup</h1>
                    <Notification message={message} type={notifType} />
                    <StartupForm
                        handleNameChange={handleNameChange}
                        handleStartupNameChange={handleStartupNameChange}
                        handleStartupStageChange={handleStartupStageChange}
                        handleLocationChange={handleLocationChange}
                        handleIndustryChange={handleIndustryChange}
                        handleSubmit={handleSubmit}
                        Name={startup.Name}
                        StartupName={startup.StartupName}
                        StartupStage={startup.StartupStage}
                        Location={startup.Location}
                        Industry={startup.Industry}
                        Stages={stages}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddStartup;
