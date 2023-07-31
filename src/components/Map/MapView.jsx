import  "./MapView.css"
import React from "react";
import { MapContainer, TileLayer,Marker,Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link ,useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "./Icon";


export function MapView() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  const [error,setError] = useState([])
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      searchTerm
    )}`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setSearchLocation({ lat, lon }); // Almacenar la ubicación encontrada
          console.log("El lugar es "+ geocodeUrl)
        } else {
          setSearchLocation(null);
          alert("Error al obtener la ubicacion"+error)
          window.location.reload()
        }
      })
      
  };
  return (
    <div className="body">
    <div className="Map">
      <MapContainer center={[4.62107, -74.14869]} zoom={14}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {searchLocation && (
          <Marker position={[searchLocation.lat, searchLocation.lon]} icon={Icon}>
            <Popup>Ubicación encontrada</Popup>
          </Marker>
        )}
      </MapContainer>
      <div className="innerBox">
        <input
          type="search"
          className="Input"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearchInput}
        />
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
        <span className="icon" onClick={handleSearchSubmit}>
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="Link">
      <Link to={"/places"}>
      <img src="https://cdn-icons-png.flaticon.com/128/5662/5662990.png" alt="lugares"/>
      </Link>
      <h3>Guardado</h3>
      </div>
    </div>
    </div>
  );
}
