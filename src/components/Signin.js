import { useState } from "react";
export default function Signin() {
  async function signin(data) {
    // Default options are marked with *
    const response = await fetch("http://localhost:3001/signin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const [formFields, setFormFields] = useState({ username: "", password: "" });
  const [tokens, setTokens] = useState({ refreshToken: "", accessToken: "" });
  const handleChange = (e) => {
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = formFields;

    const res = await signin(user);
    const { refreshToken, accessToken } = res;
    console.log("response:" + JSON.stringify(res));

    setTokens(res);
  };

  return (
    <div>
      <h1>Signin Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">username</label>
        <input
          value={formFields.username}
          onChange={handleChange}
          name="username"
        />
        <label htmlFor="">password</label>
        <input
          value={formFields.password}
          onChange={handleChange}
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
