import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { Button } from "@/components/Button";
import aluggy from "@/assets/aluggy.svg";
import dotsTopLeft from "@/assets/dots-top-left.svg";


export default function Register() {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="flex w-full h-screen flex-col justify-center items-center gap-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success-bg">
          <CircleCheck size={40} className="text-success" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-secondary-700">
          Cadastro realizado com sucesso!
        </h1>
        <Link to="/login">
          <Button variant={"primary"} size={"lg"}>
            Ir para o login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-screen bg-dark overflow-y-auto md:flex-row md:justify-center md:items-center">
      <div className="bg-dark w-full py-12 shrink-0 md:shrink">
        <img 
          src={dotsTopLeft} 
          className="absolute left-2 top-2"
        />
        <img
          src={aluggy}
          alt="aluggy logo"
          className="w-[200px] mx-auto mt-[20px] md:w-[600px] md:px-12"
        />
      </div>
      <RegisterForm onSuccess={() => setSuccess(true)} />
    </div>
  );
}
