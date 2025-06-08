'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaRegNewspaper,
  FaCloudSun,
  FaQuestionCircle,
  FaBookOpen,
  FaBullhorn,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", icon: <FaHome />, label: "Início" },
  { href: "/sobre", icon: <FaInfoCircle />, label: "Sobre" },
  { href: "/noticias", icon: <FaRegNewspaper />, label: "Notícias" },
  { href: "/faq", icon: <FaQuestionCircle />, label: "FAQ" },
  { href: "/meteorologia", icon: <FaCloudSun />, label: "Meteorologia" },
  { href: "/instrucao", icon: <FaBookOpen />, label: "Instrução" },
  { href: "/reporte", icon: <FaBullhorn />, label: "Reportar Incidente" },
  { href: "/cadastro", icon: <FaUserPlus />, label: "Cadastro" },
  { href: "/login", icon: <FaSignInAlt />, label: "Login" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-6 shadow-xl ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
       

        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo Salvaê"
              width={64}
              height={64}
              className="rounded-full bg-white p-1 shadow-md"
            />
            <span className="text-2xl font-bold tracking-tight drop-shadow-sm hover:text-blue-100 transition">
              Salvaê
            </span>
          </Link>

      
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

       
        <nav className={`mt-4 md:mt-0 ${menuOpen ? "block" : "hidden"} md:block w-full`}>
          <ul className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mt-2 md:mt-0">
            {navLinks.map(({ href, icon, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/10 transition duration-300 ease-in-out"
                >
                  {icon}
                  <span className="font-semibold">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
