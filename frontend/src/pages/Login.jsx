// src/pages/Login.jsx
import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <SignIn 
        path="/login"
        routing="path"
        signUpUrl="/login"   // Registration handled in same page
      />
    </div>
  );
}
