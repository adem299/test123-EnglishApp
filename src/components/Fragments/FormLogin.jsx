import { useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { loginUser } from "../../services/user.service";

const FormLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    loginUser(formData.username, formData.password, (data) => {
      setLoading(false);
      if (data.err) {
        setError(data.err.response?.data?.detail || "Invalid username or password kekek");
      } else {
        console.log("Login Success:", data);
        localStorage.setItem("username", formData.username);
        // localStorage.setItem("token", data.token);
        // window.location.href = "/dashboard";
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
      />
      <InputForm
        label="Password"
        type="password"
        name="password"
        placeholder="********"
        value={formData.password}
        onChange={handleChange}
      />
      <Button className="bg-blue-600 w-full" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};

export default FormLogin;