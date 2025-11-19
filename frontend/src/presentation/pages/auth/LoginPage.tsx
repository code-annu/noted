import type React from "react";
import { useState } from "react";
import type { LoginCredential } from "../../../domain/entities/user";
import TextInput from "../../components/common/inputs/TextInputField";
import PasswordInput from "../../components/common/inputs/PasswordInputField";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";
import useAuth from "../../../application/hook/useAuth";
import { handleError } from "../../../util/error-handler-util";
import ErrorMessage from "../../components/common/messages/ErrorMessage";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigateTo = useNavigate();

  const [loginData, setLoginData] = useState<LoginCredential>({
    username: "",
    password: "",
  });

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginError(null);
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      await login(loginData);
      navigateTo(AppRoute.HOME);
    } catch (err) {
      console.log("error is: ", err);
      handleError(err, setLoginError);
    }
    setLoggingIn(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md mb-20">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Username"
          placeholder="Enter your username"
          name="username"
          id="username"
          value={loginData.username}
          onChange={handleFormDataChange}
        />

        <PasswordInput
          label="Password"
          id="password"
          placeholder="Enter your password"
          name="password"
          value={loginData.password}
          onChange={handleFormDataChange}
        />

        <ErrorMessage message={loginError} />

        <PrimaryButton text="Login" disabled={loggingIn} />
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={AppRoute.SIGNUP}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
