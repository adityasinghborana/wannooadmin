import React from 'react';
import { Controller } from 'react-hook-form';

const InputField = ({ name, label, control, errors, type = "text", customClass = "" }) => (
  <div className={`mb-4 ${customClass}`}>
    <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input 
          type={type} 
          id={name} 
          {...field} 
          className="text-fieldutilities" 
        />
      )}
    />
    {errors[name]?.message && (
      <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default InputField;
