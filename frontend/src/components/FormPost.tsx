import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IUserLoged } from '../interface/user';
import { submitPost } from '../redux/action-creators';


type Submit = FormEvent<HTMLFormElement>
type Change = ChangeEvent<HTMLInputElement>


const FormPost = () => {

  const user: IUserLoged = JSON.parse(localStorage.getItem('user') as string)
  const dispatch = useDispatch()
  const [post, setPost] = useState({
    message: '',
  });



  const handleSubmit = (e: Submit) => {
    e.preventDefault();

    dispatch(submitPost({ ...post, creator: user?.result?.oldUser?.name, creatorUsername: user?.result?.oldUser?.username, creatorAvatar: user?.result?.oldUser?.avatar }));
    setPost({ message: '' })

  }


  if (!user?.result?.oldUser.name)
    return <>
      <div className='p-3'>
        <div className='border bg-gray-300 bg-opacity-70 rounded-md shadow-lg'>
          <div className='container mx-auto py-3'>
            <h3 className='text-center text-3xl'>Please sign in to post</h3>
          </div>
        </div>
      </div>

    </>;

  return <div className='flex flex-col'>
    <div className='flex flex-row p-3 space-x-1.5 items-center'>
      <img src={user?.result?.oldUser?.avatar} alt="" className='rounded-full w-16 h-16' />
      <div className='flex flex-col '>
        <div className='text-lg font-medium'>
          {user?.result?.oldUser?.name}
        </div>
        <div className='text-sm'>
          <Link to={`/${user?.result?.oldUser?.username}`}> @{user?.result?.oldUser?.username}</Link>
        </div>
      </div>
    </div>
    <form autoComplete='off' noValidate className='flex flex-col' onSubmit={handleSubmit}>
      <div className='p-3'>
        <input type="text" name='message' maxLength={144} value={post.message} onChange={(e: Change) => setPost({ ...post, message: e.target.value })} className='border-black  border-b focus:outline-none py-2 px-1 w-full' placeholder='Whats happening?' />
      </div>
      <button className='text-white font-medium bg-green-700 self-end  py-2  rounded-full mr-3 text-lg w-24' type='submit' disabled={!post.message}>Post</button>
    </form>
  </div>;
};

export default FormPost;
