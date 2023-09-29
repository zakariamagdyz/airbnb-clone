import { useController, useWatch } from 'react-hook-form'
import { type IconType } from 'react-icons'

import { categories } from '@/utils/categories'

import { StepProps } from '../types'

const CategoryStep = ({ control, setCustomValue }: StepProps) => {
  const category = useWatch({ control, name: 'category' })
  const {
    fieldState: { error },
  } = useController({ control, name: 'category' })

  return (
    <section className='space-y-4'>
      {error && <p className='text-red-500'>{error.message}</p>}
      <div className='grid max-h-[50vh] gap-3 overflow-y-auto md:grid-cols-2'>
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
            onClick={() => {
              setCustomValue('category', item.label)
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoryStep

type CategoryBoxProps = {
  icon: IconType
  label: string
  onClick: (value: string) => void
  selected?: boolean
}
const CategoryBox = ({ icon: Icon, label, onClick, selected }: CategoryBoxProps) => {
  return (
    <button
      type='button'
      className={`cursor-pointer space-y-3 rounded-xl border-2 p-4 transition hover:border-black ${
        selected && 'border-black'
      }`}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <p className='font-semibold'>{label}</p>
    </button>
  )
}
