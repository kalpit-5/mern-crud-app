import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import "./edit.css"
import axios from "axios"
import toast from 'react-hot-toast';

const Edit = () => {

    const users = {
        fname: "",
        lname: "",
        email: ""
      };
    
    const navigate = useNavigate();
    const {id} = useParams();
    const[user,setUser] = useState(users);

    const inputChangeHandler = (e) => {
        const{name,value} = e.target ;
        setUser({...user,[name]:value});
        console.log(user);
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getone/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id])
    
    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`,user)
        .then((response) => {
            toast.success(response.data.msg, {position: "top-right"})
            navigate("/");
        }).catch(error => console.log(error))
    }

    return <div className="adduser">
    <Link to={"/"} className="backbutton">Back</Link>
    <h3> Update User </h3>


    <form className="adduserform" onSubmit={submitForm}>
        <div className="inputgroup">
            <label htmlFor="fname">First Name</label>
            <input type="text"  onChange={inputChangeHandler}  value={user.fname} id="fname" name="fname" autoComplete="off" placeholder="First Name"></input>
        </div>

        <div className="inputgroup">
            <label htmlFor="lname">Last Name</label>
            <input type="text"  onChange={inputChangeHandler} value={user.lname}id="lname" name="lname" autoComplete="off" placeholder="Last Name"></input>
        </div>

        <div className="inputgroup">
            <label htmlFor="email">Email</label>
            <input type="text"  onChange={inputChangeHandler} value={user.email}id="email" name="email" autoComplete="off" placeholder="email"></input>
        </div>

        <div className="inputgroup">
            <button type="submit" className="inputbutton">Update User </button>
        </div>
    </form>
  </div>;
}

export default Edit