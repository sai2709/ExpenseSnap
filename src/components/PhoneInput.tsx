import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  error,
  label = 'Phone Number'
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">
        {label}
      </label>
      <div className={`mt-1 ${error ? 'border-red-300 ring-red-500' : 'border-gray-300'}`}>
        <PhoneInput
          international
          countryCallingCodeEditable={true}
          defaultCountry="US"
          value={value}
          onChange={onChange}
          className={`block w-full py-3 px-4 rounded-md border ${
            error ? 'border-red-300' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomPhoneInput;
