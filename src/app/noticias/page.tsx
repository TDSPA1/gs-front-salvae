"use client";
import React, { useEffect, useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";

type Noticia = {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  source: { name: string };
};

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/noticias");
        const data = await res.json();
        setNoticias(data);
      } catch {
        setNoticias([]);
      }
      setLoading(false);
    };
    fetchNoticias();
  }, []);


  const noticiasUnicas = noticias.filter(
    (noticia, idx, arr) =>
      arr.findIndex(n => n.title === noticia.title) === idx
  );

  return (
    <main className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 p-8 w-full">
        <div className="flex items-center justify-center mb-6">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaRegNewspaper className="text-4xl text-red-600 drop-shadow" />
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          Notícias Recentes
        </h1>
        {loading ? (
          <div className="text-blue-700 text-center py-8">Carregando notícias...</div>
        ) : (
          <div className="space-y-6">
            {noticiasUnicas.map((noticia, idx) => (
              <a
                key={idx}
                href={noticia.url}
                className="block border border-blue-100 bg-white/90 p-5 rounded-xl shadow transition hover:shadow-lg hover:bg-blue-50 animate-fade-in"
                style={{ animationDelay: `${idx * 60}ms` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-lg text-blue-800">{noticia.title}</h2>
                  <span className="text-xs text-blue-500">
                    {new Date(noticia.publishedAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p className="text-blue-900">{noticia.description}</p>
                <div className="text-xs text-blue-400 mt-2">{noticia.source?.name}</div>
              </a>
            ))}
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </main>
  );
}