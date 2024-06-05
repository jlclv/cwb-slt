import Notification from "../components/Notification";
import { useState } from "react";
import startupsService from "../services/startups";

const RemoveStartup = () => {
    const [startup, setStartup] = useState("");
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
        if (!startup || Number(startup) !== parseInt(startup)) {
            setNotification("danger", "Please check your input", 2000);
        } else {
            deleteStartup();
        }
    };

    const handleChange = (event) => {
        setStartup(event.target.value);
    };

    const deleteStartup = async () => {
        try {
            startupsService.removeStartup({ StartupID: startup });
            setNotification(
                `success`,
                `Removed startup with id ${startup}`,
                5000
            );
            setStartup("");
        } catch (error) {
            setNotifType(
                "danger",
                "Something went wrong, please try again",
                2000
            );
        }
    };
    return (
        <div className="RemoveStartup">
            <div className="container mt-4">
                <h1>Remove Startup</h1>
                <Notification message={message} type={notifType} />
                <form onSubmit={handleSubmit}>
                    <div className="col-md">
                        <label htmlFor="startup" className="form-label">
                            Startup ID
                        </label>
                        <input
                            type="number"
                            placeholder="1"
                            className="form-control"
                            onChange={handleChange}
                            value={startup}
                        />
                    </div>
                    <button className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RemoveStartup;
