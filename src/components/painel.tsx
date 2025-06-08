'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTempo, getPrevisao } from '../api/tempo';
import { FaCloudSun, FaSearchLocation } from "react-icons/fa";

interface DadosTempo {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon?: string;
  }[];
}

interface PrevisaoDia {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

const PainelTempo = () => {
  const [cidade, setCidade] = useState('');
  const [dados, setDados] = useState<DadosTempo | null>(null);
  const [previsao, setPrevisao] = useState<PrevisaoDia[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [unidade, setUnidade] = useState<'C' | 'F'>('C');

  const buscarPrevisao = async (cidade: string) => {
    const resultado = await getPrevisao(cidade);
    if (resultado && resultado.list) {
      const porDia = resultado.list.filter((item: PrevisaoDia) => item.dt_txt.includes('12:00:00'));
      setPrevisao(porDia);
    } else {
      setPrevisao([]);
    }
  };

  const buscarTempo = React.useCallback(async () => {
    setCarregando(true);
    setErro('');
    const resultado = await getTempo(cidade);
    if (resultado) {
      setDados(resultado);
      await buscarPrevisao(cidade);
    } else {
      setErro('Não foi possível obter o tempo.');
      setDados(null);
      setPrevisao([]);
    }
    setCarregando(false);
  }, [cidade]);

  useEffect(() => {
    if (!cidade || !dados) return;
    const interval = setInterval(() => {
      buscarTempo();
    }, 60000);
    return () => clearInterval(interval);
  }, [cidade, dados, buscarTempo]);

  const celsiusParaFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

  return (
    <div
      className="max-w-xl mx-auto my-8 p-8 rounded-3xl shadow-2xl border border-blue-400 bg-white/70 backdrop-blur-md"
      style={{
        color: "#1e293b",
        boxShadow: "0 8px 32px rgba(30,64,175,0.10)",
      }}
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <FaCloudSun className="text-3xl text-red-600 drop-shadow" />
        <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight">Painel do Tempo</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={cidade}
          onChange={e => setCidade(e.target.value)}
          placeholder="Digite a cidade"
          className="flex-1 p-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg transition"
        />
        <button
          onClick={buscarTempo}
          disabled={carregando || !cidade}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-white transition-all shadow
            ${carregando || !cidade
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800 cursor-pointer"
            }`}
        >
          <FaSearchLocation />
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      {dados && (
        <button
          onClick={() => setUnidade(unidade === 'C' ? 'F' : 'C')}
          className="w-full mb-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-bold shadow hover:bg-blue-200 transition"
        >
          Mostrar em °{unidade === 'C' ? 'F' : 'C'}
        </button>
      )}
      {erro && <p className="text-red-600 text-center font-semibold mt-2">{erro}</p>}
      {dados && (
        <div className="mt-6 bg-white/90 rounded-xl p-6 shadow text-center">
          <h3 className="text-xl font-bold text-blue-700 mb-2">{dados.name}</h3>
          <p className="text-4xl font-extrabold mb-1">
            {unidade === 'C'
              ? `${dados.main.temp}°C`
              : `${celsiusParaFahrenheit(dados.main.temp).toFixed(1)}°F`}
          </p>
          <p className="capitalize text-blue-800 mb-1">{dados.weather[0].description}</p>
          <p className="text-blue-500">Umidade: <b>{dados.main.humidity}%</b></p>
        </div>
      )}
      {previsao.length > 0 && (
        <div className="mt-8">
          <h4 className="text-blue-700 font-bold mb-3">Próximos dias</h4>
          <div className="flex gap-4 justify-center flex-wrap">
            {previsao.map((dia, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 min-w-[90px] text-center shadow border border-blue-100">
                <div className="text-blue-700 font-semibold text-sm mb-1">
                  {new Date(dia.dt_txt).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                </div>
                <Image
                  src={`https://openweathermap.org/img/wn/${dia.weather[0].icon}.png`}
                  alt={dia.weather[0].description}
                  width={50}
                  height={50}
                  style={{ margin: '0 auto' }}
                  unoptimized
                />
                <div className="font-bold text-blue-800">
                  {unidade === 'C'
                    ? `${Math.round(dia.main.temp)}°C`
                    : `${((dia.main.temp * 9) / 5 + 32).toFixed(1)}°F`}
                </div>
                <div className="text-xs text-blue-600">{dia.weather[0].description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelTempo;