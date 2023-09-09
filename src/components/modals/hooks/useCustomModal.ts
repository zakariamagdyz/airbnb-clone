import React, { FormEvent, useCallback } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSumbit: () => void
  secondaryAction?: () => void
  disabled?: boolean
}

const useCustomModal = ({ isOpen, onClose, onSumbit, disabled, secondaryAction }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(isOpen)

  React.useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return
    setIsModalOpen(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose, disabled])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      if (disabled) return
      e.preventDefault()
      onSumbit()
    },
    [onSumbit, disabled]
  )

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return
    secondaryAction()
  }, [secondaryAction, disabled])

  return { isModalOpen, handleClose, handleSubmit, handleSecondaryAction }
}

export default useCustomModal
