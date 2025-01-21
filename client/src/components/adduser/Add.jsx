import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]:value});
  }

  const submitForm = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create",user)
    .then((response) => {
        toast.success(response.data.msg, {position: "top-right"})
        navigate("/");
    }).catch(error => console.log(error))
  }

  return (
    <div className="adduser">
      <Link to={"/"} className="backbutton">
        Back
      </Link>
      <h3> Add New User </h3>

      <form className="adduserform" onSubmit={submitForm}>
        <div className="inputgroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          ></input>
        </div>

        <div className="inputgroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          ></input>
        </div>

        <div className="inputgroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="email"
          ></input>
        </div>

        <div className="inputgroup">
          <label htmlFor="password">password</label>
          <input
            type="text"
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="password"
          ></input>
        </div>

        <div className="inputgroup">
          <button type="submit" className="inputbutton">
            Add User{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
