import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Generate({ latitude, longitude, loaded }) {
    const location = [latitude, longitude];


    return (
        <MapContainer
            center={location} 
            zoom={10} 
            className={'map-small'}>
            <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
            <Marker position={location}/>
        </MapContainer>
    )
}

export default Generate;