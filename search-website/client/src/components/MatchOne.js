import MatchForm from "./MatchForm";
import Notification from "./Notification";
import stagesService from "../services/stages";
import startupsService from "../services/startups";
import regionsService from "../services/regions";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

const MatchOne = () => {
    const [stages, setStages] = useState({});
    const [investor, setInvestor] = useState({
        Region: "",
        Industry: "",
        StartStage: 0,
        EndStage: 0,
    });
    const [top, setTop] = useState(1);
    const [startup, setStartup] = useState(null);
    const [message, setMessage] = useState(null);
    const [notifType, setNotifType] = useState("danger");

    useEffect(() => {
        const getStages = async () => {
            const result = await stagesService.getStages();
            setStages(result);
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

    async function matchInvestor() {
        try {
            const regions = await regionsService.getCountries(investor.Region);
            const countries = regions[0]
                ? regions.map((region) => region.countries)
                : "";
            const filter = startupsService.generateFilter(
                investor.Region,
                countries,
                investor.StartStage,
                investor.EndStage
            );
            const startupResult = await startupsService.matchStartups(
                investor.Industry,
                top,
                filter
            );
            setStartup(startupResult);
            if (startupResult[0]) {
                setNotification(`success`, `Match found!`, 2000);
            } else {
                setNotification(`warning`, `No matches`, 2000);
            }
        } catch (error) {
            setNotification(
                "danger",
                "Something went wrong, please try again",
                2000
            );
        }
    }

    const handleRegionChange = (event) => {
        setInvestor({ ...investor, Region: event.target.value });
    };
    const handleIndustryChange = (event) => {
        setInvestor({ ...investor, Industry: event.target.value });
    };
    const handleStartStageChange = (event) => {
        setInvestor({ ...investor, StartStage: event.target.value });
    };
    const handleEndStageChange = (event) => {
        setInvestor({ ...investor, EndStage: event.target.value });
    };

    const handleTopChange = (event) => {
        setTop(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!investor.Region || !investor.Industry || !top) {
            setNotification("danger", "Please fill in the form", 2000);
        } else if (investor.StartStage > investor.EndStage) {
            setNotification(
                "danger",
                "End Stage should be greater than Start Stage",
                2000
            );
        } else if (Number(top) !== parseInt(top)) {
            setNotification(
                "danger",
                "Please input an integer in the 'top' field",
                2000
            );
        } else {
            matchInvestor();
        }
    };

    return (
        <div className="match-form">
            <h1>Match an Investor</h1>
            <Notification message={message} type={notifType} />
            <MatchForm
                handleRegionChange={handleRegionChange}
                handleIndustryChange={handleIndustryChange}
                handleStartStageChange={handleStartStageChange}
                handleEndStageChange={handleEndStageChange}
                handleTopChange={handleTopChange}
                handleSubmit={handleSubmit}
                Region={investor.Region}
                Industry={investor.Industry}
                Stages={stages}
                StartStage={investor.StartStage}
                EndStage={investor.EndStage}
                Top={top}
            />
            <SearchResults results={startup} />
        </div>
    );
};

export default MatchOne;
