'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
  confirmaSenha: string;
};

function validarCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export default function CadastroPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const senha = watch("senha");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const usuariosStr = localStorage.getItem("usuarios");
    const usuarios: FormData[] = usuariosStr ? JSON.parse(usuariosStr) : [];

    if (usuarios.some((u) => u.email === data.email)) {
      alert("Este email já está cadastrado!");
      return;
    }

    if (usuarios.some((u) => u.cpf === data.cpf)) {
      alert("Este CPF já está cadastrado!");
      return;
    }

    usuarios.push(data);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    reset();
  };

  return (
    <main className="max-w-xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 p-8 w-full">
        <div className="flex items-center justify-center mb-6">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaUserPlus className="text-4xl text-red-600 drop-shadow" />
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          Cadastro de Usuário
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
          <div>
            <label className="block font-semibold text-blue-800">Nome</label>
            <input
              {...register("nome", { required: "O nome é obrigatório" })}
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Seu nome completo"
            />
            {errors.nome && (
              <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>
            )}
          </div>


          <div>
            <label className="block font-semibold text-blue-800">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Digite um email válido",
                },
              })}
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email@exemplo.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>


          <div>
            <label className="block font-semibold text-blue-800">Telefone</label>
            <input
              type="tel"
              {...register("telefone", {
                required: "O telefone é obrigatório",
                pattern: {
                  value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                  message: "Informe um telefone válido",
                },
              })}
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="(99) 99999-9999"
            />
            {errors.telefone && (
              <p className="text-red-600 text-sm mt-1">{errors.telefone.message}</p>
            )}
          </div>

 
          <div>
            <label className="block font-semibold text-blue-800">CPF</label>
            <input
              {...register("cpf", {
                required: "O CPF é obrigatório",
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/,
                  message: "Informe um CPF válido (ex: 000.000.000-00 ou somente números)",
                },
                validate: (value) => validarCPF(value) || "CPF inválido",
              })}
              placeholder="000.000.000-00"
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.cpf && (
              <p className="text-red-600 text-sm mt-1">{errors.cpf.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-blue-800">Senha</label>
            <input
              type="password"
              {...register("senha", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Digite sua senha"
            />
            {errors.senha && (
              <p className="text-red-600 text-sm mt-1">{errors.senha.message}</p>
            )}
          </div>

          
          <div>
            <label className="block font-semibold text-blue-800">Confirma Senha</label>
            <input
              type="password"
              {...register("confirmaSenha", {
                required: "Confirme a senha",
                validate: (value) =>
                  value === senha || "As senhas não coincidem",
              })}
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirme sua senha"
            />
            {errors.confirmaSenha && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmaSenha.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow"
          >
            Cadastrar
          </button>

          <p className="mt-4 text-center text-blue-700">
            Já tem uma conta?{" "}
            <Link href="/login" className="underline font-semibold hover:text-blue-900">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
