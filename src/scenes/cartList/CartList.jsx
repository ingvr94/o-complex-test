import React from 'react'

function CartList({goods,id,quantity}) {

const item = goods.find(i=>i.id === id)
if (item == null) return null

  return (
    <>
      <table className='md:w-3/4 w-[310px]'>
        <tbody>
        <tr>
          <td className='md:w-3/4 w-2/3'>{item.title}</td>
          <td className='md:w-1/3 w-1/3'>x{quantity}</td>
          <td >{item.price * quantity}₽</td>
        </tr>
        </tbody>
      </table>
    </>
     
  )
}

export default CartList