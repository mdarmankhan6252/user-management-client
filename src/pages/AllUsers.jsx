import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllUsers = () => {
   const loadedUser = useLoaderData();
   console.log(loadedUser);
   const [users, setUsers] = useState(loadedUser)

   const handleDelete = id => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then((result) => {
         if (result.isConfirmed) {
            fetch(`http://localhost:5000/users/${id}`, {
               method: 'DELETE'
            })
               .then(res => res.json())
               .then(data => {
                  console.log(data)
                  if (data.deletedCount > 0) {
                     Swal.fire({
                        title: "Deleted!",
                        text: "The account has been deleted.",
                        icon: "success"
                      });

                      const remaining = users.filter(user => user._id !== id)
                      setUsers(remaining)
                  }
               })
         }
      });
   }

   
   return (
      <div>

         <div className="px-2 max-w-7xl mx-auto mt-12">
            <h4 className="pb-2 font-semibold">Total Users : {users.length}</h4>
            <div className="overflow-x-auto">
               <table className="min-w-full text-xs border">
                  <colgroup>
                     <col />
                     <col />
                     <col />
                     <col />
                     <col />
                     <col />
                     <col className="w-24" />
                  </colgroup>
                  <thead className="bg-gray-100">
                     <tr className="text-left">
                        <th className="p-3">SL</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Gender</th>
                        <th className="p-3 text-right">Creation Time</th>
                        <th className="p-3 text-right">Update</th>
                        <th className="p-3">Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        users.map((user, i) => <tr key={i} className="border-b border-opacity-20 border-gray-700">
                           <td className="p-3">
                              <p>{i + 1}</p>
                           </td>
                           <td className="p-3">
                              <p>{user.name}</p>
                           </td>
                           <td className="p-3">
                              <p>{user.email}</p>
                           </td>
                           <td className="p-3">
                              <p>{user.gender}</p>
                           </td>
                           <td className="p-3 text-right">
                              <p>{new Date(user.createdAt).toDateString()}</p>
                           </td>
                           <td className="p-3 text-right">
                              <Link to={`/update/${user._id}`} className="px-3 py-1 font-semibold rounded-md text-white bg-blue-500 cursor-pointer">
                                 <span>Update</span>
                              </Link>
                           </td>
                           <td className="p-3 text-right">
                              <span onClick={() => handleDelete(user._id)} className="px-3 py-1 font-semibold rounded-md text-white bg-red-500 cursor-pointer">
                                 <span>Delete</span>
                              </span>
                           </td>
                        </tr>)
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default AllUsers;