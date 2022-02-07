import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PostState } from '../interface/posts';
import { RootState } from '../redux';
import { getOnePost } from '../redux/action-creators';
import Comments from './Comments';

import Navbar from './Navbar';

const SinglePost = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { post }: PostState = useSelector((state: RootState) => state.posts)

    useEffect(() => {
        dispatch(getOnePost(id))
    },[id, dispatch]);

    if (!post) return null

    return <>
        <Navbar />
        <div className='container mx-auto border border-black mt-10 max-w-4xl w-full '>
            <div className='flex flex-col bg-gray-400 bg-opacity-60 p-3'>
                <div className='flex flex-col justify-center items-start '>
                    <div className='flex flex-row items-center space-x-1.5'>
                        <img src={post.creatorAvatar} className='rounded-full w-20 h-20' />
                        <div className='flex flex-col '>
                            <div className='text-2xl font-medium'>
                                {post.creator}
                            </div>
                            <div className='text-sm'>
                                @{post.creatorUsername}
                            </div>
                            <div className='mt-2'>
                                {post.message}
                            </div>
                        </div>
                    </div>

                </div>
                <Comments post={post} />
            </div>
        </div>
    </>
};

export default SinglePost;
