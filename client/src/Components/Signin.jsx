import React from 'react';

export default function Signin({ userSignIn, signInChangeHandler, fireSignIn }) {
  return (
    <div>
      <h2>Sign in</h2>
      <input 
       name="username"
       type="text"
       placeholder="username"
       value={userSignIn.username}
       onChange={signInChangeHandler}
       />
       <input
       name="password"
       type="password"
       placeholder="password"
       value={userSignIn.password}
       onChange={signInChangeHandler}
       />
        <button onClick={() => fireSignIn(userSignIn)}>Sign up</button>
    </div>
  );
}
