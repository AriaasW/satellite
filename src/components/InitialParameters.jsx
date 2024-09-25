import React from "react";
import InputMask from 'react-input-mask';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

function InitialParameters({ setLatitude, setLongitude, setDatePicked, handleRandomLocation}) {
    const [latitudeC, setLatitudeC] = useState(null);
    const [longitudeC, setLongitudeC] = useState(null);
    const [dateOf, setDateOf] = useState(null);
    
    const handleSubmit = () => {
        setLatitude(latitudeC);
        setLongitude(longitudeC);
        setDatePicked(dateOf);
    }

    return (
      <div className="initial-parameters">
        <div className="left-column">
          <Latitude setLatitudeC={setLatitudeC}/>
          <Longitude setLongitudeC={setLongitudeC}/>
          <button onClick={handleRandomLocation}>Generate Random Location</button>
        </div>
        <div className="right-column">
          <Datepick setDateOf={setDateOf}/>
          {latitudeC !== null && longitudeC !== null && dateOf !== null ? 
        (<button className="submit-button" onClick={handleSubmit}>Submit Parameters</button>) : ('')}
        </div>


      </div>
    )
  }


  function Datepick({ setDateOf }) {
    const minDate = new Date(2020,1,1);
    const maxDate = new Date(2024,8,15);

    const handleDate = (selectedDate) => {
        const formated = format(selectedDate, 'yyyy-MM-dd');
        setDateOf(formated);
      } 
    return (
      <div className="day-picker-wrapper">
      <span>Select a date</span>
      <DayPicker 
        mode='single' 
        onSelect={handleDate} 
        disabled={{ before: minDate, after: maxDate }} 
      />
  </div>
    )
  }


  function Latitude({ setLatitudeC }) {
    const [isPositiveLatitude, setNumberLatitude] = useState('y');
    const [errorLat, setErrorLat] = useState('');

    const handleLatitude = (e) => {
        const value = e.target.value;
        const floatValue = parseFloat(value);
        
        if (isNaN(floatValue)) {
            setErrorLat("Please enter a valid latitude")
            setLatitudeC(null)
        } else if (floatValue > 90 || floatValue < -90) {
            setErrorLat("Please enter a valid latitude");
            setLatitudeC(null);
        } else {
            setErrorLat('');
            setLatitudeC(floatValue);
        }
        }

    const handleLatitudeChange = (e) => {
        setNumberLatitude(e.target.value);
        setLatitudeC((prev) => -(prev));
    }       

    return (
        <div>
        <span>Latitude</span>
        <select onChange={handleLatitudeChange}>
            <option value='y'>Positive</option>
            <option value='n'>Negative</option>
        </select>
        <InputMask 
        maskChar={null}
        mask={isPositiveLatitude === 'y' ? '99.99999' : '-99.99999'}
        onChange={handleLatitude}
        placeholder="Enter latitude"/>
        {errorLat ? (<p className="error-message">{errorLat}</p>) : ('')}
        </div>
    )
  }

  function Longitude({ setLongitudeC }) {
    const [isPositiveLongitude, setNumberLongitude] = useState(true);
    const [errorLon, setErrorLon] = useState(''); 

    const handleLongitude = (e) => {
        const value = e.target.value;
        const floatValue = parseFloat(value)
        
        floatValue >= -180 && floatValue <= 180 ? 
        (setErrorLon(''), setLongitudeC(floatValue)) : 
        (setErrorLon('Please enter a valid longitude'), setLongitudeC(null));
        }
    
  
      const handleLongitudeChange = (e) => {
          setNumberLongitude(!isPositiveLongitude);
          setLongitudeC((prev) => -(prev));
      }


    return (
        <div>
            <span>Longitude</span>
            <select onChange={handleLongitudeChange}>
                <option>Positive</option>
                <option>Negative</option>
            </select>
            <InputMask
            maskChar={null}
            mask={isPositiveLongitude ? '999.99999' : '-999.99999'}
            onChange={handleLongitude} 
            placeholder="Enter longitude"
            />
            {errorLon ? (<p className="error-message">{errorLon}</p>) : ('')}
        </div>
    )
  }




  export default InitialParameters;