
// Хук для сохранения и вывода при перезагрузке страницы данных о товарах в корзине
import { useState,useEffect } from "react";

export function useLocalStorage(key,initialValue) {
    const [value,setValue]=useState(()=>{
        const jsonValue=localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })
    
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])

   return [value,setValue] 
}