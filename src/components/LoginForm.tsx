import React, { useState } from 'react';
import Input from './common/Input';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Invalid username or password');
      return;
    }
    console.log('Username: ', username);
    console.log('Password: ', password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitForm}>
        <Input
          label="Username"
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
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
