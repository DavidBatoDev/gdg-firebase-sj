import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Link } from 'react-router-dom';
import { BoxReveal } from '@/components/magicui/box-reveal';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/loading';
import {
  signUpService,
} from '@/services/AuthService';

const SignUpScreen = () => {
  const navigate = useNavigate();
  // State for form fields
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // FIREBASE AUTHENTICATION: Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signUpService(name, email, password)
      if (response.success) {
        console.log('Sign up successful:', response.data);
        alert('Sign up successful!');
        navigate('/login');
      } else {
        alert(response.data.message);
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
      <div className="flex flex-col md:flex-row w-full h-full shadow-lg overflow-hidden">

        {/* Left side */}
        <div className='w-full md:w-1/2 relative h-full'>
            <InteractiveGridPattern
                className={cn(
                "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                )}
                width={20}
                height={20}
                squares={[80, 80]}
                squaresClassName="hover:fill-purple"
            />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <BoxReveal boxColor="#5046e6" duration={0.5}>
                <h1 className='text-2xl md:text-6xl font-bold text-black text-center'>
                    GDG Event 
                    <LineShadowText className="italic">
                        RSVP
                    </LineShadowText>
                </h1>
              </BoxReveal>
                <div className='text-center mt-3 md:mt-6'>
                    <TextAnimate animation="blurInUp" by="character" once={true}>
                        {name ? `Welcome, ${name}!` : 'An interactive event RSVP platform for GDG events built using Firebase FireStore.'}
                        
                    </TextAnimate>
                </div>
            </div>
        </div>


        {/* Right side - Create account form */}
        <div className="w-full md:w-1/2 bg-purple p-12 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
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
          <button className='text-white flex gap-10 '>
            <Link to={'/login'} className="text-white mt-6 hover:underline ">
              Already have an account? Login
            </Link>
            <Link to={'/admin-signup'} className="text-white mt-6 hover:underline ">
              Register as an Admin?
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;