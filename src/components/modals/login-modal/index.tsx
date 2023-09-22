import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '@/components/button'
import Input from '@/components/inputs/input'

import Modal from '../custom-modal'
import Heading from '../register-modal/components/heading'
import { useRegisterModal } from '../register-modal/hooks/use-register-modal'
import useLoginForm from './hooks/use-login-form'
import { useLoginModal } from './hooks/use-login-modal'
import { LoginModalSchema } from './schema'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const { errors, handleSubmit, isLoading, register } = useLoginForm({ closeModal: loginModal.onClose })

  const bodyContent = (
    <div className='space-y-4'>
      <Heading title='Welcome Back' subtitle='Login to your account' />
      <Input<LoginModalSchema> id='email' label='Email' disabled={isLoading} register={register} errors={errors} />
      <Input<LoginModalSchema>
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
        First time using Airbnb?{' '}
        <button
          type='button'
          className='text-blue-600 hover:underline'
          onClick={() => {
            loginModal.onClose()
            registerModal.onOpen()
          }}
        >
          Create an account
        </button>
      </p>
    </footer>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isModalOpen}
      title='Login'
      actionLabel='Continue'
      body={bodyContent}
      footer={footerContent}
      onClose={loginModal.onClose}
      onSumbit={handleSubmit}
    />
  )
}

export default LoginModal
