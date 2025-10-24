import React from "react";

function Settings({ user, onLogout }) {
  return (
    <div>
      <h2>Settings</h2>
      <p>Username: {user?.username}</p>
      <p>Role: {user?.role}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Settings;
