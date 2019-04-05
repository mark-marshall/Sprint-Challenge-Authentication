import React from 'react';

export default function Signup({ user, userChangeHandler, fireSignUp }) {
    return (
   <div>
       <h2>Register</h2>
       <input 
       name="username"
       type="text"
       placeholder="username"
       value={user.username}
       onChange={userChangeHandler}
       />
       <input
       name="password"
       type="password"
       placeholder="password"
       value={user.password}
       onChange={userChangeHandler}
       />
        <button onClick={() => fireSignUp(user)}>Sign up</button>
   </div>
    );
}