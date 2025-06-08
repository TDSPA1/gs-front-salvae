'use client'; 
import { FaQuestionCircle } from "react-icons/fa";

export default function FAQPage() {
  const faqs = [
    {
      question: "Como posso reportar um incidente?",
      answer: "Vá até a seção de notificação no site e preencha o formulário com as informações do incidente."
    },
    {
      question: "O que é uma rota de evacuação?",
      answer: "É um caminho seguro sugerido para sair de uma área em risco. Você pode visualizá-la no mapa da rota de evacuação."
    },
    {
      question: "Quem devo contatar em caso de emergência?",
      answer: "Entre em contato com a Defesa Civil ou os serviços de emergência locais pelo número 193."
    },
    {
      question: "Como posso me preparar para uma evacuação?",
      answer: "Tenha um kit de emergência, mantenha documentos importantes acessíveis e siga as instruções das autoridades."
    },
    {
      question: "O que devo incluir no meu kit de emergência?",
      answer: "Água, alimentos não perecíveis, lanternas, pilhas, documentos pessoais, medicamentos e itens de higiene."
    },
    {
      question: "Como saberei quando evacuar minha área?",
      answer: "Você receberá alertas pelas autoridades locais, rádio, aplicativos ou pelo sistema de alerta do site."
    },
    {
      question: "Posso ver incidentes relatados por outras pessoas?",
      answer: "Sim, você pode visualizar relatórios públicos recentes na seção de incidentes do site."
    },
    {
      question: "O site funciona em celulares?",
      answer: "Sim! A interface é responsiva e funciona bem em smartphones e tablets."
    },
    {
      question: "Como sei se estou seguro após evacuar?",
      answer: "Siga as orientações da Defesa Civil e só retorne ao local após a liberação oficial."
    },
    {
      question: "É possível colaborar com o sistema de evacuação?",
      answer: "Sim. Voluntários podem se registrar para ajudar na organização e nas comunicações de emergência."
    }
  ];

  return (
    <main className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 p-8 w-full">
        <div className="flex items-center justify-center mb-6">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaQuestionCircle className="text-4xl text-red-600 drop-shadow" />
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          Perguntas Frequentes (FAQ)
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-blue-100 bg-white/90 p-5 rounded-xl shadow transition hover:shadow-lg hover:bg-blue-50 animate-fade-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <h2 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
                <FaQuestionCircle className="text-blue-400" /> {faq.question}
              </h2>
              <p className="text-blue-900 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
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