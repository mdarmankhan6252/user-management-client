import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
   const { createUser, updateUserProfile, user, setUser, logOut } = useContext(AuthContext)
   const navigate = useNavigate()
   const handleSignIn = e => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const photo = form.photo.value;
      const gender = form.gender.value;

      createUser(email, password)
      .then(result =>{
         updateUserProfile(name, photo)
         .then(() =>{
            setUser(result.user)
            //send data to the database.
            const newUser = {
               name,
               email,
               photo,
               gender,
               createdAt : result.user.metadata.creationTime               
            }
            fetch('http://localhost:5000/users', {
               method:'POST',
               headers:{
                  'content-type' : 'application/json'
               },
               body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data =>{
               console.log(data);
               if(data.insertedId){
                  Swal.fire({
                     icon: "success",
                     title: "Successfully You created an account.",
                     showConfirmButton: false,
                     timer: 1500
                   });
                   logOut()
                   navigate('/signIn')
               }
            })
         })
         .catch(error =>{
            console.log('Error updating profile :', error);
         })
      })
      .catch(error =>{
         console.log(error);
         Swal.fire({
            title: "Error",
            text: `${error.message}`,
            icon: "error"
          });
      })


   }
   return (
      <div className="min-h-[calc(100vh-81px)] flex flex-col justify-center items-center">
         <h2 className=" text-3xl font-semibold pb-6">Sign Up</h2>
         <form onSubmit={handleSignIn} className="max-w-2xl border *:w-full px-6 shadow-[0px_0px_3px_0px] shadow-blue-300 *:p-2 *:border space-y-6 py-16">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="photo" name="photo" placeholder="Photo URL" required />
            <select name="gender" required>
               <option hidden>Gender</option>
               <option value="male">Male</option>
               <option value="female">Female</option>
            </select>
            <input type="submit" value="Sign In" className="font-semibold active:bg-blue-100 cursor-pointer" />
            <p className="border-none text-center">Already have an account ? <Link to='/signIn' className="font-semibold hover:border-b-2 border-black">Sign In</Link></p>
         </form>
      </div>
   );
};

export default SignUp