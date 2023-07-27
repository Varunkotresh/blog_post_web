import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, NavLink , Link} from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) =>{
        e.preventDefault();
        console.log(name, password);
        // const data ={
        //     Name : name,
        //     Password : password
        // }
        const url = 'http://localhost:7125/api/Users/'+name+'/'+password;
        axios.get(url)
        .then((result)=>{
            const dt = result.data;
            if(dt === true)
            {
                alert('Sucess '+ dt);
                navigate('/Home');
            }
            alert('Enter Valid username and password '+ dt);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  return (
    <>
      <form>
  {/* <!-- Email input --> */}
  <div class="form-outline mb-4">
    <input type="text" id="form2Example1" class="form-control" 
    onChange={(e)=> setName(e.target.value)} />
    <label class="form-label" for="form2Example1">Email address</label>
  </div>

  {/* <!-- Password input --> */}
  <div class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" 
    onChange={(e)=> setPassword(e.target.value)}/>
    <label class="form-label" for="form2Example2">Password</label>
  </div>

  {/* <!-- 2 column grid layout for inline styling --> */}
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      {/* Checkbox */}
      {/* <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div> */}
    </div>

    <div class="col">
      {/* Simple link */}
      <a href="#!">Forgot password?</a>
    </div>
  </div>

  {/* Submit button */}
  <button type="submit" class="btn btn-primary btn-block mb-4" 
  onClick={(e)=>handleLogin(e)}>Sign in</button>

  {/* Register buttons */}
  <div class="text-center">
    <p>Not a member? <Link to="/register">Register</Link></p>
    
  </div>
</form>
    </>
  )
}

export default Login
