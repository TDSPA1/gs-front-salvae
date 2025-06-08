"use client";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";

export default function Sobre() {
  const integrantes = [
    {
      nome: "Fábio H S Eduardo",
      rm: "RM560416",
      foto: "/images/fabio.png",
      github: "https://github.com/fabioeduu",
      linkedin: "https://www.linkedin.com/in/fabio-eduardo-0b151a324",
    },
    {
      nome: "Gabriel Wu Castro",
      rm: "RM560210",
      foto: "/images/wu.png",
      github: "https://github.com/Wugabriel",
      linkedin: "https://www.linkedin.com/in/gabriel-wu-castro-4155b2330/",
    },
    {
      nome: "Renato Kenji Sugaki",
      rm: "RM559810",
      foto: "/images/kenji.png",
      github: "https://github.com/renatosgk",
      linkedin: "https://www.linkedin.com/in/renato-kenji-2643982a4",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 p-8 w-full animate-fade-in">
        
        
        <div className="flex items-center justify-center mb-6">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaInfoCircle className="text-4xl text-red-600 drop-shadow" />
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          Sobre o Projeto
        </h1>

        <p className="text-blue-900 leading-relaxed mb-10 text-center">
           <strong>Salvaê</strong> é uma plataforma feita para ajudar você nos momentos em que mais precisa. Com reporte de incidentes, notícias, rotas seguras e previsão do tempo , ela mostra informações e cuidado para proteger vidas em situações de emergência.
        </p>

        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Integrantes do Grupo</h2>
        <ul className="space-y-6">
          {integrantes.map((integrante, index) => (
            <li
              key={index}
              className="flex items-center bg-white/90 border border-blue-100 p-5 rounded-xl shadow hover:shadow-lg hover:bg-blue-50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mr-6 border-2 border-blue-300">
                <Image
                  src={integrante.foto}
                  alt={`Foto de ${integrante.nome}`}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block text-lg font-semibold text-blue-800">{integrante.nome}</span>
                <span className="text-sm text-blue-500">{integrante.rm}</span>
                <div className="flex space-x-4 mt-2">
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.7s ease both;
        }
      `}</style>
    </main>
  );
}
