import { useRef, useState, useEffect } from "react";
import { FormField } from "../../../components/FormField";
import { PasswordField } from "./PasswordField";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import type { RegisterRequest } from "../types/types";
import { registerUser } from "../api/register";
import { isValidRegex } from "@/utils/isValidRegex";
import { MaskedFormField } from "../../../components/MaskedFormField";
import dotsTopRight from "@/assets/dots-top-right.svg";

const userNameRegex = /^[a-zA-Z0-9._-]{3,50}$/;
const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const contactNumberRegex = /^[0-9]{11}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[\x21-\x7E]{8,72}$/;

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  const validUserName = isValidRegex(userName, userNameRegex);
  const validEmail = isValidRegex(email, emailRegex);
  const validContactNumber = isValidRegex(contactNumber, contactNumberRegex);
  const validPassword = isValidRegex(password, passwordRegex);
  const validConfirmPassword =
    confirmPassword.length > 0 && password === confirmPassword;

  const clearError = () => setErrorMsg("");

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

    setIsSubmitting(true);
    try {
      await registerUser(registerRequest);
      onSuccess();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const { status } = error.response;

        switch (status) {
          case 400:
            setErrorMsg("Verifique os dados informados.");
            break;
          case 409:
            setErrorMsg("Já existe uma conta com esses dados.");
            break;
          default:
            setErrorMsg(
              "Erro interno do servidor. Tente novamente mais tarde.",
            );
        }
      } else {
        setErrorMsg("Não foi possível conectar ao servidor.");
      }
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-subtle w-full px-5 py-12 rounded-t-4xl max-w-[767px] md:h-full md:rounded-none md:flex md:flex-col md:justify-center lg:px-12 xl:px-16">
      <img src={dotsTopRight}  alt="" className="absolute right-5 top-6" />
      <h1 className="block font-display text-3xl sm:text-5xl font-bold text-primary-500 mb-8 sm:my-12 shrink-0">
        Cadastro
      </h1>

      <form onSubmit={handleSubmit} className="shrink-0">
        <FormField
          id="username"
          label="Nome de usuário"
          value={userName}
          placeholder="seu.usuario_01"
          onChange={(v) => {
            setUserName(v);
            clearError();
          }}
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
          onChange={(v) => {
            setEmail(v);
            clearError();
          }}
          isValid={validEmail}
          instructionText="Informe um endereço de e-mail válido."
          type="email"
        />

        <MaskedFormField
          id="contactNumber"
          label="Número de celular"
          value={contactNumber}
          placeholder="(99) 99999-9999"
          onChange={(v) => {
            setContactNumber(v);
            clearError();
          }}
          isValid={validContactNumber}
          instructionText="Informe exatamente 11 dígitos."
          mask="(00) 00000-0000"
        />

        <PasswordField
          id="password"
          label="Senha"
          value={password}
          placeholder="Mínimo de 8 caracteres"
          onChange={(v) => {
            setPassword(v);
            clearError();
          }}
          isValid={validPassword}
          instructionText="8–72 caracteres. Pelo menos uma letra e um número."
        />

        <PasswordField
          id="confirmPassword"
          label="Confirmar Senha"
          value={confirmPassword}
          placeholder="Repita a senha"
          onChange={(v) => {
            setConfirmPassword(v);
            clearError();
          }}
          isValid={validConfirmPassword}
          instructionText="As senhas devem ser iguais."
        />

        <p
          ref={errorRef}
          role="alert"
          aria-live="assertive"
          className={
            errorMsg
              ? "rounded-lg bg-error-bg px-4 py-3 text-sm text-error-dark mb-6"
              : "hidden"
          }
        >
          {errorMsg}
        </p>

        <Button
          variant={"primary"}
          size={"lg"}
          className="w-full mb-6"
          disabled={!isFormValid}
          isLoading={isSubmitting}
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
