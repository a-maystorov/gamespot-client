import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) setError('Invalid username or password');
    console.log('Username: ', username);
    console.log('Password: ', password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="username" className="mt-3">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="form-control rounded-pill"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="mt-3">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control rounded-pill"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div
            className="form-control alert-danger rounded-pill mt-4"
            role="alert">
            {error}
          </div>
        )}
        <button className="btn btn-primary rounded-pill my-3">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
