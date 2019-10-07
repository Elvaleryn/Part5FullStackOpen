import React from 'react'

const LoginForm = ({
   handleSubmit,
   username,
   password
  }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            {...username}
            reset={null}
          />
        </div>
        <div>
          password
          <input
            type="password"
            {...password}
            reset={null}
          />
      </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm