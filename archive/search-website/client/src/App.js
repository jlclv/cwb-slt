import AppHeader from './components/AppHeader.js'
import Match from './pages/Match.js';
import Search from './pages/Search.js';
import VectorSearch from './pages/VectorSearch.js';

import StartupsList from './components/StartupsList.js'
import SearchBar from './components/SearchBar.js';
import AddStartup from './pages/AddStartup.js';


function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Search;
      break
    case "/match":
      Component = Match;
      break
    case "/vectorsearch":
      Component = VectorSearch;
      break
    case "/addstartup":
      Component = AddStartup;
  }
  return (
    <>
    <AppHeader active={window.location.pathname}/>
    <Component />
    </>
  );
}

export default App;
