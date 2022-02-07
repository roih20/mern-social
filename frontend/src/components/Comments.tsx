import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IComments, IPost } from '../interface/posts';
import { IUserLoged } from '../interface/user';
import { commentPost } from '../redux/action-creators';

type Change = ChangeEvent<HTMLInputElement>

interface Props {
  post: IPost
}


const Comments = ({post}: Props) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch();
  const user: IUserLoged = JSON.parse(localStorage.getItem('user') as string)

  const handleClick = async () => {
   dispatch(commentPost({comment: comment, name: user?.result?.oldUser?.name, username: user?.result?.oldUser?.username, avatar: user?.result?.oldUser?.avatar}, post._id))
   setComment('');
  }
  

  return <>
  <div className='bg-gray-400 mt-4 flex flex-col relative'>
    <div className='flex flex-col'>
             {
               user?.result?.oldUser?.name && (
              <div className='p-2 flex flex-col w-full '>
                 <input type="text" name='comment'  value={comment} onChange={(e: Change) => setComment(e.target.value)} placeholder='Comment' className='px-3 py-4 w-full rounded-md focus:outline-none'/>
                 <button className='p-2 bg-green-500 mt-3 rounded-md font-medium text-lg text-white' disabled={!comment} onClick={handleClick}>Comment</button>
              </div>
          
               )
             }
    <div className='grid grid-flow-row grid-cols-1  gap-3 px-2 py-3'>
                 {
                    post?.comments.map((c: IComments) => (
                       <div key={c._id} className='flex flex-row space-x-1.5  '>
                              <img src={c.avatar} alt="" className='rounded-full self-start' width={65}/>
                              <div className='flex flex-col self-center '>
                                <div className='flex flex-row items-center  space-x-2.5'>
                                  <div className='font-medium'>
                                    {c.name}
                                  </div>
                                  <div className='text-sm'>
                                    @{c.username}
                                  </div>
                                </div>

                                <div className='break-all'>
                                   {c.comment}
                                </div>
                              </div>
                       </div>
                     ))
                 }
          </div>
            
    </div>
          
            
         </div>
  </>
};

export default Comments;
