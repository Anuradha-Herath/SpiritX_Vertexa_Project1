import React, { useState, useEffect } from 'react';
import PasswordStrength from './PasswordStrength';

interface SignupFormProps {
  onSubmit: (data: { username: string; password: string; confirmPassword: string }) => void;
}

interface ValidationErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Validate the entire form
  useEffect(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;
    
    // Only validate if fields have been touched
    if (username) {
      if (username.length < 8) { // Changed from 3 to 8 characters
        newErrors.username = 'Username must be at least 8 characters';
        isValid = false;
      }
    }
    
    // Password validation - enforce complexity requirements
    if (password) {
      const errors = [];
      if (password.length < 6) errors.push('at least 6 characters');
      if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
      if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
      if (!/[^A-Za-z0-9]/.test(password)) errors.push('one special character');
      
      if (errors.length > 0) {
        newErrors.password = `Password must include ${errors.join(', ')}`;
        isValid = false;
      }
    }
    
    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(newErrors);
    setIsFormValid(isValid && username.length > 0 && password.length > 0 && confirmPassword.length > 0);
  }, [username, password, confirmPassword]);
  
  // Check username availability
  const checkUsername = async () => {
    if (username.length >= 3) {
      setIsCheckingUsername(true);
      try {
        const response = await fetch(`/api/auth/check-username?username=${encodeURIComponent(username)}`);
        const data = await response.json();
        
        if (!data.available) {
          setErrors(prev => ({ ...prev, username: 'Username already taken' }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.username;
            return newErrors;
          });
        }
      } catch (error) {
        console.error('Error checking username:', error);
      } finally {
        setIsCheckingUsername(false);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid) {
      onSubmit({ username, password, confirmPassword });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={checkUsername}
          required
          className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {isCheckingUsername && (
          <p className="text-xs text-gray-500 mt-1">Checking username availability...</p>
        )}
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        <PasswordStrength password={password} />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;