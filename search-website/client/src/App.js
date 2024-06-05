import Header from "./components/Header";
import Search from "./pages/Search";
import Match from "./pages/Match";
import AddStartup from "./pages/AddStartup";
import AddRegion from "./pages/AddRegion";
import RemoveRegion from "./pages/RemoveRegion";
import RemoveStartup from "./pages/RemoveStartup";

function App() {
    let Component;
    switch (window.location.pathname) {
        case "/":
            Component = Search;
            break;
        case "/match":
            Component = Match;
            break;
        case "/addstartup":
            Component = AddStartup;
            break;
        case "/addregion":
            Component = AddRegion;
            break;
        case "/removestartup":
            Component = RemoveStartup;
            break;
        case "/removeregion":
            Component = RemoveRegion;
            break;
        default:
            break;
    }
    return (
        <div className="App">
            <Header />
            <Component />
        </div>
    );
}

export default App;
