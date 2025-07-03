import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-center text-[#7e69ab] font-bold text-2xl">Sign Up</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#7e69ab] text-white py-2 rounded hover:opacity-90 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">OR</div>

        <button
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 cursor-pointer rounded-md hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#7e69ab] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
