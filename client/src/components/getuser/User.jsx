import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    };

    fetchData();
  }, []);

  const deleteUser = async(userId) => {
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
    .then((response)=>{
      setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId))
      console.log(response);
      toast.success(response.data.msg,{position:"top-right"})
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className="usertable">
      <Link to="/add" className="addbutton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.fname} {user.lname}</td>
                <td>{user.email}</td>
                <td className="actionbutton">
                  <button onClick={()=>{deleteUser(user._id)}}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/${user._id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;


