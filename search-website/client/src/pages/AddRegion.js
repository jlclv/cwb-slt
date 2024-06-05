import RegionForm from "../components/RegionForm";
import Notification from "../components/Notification";
import regionsService from "../services/regions";
import { useState } from "react";

const AddRegion = () => {
    const [region, setRegion] = useState({
        grouping_code: "",
        grouping_name: "",
        countries: [],
    });
    const [message, setMessage] = useState(null);
    const [notifType, setNotifType] = useState("danger");

    function setNotification(nType, msg, timeout) {
        setNotifType(nType);
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, timeout);
    }

    const addRegion = async () => {
        try {
            const result = await regionsService.addRegion(region);
            setNotification(
                `success`,
                `Added ${result.grouping_name} with id ${result.id}`,
                5000
            );
            setRegion({
                grouping_code: "",
                grouping_name: "",
                countries: [],
            });
        } catch (error) {
            setNotification(
                "danger",
                "Something went wrong, please try again",
                2000
            );
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (
            !region.grouping_code ||
            !region.grouping_name ||
            !region.countries[0]
        ) {
            setNotification("danger", "Please fill in the form", 2000);
        } else {
            addRegion();
        }
    };
    const handleRegionCodeChange = (event) => {
        const newRegionCode = event.target.value;
        setRegion({ ...region, grouping_code: newRegionCode });
    };

    const handleRegionNameChange = (event) => {
        const newRegionName = event.target.value;
        setRegion({ ...region, grouping_name: newRegionName });
    };

    const handleCountriesChange = (event) => {
        const newCountries = event.target.value.split(",");
        setRegion({ ...region, countries: newCountries });
    };

    return (
        <div className="AddRegion">
            <div className="container mt-4">
                <h1>Add Region</h1>
                <Notification message={message} type={notifType} />
                <RegionForm
                    handleFormSubmit={handleFormSubmit}
                    handleRegionCodeChange={handleRegionCodeChange}
                    handleRegionNameChange={handleRegionNameChange}
                    handleCountriesChange={handleCountriesChange}
                    regionCode={region.grouping_code}
                    regionName={region.grouping_name}
                    countries={region.countries.join()}
                />
            </div>
        </div>
    );
};

export default AddRegion;
