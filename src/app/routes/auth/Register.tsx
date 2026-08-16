import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { Button } from "@/components/Button";

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
    <div className="flex w-full h-screen justify-center items-center">
      <RegisterForm onSuccess={() => setSuccess(true)} />
    </div>
  );
}
