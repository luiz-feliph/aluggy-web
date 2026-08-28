import { useRef, useState } from "react";
import { useIMask } from "react-imask";

type MaskedFormFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  isValid: boolean;
  instructionText: string;
  mask: string;
};

export function MaskedFormField({id, label, value, placeholder, onChange, isValid, instructionText, mask,}: MaskedFormFieldProps) {
  const [focus, setFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useIMask(
    { mask },
    {
      ref: inputRef,
      defaultValue: value,
      onAccept: (_value, maskRef) => {
        onChange(maskRef.unmaskedValue);
      },
    },
  );

  const showError = focus && value && !isValid;

  return (
    <div className="mb-2">
      <label
        htmlFor={id}
        className="block font-display text-lg font-bold text-secondary-500 mb-1.5"
      >
        {label}
      </label>

      <input
        id={id}
        ref={inputRef}
        autoComplete="off"
        placeholder={placeholder}
        required
        aria-invalid={isValid ? "false" : "true"}
        aria-describedby={`${id}-note`}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`
          w-full bg-transparent font-body text-base text-secondary-700
          border-0 border-b py-1.5 outline-none
          transition-colors duration-150
          placeholder:text-neutral-400
          ${
            showError
              ? "border-error focus:border-error"
              : "border-neutral-300 focus:border-primary-500"
          }
        `}
      />

      <p
        id={`${id}-note`}
        role="alert"
        className={`
          mt-1 text-sm font-body
          ${showError ? "block text-error" : "invisible"}
        `}
      >
        {instructionText}
      </p>
    </div>
  );
}
