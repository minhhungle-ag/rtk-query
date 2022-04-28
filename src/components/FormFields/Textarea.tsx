import { TextareaAutosize, TextField, TextFieldProps } from "@mui/material";
import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  InputProps?: any;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
}

export function TextareaField({
  name,
  control,
  label,
  multiline = false,
  minRows = 5,
  maxRows,

  InputProps,
  InputLabelProps,
  inputProps,
}: InputFieldProps & TextFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={minRows}
      maxRows={maxRows}
      placeholder="Minimum 3 rows"
      style={{ width: "100%" }}
      value={value || ""}
      onChange={onChange}
      ref={ref}
    />
  );
}
