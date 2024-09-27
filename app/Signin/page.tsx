'use client'
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import CustomAuthInput from '@/components/CustomAuthInput'
import { FaEnvelope, FaLock } from "react-icons/fa";
import { userLogin } from '@/services/api'
import Link from "next/link";

export default function Home() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  const addUser = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await userLogin(email, password);
      const token = data.token;
      localStorage.setItem('id', token);
      router.push('/AddCars')
      toast.success('Login successful!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap  justify-between items-center min-h-screen  w-full">
          <Toaster />
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full  lg:py-0 w-full">
            <div className="w-full bg-white rounded-lg h-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl  text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={addUser}>
                  <CustomAuthInput
                    type='email'
                    name='email'
                    icon={<FaEnvelope />}
                    placeholder='Email Address'
                    onChange={(e: any) => { setEmail(e.target.value) }}
                    value={email}
                  />
                  <CustomAuthInput
                    type='password'
                    name='password'
                    icon={<FaLock />}
                    placeholder='Password'
                    onChange={(e: any) => { setPassword(e.target.value) }}
                    value={password}
                  />
                  <button
                    type="submit"
                    className="w-full text-white bg-purple hover:bg-purple outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
      </div>
    </ >

  );
}
