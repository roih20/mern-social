import React from 'react';
import { useSelector } from 'react-redux';
import { IPost, PostState } from '../interface/posts';
import { RootState } from '../redux';
import Post from './Post';

const Posts = () => {
  const { posts }: PostState = useSelector((state:RootState) => state.posts)

  return <div className='grid grid-flow-rows grid-cols-1 '>
        {
            posts?.map((post: IPost) => (
              <Post key={post._id} post={post}/>
          ))
        }
  </div>;
};

export default Posts;
