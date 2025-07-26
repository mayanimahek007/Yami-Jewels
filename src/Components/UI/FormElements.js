import React from 'react';
import { PiEyeLight, PiEyeSlashLight } from 'react-icons/pi';

/**
 * Input field component with consistent styling
 */
export const FormInput = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  className = '',
  label,
  error,
  ...props
}) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E] sm:text-sm";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

/**
 * Password input field with toggle visibility button
 */
export const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  className = '',
  label,
  error,
  showPassword,
  toggleShowPassword,
  ...props
}) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E] sm:text-sm pr-10";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          onClick={toggleShowPassword}
        >
          {showPassword ? 
            <PiEyeSlashLight className="h-5 w-5 text-gray-500" /> : 
            <PiEyeLight className="h-5 w-5 text-gray-500" />
          }
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

/**
 * Select dropdown component with consistent styling
 */
export const FormSelect = ({
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  className = '',
  label,
  error,
  placeholder = 'Select an option',
  ...props
}) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E] sm:text-sm";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

/**
 * Textarea component with consistent styling
 */
export const FormTextarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  label,
  error,
  rows = 4,
  ...props
}) => {
  const baseClasses = "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#48182E] focus:border-[#48182E] sm:text-sm";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

/**
 * Button component with consistent styling
 */
export const Button = ({
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  children,
  ...props
}) => {
  const baseClasses = "flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "text-white bg-[#48182E] hover:bg-[#6b2644] focus:ring-[#48182E]",
    secondary: "text-[#48182E] bg-white border-[#48182E] hover:bg-gray-50 focus:ring-[#48182E]",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Form error message component
 */
export const FormError = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

/**
 * Form success message component
 */
export const FormSuccess = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};