"use client"

import {  counterSlice, selectCount } from '@/lib/redux'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)


  
  

  return (
    <div className='flex p-24 bg-gray-600 text-white justify-between'>
      <div>Navbar</div>
      <div>
        <button className="btn p-2 text-2xl" onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
        <div className="inline-block p-2 text-2xl">
          {count}
          </div>
        <button className="btn p-2 text-2xl" onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>

        </div>

    </div>
  )
}

export default Navbar