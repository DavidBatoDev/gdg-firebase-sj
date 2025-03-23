import React, { useState } from 'react';

const LoginScreen = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign up attempted with:', { name, email, password });
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 bg-[#EA4335]">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Left side - Red welcome back section */}
        <div className="w-1/2 bg-red-500 text-white p-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-8">To keep connected with us please login with your personal info</p>
          <button className="border-2 border-white text-white px-10 py-2 rounded-full hover:bg-white hover:text-red-500 transition-colors">
            SIGN IN
          </button>
        </div>
        
        {/* Right side - Create account form */}
        <div className="w-1/2 bg-white p-12 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
          
          {/* Social media icons */}
          <div className="flex space-x-4 mb-6">
            <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
              <span className="text-xs">f</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
              <span className="text-xs">G+</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
              <span className="text-xs">in</span>
            </a>
          </div>
          
          <p className="text-gray-500 text-sm mb-6">or use your email for registration</p>
          
          <form onSubmit={handleSignUp} className="w-full">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-500 text-white px-10 py-2 rounded-full hover:bg-red-600 transition-colors"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;