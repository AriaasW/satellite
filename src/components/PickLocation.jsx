import React from "react";
import { useState } from "react";
import axios from 'axios';

function PickLocation({ setLatitude, setLongitude, handleRandomLocation }) {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');


    const handleLocation = async () => {
        setError('');

        try {
            let response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
            const data = response.data[0];
            setLatitude(data.lat);
            setLongitude(data.lon);
            setCity('');
        } 
        catch (err) {
            setError(`${city} was not found.`);
        }
    }



    return (
        <div>
            <p>Enter the city or random location</p>
            <input 
            type="text"
            placeholder="Enter city.."
            onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleLocation}
            style={{ margin: '10px' }}
            >Submit Location</button>
            {error ? (
                <p>{error}</p>
            ) : null}
            <button onClick={handleRandomLocation}>Pick random location</button>
        </div>
    )
}









export default PickLocation;