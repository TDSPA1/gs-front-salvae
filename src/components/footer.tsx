import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-6 mt-5 shadow-inner">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-2">
        <Image src="/logo.png" alt="Logo Salvaê" width={100} height={100} />
        <p className="text-sm md:text-base font-light">
          &copy; {new Date().getFullYear()} Salvaê. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
