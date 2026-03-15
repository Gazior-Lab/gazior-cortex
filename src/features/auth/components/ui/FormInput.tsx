import type { JSX } from "react";
import { FormInputProps } from "../../types";


const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  suffix,
}: FormInputProps): JSX.Element => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[0.82rem] font-semibold text-foreground">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3.5 py-2.5 ${suffix ? "pr-10" : "pr-3.5"} rounded-lg border-[1.5px] bg-background text-foreground text-[0.88rem] outline-none box-border font-sans transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted ${error ? "border-destructive" : "border-border"}`}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted cursor-pointer flex">
          {suffix}
        </div>
      )}
    </div>
    {error && (
      <span className="text-[0.75rem] text-destructive font-medium">{error}</span>
    )}
  </div>
);

export default FormInput;
