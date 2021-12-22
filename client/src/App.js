import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import AccessibleIcon from '@material-ui/icons/Accessible';
import RoomIcon from '@material-ui/icons/Room';
import "./app.css";
import axios from 'axios';

function App() {
  const [parks, setParks] = useState([]);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: -33.43682554306975,
    longitude: -70.63444543070005,
    zoom: 14
  });

  useEffect(() => {
    const getParks = async () => {
      try {
        const allParks = await axios.get("/parkingLots");
        setParks(allParks.data);
      } catch (err) {
        console.log(err);
      }
    };
    getParks();
  }, []);

  return (
    <div className="App">
      <ReactMapGL
      
      {...viewport}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        
        {parks.map(p=>(
          <>
          <Marker 
            latitude={p.lat} 
            //latitude={-33.43682554306975}
            longitude={p.long} 
            //longitude={-70.63444543070005}
            offsetLeft={-20} 
            offsetTop={-10}
          >
            <AccessibleIcon style={{  fontSize: viewport.zoom * 3, color:"blue"}}/>
          </Marker>
          <Popup
            latitude={p.lat}
            longitude={p.long}
            closeButton={true}
            closeOnClick={false}
            anchor="right" >
            <div className="card">
              <h4>miEspacioApp</h4>
              <label>Dirección</label>
              <p className="direc">{p.calle}</p>
              <p className="direc">{p.numero}</p>
              <p className="direc">{p.comuna}</p>
              <label>Registrado por</label>
              <span className="username"> <b>{p.userName}</b></span>
              <span className="date">hace 1 hora </span>
            </div>
          </Popup>
        </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
