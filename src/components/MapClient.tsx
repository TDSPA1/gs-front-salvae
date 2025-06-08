"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkedAlt } from "react-icons/fa";
import L from "leaflet";

const defaultCenter: [number, number] = [-23.55052, -46.633308];

function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

export default function MapClient() {
  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [routeSteps, setRouteSteps] = useState<string[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const apiKey = "5b3ce3597851110001cf6248327a0561a8034e25b1cda0dc922566b4";

  const instructionTranslator = (text: string): string => {
    let translated = text;

    const replacements: [RegExp, string][] = [
      [/Head (north|south|east|west|northeast|northwest|southeast|southwest) on (.+)/i, "Siga $1 na $2"],
      [/Continue straight/i, "Continue em frente"],
      [/Turn sharp right/i, "Vire acentuadamente à direita"],
      [/Turn sharp left/i, "Vire acentuadamente à esquerda"],
      [/Turn right/i, "Vire à direita"],
      [/Turn left/i, "Vire à esquerda"],
      [/Slight right/i, "Vire levemente à direita"],
      [/Slight left/i, "Vire levemente à esquerda"],
      [/Keep right/i, "Mantenha-se à direita"],
      [/Keep left/i, "Mantenha-se à esquerda"],
      [/Enter the roundabout and take the (\d+)(st|nd|rd|th) exit on (.+)/i, "Entre na rotatória e pegue a $1ª saída na $3"],
      [/Enter the roundabout/i, "Entre na rotatória"],
      [/Exit the roundabout/i, "Saia da rotatória"],
      [/Take the (\d+)(st|nd|rd|th) exit/i, "Pegue a $1ª saída"],
      [/Take the ramp/i, "Pegue a rampa de acesso"],
      [/You have arrived at your destination/i, "Você chegou ao seu destino"],
      [/Stay on (.+)/i, "Permaneça na $1"],
      [/on (Rua|Avenida|Travessa|Praça|Alameda|Rodovia) ([\w\s]+)/i, "na $1 $2"],
    ];

    for (const [regex, replacement] of replacements) {
      translated = translated.replace(regex, replacement);
    }


    translated = translated.replace(/\bon (Rua|Avenida|Travessa|Praça|Alameda|Rodovia) ([\w\s]+)/gi, "na $1 $2");

    return translated;
  };

  async function geocode(address: string): Promise<[number, number] | null> {
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}&size=1`
      );
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
        return [lat, lng];
      }
      return null;
    } catch (error) {
      console.error("Erro na geocodificação:", error);
      return null;
    }
  }

  const handleCalculateRoute = async () => {
    if (!originAddress || !destinationAddress) {
      alert("Por favor, preencha origem e destino.");
      return;
    }

    const originCoords = await geocode(originAddress);
    const destinationCoords = await geocode(destinationAddress);

    if (!originCoords || !destinationCoords) {
      alert("Endereços inválidos. Tente novamente.");
      return;
    }

    setOrigin(originCoords);
    setDestination(destinationCoords);

    try {
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originCoords[1]},${originCoords[0]}&end=${destinationCoords[1]},${destinationCoords[0]}`
      );

      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      setRouteCoords(coordinates);

      const segment = data.features[0].properties.segments[0];
      setDistance(segment.distance);
      setDuration(segment.duration);

      const steps = segment.steps.map((step: any) => {
        const translated = instructionTranslator(step.instruction);
        const distanceKm = (step.distance / 1000).toFixed(1);
        return `${translated} — ${distanceKm} km`;
      });

      setRouteSteps(steps);
    } catch (error) {
      console.error("Erro ao calcular rota:", error);
      alert("Erro ao traçar rota.");
    }
  };

  const handleClearRoute = () => {
    setOriginAddress("");
    setDestinationAddress("");
    setOrigin(null);
    setDestination(null);
    setRouteCoords([]);
    setRouteSteps([]);
    setDistance(0);
    setDuration(0);
  };

  const formatCoords = (coords: [number, number] | null) =>
    coords ? `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}` : "-";

  const formatDuration = (totalSeconds: number) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = Math.round(totalSeconds % 60);
    return `${min} min ${sec} seg`;
  };

  return (
    <section className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-xl my-8 max-w-3xl mx-auto border border-blue-300">
      <div className="flex items-center gap-3 mb-4">
        <FaMapMarkedAlt className="text-3xl text-red-600 drop-shadow" />
        <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight">Rota de Evacuação</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Origem (ex: Avenida Paulista, Sao Paulo)"
          className="w-full p-2 rounded border border-blue-300"
          value={originAddress}
          onChange={(e) => setOriginAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destino (ex: Rua brasil, Sao Paulo)"
          className="w-full p-2 rounded border border-blue-300"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
      </div>

      <div className="flex gap-4 justify-end mb-4">
        <button
          onClick={handleCalculateRoute}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow transition-all"
        >
          Buscar rota
        </button>
        <button
          onClick={handleClearRoute}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full shadow transition-all"
        >
          Limpar
        </button>
      </div>

      <div className="w-full h-120 mb-6 rounded-xl overflow-hidden shadow-inner border border-blue-200">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ width: "100%", height: "700px", borderRadius: "12px" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {origin && (
            <Marker
              position={origin}
              icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            />
          )}
          {destination && (
            <Marker
              position={destination}
              icon={L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            />
          )}
          {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
          {origin && <ChangeMapView coords={origin} />}
        </MapContainer>
      </div>

      {routeSteps.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded shadow border border-blue-200 text-blue-900">
          <h3 className="font-semibold text-lg mb-3">Instruções de Navegação</h3>
          <p className="mb-2">
            <strong>Duração estimada:</strong> {formatDuration(duration)}<br />
            <strong>Distância total:</strong> {(distance / 1000).toFixed(1)} km
          </p>
          <ol className="list-decimal list-inside space-y-1 max-h-48 overflow-y-auto mb-4">
            {routeSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <p className="text-sm text-gray-600">
            <strong>Coordenadas da origem:</strong> {formatCoords(origin)}<br />
            <strong>Coordenadas do destino:</strong> {formatCoords(destination)}
          </p>
        </div>
      )}
    </section>
  );
}
