'use client';
import { FaMapSigns, FaBell, FaHandsHelping, FaClipboardList, FaShieldAlt, FaPhoneAlt, FaLightbulb, FaQuestionCircle } from "react-icons/fa";

export default function InstrucoesPage() {
  const instrucoes = [
    {
      icon: <FaBell className="text-red-500" />,
      titulo: "Como reportar um incidente",
      descricao:
        "Acesse a seção de notificação e preencha o formulário com as informações da emergência, como tipo de incidente e localização."
    },
    {
      icon: <FaMapSigns className="text-green-600" />,
      titulo: "Como seguir uma rota de evacuação",
      descricao:
        "Acesse o mapa de evacuação, clique em sua localização e siga a rota segura mais próxima indicada pelo sistema."
    },
    {
      icon: <FaHandsHelping className="text-yellow-500" />,
      titulo: "Como agir em caso de emergência",
      descricao:
        "Mantenha a calma, siga as instruções da Defesa Civil, evite elevadores e ajude quem estiver por perto. Utilize o Salvaê para se orientar."
    },
    {
      icon: <FaClipboardList className="text-blue-600" />,
      titulo: "Prepare um kit de emergência",
      descricao:
        "Inclua água, alimentos não perecíveis, lanternas, pilhas, documentos pessoais, medicamentos e itens de higiene."
    },
    {
      icon: <FaShieldAlt className="text-purple-600" />,
      titulo: "Mantenha-se informado",
      descricao:
        "Receba alertas das autoridades locais pelo site, rádio ou aplicativos oficiais para saber quando é necessário evacuar."
    },
    {
      icon: <FaPhoneAlt className="text-pink-500" />,
      titulo: "Contatos de emergência",
      descricao:
        "Em caso de emergência, entre em contato com a Defesa Civil ou bombeiros pelo número 193."
    },
    {
      icon: <FaLightbulb className="text-orange-500" />,
      titulo: "Colabore com a comunidade",
      descricao:
        "Voluntários podem ajudar na organização e na comunicação durante situações de emergência. Cadastre-se para participar."
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
          Instruções de Emergência
        </h1>
        <div className="space-y-4">
          {instrucoes.map((item, index) => (
            <div
              key={index}
              className="border border-blue-100 bg-white/90 p-5 rounded-xl shadow transition hover:shadow-lg hover:bg-blue-50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h2 className="font-semibold text-lg text-blue-800 flex items-center gap-2">
                {item.icon} {item.titulo}
              </h2>
              <p className="text-blue-900 mt-2">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </main>
  );
}
