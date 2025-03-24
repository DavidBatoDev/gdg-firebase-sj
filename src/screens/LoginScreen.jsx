import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
// import { TextAnimate } from "@/components/magicui/text-animate";
import { Link } from 'react-router-dom';
import { BoxReveal } from '@/components/magicui/box-reveal';
import Loading from '@/components/loading';
import { useNavigate } from 'react-router-dom';
import { signInService } from '@/services/AuthService';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const LoginScreen = () => {
  const navigate = useNavigate();

  // State for form fields
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // FIREBASE AUTHENTICATION: On Auth State Changed (Check if user is logged in and is admin)
  useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
          if (user) {
          // get the user from the database
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            if (userData.isAdmin) {
                navigate('/admin-events');
            } else {
              navigate('/events');
            }
          }
      });
  }, [navigate])
  
  // FIREBASE AUTHENTICATION: Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signInService(email, password)
      console.log(response)
      if (response.success) {
        if (response.data.isAdmin) {
          navigate('/admin-events');
        } else {
          navigate('/events');
        }
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
      <div className="flex w-full h-full shadow-lg overflow-hidden">

        {/* Left side */}
        <div className="w-1/2 bg-purple p-12 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white mb-6">Login an Account</h2>
          <p className="text-white mb-6">Use your existing email for registration</p>
          <form onSubmit={handleLogin} className="w-full">
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
                Login
              </button>
            </div>
          </form>
          <button className="text-white mt-6 hover:underline">
            <Link to={'/signup'} >
              Don't  have an account? Sign up
            </Link>
          </button>
        </div>

        {/* Right side - Create account form */}
        <div className='w-1/2 relative'>
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
                  <h1 className='text-6xl font-bold text-black text-center'>
                      GDG Event 
                      <LineShadowText className="italic">
                          RSVP
                      </LineShadowText>
                  </h1>
                </BoxReveal>
                <BoxReveal>
                    <div className='text-center mt-6'>
                        'An interactive event RSVP platform for GDG events built using Firebase FireStore.'
                    </div>
                </BoxReveal>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;