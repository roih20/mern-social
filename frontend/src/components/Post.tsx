import React from 'react';
import { IPost } from '../interface/posts';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineComment } from 'react-icons/ai'
import { IUserLoged } from '../interface/user';
import { useDispatch } from 'react-redux';
import { deleteOwnPost } from '../redux/action-creators';


interface IProps {
  post: IPost
}


const Post = ({ post }: IProps) => {

  const dispatch = useDispatch()
  const user: IUserLoged = JSON.parse(localStorage.getItem('user') as string)

  return <div className='flex flex-col p-3 space-y-2 border-t  border-black'>
    <div className='flex flex-row space-x-1.5'>
      <img alt="" className='rounded-full h-16 w-16' src={post.creatorAvatar} />
      <div className='flex flex-col w-full'>
        <div className='flex flex-row items-center justify-between '>
          <div className='text-lg font-medium'>
            {post.creator}
          </div>
          {
            (user?.result?.oldUser?.username === post.creatorUsername) && <>
              <div className=''>
                <button onClick={() => dispatch(deleteOwnPost(post._id))}><AiFillDelete className='h-5 w-5 text-red-500' /></button>
              </div>
            </>
          }
        </div>
        <div>
          <Link to={`/${post.creatorUsername}`}>@{post.creatorUsername}</Link>
        </div>
        <div className='mt-2'>
          {post.message}
        </div>
      </div>
    </div>
    <div className='flex flex-row justify-between items-center'>
      <Link to={`/post/${post._id}`} className='flex flex-row items-center space-x-1.5 '>
        <AiOutlineComment className='w-5 h-5' /> <div>{post.comments.length}</div>
      </Link>
      <div>
        {moment(post.createdAt).fromNow()}
      </div>
    </div>
  </div>
};

export default Post;
