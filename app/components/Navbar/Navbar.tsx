"use client"

import { counterSlice, selectCount } from '@/lib/redux'
import { selectTheme } from '@/lib/redux/slices/themeConfigSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

const Navbar = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)






  return (
    <div className='flex p-24 bg-gray-600 text-white justify-between dark:bg-black'>
      <div>Navbar</div>

      <ThemeSwitcher />
      <div>
        <button className="  p-2 text-2xl" onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
        <div className="inline-block p-2 text-2xl">
          {count}
        </div>
        <button className="btn p-2 text-2xl" onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>

      </div>

    </div>
  )
}

export default Navbar