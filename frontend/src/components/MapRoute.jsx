import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Provide your actual mapbox token here or via env variable
const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xleHhhbXBsZTAwMDAwMDAwMDAwMDAwMCJ9.example";

function MapRoute({ destination }) {
  const [viewState, setViewState] = useState({
    longitude: 73.8567, // Default fallback
    latitude: 18.5204,
    zoom: 11
  });

  // Note: In a production app, you would geocode the 'destination' string 
  // to get actual coordinates, or the AI would provide lat/long in the JSON!
  // For now, this just renders a map to show the UI integration.

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl relative">
      {!MAPBOX_TOKEN.includes("example") ? (
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <Marker longitude={73.8567} latitude={18.5204} color="cyan">
            <div className="text-cyan-400 animate-bounce">
              <FaMapMarkerAlt size={32} />
            </div>
          </Marker>
        </Map>
      ) : (
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
          <FaMapMarkerAlt size={48} className="text-cyan-500 mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">Map Integration Ready</h3>
          <p className="text-slate-400 text-sm">
            To see the live map, add a valid Mapbox token to the MapRoute component.<br/><br/>
            (Currently simulating route for: {destination || "Selected Trip"})
          </p>
        </div>
      )}
    </div>
  );
}

export default MapRoute;
