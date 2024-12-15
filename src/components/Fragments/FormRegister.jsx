import React, { useState, useEffect } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import useRegisterUser from "../../services/register.service"; // Pastikan path-nya benar

const FormRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { message, loading, error, registerUser } = useRegisterUser();

  // State untuk error khusus di FormRegister
  const [formError, setFormError] = useState("");
  
  // State untuk menampilkan pop-up pesan sukses
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi password dan confirm password
    if (formData.password !== formData.confirmPassword) {
      setFormError("Password and Confirm Password must match!");
      return; // Hentikan form submission
    }

    // Bersihkan error sebelum mengirim data
    setFormError("");

    // Kirim data form jika password cocok
    registerUser(formData);
  };

  // Menangani ketika registrasi berhasil
  useEffect(() => {
    if (message) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Sembunyikan pop-up setelah 3 detik
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit}>
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

      {/* Menampilkan error yang datang dari form */}
      {formError && <p style={{ color: "red" }}>{formError}</p>}

      {/* Menampilkan error dari API */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Menampilkan pesan sukses jika registrasi berhasil */}
      {message && showSuccess && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          backgroundColor: 'green', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px',
          zIndex: '1000' 
        }}>
          {message}
        </div>
      )}
    </form>
  );
};

export default FormRegister;
