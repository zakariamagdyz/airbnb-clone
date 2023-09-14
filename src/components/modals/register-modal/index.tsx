import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '@/components/button'
import Input from '@/components/inputs/input'

import Modal from '../custom-modal'
import { useLoginModal } from '../login-modal/hooks/use-login-modal'
import Heading from './components/heading'
import useRegisterForm from './hooks/use-register-form'
import { useRegisterModal } from './hooks/use-register-modal'
import { RegisterModalSchema } from './schema'

const RegistarModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const { errors, handleSubmit, isLoading, register } = useRegisterForm({ closeModal: registerModal.onClose })

  const bodyContent = (
    <div className='space-y-4'>
      <Heading title='Welcome to Aribnb' subtitle='Create an account' />
      <Input<RegisterModalSchema> id='email' label='Email' disabled={isLoading} register={register} errors={errors} />
      <Input<RegisterModalSchema> id='name' label='Name' disabled={isLoading} register={register} errors={errors} />
      <Input<RegisterModalSchema>
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  )

  const footerContent = (
    <footer>
      <div className='mt-3 space-y-3'>
        <hr />
        <Button
          outline
          label='Continue with Google'
          icon={FcGoogle}
          onClick={() => {
            signIn('google')
          }}
        ></Button>
        <Button
          outline
          label='Continue with Github'
          icon={AiFillGithub}
          onClick={() => {
            signIn('github')
          }}
        ></Button>
      </div>
      <p className='mt-6 text-center'>
        Already have an account?{' '}
        <button
          type='button'
          className='text-blue-600 hover:underline'
          onClick={() => {
            loginModal.onOpen()
            registerModal.onClose()
          }}
        >
          Login
        </button>
      </p>
    </footer>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isModalOpen}
      title='Register'
      actionLabel='Continue'
      body={bodyContent}
      footer={footerContent}
      onClose={registerModal.onClose}
      onSumbit={handleSubmit}
    />
  )
}

export default RegistarModal
