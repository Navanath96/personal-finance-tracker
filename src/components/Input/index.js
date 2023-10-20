import React from "react";
import "./style.css";

function Input({lable,state,setState,placeholder,type}){
    return (
        <div className="input-wrapper">
            <p className="lable">{lable}    </p>
            <input 
            type={type}
            value={state} 
            placeholder={placeholder}
            onChange={(e)=> setState(e.target.value)}
             className="input"/>
        </div>
    )
}
export default Input;
