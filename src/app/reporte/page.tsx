'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBullhorn } from "react-icons/fa";

type FormData = {
  tipo: string;
  localizacao: string;
  descricao: string;
  contato: string;
};

export default function Report() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: FormData) => {
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const response = await fetch("https://gsjava-production-0e6b.up.railway.app/incidente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar o incidente");
      }

      setSuccessMsg("Incidente reportado com sucesso!");
      reset();
    } catch (error) {
      setErrorMsg((error as Error).message || "Erro inesperado");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-300 p-8">
        <div className="flex items-center justify-center mb-6">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaBullhorn className="text-4xl text-red-600 drop-shadow" />
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Reportar Incidente</h1>

        {successMsg && (
          <div className="mb-4 p-4 bg-green-100 text-blue-700 rounded">{successMsg}</div>
        )}

        {errorMsg && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="tipo" className="block font-semibold text-blue-700 mb-1">Tipo do Incidente</label>
            <select
              id="tipo"
              {...register("tipo", { required: "Selecione o tipo do incidente" })}
              className={`w-full rounded border px-3 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.tipo ? "border-red-500" : "border-blue-300"}`}
              defaultValue=""
            >
              <option value="" disabled>Selecione...</option>
              <option value="Incêndio">Incêndio</option>
              <option value="Alagamento">Alagamento</option>
              <option value="Desabamento">Desabamento</option>
              <option value="Outro">Outro</option>
            </select>
            {errors.tipo && <p className="text-red-600 mt-1 text-sm">{errors.tipo.message}</p>}
          </div>

          <div>
            <label htmlFor="localizacao" className="block font-semibold text-blue-700 mb-1">Localização</label>
            <input
              type="text"
              id="localizacao"
              placeholder="Ex: Rua das Flores, 123"
              {...register("localizacao", { required: "Informe a localização" })}
              className={`w-full rounded border px-3 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.localizacao ? "border-red-500" : "border-blue-300"}`}
            />
            {errors.localizacao && <p className="text-red-600 mt-1 text-sm">{errors.localizacao.message}</p>}
          </div>

          <div>
            <label htmlFor="descricao" className="block font-semibold text-blue-700 mb-1">Descrição</label>
            <textarea
              id="descricao"
              placeholder="Descreva o incidente com detalhes"
              rows={4}
              {...register("descricao", { required: "Informe a descrição" })}
              className={`w-full rounded border px-3 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.descricao ? "border-red-500" : "border-blue-300"}`}
            />
            {errors.descricao && <p className="text-red-600 mt-1 text-sm">{errors.descricao.message}</p>}
          </div>

          <div>
            <label htmlFor="contato" className="block font-semibold text-blue-700 mb-1">Contato (email ou telefone)</label>
            <input
              type="text"
              id="contato"
              placeholder="Ex: seuemail@exemplo.com ou (99) 99999-9999"
              {...register("contato", {
                required: "Informe um contato",
                validate: (value) => {
                  const emailRegex = /^\S+@\S+\.\S+$/;
                  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
                  if (emailRegex.test(value) || phoneRegex.test(value)) {
                    return true;
                  }
                  return "Informe um email ou telefone válido";
                }
              })}
              className={`w-full rounded border px-3 py-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contato ? "border-red-500" : "border-blue-300"}`}
            />
            {errors.contato && <p className="text-red-600 mt-1 text-sm">{errors.contato.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded shadow transition disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>
      </div>
    </main>
  );
}
