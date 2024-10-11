import { Link } from "react-router-dom";

const Home = () => {
   return (
      <div className="min-h-[calc(100vh-89px)] flex items-center justify-center flex-col">
         <h1 className="text-2xl font-bold text-blue-500 sm:text-3xl lg:text-4xl">Welcome To User Management System</h1>
         <Link to='/allUsers' className="border-2 border-blue-500 font-semibold text-blue-500 py-2 px-6 inline-block mt-6 hover:bg-blue-500 hover:text-white duration-300">See All Users</Link>
      </div>
   );
};

export default Home;