import { useRef, useState, useEffect } from "react";
import { FormField } from "./FormField";
import { PasswordField } from "./PasswordField";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
import type { RegisterRequest } from "../types/types";
import { registerUser } from "../api/register";

const userNameRegex = /^(?!\s*$).{3,50}$/;
const fullNameRegex = /^(?!\s*$).{1,100}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumberRegex = /^\d{11}$/;
const passwordRegex = /^(?!\s*$).{8,72}$/;

export default function RegisterForm() {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [contactNumber, setContactNumber] = useState("");
  const [validContactNumber, setValidContactNumber] = useState(false);
  const [contactNumberFocus, setContactNumberFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = userNameRegex.test(userName);
    console.log(result);
    console.log(userName);
    setValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = fullNameRegex.test(fullName);
    console.log(result);
    console.log(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = emailRegex.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = contactNumberRegex.test(contactNumber);
    console.log(result);
    console.log(contactNumber);
    setValidContactNumber(result);
  }, [contactNumber]);

  useEffect(() => {
    const result = passwordRegex.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrorMsg("");
  }, [userName, fullName, email, contactNumber, password]);

  const isFormValid =
    validUserName &&
    validFullName &&
    validEmail &&
    validContactNumber &&
    validPassword;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const isValid =
      userNameRegex.test(userName) &&
      fullNameRegex.test(fullName) &&
      emailRegex.test(email) &&
      contactNumberRegex.test(contactNumber) &&
      passwordRegex.test(password);

    if (!isValid) {
      setErrorMsg("Verifique os dados informados.");
      return;
    }

    const registerRequest: RegisterRequest = {
      userName,
      fullName,
      emailAddress: email,
      contactNumber,
      password,
    };

    try {
      const response = await registerUser(registerRequest);
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (error) {
      setErrorMsg("Erro ao realizar cadastro.");
    }
  };

  return (
    <section className="w-[400px]">
      <p
        ref={errorRef}
        className={errorMsg ? "errorMsg" : "hidden"}
        aria-live="assertive"
      >
        {errorMsg}
      </p>

      <form onSubmit={handleSubmit}>
        <FormField
          id="username"
          label="Nome de usuário"
          value={userName}
          onChange={setUserName}
          isValid={validUserName}
          instructionText="Deve ter de 3 a 50 caracteres."
          type="text"
          inputRef={userRef}
        />
        <FormField
          id="fullName"
          label="Nome completo"
          value={fullName}
          onChange={setFullName}
          isValid={validFullName}
          instructionText="Máximo de 100 caracteres."
          type="text"
        />
        <FormField
          id="email"
          label="E-mail"
          value={email}
          onChange={setEmail}
          isValid={validEmail}
          instructionText="Formato de e-mail inválido."
          type="email"
        />
        <FormField
          id="contactNumber"
          label="Número de celular"
          value={contactNumber}
          onChange={setContactNumber}
          isValid={validContactNumber}
          instructionText="Deve ter exatamente 11 dígitos."
          type="tel"
        />
        <PasswordField
          id="password"
          label="Senha"
          value={password}
          onChange={setPassword}
          isValid={validPassword}
          instructionText="Deve ter de 8 a 72 caracteres."
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
