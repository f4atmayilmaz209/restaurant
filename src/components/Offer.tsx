import React from 'react'
import Image from 'next/image'
import CountDown from './CountDown'

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      <div className='flex-1 flex flex-col justify-center text-center items-center gap-8 p-6'>
        <h1 className='text-white text-5xl font-bold xl:text-6xl'>Delicious Burger & French Fry</h1>
        <p className=''>Progressively simplify effective e-toilers and process-centric methods of empowerment.Quickly pontificate parallel.</p>
        <CountDown/>
        <button>Order Now</button>
      </div>
      <div className='flex-1 w-full relative md:h-full'>
        <Image src="/offerProduct.png" alt="" fill className='object-contain'/>
      </div>
    </div>
  )
}

export default Offer
