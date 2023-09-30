import React, { FC } from 'react'
import { Range } from 'react-date-range'

import Button from '@/components/button'
import Calendar from '@/components/inputs/calender'

type ListingReservationProps = {
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (value: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}
const ListingReservation: FC<ListingReservationProps> = ({
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}) => {
  return (
    <div className='overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white'>
      <figure className='flex flex-row items-center gap-1 p-4'>
        <figcaption className='text-2xl font-semibold'>$ {price}</figcaption>
        <div className='font-light text-neutral-600'>night</div>
      </figure>

      <hr />

      <fieldset className='p-4'>
        <legend className='sr-only'>Reservation Calendar</legend>
        <Calendar value={dateRange} disabledDates={disabledDates} onChange={value => onChangeDate(value.selection)} />
      </fieldset>

      <hr />

      <div className='p-4'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>

      <hr />

      <section className='flex flex-row items-center justify-between p-4 text-lg font-semibold'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </section>
    </div>
  )
}

export default ListingReservation
