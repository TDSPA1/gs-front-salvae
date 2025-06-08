"use client";
import React from "react";
import PainelTempo from "../../components/painel";
import { FaCloudSunRain } from "react-icons/fa";

export default function MeteorologiaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 p-8 mb-8 max-w-xl w-full text-center">
        <div className="flex justify-center mb-4">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaCloudSunRain className="text-5xl text-red-600 drop-shadow" />
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2 tracking-tight">Meteorologia</h1>
        <p className="text-lg text-blue-900 font-medium">
          Consulte a previsão do tempo e as condições meteorológicas da sua cidade.
        </p>
      </div>
      <PainelTempo />
    </main>
  );
}