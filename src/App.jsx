import { useState, useEffect } from 'react';
import InitialParameters from './components/InitialParameters';
import Generate from './components/Generate';
import Start from './components/Start';
import PickLocation from './components/PickLocation';
import NasaImage from './components/NasaImage';
import './App.css'

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [datePicked, setDatePicked] = useState(undefined);
  const [manualPicked, setManual]  = useState(null);
  const [sateliteReady, setSateliteReady] = useState(false);
  const [loaded, setLoadingDone] = useState(null);

  const checkInserted = (latitude === null && longitude === null);

  const handleRefresh = () => {
    setLatitude(null);
    setLongitude(null);
    setManual(null);
    setDatePicked(undefined);
    setLoadingDone(null);
  }

  const handleRandomLocation = () => {
    const randomLatitude = Math.random() * 180 - 90;
    const randomLongitude = Math.random() * 360 - 180;
    setLatitude(randomLatitude.toFixed(5));
    setLongitude(randomLongitude.toFixed(5));
}

  useEffect(() => {
    if ((manualPicked === 'true' || manualPicked === 'false') && !checkInserted) {
      setSateliteReady(true);
    } else {
      setSateliteReady(false);
    }
  }, [latitude, longitude, datePicked, manualPicked])


  return (
    <div className='App'>
      {manualPicked === null ? (<Start setManual={setManual} />) : 
      manualPicked === 'true' ? (
        checkInserted ? (
          <InitialParameters 
          setLatitude={setLatitude} 
          setLongitude={setLongitude} 
          setDatePicked={setDatePicked}
          handleRandomLocation={handleRandomLocation} />
        ) : (
          <Generate latitude={latitude} longitude={longitude} loaded={loaded}/>
        )
      ) : (
        manualPicked === 'false' ? (
          checkInserted ? (
            <PickLocation setLatitude={setLatitude} 
            setLongitude={setLongitude}
            handleRandomLocation={handleRandomLocation} />
          ) : <Generate latitude={latitude} longitude={longitude} loaded={loaded} />
        ) :  ('')
      )}
      
      {sateliteReady ? (<NasaImage 
      latitude={latitude}
      longitude={longitude}
      datePicked={datePicked}
      loaded={loaded} 
      setLoadingDone={setLoadingDone}/>) : null}
      <button className='refresh' onClick={handleRefresh}>Refresh</button>
    </div>
  )
}


export default App
