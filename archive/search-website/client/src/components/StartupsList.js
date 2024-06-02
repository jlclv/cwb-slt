import { useState, useEffect } from 'react';

function StartupsList(props) {

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
                </tr>
            </thead>
            <tbody>
                {props.startups.map((startup) => (
                    <tr key={startup.StartupID}>
                        <td>{startup.Name}</td>
                        <td>{startup.StartupName}</td>
                        <td>{startup.Location}</td>
                        <td>{startup.Industry}</td>
                        <td>{startup.StartupStage}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
  }
  
  export default StartupsList;
  