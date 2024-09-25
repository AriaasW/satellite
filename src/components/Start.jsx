import React from "react";
import "../index.css";


function Start({ setManual }) {
    return (
        <div>
            <p className="pp">Set cordinates manually or just pick the location</p>
            <div className="start">
                <button onClick={() => setManual('true')}>Set manually</button>
                <button onClick={() => setManual('false')}>Pick location</button>   
            </div>

        </div>

    )
}





export default Start;