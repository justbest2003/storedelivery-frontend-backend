import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./App.css";
const base_url = import.meta.env.VITE_API_BASE_URL;

function App() {
  const center = [13.838519421642344, 100.02534292638214]; //SE NPRU
   const [stores, setStores] = useState([]);
   const [myLocation, setMyLocation] = useState({lat:"",lng:""})

   useEffect(() => {
     const fetchStores = async () => {
       try {
         const response = await axios.get(base_url+"/api/stores");
         if(response.status === 200){
          setStores(response.data); 
         }
       } catch (error) {
         console.error("Error fetching stores:", error);
       }
     };

     fetchStores();
   }, []);

   const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyLocation({lat:position.coords.latitude,
        lng:position.coords.longitude
      })
    })
   }
  return (
    <>
      <div>
        <h1>Store Delivery Zone Checker</h1>
        <button onClick={handleGetLocation}>Get My Location</button>
        <div className="mapContainer">
          <MapContainer
            center={center}
            zoom={10}
            style={{ height: "75vh", width: "100vw" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

               {/**Display My Location */}
            <Marker position={[myLocation.lat, myLocation.lng]}>
              <Popup>
               My Current Position
              </Popup>
            </Marker>

            {/**{stores.map((store) => (
              <Marker key={store.id} position={[store.lat, store.lng]}>
                <Popup>
                  <strong>{store.name}</strong>
                  <br />
                  {store.address}
                  <br />
                  <a
                    href={store.direction}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions
                  </a>
                </Popup>
              </Marker>
            ))}**/}
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default App;
