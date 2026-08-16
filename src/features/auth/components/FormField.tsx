import { useState } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  instructionText: string;
  type?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

export function FormField({ id, label, value, onChange, isValid, instructionText, type = "text", inputRef }: FormFieldProps) {
  const [focus, setFocus] = useState(false);

  const showError = focus && value && !isValid;

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block font-display text-sm font-medium text-secondary-600 mb-1.5"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        ref={inputRef}
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        required
        aria-invalid={isValid ? "false" : "true"}
        aria-describedby={`${id}-note`}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`
          w-full bg-transparent font-body text-[15px] text-secondary-700
          border-0 border-b py-1.5 outline-none
          transition-colors duration-150
          placeholder:text-neutral-400
          ${showError
            ? "border-error focus:border-error"
            : "border-neutral-300 focus:border-primary-500"
          }
        `}
      />

      <p
        id={`${id}-note`}
        role="alert"
        className={`
          mt-1 text-xs font-body
          ${showError ? "block text-error" : "hidden"}
        `}
      >
        {instructionText}
      </p>
    </div>
  );
}