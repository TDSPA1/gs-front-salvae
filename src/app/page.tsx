"use client";

import React from "react";
import IncidentForm from "../components/IncidentForm";
import dynamic from "next/dynamic";
import { FaHandsHelping } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';


const EvacuationRoute = dynamic(() => import("../components/MapClient"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 bg-[url('/fundo.jpg')] bg-cover bg-center">
      <div className="text-center mb-10 bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-blue-200 animate-fade-in">
        <div className="flex justify-center mb-4">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaHandsHelping className="text-5xl text-red-600 drop-shadow" />
          </span>
        </div>
        <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow mb-2 tracking-tight">Salvaê</h1>
        <p className="mt-2 text-xl text-blue-900 font-medium">
          Plataforma colaborativa para ajudar a população em situações de emergência.
        </p>
        <p className="mt-2 text-base text-blue-700 opacity-80">
          Notifique incidentes, visualize rotas de evacuação e <strong>fique seguro</strong>!
        </p>
      </div>

      <section className="w-full max-w-2xl mb-8 animate-fade-in-up">
        <EvacuationRoute />
      </section>

      <section className="w-full max-w-2xl animate-fade-in-up delay-200">
        <IncidentForm />
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
        .animate-fade-in-up {
          animation: fade-in 1.2s cubic-bezier(.4,0,.2,1);
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </main>
  );
}
