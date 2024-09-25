import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import { Rings } from 'react-loader-spinner';

const KEY='6Q3q6svYVFcNkgd4wBou1z6cAPkSxZJLBffwDhby';


function NasaImage({ latitude, longitude, datePicked = "2024-07-07", loaded, setLoadingDone}) {
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    

    const handleImage = async() => {
        setLoadingDone(false);
        setError('');
        setImage('');
        try {
            let response = 
            await axios.get
            (`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${datePicked}&dim=0.1&api_key=${KEY}`, {
                responseType:'blob'
            });
            
            const createUrl = URL.createObjectURL(response.data);
            setImage(createUrl);
            setLoadingDone(true);

        } catch(err) {
            setError('Loading image from satelite failed, just like your life! Try another one.')
        } 
    }

    

    return (
        <div>
            <button className='generate-sat'onClick={handleImage}>Generate Satelite Image</button>
            {loaded && !error ? (
                <div className="satelite-container">
                    <img className='nasa-image' src={image} alt="dog"></img>
                </div>
            ) : error ? <div className="err">
                <span>{error}</span>
            </div> : (
                loaded === false ? (
                    <Rings height='80' width='80' color="white" ariaLabel="loading"/>
                ) : null
            )}
        </div>
    )
}


        


export default NasaImage;