import { useRef, useState, useEffect } from "react";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
import type { RegisterRequest } from "../types/types";
import { registerUser } from "../api/register";
import { useValidatedInput } from "../hooks/useValidatedInput";
import { MaskedFormField } from "./MaskedFormField";

const userNameRegex = /^[a-zA-Z0-9._-]{3,50}$/;
const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const contactNumberRegex = /^[0-9]{11}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\x21-\x7E]{8,72}$/;

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  const validUserName = useValidatedInput(userName, userNameRegex);
  const validEmail = useValidatedInput(email, emailRegex);
  const validContactNumber = useValidatedInput(contactNumber, contactNumberRegex,);
  const validPassword = useValidatedInput(password, passwordRegex);
  const validConfirmPassword = confirmPassword.length > 0 && password === confirmPassword;;

  useEffect(() => {
    setErrorMsg("");
  }, [userName, email, contactNumber, password, confirmPassword]);

  const isFormValid =
    validUserName &&
    validEmail &&
    validContactNumber &&
    validPassword &&
    validConfirmPassword;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const isValid =
      userNameRegex.test(userName) &&
      emailRegex.test(email) &&
      contactNumberRegex.test(contactNumber) &&
      passwordRegex.test(password) &&
      confirmPassword.length > 0 &&
      password === confirmPassword; 

    if (!isValid) {
      setErrorMsg("Verifique os dados informados.");
      return;
    }

    const registerRequest: RegisterRequest = {
      userName,
      emailAddress: email,
      contactNumber,
      password,
    };

    try {
      const response = await registerUser(registerRequest);
      console.log(response.data);
      console.log(JSON.stringify(response));
      onSuccess();
    } catch (error) {
      setErrorMsg("Erro ao realizar cadastro.");
    }
  };

  return (
    <section className="bg-subtle w-full px-5 py-12 rounded-t-4xl max-w-[767px] md:h-full md:rounded-none md:flex md:flex-col md:justify-center lg:px-12 xl:px-16">
      <h1 className="block font-display text-3xl sm:text-5xl font-bold text-primary-500 mb-8 sm:my-12 shrink-0">Cadastro</h1>
      <p
        ref={errorRef}
        className={errorMsg ? "errorMsg" : "hidden"}
        aria-live="assertive"
      >
        {errorMsg}
      </p>

      <form onSubmit={handleSubmit} className="shrink-0">
        <FormField
          id="username"
          label="Nome de usuário"
          value={userName}
          placeholder="seu.usuario_01"
          onChange={setUserName}
          isValid={validUserName}
          instructionText="3-50 caracteres. Apenas letras, números, ., _ ou -"
          type="text"
          inputRef={userRef}
        />

        <FormField
          id="email"
          label="E-mail"
          value={email}
          placeholder="seu@email.com"
          onChange={setEmail}
          isValid={validEmail}
          instructionText="Informe um endereço de e-mail válido."
          type="email"
        />

        <MaskedFormField
          id="contactNumber"
          label="Número de celular"
          value={contactNumber}
          placeholder="(99) 99999-9999"
          onChange={setContactNumber}
          isValid={validContactNumber}
          instructionText="Informe exatamente 11 dígitos."
          mask="(00) 00000-0000"
        />

        <PasswordField
          id="password"
          label="Senha"
          value={password}
          placeholder="Mínimo de 8 caracteres"
          onChange={setPassword}
          isValid={validPassword}
          instructionText="8–72 caracteres. Pelo menos uma letra e um número."
        />

        <PasswordField
          id="confirmPassword"
          label="Confirmar Senha"
          value={confirmPassword}
          placeholder="Repita a senha"
          onChange={setConfirmPassword}
          isValid={validConfirmPassword}
          instructionText="As senhas devem ser iguais."
        />

        <Button
          variant={"primary"}
          size={"lg"}
          className="w-full mb-6"
          disabled={!isFormValid}
        >
          Cadastrar
        </Button>

        <p className="text-center font-display text-lg font-medium text-secondary-500">
          Já tem uma conta?
          <span className="underline text-primary-500 ml-1.5">
            <Link to="/login">Entrar</Link>
          </span>
        </p>
      </form>
    </section>
  );
}
