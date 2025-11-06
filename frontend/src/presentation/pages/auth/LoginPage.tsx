import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";
import PasswordInput from "../../components/common/PasswordInputField";
import TextInput from "../../components/common/TextInputField";
import useAuth from "../../../application/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";

function LoginPage() {
  const { login, error, user } = useAuth();
  const navigateTo = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  useEffect(() => {
    console.log("You are in login page: ", user);
    if (user) {
      navigateTo(AppRoute.HOME);
    }
  }, [user, navigateTo]);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Username"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        <PasswordInput
          label="Password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <PrimaryButton text="Login" />
      </form>
      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to={AppRoute.SIGNUP}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
