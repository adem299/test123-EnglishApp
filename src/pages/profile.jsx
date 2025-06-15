import { useState, useEffect, useRef } from "react";
import { User, Lock, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfileSettings() {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();
  const { id } = useParams();

  const menuItems = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "account", label: "Account Security", icon: Lock },
    { id: "logout", label: "Logout", icon: LogOut, danger: true },
  ];

  // Predefined list of available interests
  const availableInterests = [
    "Fitness",
    "Design",
    "Music",
    "KPOP",
    "Sports",
    "Programming",
    "Food & Drink",
    "Automotive",
    "Anime",
    "Medical",
    "Travel",
  ];

  const [formData, setFormData] = useState({
    profileImage: "",
    fullname: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    interests: [],
    cefr_level: "",
    created_at: "",
  });

  const [profileImage, setProfileImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
  );
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("attempt_id");

    window.location.href = "/login"; 
};


  useEffect(() => {
    fetch(`http://localhost:8000/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const profilePhotoUrl = data.photo_profile
          ? `http://localhost:8000${data.photo_profile}`
          : "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg";
        setFormData({
          // profileImage: profilePhotoUrl || "",
          fullname: data.fullname || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          interests: data.interests || [],
          cefr_level: data.cefr_level || "",
          created_at: data.created_at || "",
        });

        setProfileImage(profilePhotoUrl);
        console.log("Data user:", data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data user:", err);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interests") {
      setFormData((prev) => {
        // Jika checkbox dicentang, tambahkan ke array
        if (checked) {
          return {
            ...prev,
            interests: [...prev.interests, value],
          };
        } else {
          // Jika tidak dicentang, hapus dari array
          return {
            ...prev,
            interests: prev.interests.filter((item) => item !== value),
          };
        }
      });
    } else {
      // Untuk input biasa (teks, email, dsb)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const promises = [];

    // 1. Update data profil dasar
    promises.push(
      fetch(`http://localhost:8000/profile/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          bio: formData.bio,
        }),
      })
    );

    // 2. Update minat
    promises.push(
      fetch(`http://localhost:8000/profile/${id}/interests`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData.interests),
      })
    );

    // 3. Update foto profil (jika ada gambar baru)
    if (formData.profileImage) {
      const photoData = new FormData();
      photoData.append("file", fileInputRef.current.files[0]);

      promises.push(
        fetch(`http://localhost:8000/profile/${id}/photo`, {
          method: "PUT",
          body: photoData,
        })
      );
    }

    Promise.all(promises)
      .then(() => {
        alert("Profil berhasil diperbarui!");
      })
      .catch((err) => {
        console.error("Gagal update:", err);
        alert("Terjadi kesalahan saat menyimpan profil.");
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full p-4 bg-white shadow-sm md:w-64 md:min-h-screen">
          <button
            onClick={handleBack}
            className="flex items-center w-full gap-3 px-3 py-2 mb-4 text-left text-gray-700 transition rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
            <p className="text-sm text-gray-500">Manage your account</p>
          </div>

          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition
                      ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-600"
                          : item.danger
                          ? "text-red-600 hover:bg-red-50"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {activeSection === "profile" && (
            <div>
              <h1 className="mb-6 text-2xl font-bold text-gray-800">
                Profile Information
              </h1>

              <div className="p-6 bg-white shadow-sm rounded-xl">
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="object-cover w-24 h-24 border border-gray-200 rounded-full"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageURL = URL.createObjectURL(file);
                        setProfileImage(imageURL);
                        setFormData((prev) => ({
                          ...prev,
                          profileImage: file,
                        }));
                      }
                    }}
                    className="hidden"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {formData.fullname}
                    </h2>
                    <p className="text-gray-500">@{formData.username}</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="mt-2 text-sm font-medium text-blue-500"
                    >
                      Change profile photo
                    </button>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-2xl text-gray-800">Level {formData.cefr_level}</p>
                    <p className="text-xs text-gray-500">Member since {formatDate(formData.created_at)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Fullname
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Interests
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-3 bg-white border border-gray-300 rounded-lg">
                      {availableInterests.map((interest) => (
                        <label
                          key={interest}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name="interests"
                            value={interest}
                            checked={formData.interests.includes(interest)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {interest}
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Select your interests (choose as many as you like).
                    </p>
                    {formData.interests.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">
                          Selected Interests:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.interests.map((interest) => (
                            <span
                              key={interest}
                              className="inline-flex items-center px-2 py-1 text-sm text-blue-600 rounded-full bg-blue-50"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <p className="mt-1 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "account" && (
            <div>
              <h1 className="mb-6 text-2xl font-bold text-gray-800">Account Security</h1>
              <div className="flex items-center justify-center h-64 bg-white shadow-sm rounded-xl">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-700">Account settings</h3>
                  <p className="mt-2 text-gray-500">This section is under construction</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "logout" && (
            <div className="flex flex-col items-center justify-center h-64 bg-white shadow-sm rounded-xl">
              <h1 className="mb-4 text-2xl font-bold text-gray-800">Confirm Logout</h1>
              <p className="mb-6 text-gray-500 text-center max-w-md">
                Are you sure you want to log out of your account? You’ll be returned to the login page.
              </p>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-6 py-3 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
