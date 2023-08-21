"use client"
import React from 'react'
import Image from 'next/image'
import { useCartStore } from '@/utils/store'

const BasketPage = () => {

    const {products,totalItems,totalPrice,removeFromCart}=useCartStore()

  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500'>
        <div className='h-1/2 p-4 flex flex-col justify-center'>
            {products.map((item)=>(
                <div key={item.id} className='flex items-center justify-between mb-4 overflow-scroll'>
                    {item.img && (<Image src={item.img} alt="" width={100} height={100}/>)}
                    <div className=''>
                        <h1 className='uppercase text-xl font-bold'>{item.title}</h1>
                        <span>{item.optionTitle}</span>
        
                    </div>
                    <h2 className='font-bold'>${item.price}</h2>                  
                    <span onClick={()=>removeFromCart(item)} className='cursor-pointer'>X</span> 
                        
                </div>

            ))}


        </div>
        <div className='h-1/2 p-4 bg-fuchsia-50'>
            <div className=''>
                <span className=''>Subtotal ({totalItems} items)</span>
                <span className=''>${totalPrice}</span>

            </div>
            <hr className=''/>
            <div className="flex justify-between">
            <span className="">Service Cost</span>
            <span className="">$0.00</span>
            </div>
            <div className="flex justify-between">
            <span className="">Delivery Cost</span>
            <span className="text-green-500">FREE!</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
            <span className="">TOTAL(INCL. VAT)</span>
            <span className="font-bold">${totalPrice}</span>
            </div>
            <button className='bg-red-500 text-white p-3 rounded-md w-1/2'>CHECKOUT</button>

   
        </div>
      
    </div>
  )
}

export default BasketPage
