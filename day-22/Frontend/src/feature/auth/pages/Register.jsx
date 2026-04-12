
 import "../style/form.scss"
 import { Link } from "react-router-dom";
 import { useState } from "react";
 import axios from "axios";
  
 
 const Register = () => {

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{
      withCredentials: true
    }).then((res) => {
        console.log(res.data)
      })
    
  }

   return (

     <main>
       <div className="form-container">
         <h2>Register</h2>

         <form onSubmit={handleSubmit}>

           <input 
           type="text" 
           onInput={(e)=>  setusername (e.target.value)}
           placeholder="Enter username"
           name="username"
            />

           <input 
            type="email"
            onInput={(e)=>  setemail (e.target.value)}
            placeholder="Enter email"
            name="email"
            />

           <input 
            type="password"
            placeholder="Enter password"
            name="password" 
            onInput={(e)=>  setpassword (e.target.value)}
            />

           <button>Register</button>

         </form>
          <p>Alrady have an account ? <Link className="toggleAuthFrom" to="/login">Login</Link> </p>
       </div>
     </main>
   );
 };
 
 export default Register;
