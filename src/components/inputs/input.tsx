import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

type InputProps<T extends FieldValues> = {
  id: Path<T>
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  register?: UseFormRegister<T>
  errors: FieldErrors
}

const Input = <TSchema extends FieldValues>({
  errors,
  formatPrice,
  id,
  label,
  register,
  disabled,
  type,
  ...props
}: InputProps<TSchema>) => {
  const formInputProps = register ? { ...register(id) } : {}
  return (
    <div className='relative w-full'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='
          absolute
          left-2
          top-5
          text-neutral-700
        '
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...formInputProps}
        placeholder=' '
        type={type}
        className={`
            peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70
            ${formatPrice ? 'pl-9' : 'pl-4'}      
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}      
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}      
      
      `}
        {...props}
      />
      <label
        className={`
                 absolute top-5 z-10 origin-[0] -translate-y-3 text-base duration-150 
                 ${formatPrice ? 'left-9' : 'left-4'}
                 peer-placeholder-shown:translate-y-0 
                 peer-placeholder-shown:scale-100 
                 peer-focus:-translate-y-4
                 peer-focus:scale-75
                 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                 
      `}
      >
        {label}
      </label>
      {errors[id] && <div className='ml-2 mt-1 text-sm text-rose-500'>{String(errors[id]?.message)}</div>}
    </div>
  )
}

export default Input
