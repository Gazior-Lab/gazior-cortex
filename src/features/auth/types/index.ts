import type { JSX } from "react";

export interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  suffix?: JSX.Element;
}