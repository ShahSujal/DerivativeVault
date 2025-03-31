import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGreetingBasedOnTime() {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
export const  getRandomGradient = ()=> {
  // Generate a random hue value (0-360°) to ensure vibrant colors
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 + Math.floor(Math.random() * 120) + 60) % 360; // Ensure contrast

  // Keep saturation and lightness within a visually pleasing range
  const saturation = Math.floor(Math.random() * 30) + 70; // 70% - 100%
  const lightness = Math.floor(Math.random() * 20) + 50; // 50% - 70%

  // Convert HSL to CSS-friendly format
  const color1 = `hsl(${hue1}, ${saturation}%, ${lightness}%)`;
  const color2 = `hsl(${hue2}, ${saturation}%, ${lightness}%)`;

  // Return the CSS gradient string
  return `linear-gradient(135deg, ${color1}, ${color2})`;
}
