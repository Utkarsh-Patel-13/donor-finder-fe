import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFormTypeName(formtype: number): string {
  const formTypeMap: Record<number, string> = {
    0: "990",
    1: "990-EZ", 
    2: "990-PF"
  };
  
  return formTypeMap[formtype] || formtype.toString();
}
