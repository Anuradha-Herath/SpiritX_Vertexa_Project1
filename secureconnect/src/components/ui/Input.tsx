import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  strengthIndicator?: boolean;
}

const Input: React.FC<InputProps> = ({ label, error, strengthIndicator, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className={`mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {strengthIndicator && <div className="mt-1 text-sm text-gray-500">Password strength indicator here</div>}
    </div>
  );
};

export default Input;