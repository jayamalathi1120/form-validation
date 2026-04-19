import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState("");

  const validate = (values) => {
    let newErrors = {};

    if (!values.name) newErrors.name = "Name is required";

    if (!values.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) newErrors.email = "Invalid email format";

    if (!values.password) newErrors.password = "Password is required";
    else if (values.password.length < 6) newErrors.password = "Minimum 6 characters";

    return newErrors;
  };

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // Re-validate only touched fields
    if (touched[e.target.name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setErrors(validate({ ...form }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true });

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Registration Successful ✅");
      setForm({ name: "", email: "", password: "" });
      setTouched({});
    }
  };

  const isValid = Object.keys(validate(form)).length === 0;

  return (
    <div className="form-wrapper">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Registration Form</h2>

        <form className="field" onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <p style={{ color: "red", margin: "4px 0" }}>{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p style={{ color: "red", margin: "4px 0" }}>{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <p style={{ color: "red", margin: "4px 0" }}>{errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={!isValid}>Submit</button>
          {success && <div className="success-msg">{success}</div>}
        </form>
      </div>
    </div>
  );
}

export default App;
