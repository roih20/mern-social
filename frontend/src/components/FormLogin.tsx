import { rejects } from 'assert';
import { read } from 'fs';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ICreateUser, ILogUser } from '../interface/user';
import { signIn, signUp } from '../redux/action-creators';
import Navbar from './Navbar';


type Change = ChangeEvent<HTMLInputElement>
type Submit = FormEvent<HTMLFormElement>

const FormLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [isSignUp, setisSignUp] = useState(false);
    const [formSignUp, setFormSignUp] = useState<ICreateUser>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        avatar: ''
    });


    const [formSignIn, setFormSignIn] = useState<ILogUser>(
        {
            email: '',
            password: '',
        }
    );

    const switchForm = () => {
        setisSignUp((prev) => !prev)
    }



    const handleChangeSignIn = (e: Change) => {
        setFormSignIn({ ...formSignIn, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: Submit) => {
        e.preventDefault()
       
        if (isSignUp) {
            dispatch(signUp(formSignUp))
            clearSignUp()
            setisSignUp(false)
        } else {
            dispatch(signIn(formSignIn, navigate))
        }

    }

    const handleImage = (e: Change) => {
        const file = e.target.files;
        if(!file) return;
        const avatar = file[0]
        setFormSignUp({...formSignUp, avatar: avatar})
    }

    const clearSignUp = () => {
        setFormSignUp({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            avatar: ' '
        })
    }


    return <>
        <Navbar />
        <div className='container mx-auto pt-20'>
            <div className='flex flex-col items-center'>
                <h2 className='text-2xl font-medium items-baseline'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </h2>
                <div className='w-full max-w-md mt-6 border border-slate-400 p-4 shadow-xl rounded-md border-opacity-40 flex flex-col'>
                    <form action="" className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                        {
                            isSignUp && (
                                <>
                                    <div>
                                        <input type="text" name="firstName" value={formSignUp.firstName} onChange={(e: Change) => setFormSignUp({ ...formSignUp, firstName: e.target.value })} id="" placeholder='First Name' className='border w-full border-black py-3 px-3 rounded-md' required />
                                    </div>

                                    <div>
                                        <input type="text" name="lastName" value={formSignUp.lastName} onChange={(e: Change) => setFormSignUp({ ...formSignUp, lastName: e.target.value })} id="" placeholder='Last Name' className='border w-full border-black py-3 px-3 rounded-md' required />
                                    </div>
                                    <div>
                                        <input type="text" name="username" value={formSignUp.username} onChange={(e: Change) => setFormSignUp({ ...formSignUp, username: e.target.value })} id="" placeholder='Username' className='border w-full border-black py-3 px-3 rounded-md' required />
                                    </div>
                                </>
                            )
                        }
                        <div>
                            <input type="email" name="email" value={isSignUp ? formSignUp.email : formSignIn.email} onChange={isSignUp ? (e: Change) => setFormSignUp({ ...formSignUp, email: e.target.value }) : handleChangeSignIn} id="" placeholder='Email' className='border w-full border-black py-3 px-3 rounded-md' required />
                        </div>
                        <div>
                            <input type="password" name="password" value={isSignUp ? formSignUp.password : formSignIn.password} onChange={isSignUp ? (e: Change) => setFormSignUp({ ...formSignUp, password: e.target.value }) : handleChangeSignIn} id="" placeholder='Password' className='border w-full border-black py-3 px-3 rounded-md' required />
                        </div>
                        {
                            isSignUp && (
                                <div>
                                    <label htmlFor="file" >Upload Profile Picture</label>
                                    <input type="file" name="avatar" id="file" accept='image/*' multiple={false} onChange={handleImage}/>
                                </div>
                            )
                        }
                        <button type="submit" className='bg-green-600 py-3 font-medium text-white text-xl rounded-md'>{isSignUp ? 'Create Account' : 'Sign In'}</button>
                    </form>
                    <hr className=' border-black border-opacity-40 mt-4' />
                    <div className='self-center mt-4'>
                        Or
                    </div>
                    <button className='py-3 font-medium bg-green-400 text-white text-xl rounded-md mt-3' onClick={switchForm} type='button'>{isSignUp ? 'Sign In' : 'Sign Up'}</button>
                </div>

            </div>
        </div>
    </>;
};

export default FormLogin;
