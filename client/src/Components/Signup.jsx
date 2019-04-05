import React from 'react';

export default function Signup({ userSignUp, signUpChangeHandler, fireSignUp }) {
    return (
   <div>
       <h2>Register</h2>
       <input 
       name="username"
       type="text"
       placeholder="username"
       value={userSignUp.username}
       onChange={signUpChangeHandler}
       />
       <input
       name="password"
       type="password"
       placeholder="password"
       value={userSignUp.password}
       onChange={signUpChangeHandler}
       />
        <button onClick={() => fireSignUp(userSignUp)}>Sign up</button>
   </div>
    );
}
