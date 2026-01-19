import React from "react";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
        <p>Name: Kajal Mishra</p>
        <p>Email: kajal@example.com</p>
      </div>
    </div>
  );
}
