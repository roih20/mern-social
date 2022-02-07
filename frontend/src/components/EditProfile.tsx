import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import {IUserLoged, IUpdateUser, IUserProfile, UserState} from '../interface/user'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updatingUser } from "../redux/action-creators";
type Submit = FormEvent<HTMLFormElement>
type Change = ChangeEvent<HTMLInputElement>
const EditProfile = () => {
  const [formUser, setFormUser] = useState({
    name: ''
  });
  const { user } : UserState = useSelector((state: RootState) => state.user)
  const userLoged: IUserLoged  = JSON.parse(localStorage.getItem('user') as string)
  const currentUser = user.name;
  const id = userLoged?.result?.oldUser?.id
  const dispatch = useDispatch()
  useEffect(() => {
    if(userLoged?.result?.oldUser?.name){
      setFormUser({
        name: currentUser
      })
    }
  }, []);

  const handleSubmit = (e: Submit) => {
    e.preventDefault();

    dispatch(updatingUser(id, formUser))
  
  }

  const handleChange = (e: Change) => {
    setFormUser({...formUser, name: e.target.value})
  }
  

  return <div className='container mx-auto pt-6 lg:max-w-4xl mt-10 h-auto border p-3 rounded-md shadow-md'>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
             <input type="text" placeholder="Name" value={formUser.name} onChange={handleChange} className="py-4 px-3 w-full focus:outline-none border border-black rounded-md"/>    
          </div> 
          <button type="submit" className="px-3 py-2 w-20 bg-green-600 self-end text-white rounded-full font-medium">Save</button>           
      </form>
  </div>;
};

export default EditProfile;
