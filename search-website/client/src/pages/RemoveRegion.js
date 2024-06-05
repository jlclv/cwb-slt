import Notification from "../components/Notification";
import { useState } from "react";
import regionsService from "../services/regions";

const RemoveRegion = () => {
    const [region, setRegion] = useState("");
    const [message, setMessage] = useState(null);
    const [notifType, setNotifType] = useState("danger");

    function setNotification(nType, msg, timeout) {
        setNotifType(nType);
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, timeout);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!region || Number(region) !== parseInt(region)) {
            setNotification("danger", "Please check your input", 2000);
        } else {
            deleteRegion();
        }
    };

    const handleChange = (event) => {
        setRegion(event.target.value);
    };

    const deleteRegion = async () => {
        try {
            regionsService.removeRegion({ id: region });
            setNotification(
                `success`,
                `Removed region with id ${region}`,
                5000
            );
            setRegion("");
        } catch (error) {
            setNotification(
                `danger`,
                `Something went wrong, please try again.`,
                2000
            );
        }
    };
    return (
        <div className="RemoveRegion">
            <div className="container mt-4">
                <h1>Remove Region</h1>
                <Notification message={message} type={notifType} />
                <form onSubmit={handleSubmit}>
                    <div className="col-md">
                        <label htmlFor="region" className="form-label">
                            Region ID
                        </label>
                        <input
                            type="number"
                            placeholder="1"
                            className="form-control"
                            onChange={handleChange}
                            value={region}
                        />
                    </div>
                    <button className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RemoveRegion;
