import React, { useState } from 'react';

function ProfileEditor() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setProfile(prevProfile => ({
      ...prevProfile, // 1. คัดลอกค่าเดิมทั้งหมดมาก่อน
      [name]: value   // 2. เขียนทับเฉพาะ key ที่ต้องการเปลี่ยนแปลง
    }));
  };

  return (
    <div>
      <h2>Lab 1.3: Object State</h2>
      <input name="firstName" value={profile.firstName} onChange={handleInputChange} placeholder="First Name" />
      <input name="lastName" value={profile.lastName} onChange={handleInputChange} placeholder="Last Name" />
      <input name="email" value={profile.email} onChange={handleInputChange} placeholder="Email" />
      
      <div>
        <h3>Current Profile:</h3>
        <p>First Name: {profile.firstName}</p>
        <p>Last Name: {profile.lastName}</p>
        <p>Email: {profile.email}</p>
      </div>
    </div>
  );
}

export default ProfileEditor;