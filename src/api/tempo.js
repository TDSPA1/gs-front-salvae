'use client';
const apiKey = 'b388d676dfe46b838f79008dc0454b96';

export async function getTempo(cidade) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do tempo');
    }
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPrevisao(cidade) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cidade)}&units=metric&lang=pt_br&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar previsão');
    }
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error(error);
    return null;
  }
}