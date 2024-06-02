function StartupsListVector(props) {
     return (
        <div className="StartupsList px-5">
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Startup Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Industry</th>
                    <th scope="col">Startup Stage</th>
                    <th scope="col">Search Score</th>
                </tr>
            </thead>
            <tbody>
                {props.startups.filter(
                    (startup) => {return startup.score >= 0.905})
                    .map(
                        (startup) => (
                            <tr className="table-success" key={startup.StartupID}>
                                <td>{startup.Name}</td>
                                <td>{startup.StartupName}</td>
                                <td>{startup.Location}</td>
                                <td>{startup.Industry}</td>
                                <td>{startup.StartupStage}</td>
                                <td>{startup.score}</td>
                            </tr>
                        )
                    )}
                {props.startups.filter(
                    (startup) => {return startup.score < 0.905 && startup.score > 0.8})
                    .map(
                        (startup) => (
                            <tr className="table-light" key={startup.StartupID}>
                                <td>{startup.Name}</td>
                                <td>{startup.StartupName}</td>
                                <td>{startup.Location}</td>
                                <td>{startup.Industry}</td>
                                <td>{startup.StartupStage}</td>
                                <td>{startup.score}</td>
                            </tr>
                        )
                    )}
            </tbody>
            </table>
        </div>
    );
  }
  
  export default StartupsListVector;
  