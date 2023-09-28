'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

import Button from '../button'
import Heading from '../heading'

type EmptyStateProps = {
  title?: string
  description?: string
  showReset?: boolean
}
const EmptyState: React.FC<EmptyStateProps> = ({
  description = 'Try changing or removing some of your filters',
  title = 'No exact matches',
  showReset,
}) => {
  const router = useRouter()
  return (
    <section className='flex h-[60vh] flex-col items-center justify-center  gap-2'>
      <Heading center title={title} subtitle={description} />
      <div className='mt-4 w-48'>
        {showReset && <Button outline label='Remove all filters' onClick={() => router.push('/')} />}
      </div>
    </section>
  )
}

export default EmptyState
