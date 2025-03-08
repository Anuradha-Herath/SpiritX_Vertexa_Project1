import React, { useState, useEffect } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

interface ValidationErrors {
  username?: string;
  password?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false
  });
  
  // Real-time validation as the user types
  useEffect(() => {
    const newErrors: ValidationErrors = {};
    
    // Only validate if fields have been touched
    if (touched.username) {
      if (!username) {
        newErrors.username = 'Username is required';
      } else if (username.length < 8) {
        newErrors.username = 'Username must be at least 8 characters';
      }
    }
    
    if (touched.password) {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    setErrors(newErrors);
    setIsFormValid(
      username.length >= 8 && 
      password.length >= 6 && 
      Object.keys(newErrors).length === 0
    );
  }, [username, password, touched]);
  
  const handleBlur = (field: 'username' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    setTouched({
      username: true,
      password: true
    });
    
    if (isFormValid) {
      onSubmit(username, password);
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
          onBlur={() => handleBlur('username')}
          className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
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
          onBlur={() => handleBlur('password')}
          className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;