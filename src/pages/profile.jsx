import { useState } from 'react';
import { User, Lock, Bell, Globe, Shield, Palette, HelpCircle, LogOut } from 'lucide-react';

export default function ProfileSettings() {
  const [activeSection, setActiveSection] = useState('profile');
  
  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'account', label: 'Account Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut, danger: true }
  ];
  
  const initialFormData = {
    firstName: 'Alex',
    lastName: 'Johnson',
    username: 'alexjohnson',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    bio: 'Passionate about creating beautiful, functional user experiences that solve real problems.',
    location: 'San Francisco, CA',
    website: 'alexjohnson.design'
  };
  
  const [formData, setFormData] = useState(initialFormData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Show success message
    alert('Profile updated successfully!');
  };
  
  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-sm p-4 md:min-h-screen">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Settings</h2>
            <p className="text-sm text-gray-500">Manage your account</p>
          </div>
          
          <nav>
            <ul className="space-y-1">
              {menuItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition
                      ${activeSection === item.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : item.danger 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-gray-700 hover:bg-gray-100'
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
          {activeSection === 'profile' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h1>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-4 mb-8">
                  <img 
                    src="/api/placeholder/100/100" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{formData.firstName} {formData.lastName}</h2>
                    <p className="text-gray-500">@{formData.username}</p>
                    <button className="mt-2 text-blue-500 text-sm font-medium">Change profile photo</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <p className="mt-1 text-sm text-gray-500">Brief description for your profile.</p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-3">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeSection !== 'profile' && (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700">
                  {menuItems.find(item => item.id === activeSection)?.label} settings
                </h3>
                <p className="text-gray-500 mt-2">This section is under construction</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}