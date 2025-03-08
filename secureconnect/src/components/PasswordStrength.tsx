import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = () => {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const criteriaMet = [lengthCriteria, uppercaseCriteria, lowercaseCriteria, numberCriteria, specialCharCriteria].filter(Boolean).length;

    switch (criteriaMet) {
      case 5:
        return 'Strong';
      case 4:
        return 'Moderate';
      case 3:
        return 'Weak';
      default:
        return 'Very Weak';
    }
  };

  const strength = getStrength();

  return (
    <div className="mt-2">
      <div className={`h-2 rounded ${strength === 'Strong' ? 'bg-green-500' : strength === 'Moderate' ? 'bg-yellow-500' : strength === 'Weak' ? 'bg-orange-500' : 'bg-red-500'}`} />
      <p className={`mt-1 text-sm ${strength === 'Strong' ? 'text-green-600' : strength === 'Moderate' ? 'text-yellow-600' : strength === 'Weak' ? 'text-orange-600' : 'text-red-600'}`}>
        Password Strength: {strength}
      </p>
    </div>
  );
};

export default PasswordStrength;