import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PostState } from '../interface/posts';
import { IUserLoged, UserState } from '../interface/user';
import { RootState } from '../redux';
import { fetchUserPost, userProfile } from '../redux/action-creators';
import Navbar from './Navbar';
import Posts from './Posts';
import { FaReact } from 'react-icons/fa'

const UserProfile = () => {
   const { user }: UserState = useSelector((state: RootState) => state.user)
   const { isLoading }: PostState = useSelector((state: RootState) => state.posts)
   const  { username } = useParams();
   const dispatch = useDispatch()
   const userAuth: IUserLoged = JSON.parse(localStorage.getItem('user') as string)
   useEffect(() => {
        dispatch(userProfile(username))
   }, [dispatch]);
  
   useEffect(() => {
    dispatch(fetchUserPost(username))
   }, [dispatch]);
   
 
  return <>
    <Navbar />
    <div className='container mx-auto pt-6 lg:max-w-4xl mt-10 h-auto border'>
     <div className='flex flex-col mb-6 p-2 mx-3'>
      <img src={user.avatar} alt="" className='w-24 h-24 rounded-full mb-5' />
       <div className='flex flex-row items-center justify-between'>
        <div className='text-xl font-medium'>
         {user.name}
       </div>
       {
         (userAuth?.result?.oldUser?.username === user.username) && <>
           <Link className='bg-green-600 px-3 py-2 rounded-full text-white font-medium' to={`/edit-user/${userAuth?.result?.oldUser?.username}`}>Edit Profile</Link>
         </>
       }
     </div>
     <div className='text-sm'>
         @{user.username}
     </div>
     <div className='mt-4'>
         Joined {moment(user.createdAt).fromNow()}
     </div>
     </div>
     <div className='flex flex-row mx-3 pt-1 pb-3 px-3 items-center justify-around'>
        <div className='text-lg font-medium'>
           Posts 
        </div>
        <div className='text-lg font-medium'>
            Likes
        </div>
     </div>
     {
       isLoading ? <FaReact fontSize={60} className='my-6 mx-auto animate-spin-slow'/> : <Posts />
     }
    </div>
  </>;
};

export default UserProfile;
