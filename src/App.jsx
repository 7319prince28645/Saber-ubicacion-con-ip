import Header from "./Components/Header";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function App() {
  const [data, setDataApp] = useState("");
  const [key, setKey] = useState(0);
  const lat = data ? data.location.lat : 51.505;
  const lng = data ? data.location.lng : -0.09;
  useEffect(() => {
    setKey(key + 1);
  }
  , [data]);

  return (
    <>
      <Header setDataApp={setDataApp} />
      <MapContainer
        key={key}
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />
      </MapContainer>
    </>
  );
}
export default App;
