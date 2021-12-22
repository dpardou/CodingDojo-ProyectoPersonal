import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import AccessibleIcon from '@material-ui/icons/Accessible';
import "./app.css";
import axios from 'axios';
import Register from "./components/Register";
import Login from "./components/Login";

function App() {

  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [parks, setParks] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [calle, setCalle] = useState(null);
  const [numero, setNumero] = useState(null);
  const [comuna, setComuna] = useState(0);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: -33.43682554306975,
    longitude: -70.63444543070005,
    zoom: 14
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPark = {
      username: currentUsername,
      calle,
      numero,
      comuna,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("http://localhost:8000/api/parkingLots", newPark);
      setParks([...parks, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getParks = async () => {
      try {
        const allParks = await axios.get("http://localhost:8000/api/parkingLots");
        console.log(allParks.data.data)
        setParks(allParks.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getParks();
  }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
      {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onDblClick={currentUsername && handleAddClick}
      >
        {parks?.map((p) =>(
          <>
          <Marker 
            latitude={p.lat} 
            //latitude={-33.43682554306975}
            longitude={p.long} 
            //longitude={-70.63444543070005}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <AccessibleIcon 
              style={{  
                fontSize: viewport.zoom * 3, 
                color:
                  currentUsername === p.username ? "tomato" : "slateblue",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="right" 
            >
              <div className="card">
                <h4>miEspacioApp</h4>
                <label>Dirección</label>
                <p className="direc">{p.calle}</p>
                <p className="direc">{p.numero}</p>
                <p className="direc">{p.comuna}</p>
                <label>Registrado por</label>
                <span className="username"> <b>{p.userName}</b></span>
              </div>
            </Popup>
          )}
        </>
        ))}
        {newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <AccessibleIcon 
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="right"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Calle</label>
                  <input
                    placeholder="Ingrese el Nombre de la Calle en la que se encuentra"
                    autoFocus
                    onChange={(e) => setCalle(e.target.value)}
                  />
                  <label>Numero</label>
                  <input
                    placeholder="Ingrese la numeración frente a la que se encuentra"
                    autoFocus
                    onChange={(e) => setNumero(e.target.value)}
                  />
                  <label>Comuna</label>
                  <input
                    placeholder="Ingrese el Nombre de la Comuna en la que se encuentra"
                    autoFocus
                    onChange={(e) => setComuna(e.target.value)}
                  />
                  
                  <button type="submit" className="submitButton">
                    Agregar Estacionamiento
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Registro
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
