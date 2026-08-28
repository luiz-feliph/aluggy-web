import { useState } from "react";
import {Eye, EyeOff} from "lucide-react";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  isValid: boolean;
  instructionText: string;
};

export function PasswordField({ id, label, value, placeholder, onChange, isValid, instructionText }: PasswordFieldProps) {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showError = focus && value && !isValid;

  return (
    <div className="mb-2">
      <label htmlFor={id} className="block font-display text-lg font-bold text-secondary-500 mb-1.5">
        {label}
      </label>

      <div className="flex items-center border-b border-neutral-300 focus-within:border-primary-500">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          maxLength={72}
          autoComplete="new-password"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required
          aria-invalid={isValid ? "false" : "true"}
          aria-describedby={`${id}-note`}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="flex-1 bg-transparent font-body text-base text-secondary-700 border-0 py-1.5 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className="text-primary-500 px-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>

      <p id={`${id}-note`} role="alert" className={`mt-1 text-sm font-body ${showError ? "block text-error" : "invisible"}`}>
        {instructionText}
      </p>
    </div>
  );
}