import MatchMultiple from "../components/MatchMultiple";
import MatchOne from "../components/MatchOne";

const Match = () => {
    return (
        <div className="Match">
            <div className="container mt-4">
                <MatchOne />
                <MatchMultiple />
            </div>
        </div>
    );
};

export default Match;
