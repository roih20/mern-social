import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostState } from '../interface/posts'
import { RootState } from '../redux'
import { fetchAllPost } from '../redux/action-creators'
import FormPost from './FormPost'
import Navbar from './Navbar'
import Posts from './Posts'
import { FaReact } from 'react-icons/fa'
const Home = () => {

    const dispatch = useDispatch()
    const {isLoading}: PostState = useSelector((state: RootState) => state.posts)
    
    useEffect(() => {
        dispatch(fetchAllPost())
    }, []);
    
    return (
        <>
         <Navbar />
         <div className='container mx-auto pt-6 lg:max-w-4xl mt-10 h-auto border mb-5' >
             <FormPost />
            <h2 className='text-green-600 text-2xl mt-10 mx-3'>Feed</h2>
            <div className='mt-6'>
               {
                   isLoading ? <FaReact fontSize={70} className='my-10 mx-auto animate-spin-slow' /> : <Posts />
               }
            </div>
         </div>
        </>
    )
}

export default Home
