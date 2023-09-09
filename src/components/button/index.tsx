'use client'
import React from 'react'
import { type IconType } from 'react-icons'

type Props = {
  label: string
  onClick?: () => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = ({ label, onClick, disabled, icon: Icon, outline, small, type = 'button' }) => {
  return (
    <button
      disabled={disabled}
      className={`relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70
                 ${outline ? 'border-black bg-white text-black' : 'border-rose-500 bg-rose-500 text-white'}
                    ${small ? 'border px-2 py-1 text-sm font-light' : 'border-2 px-4 py-3 text-base font-bold'}
      
      `}
      type={type}
      onClick={onClick}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  )
}

export default Button
