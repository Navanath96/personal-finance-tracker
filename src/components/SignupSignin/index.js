import React, { useState } from "react";
import Input from "../Input";
import "./style.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth,db,provider } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import Button from "../Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [LoginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    //    authentication
    if (name.length != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("user>>", user);
            toast.success("User Created");
            setLoading(false);
            setPassword("")
            setEmail("");
            setName("");
            setconfirmPassword("")
            createDoc(user)
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      }
      else {
        toast.error("password and Confirm password don't match!")
        setLoading(false);
      }

    }
    else {
      toast.error("All fields are mandatory!")
      setLoading(false);
    }

  }

  // login using email and password
  function loginUsingEmail() {
    console.log("email", email);
    console.log("password", password);
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    }
    else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }

  }

  async function createDoc(user) {
    setLoading(true);
    if(!user) return;

    const userRef=doc(db, "user", user.uid)
    const userData=await getDoc(userRef);
    if(!userData.exists()){
      try {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName ? user.displayName : name,
          email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt:new Date(),
        });
        toast.success("Doc created!")
        setLoading(false);
      }
      catch(e) {
        toast.error(e.message);
        setLoading(false);
      }
    }
    else{
      // toast.error("Doc Already Exists")
      setLoading(false);
    }
   
  }

  function googleAuth(){
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log("user>>>",user)
    createDoc(user);
    setLoading(false);
    toast.success("User Authenticated");
    navigate("/dashboard");
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    toast.error(errorMessage);
    // ...
  });
    }
    catch(e){
      setLoading(false);
      toast.error(e.message);

    }
  }

  return (
    <>
      {LoginForm ? <>
        <div className="signup-wrapper">
          <h2 className="title">Login On
            <span style={{ color: "var(--blue)" }}> Financely</span></h2>
          <form>
            <Input lable={"E-mail"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"} />

            <Input lable={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"} />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using E-mail And Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">or</p>
            <Button
            onClick={googleAuth}
            disabled={loading}
            text={ loading ? "loading...": "Login Using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!LoginForm)}>
              Or Don't Have An Account ? Click Here
            </p>

          </form>
        </div>
      </> :
        <>
          <div className="signup-wrapper">
            <h2 className="title">Sign Up On
              <span style={{ color: "var(--blue)" }}> Financely</span></h2>
            <form>
              <Input lable={"Full Name"}
                state={name}
                setState={setName}
                placeholder={"John Doe"} />

              <Input lable={"E-mail"}
                type="email"
                state={email}
                setState={setEmail}
                placeholder={"johndoe@gmail.com"} />

              <Input lable={"Password"}
                type="password"
                state={password}
                setState={setPassword}
                placeholder={"Example@123"} />

              <Input lable={"Confirm Password"}
                type="password"
                state={confirmPassword}
                setState={setconfirmPassword}
                placeholder={"Example@123"} />
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "SignUp Using E-mail And Password"}
                onClick={signupWithEmail}
              />
              <p className="p-login">or</p>
              <Button
              onClick={googleAuth}
              disabled={loading}
                text={ loading ? "loading...": "Signup Using Google"}
                blue={true}
              />
              <p className="p-login"
                onClick={() => setLoginForm(!LoginForm)}>
                Or Have An Account Already ? Click Here
              </p>
            </form>
          </div>
        </>
      }
    </>
  )
}

export default SignupSignin;