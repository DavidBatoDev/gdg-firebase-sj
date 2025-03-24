import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  signUpAdminService
} from '@/services/AuthService';
import Loading from '@/components/loading';

const AdminSignUpScreen = () => {
  const navigate = useNavigate();

  // State for form fields
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  // FIREBASE AUTHENTICATION: Sign Up Admin
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signUpAdminService(name, email, password)
      console.log(response)
      if (response.success) {
        console.log('Sign up successful:', response.data);
        alert('Sign up successful!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      {loading && <Loading />}
      <div className="flex w-full h-full shadow-lg overflow-hidden">

        {/* Left side */}
        <div className='w-1/2 relative'>
            <InteractiveGridPattern
                className={cn(
                "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                )}
                width={20}
                height={20}
                squares={[80, 80]}
                squaresClassName="hover:fill-red-500"
            />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <h1 className='text-6xl font-bold text-black text-center'>
                    GDG Event 
                    <LineShadowText className="italic">
                        RSVP
                    </LineShadowText>
                </h1>
                <div className='text-center mt-6'>
                    <TextAnimate animation="blurInUp" by="character" once={true}>
                        {name ? `Welcome, Sergeant ${name}!` : 'An interactive event RSVP platform for GDG events built using Firebase FireStore.'}
                        
                    </TextAnimate>
                </div>
            </div>
        </div>


        {/* Right side - Create account form */}
        <div className="w-1/2 bg-destructive p-12 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white mb-6">Create Account for Admin Dashboard</h2>
          <p className="text-white mb-6">Use your email for registration</p>
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
                className="bg-white text-black px-10 py-2 rounded-full hover:bg-red-200 transition-colors"
              >
                SIGN UP
              </button>
            </div>
          </form>
          <button className='text-white mt-6 hover:underline'>
            <Link to={'/login'} className="text-white mt-6">
              Already have an account? Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUpScreen;