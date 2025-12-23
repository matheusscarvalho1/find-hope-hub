import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message || "Erro ao se comunicar com o servidor"
    );
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Erro desconhecido";
  }
};
