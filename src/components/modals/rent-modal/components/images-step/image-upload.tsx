'use client'
import Image from 'next/image'
import { CldUploadWidget, CldUploadWidgetResults } from 'next-cloudinary'
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

type ImageUploadProps = {
  onUpload: (url: string) => void
  value: string
  isError: boolean
}
const UPLOAD_PRESET = 'u6ivk3gd'
const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, value, isError }) => {
  const handleUpload = useCallback(
    (result: CldUploadWidgetResults) => {
      onUpload((result.info as { secure_url: string }).secure_url)
    },
    [onUpload]
  )
  return (
    <CldUploadWidget uploadPreset={UPLOAD_PRESET} options={{ maxFiles: 1 }} onUpload={handleUpload}>
      {({ open }) => (
        <button
          type='button'
          className={`relative flex w-full flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70 ${
            isError && 'border-red-500'
          }`}
          onClick={() => open?.()}
        >
          <TbPhotoPlus className='text-4xl' />
          <p className='text-lg font-semibold'>Upload an image</p>
          {value && <Image fill alt='Upload' src={value} className='object-cover' />}
        </button>
      )}
    </CldUploadWidget>
  )
}

export default ImageUpload
