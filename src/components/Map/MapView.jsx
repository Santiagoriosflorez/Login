import  "./MapView.css"
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link ,useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "./Icon";

export function MapView() {
  // Hook 'useNavigate' para gestionar la navegación en React Router
  const navigate = useNavigate();
  
  // Estados para controlar el término de búsqueda y la ubicación encontrada
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  
  // Estado para manejar errores
  const [error, setError] = useState([])

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el envío del formulario de búsqueda
  const handleSearchSubmit = () => {
    // URL para obtener datos de ubicación usando Nominatim de OpenStreetMap
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      searchTerm
    )}`;

    // Realizar una solicitud para obtener los datos de ubicación
    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Si se encuentran datos, extraer latitud y longitud y almacenar la ubicación encontrada
          const { lat, lon } = data[0];
          setSearchLocation({ lat, lon });
          console.log("El lugar es " + geocodeUrl);
        } else {
          // Si no se encuentran datos, mostrar un mensaje de error, limpiar la ubicación y recargar la página
          setSearchLocation(null);
          alert("Error al obtener la ubicacion" + error);
          window.location.reload();
        }
      })
      .catch((error) => {
        // Manejar errores de red, etc.
        setError(error);
        console.log("Error en la solicitud: ", error);
      });
  };

  return (
    <div className="body">
      <div className="Map">
        {/* MapContainer de react-leaflet para mostrar el mapa */}
        <MapContainer center={[4.62107, -74.14869]} zoom={14}>
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Si se encuentra una ubicación, mostrar un marcador en el mapa */}
          {searchLocation && (
            <Marker position={[searchLocation.lat, searchLocation.lon]} icon={Icon}>
              <Popup>Ubicación encontrada</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Input para ingresar el término de búsqueda */}
        <div className="innerBox">
          <input
            type="search"
            className="Input"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          {/* Ícono de búsqueda con un enlace a la función 'handleSearchSubmit' */}
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
          <span className="icon" onClick={handleSearchSubmit}>
            <i className="fa fa-search"></i>
          </span>
        </div>

        {/* Enlace para redirigir a la página de "places" */}
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
