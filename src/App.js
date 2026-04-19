import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";

    if (!form.email)
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.password)
      newErrors.password = "Password required";
    else if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Registration Successful ✅");
      setForm({ name: "", email: "", password: "" });
    }
  };

  const isValid =
    form.name &&
    form.email &&
    form.password &&
    Object.keys(validate()).length === 0;

  return (
    <div className="form-wrapper">
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Registration Form</h2>
      
<div className="field">
      <form onSubmit={handleSubmit}>
        <div>
      <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.name}</p>
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.email}</p>
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.password}</p>
        </div>

        <button disabled={!isValid}>Submit</button>
        {success && <div className="success-msg">{success}</div>}

      </form>
    </div>
    </div>
    </div>
  );
}

export default App;