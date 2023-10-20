import React, { useEffect } from "react";
import "./style.css";
import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {signOut} from "firebase/auth";
import userImg from "../../assets/userImg.png"

function Header(){
const [user,loading]=useAuthState(auth);
const navigate=useNavigate();

useEffect(()=>{
    if(user){
        navigate("/dashboard");
    }
},[user,loading]);

function logoutfnc(){
    try{
        signOut(auth).then(()=>{
            toast.success("Logged Out Successfully!")
            navigate("/");
        }).catch((error)=>{
            toast.error(error.message);
        })
    }catch(e){
        toast.error(e.message);
    }
}

    return <div className="nav-bar"> 
    <p className="logo">Financely</p>
    { user &&(
        <div style={{
            display:"flex",
            alignItems:"center",
            gap:"0.5rem",
        }}>
            <img style={{borderRadius:"50%",height:"1.5rem",width:"1.5rem"}}
            src={user.photoURL? user.photoURL:userImg}/>
    <p onClick={logoutfnc} className="logo link">Logout</p>
    </div>
    )
}
    </div>
}


export default Header;