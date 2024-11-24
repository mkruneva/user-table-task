import { isAxiosError } from 'axios'
import { useState, ChangeEvent, FormEvent } from 'react'

import { createUser } from '../../../api/userService'
import { User } from '../../user-types'
import './create-user-form.scss'

const Input = ({
  label,
  id,
  type = 'text',
  required = false,
  value,
  onChange,
  pattern,
}: {
  label: string
  id: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  pattern?: string
}) => (
  <div className="create-user-form__input-container">
    <label htmlFor={id} className="create-user-form__label">
      {label}
    </label>
    <input
      type={type}
      id={id}
      required={required}
      className="create-user-form__input"
      value={value}
      onChange={onChange}
      pattern={pattern}
    />
  </div>
)

const CustomButton = ({
  children,
  type = 'button',
  onClick,
}: {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}) => (
  <button type={type} className="create-user-button" onClick={onClick}>
    {children}
  </button>
)

export const CreateUserForm = ({
  onCreate,
}: {
  onCreate?: (updatedUser: User[]) => void
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null)

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (!selectedImage) return

    const isValidImage = validateImageUpload(selectedImage.type)
    if (!isValidImage) {
      alert('The uploaded image should be valid image format: jpeg, png')
      e.target.value = ''
      setImage(null)
      setImagePreview('')
      return
    }

    setImage(selectedImage)

    const previewURL = URL.createObjectURL(selectedImage)
    setImagePreview(previewURL)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    if (image) {
      formData.append('image', image)
    }
    try {
      const updatedUsers: User[] = await createUser(formData)
      if (onCreate) {
        onCreate(updatedUsers)
      }
    } catch (error) {
      console.error('Failed to create user:', error)
      if (isAxiosError(error) && error.response) {
        setFormSubmitError(
          `Error creating user: ${error.response.status} - ${error.response.statusText}`
        )
      } else {
        setFormSubmitError('An unexpected error occurred.')
      }
    }
  }

  return (
    <div className="create-user-form-container">
      {!!formSubmitError && (
        <div className="create-user-form">
          <div className="user-form-info error">
            <span>{formSubmitError}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Telephone"
          id="phone"
          type="tel"
          required
          pattern="[0-9+\(\)-.]+"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="create-user-form__input-container">
          <label htmlFor="photo" className="create-user-form__label">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="create-user-form__photo-input"
          />
        </div>
        {imagePreview && (
          <div className="create-user-form__photo-preview-container">
            <img
              src={imagePreview}
              alt="Preview"
              className="create-user-form__photo-preview"
            />
          </div>
        )}
        <CustomButton type="submit">Create User</CustomButton>
      </form>
    </div>
  )
}

const validateImageUpload = (imageType: string): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

  if (!allowedTypes.includes(imageType)) {
    return false
  }

  return true
}
