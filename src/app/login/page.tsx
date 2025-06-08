'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";

type LoginData = {
  email: string;
  senha: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const router = useRouter();
  const [erroLogin, setErroLogin] = useState('');
  const [loading, setLoading] = useState(true); // controla se está criando o usuário

  useEffect(() => {
    const usuariosStr = localStorage.getItem("usuarios");
    if (!usuariosStr) {
      const usuarios = [
        {
          nome: "Usuário Teste",
          email: "teste@exemplo.com",
          telefone: "(11) 99999-9999",
          cpf: "123.456.789-09",
          senha: "123456",
          confirmaSenha: "123456"
        }
      ];
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log("Usuário teste criado:", usuarios[0]);
    }
    setLoading(false);
  }, []);

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    const usuariosStr = localStorage.getItem("usuarios");
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    const usuarioEncontrado = usuarios.find(
      (u: { email: string; senha: string }) =>
        u.email === data.email.trim() && u.senha === data.senha
    );

    if (usuarioEncontrado) {
      setErroLogin('');
      alert("Login realizado com sucesso!");
      router.push("/");
    } else {
      setErroLogin("Email ou senha inválidos.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-blue-700 text-xl font-semibold">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto p-6 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 p-8 w-full">
        <div className="flex items-center justify-center mb-6">
          <span className="bg-blue-100 rounded-full p-4 shadow">
            <FaSignInAlt className="text-4xl text-red-600 drop-shadow" />
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center tracking-tight">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-blue-800">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Digite um email válido"
                }
              })}
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email@exemplo.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
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
                  message: "A senha deve ter pelo menos 6 caracteres"
                }
              })}
              className="w-full mt-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Digite sua senha"
            />
            {errors.senha && (
              <p className="text-red-600 text-sm mt-1">{errors.senha.message}</p>
            )}
          </div>

          {erroLogin && (
            <p className="text-red-600 font-semibold text-center">{erroLogin}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-blue-800">
          Não tem uma conta?{" "}
          <Link href="/cadastro" className="font-semibold underline hover:text-blue-900">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </main>
  );
}
