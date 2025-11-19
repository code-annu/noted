import type React from "react";
import { useState } from "react";
import type { SignupCredential } from "../../../domain/entities/user";
import TextInput from "../../components/common/inputs/TextInputField";
import PasswordInput from "../../components/common/inputs/PasswordInputField";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";
import useAuth from "../../../application/hook/useAuth";
import { handleError } from "../../../util/error-handler-util";
import ErrorMessage from "../../components/common/messages/ErrorMessage";

const SignupPage: React.FC = () => {
  const { signup } = useAuth();

  const [signing, setSigning] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const navigateTo = useNavigate();

  const [signupData, setSignupData] = useState<SignupCredential>({
    username: "",
    password: "",
    fullname: "",
    profilePictureUrl: "",
    bio: "",
  });

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignupError(null);
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigning(true);
    try {
      await signup(signupData);
      navigateTo(AppRoute.HOME);
    } catch (err) {
      console.log(err);
      handleError(err, setSignupError);
    }
    setSigning(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md mb-20">
      <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Username"
          placeholder="e.g. peter123"
          name="username"
          id="username"
          value={signupData.username}
          onChange={handleFormDataChange}
        />

        <TextInput
          label="Fullname"
          placeholder="e.g. Peter Parker"
          name="fullname"
          id="fullname"
          value={signupData.fullname}
          onChange={handleFormDataChange}
        />

        <PasswordInput
          label="Password"
          id="password"
          placeholder="Create a new password"
          name="password"
          value={signupData.password}
          onChange={handleFormDataChange}
        />

        <TextInput
          label="Profile picture url"
          placeholder="Enter the url for your profile picture url"
          name="profilePictureUrl"
          id="profilePictureUrl"
          value={signupData.profilePictureUrl}
          type="url"
          onChange={handleFormDataChange}
        />

        <TextInput
          label="Bio"
          placeholder="Tell use about yourself"
          name="bio"
          id="bio"
          value={signupData.bio || ""}
          type="url"
          rows={5}
          isTextarea
          onChange={handleFormDataChange}
        />

        <ErrorMessage message={signupError} />

        <PrimaryButton text="Signup" disabled={signing} />
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={AppRoute.LOGIN}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
