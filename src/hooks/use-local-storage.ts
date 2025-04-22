import { useEffect, useState } from "react";
 //Creation of a custom React Hook. <T> = generic type parameter (allows the hook to work with any data

 // (() => {}) -> function to lazily initialize the state (runs the logic only once, the first time the hook is called)

export function useLocalStorage<T>(key:string, initialValue:T){
   const [storedValue, setStoredValue] = useState<T>(()=>{

    try {
        const item  = window.localStorage.getItem(key);
        return item?JSON.parse(item): initialValue; 

    } catch (error){
        console.error(error);
        return initialValue

    }
   })

   useEffect(()=>{
    try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error){
        console.error(error);
    }
   }, [key, storedValue]) //useEff will work if key or storedValue change

   return [storedValue, setStoredValue] as const
}