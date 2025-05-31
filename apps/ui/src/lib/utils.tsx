import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge tailwind classes and maintain corret priorities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
