import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  // Calculate password strength
  const calculateStrength = (password: string): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: 'None', color: 'bg-gray-200' };
    
    let score = 0;
    
    // Length check - matches the form validation
    if (password.length >= 6) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks - same ones used in form validation
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[a-z]/.test(password)) score += 1; // Has lowercase
    if (/[0-9]/.test(password)) score += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char
    
    // Determine strength label and color
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500' };
    if (score <= 6) return { score, label: 'Strong', color: 'bg-green-500' };
    
    return { score, label: 'Very Strong', color: 'bg-green-700' };
  };
  
  const strength = calculateStrength(password);
  const percentage = (strength.score / 6) * 100;
  
  return (
    <div className="mt-1">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${strength.color} transition-all duration-300`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs mt-1 text-gray-600">
        Password strength: {strength.label}
      </div>
    </div>
  );
};

export default PasswordStrength;
