import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import PasswordInput from "../../components/common/inputs/PasswordInputField";
import TextInput from "../../components/common/inputs/TextInputField";
import useAuth from "../../../application/hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";

function SignupPage() {
  const { user, signup, loading, error } = useAuth();
  const navigateTo = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
    profilePictureUrl: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(form);
  };

  useEffect(() => {
    if (user) {
      navigateTo(AppRoute.HOME);
    }
  }, [user, useNavigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Full Name"
          id="fullname"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
        <TextInput
          label="Username"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <TextInput
          label="Profile Picture URL"
          id="profilePictureUrl"
          name="profilePictureUrl"
          value={form.profilePictureUrl}
          onChange={handleChange}
          placeholder="Enter your profile picture URL"
          type="url"
        />
        <TextInput
          label="Bio"
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Write something about yourself"
          isTextarea
          rows={3}
        />
        <PrimaryButton text="Signup" disabled={loading} />
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to={AppRoute.LOGIN}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
