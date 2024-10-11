import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Nav = () => {
   const { user, logOut } = useContext(AuthContext)
   return (
      <nav className="flex items-center justify-between py-6 border-b">
         <Link to='/' className="text-2xl font-semibold font-serif">User <span className="text-blue-500">Management</span></Link>
         <ul className="font-semibold space-x-6 flex items-center">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/allUsers'>All Users</NavLink>
            {user ? <>
               <span onClick={() => logOut()} className="bg-red-500 text-white px-2 rounded-xl cursor-pointer">Log Out</span>
               <img title={user?.displayName} src={user?.photoURL} alt="" className="w-10 h-10 rounded-full"/>
            </> : 
            <>
            <NavLink to='/signIn'>SignIn</NavLink>
            <NavLink to='/signUp'>SignUp</NavLink>
            </>}
            
         </ul>
      </nav>
   );
};

export default Nav;