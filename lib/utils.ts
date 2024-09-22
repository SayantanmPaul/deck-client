import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const chatHrefConstructor =(userId_1:string, userId_2:string) =>{
  const sortedIds = [userId_1, userId_2].sort()
  
  return `${sortedIds[0]}--${sortedIds[1]}`
}