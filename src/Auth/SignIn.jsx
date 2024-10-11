import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
   const navigate = useNavigate()
   const { loginUser } = useContext(AuthContext)
   const handleSignIn = e => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      loginUser(email, password)
      .then(result =>{
         console.log(result.user);
         navigate('/')

      })
      .catch(error =>{
         console.log(error);
      })
   }
   return (
      <div className="min-h-[calc(100vh-81px)] flex flex-col justify-center items-center">
         <h2 className=" text-3xl font-semibold pb-6">Sign In</h2>
         <form onSubmit={handleSignIn} className="max-w-2xl border *:w-full px-6 shadow-[0px_0px_3px_0px] shadow-blue-300 *:p-2 *:border space-y-6 py-16">
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="submit" value="Sign In" className="font-semibold active:bg-blue-100 cursor-pointer" />
            <p className="border-none text-center">New Here ? <Link to='/signUp' className="font-semibold hover:border-b-2 border-black">Sign Up</Link></p>
         </form>

      </div>
   );
};

export default SignIn;