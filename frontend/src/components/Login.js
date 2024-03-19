import react from "react";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(email, password);
  };
  return (
    <div className="register-container">
      <h1 className="register-title">Login</h1>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter password"
          className="input-field"
        />
      </div>
      <button onClick={login} className="register-button">
        Login
      </button>
    </div>
  );
};

export default Login;
