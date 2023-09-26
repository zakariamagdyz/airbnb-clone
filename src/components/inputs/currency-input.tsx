import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

type InputProps = {
  value: string | number | null | undefined
  onChange: (value: unknown) => void
  onBlur: () => void
  error?: FieldError
}
const CurrencyInput = forwardRef<HTMLInputElement, InputProps>(function Input({ onBlur, onChange, value, error }, ref) {
  return (
    <div className='relative w-full'>
      <NumericFormat
        valueIsNumericString
        id='price'
        thousandSeparator={true}
        placeholder=' '
        prefix={'$'}
        decimalScale={2}
        allowNegative={false}
        getInputRef={ref}
        value={value}
        className={`
      peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70
      ${error ? 'border-rose-500' : 'border-neutral-300'}      
      ${error ? 'focus:border-rose-500' : 'focus:border-black'}      
  
  `}
        onValueChange={values => onChange(values.floatValue)}
        onBlur={onBlur}
      />
      <label
        htmlFor='price'
        className={` absolute
             left-4 top-5 z-10 origin-[0] -translate-y-3 text-base duration-150 
             peer-placeholder-shown:translate-y-0 
             peer-placeholder-shown:scale-100 
             peer-focus:-translate-y-4
             peer-focus:scale-75
             ${error ? 'text-rose-500' : 'text-zinc-400'}
             
  `}
      >
        Price
      </label>
      {error && <div className='ml-2 mt-1 text-sm text-rose-500'>{String(error?.message)}</div>}
    </div>
  )
})

export default CurrencyInput
