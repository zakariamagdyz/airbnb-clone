'use client'
import { useCallback, useMemo, useState } from 'react'
import { Path } from 'react-hook-form'

import Heading from '@/components/heading'

import Modal from '../custom-modal'
import { ListingSteps, STEP_COMPONENTS } from './constant'
import useRentForm from './hooks/use-rent-form'
import { useRentModal } from './hooks/use-rent-modal'
import { RentFormSchema } from './types'

const RentModal = () => {
  const RentModal = useRentModal()
  const [currentStep, setCurrentStep] = useState<ListingSteps>(ListingSteps.CATEGORY)
  const { control, handleSubmit, setValue, trigger } = useRentForm({ closeModal: RentModal.onClose })
  const handleBack = () => {
    setCurrentStep(step => step - 1)
  }
  const handleNext = async () => {
    const fieldNamesMap: Record<ListingSteps, Path<RentFormSchema> | Path<RentFormSchema>[]> = {
      [ListingSteps.CATEGORY]: 'category',
      [ListingSteps.LOCATION]: 'location',
      [ListingSteps.INFO]: ['bathroomCount', 'guestCount', 'roomCount'],
      [ListingSteps.IMAGES]: 'imageSrc',
      [ListingSteps.DESCRIPTION]: ['description', 'title'],
      [ListingSteps.PRICE]: 'price',
    }

    const isValid = await trigger(fieldNamesMap[currentStep])

    if (isValid) {
      setCurrentStep(prevStep => prevStep + 1)
    }
  }

  const updateFieldValue = useCallback(
    (id: Path<RentFormSchema>, value: string | number) => {
      setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    },
    [setValue]
  )

  const actionLabel = useMemo(() => (currentStep === ListingSteps.PRICE ? 'Submit' : 'Next'), [currentStep])
  const secondaryActionLabel = useMemo(() => (currentStep === ListingSteps.CATEGORY ? 'Cancel' : 'Back'), [currentStep])

  const bodyContent = useMemo(() => {
    const { title, subTitle, Component } = STEP_COMPONENTS[currentStep]
    return (
      <section className='space-y-8'>
        <Heading title={title} subtitle={subTitle} />
        <Component control={control} setCustomValue={updateFieldValue} />
      </section>
    )
  }, [control, currentStep, updateFieldValue])

  const footerContent = <footer></footer>
  return (
    <Modal
      isOpen={RentModal.isModalOpen}
      title='Airnbn your home'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={currentStep === ListingSteps.CATEGORY ? RentModal.onClose : handleBack}
      body={bodyContent}
      footer={footerContent}
      onClose={RentModal.onClose}
      onSumbit={currentStep === ListingSteps.PRICE ? handleSubmit : handleNext}
    />
  )
}

export default RentModal
