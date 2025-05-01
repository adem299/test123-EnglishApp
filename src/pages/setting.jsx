import { useState } from 'react';
import { Bell, Globe, Shield, Palette, HelpCircle } from 'lucide-react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('notifications');
  
  const menuItems = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];
  
  
//   const handleChange = () => {
//     // const { name, value } = e.target;
//     // setFormData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleSubmit = () => {
//     // Handle form submission logic here
//     // console.log('Form submitted:', formData);
//     // Show success message
//     alert('Profile updated successfully!');
//   };
  
  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-sm p-4 md:min-h-screen">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Settings</h2>
            <p className="text-sm text-gray-500">Manage your settings</p>
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