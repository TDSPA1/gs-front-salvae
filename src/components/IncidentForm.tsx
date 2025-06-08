"use client";
import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

interface Incident {
  description: string;
  timestamp: string;
}

export default function IncidentForm() {
  const [description, setDescription] = useState("");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const maxChars = 300;

  useEffect(() => {
    const existing = localStorage.getItem("incidents");
    if (existing) {
      setIncidents(JSON.parse(existing));
    }
  }, []);


  const saveIncidents = (newIncidents: Incident[]) => {
    localStorage.setItem("incidents", JSON.stringify(newIncidents));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) return;

    const incident: Incident = {
      description: description.trim(),
      timestamp: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    const newIncidents = [...incidents, incident];
    setIncidents(newIncidents);
    saveIncidents(newIncidents);

    setDescription("");
    showToast("Incidente registrado com sucesso!");
  };

  const handleDelete = (index: number) => {
    const newIncidents = incidents.filter((_, i) => i !== index);
    setIncidents(newIncidents);
    saveIncidents(newIncidents);
    showToast("Incidente removido.");
  };


  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section className="bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-2xl shadow-xl my-8 max-w-2xl mx-auto border border-red-300">
      <div className="flex items-center gap-3 mb-4">
        <FaExclamationTriangle className="text-2xl text-red-700 drop-shadow" />
        <h2 className="text-2xl font-extrabold text-red-800 tracking-tight">
          Notificar Incidente
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-6 border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-lg resize-none text-lg transition"
          rows={5}
          placeholder="Descreva o incidente com detalhes..."
          value={description}
          onChange={(e) =>
            e.target.value.length <= maxChars && setDescription(e.target.value)
          }
          required
        />
        <div className="flex justify-between items-center text-sm text-red-700">
          <span>{maxChars - description.length} caracteres restantes</span>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow transition-all"
          >
            Enviar Notificação
          </button>
        </div>
      </form>

      {incidents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-red-800 mb-3">
            Incidentes Registrados
          </h3>
          <ul className="space-y-4 max-h-64 overflow-auto">
            {incidents.map((inc, idx) => (
              <li
                key={idx}
                className="bg-red-50 border border-red-300 rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <p className="text-red-900 whitespace-pre-wrap">{inc.description}</p>
                  <time className="block mt-2 text-sm text-red-600">
                    {inc.timestamp}
                  </time>
                </div>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-red-700 hover:text-red-900 ml-4"
                  aria-label="Remover incidente"
                >
                  <FaTrash size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg animate-fadeInOut z-50">
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </section>
  );
}
