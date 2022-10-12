import React from 'react'

const LoginForm = ({handleLogin, handleUsername, handlePassword}) => {
  return (
    <form onSubmit={handleLogin}>
        <h2>Log in to the application</h2>
        <div>
        username:
        <input type='text' onChange={handleUsername}/>

        </div>
        <div>
        password:
        <input type='password' onChange={handlePassword}/>

        </div>

<button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm