import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IUserLoged } from '../interface/user';
import { RootState } from '../redux';
import { ActionType } from '../redux/action-types';
import decode, { JwtPayload } from 'jwt-decode'

const Navbar = () => {
    const [userAuth, setUserAuth] = useState<IUserLoged | null>(JSON.parse(localStorage.getItem('user') as string));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logOut = () => {
        dispatch({type: ActionType.LOG_OUT})
        navigate('/login')
        setUserAuth(null)
    }

    useEffect(() => {
       const token = userAuth?.token;

       if(token){
           const decodeToken: JwtPayload = decode(token)
           if((decodeToken.exp as number) * 1000 < new Date().getTime()) logOut()
       }

       setUserAuth(JSON.parse(localStorage.getItem('user') as string))
    }, [location]);
    

    return (
        <header>
            <div className='h-auto overflow-hidden bg-green-600 shadow-md'>
                <div className='container mx-auto py-5'>
                    <div className='flex flex-row items-center  justify-between'>
                       <Link to={'/'} className='text-white font-medium text-3xl'>Social Media</Link>
                        {
                            userAuth ? <>
                              <div className='flex flex-row items-center space-x-5'>
                                  <img src={userAuth?.result?.oldUser?.avatar} alt="" className='w-14 h-14 rounded-full' />
                                  <div className='text-white font-medium'>
                                      {userAuth?.result?.oldUser?.name}
                                  </div>
                                  <button type='button' className='py-2 px-3 rounded-md text-white text-lg font-medium  bg-green-800' onClick={logOut}>LOG OUT</button>
                              </div>
                            </> : <>
                            <Link className='py-2 px-3 font-medium text-white rounded-md text-lg' to={'/login'}>SIGN IN</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
