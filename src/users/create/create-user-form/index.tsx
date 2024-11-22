"use client";

import { useState, ChangeEvent, FormEvent } from "react";

import { fetchUsers, createUser } from "../../../api/userService";

import "./create-user-form.scss";

const Input = ({
  label,
  id,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="create-user-form">
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
    />
  </div>
);

const CustomButton = ({
  children,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) => (
  <button type={type} className="create-user-button" onClick={onClick}>
    {children}
  </button>
);

export const CreateUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isErrored, setIsErrored] = useState<boolean>(false);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsErrored(false);
    try {
      await createUser({
        name,
        email,
        phone,
        image: photoPreview || undefined,
      });
      fetchUsers();
      // TODO: navigate
      // router.push("/users");
    } catch (error) {
      setIsErrored(true);
    }
  };

  return (
    <div className="create-user-form-container">
      {isErrored && (
        <div className="create-user-form">
          <div className="user-form-info error">
            <h3>Something went wrong creating the user</h3>
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="mb-4">
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
        {photoPreview && (
          <div className="create-user-form__photo-preview-container">
            <img
              src={photoPreview}
              alt="Preview"
              className="create-user-form__photo-preview"
            />
          </div>
        )}
        <CustomButton type="submit">Create User</CustomButton>
      </form>
    </div>
  );
};
