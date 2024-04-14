import React from 'react'
import { useShoppingCart } from '../../context/ShoppingCartContext'

function ProductCard({id,img,name,description,price}) {
    const {
    getItemsQuantity ,
    increaseCartQuantity,
    decreaseCartQuantity
    } =useShoppingCart()

    const quantity=getItemsQuantity(id)
  return (
    <div className='md:w-[301px] w-[332px] md:h-[812px] h-[703px]  bg-tranparent-grey flex flex-col px-[10px] rounded-rounded-15 relative pt-3'>
            <div className='flex flex-col items-center'>
                <img className='md:w-[281px] w-[310px] h-[366px] rounded-rounded-15' src={img} alt={name} />
                <p className='text-4xl break-all'>{name}</p>
            </div>
            <p className='text-2xl truncate'>{description}</p>

            <div className='absolute bottom-0 mb-[8px]'>
            <p className='text-4xl text-center md:mb-[33px] mb-[13px]'>цена: {price}₽</p>
                {quantity === 0 ? 
                   (<button onClick={()=>increaseCartQuantity(id)} className='text-4xl rounded-rounded-15 md:w-[281px] w-[310px] h-[68px] bg-dark text-light-grey '>купить</button>)
                   : 
                   <div className='flex items-center justify-center text-4xl text-light-grey md:gap-[7px] gap-[11px]'>
                    <button onClick={()=>decreaseCartQuantity(id)} className='h-[68px] w-[68px] rounded-rounded-15 bg-dark'>-</button>
                    <button className='h-[68px] md:w-[128px] w-[149px] rounded-rounded-15 bg-dark'>{quantity}</button>
                    <button onClick={()=>increaseCartQuantity(id)} className='h-[68px] w-[68px] rounded-rounded-15 bg-dark'>+</button>
                   </div>
                }
            </div>
    </div>
  )
}

export default ProductCard