import React, { FC, useCallback } from 'react'
import { AiOutlineMinus } from 'react-icons/ai'

type CounterProps = {
  value: number
  onChange: (value: number) => void
  title: string
  subTitle: string
}
const Counter: FC<CounterProps> = ({ onChange, subTitle, title, value }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if (value <= 1) return
    onChange(value - 1)
  }, [value, onChange])
  return (
    <article className='flex items-center justify-between'>
      <div className=''>
        <p className='font-medium'>{title}</p>
        <p className='font-light text-gray-600'>{subTitle}</p>
      </div>
      <div className='flex items-center gap-4'>
        <button
          className='flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400  transition hover:opacity-80'
          type='button'
          onClick={onReduce}
        >
          <AiOutlineMinus className='text-sm' />
        </button>
        <p className='text-xl font-light text-neutral-600'>{value}</p>
        <button
          type='button'
          className='flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400  transition hover:opacity-80'
          onClick={onAdd}
        >
          +
        </button>
      </div>
    </article>
  )
}

export default Counter
