import React, { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ShoppingCartContext=createContext({})


// Кастомный хук для хранения данных в корзине, добавлении и удалении товаров из корзины, получения данных товаров из корзины

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}) {
    const [cartItems,setCartItems]=useLocalStorage("shopping-cart",[])

    const cartQuantity=cartItems.reduce((quantity,item)=>item.quantity+quantity,0)

    const getItemsQuantity=(id)=> {
        return cartItems.find(item=>item.id === id)?.quantity || 0
    }

    const increaseCartQuantity=(id)=> {
        setCartItems(currItems=>{
            if (currItems.find(item=>item.id === id)?.quantity == null) {
                return [...currItems, {id,quantity:1}]
            }
            else {
                return currItems.map(item=>{
                    if (item.id === id) {
                        return {...item,quantity:item.quantity+1}
                    }
            else {
                return item
            }
                })
            }
        })
        console.log(cartItems)
    }

    const decreaseCartQuantity=(id)=> {
        setCartItems(currItems=>{
            if (currItems.find(item=>item.id === id)?.quantity == 1) {
                return currItems.filter(item=>item.id !==id)
            }
            else {
                return currItems.map(item=>{
                    if (item.id === id) {
                        return {...item,quantity:item.quantity-1}
                    }
            else {
                return item
            }
                })
            }
        })
    }

    const removeFromCart=(id)=>{
        setCartItems(currItems => {
            return currItems.filter(item=>item.id !== id)
        })
    }

    return (
    <ShoppingCartContext.Provider value={{
        getItemsQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity}}> 
        {children}
    </ShoppingCartContext.Provider>
    )
}