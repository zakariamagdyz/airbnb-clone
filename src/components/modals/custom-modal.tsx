'use client'
import { motion, Variants } from 'framer-motion'
import React, { FC } from 'react'
import { IoMdClose } from 'react-icons/io'

import Button from '../button'
import useCustomModal from './hooks/useCustomModal'

type ModalBasicProps = {
  isOpen: boolean
  onClose: () => void
  onSumbit: () => void
  body: React.ReactElement
  title?: string
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
}

type ModalProps =
  | (ModalBasicProps & {
      secondaryAction: () => void
      secondaryActionLabel: string
    })
  | (ModalBasicProps & { secondaryAction?: never; secondaryActionLabel?: never })

const Modal: FC<ModalProps> = ({
  isOpen,
  actionLabel,
  disabled,
  onClose,
  onSumbit,
  title,
  body,
  footer,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const { handleClose, handleSecondaryAction, handleSubmit } = useCustomModal({
    isOpen,
    onClose,
    onSumbit,
    secondaryAction,
    disabled,
  })

  const modalVariants: Variants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 300,
      opacity: 0,
    },
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`
                fixed 
                inset-0 
                z-50 
                flex 
                items-center 
                justify-center 
              overflow-y-auto 
                overflow-x-hidden
                bg-neutral-800/70
                outline-none            
                focus:outline-none
       
                `}
      role='presentation'
      onClick={handleClose}
      onKeyDown={e => {
        if (e.key === 'Escape') handleClose()
      }}
    >
      <section
        role='presentation'
        className='
                  relative 
                  mx-auto
                  my-6
                  h-full
                  w-full
                  md:h-auto
                  md:w-4/6 
                  lg:h-auto 
                  lg:w-3/6
                  xl:w-2/5
                  '
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        {/*content*/}
        <motion.div className='h-full' variants={modalVariants} animate='animate' initial='initial' exit='exit'>
          <article
            className='
                      relative
                      flex
                      h-full
                      w-full 
                      flex-col 
                      rounded-lg 
                      border-0 
                      bg-white 
                      shadow-lg 
                      outline-none 
                      focus:outline-none 
                      md:h-auto 
                      lg:h-auto
                      '
          >
            {/*header*/}
            <header
              className='
                        relative 
                        flex 
                        items-center
                        justify-center
                        rounded-t
                        border-b-[1px]
                        p-6
                        '
            >
              <button
                className='
                          absolute
                          left-9 
                          border-0
                          p-1
                          transition
                          hover:opacity-70
                         '
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <h1 className='text-lg font-semibold'>{title}</h1>
            </header>
            {/*body*/}
            <form onSubmit={handleSubmit}>
              <main className='relative flex-auto p-6'>{body}</main>
              {/*footer*/}
              <footer className='flex flex-col gap-2 p-6'>
                <div
                  className='
              flex 
              w-full 
              flex-row 
              items-center 
              gap-4
            '
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction} />
                  )}
                  <Button disabled={disabled} label={actionLabel} type='submit' />
                </div>

                {footer}
              </footer>{' '}
            </form>
          </article>
        </motion.div>
      </section>
    </motion.article>
  )
}

export default Modal
