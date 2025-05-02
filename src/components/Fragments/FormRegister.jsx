import { useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { registerUser } from "../../services/user.service";

const FormRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    interests: [],
  });

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const interestOptions = ["reading", "traveling", "coding"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, interests: [...formData.interests, value] });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((interest) => interest !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullname ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.interests
    ) {
      setFormError("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Password and Confirm Password must match!");
      return;
    }

    setFormError("");
    setLoading(true);

    registerUser(
      formData.fullname,
      formData.username,
      formData.password,
      formData.interests,
      (data) => {
        setLoading(false);
        if (data.err) {
          setFormError(
            data.err.response?.data?.detail || "Registration failed"
          );
        } else {
          console.log("Success:", data);
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            window.location.href = "/interest"; // Redirect setelah sukses
          }, 3000);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputForm
        label="Fullname"
        type="text"
        name="fullname"
        placeholder="Insert your name here..."
        value={formData.fullname}
        onChange={handleChange}
      />
      <InputForm
        label="Username"
        type="text"
        name="username"
        placeholder="Username"
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
      <InputForm
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="********"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <Button className="bg-blue-600 w-full" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>

      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      {showSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Registration Successful! Redirecting...
        </div>
      )}
    </form>
  );
};

export default FormRegister;
