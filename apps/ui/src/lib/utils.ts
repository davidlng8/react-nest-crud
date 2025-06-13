import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge tailwind classes and maintain corret priorities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humanReadableJoin(arr?: string[]): string {
  if (!arr || arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr.join(" & ");
  return `${arr.slice(0, -1).join(", ")} & ${arr[arr.length - 1]}`;
}
