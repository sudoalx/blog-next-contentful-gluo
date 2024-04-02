import Image from "next/image";
import { Logo } from "./branding/Logo";

export const Footer = () => {
  return (
    <div className="text-center p-4 bg-gray-100">
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      Copyright &copy; 2024 - Gluo Developers
    </div>
  );
};
