import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
  const initialFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        url: "http://localhost:3000/api/v1/user/signin",
        method: "POST",
        data: formData,
      });

      localStorage.setItem("auth-token", response.data.token);

      setFormData(initialFormData);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
      setShowMessage({
        state: true,
        message: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="flex flex-col overflow-y-auto overflow-x-hidden bg-gray-300 justify-center items-center w-full md:inset-0 h-screen"
      >
        {showMessage.state && (
          <div
            className="bg-red-100 border w-[28rem] border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Sign in error! </strong>
            <span className="block sm:inline">{showMessage.message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => setShowMessage({ state: false, message: "" })}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex flex-col items-center justify-between p-4 md:p-5 rounded-t ">
              <h3 className="text-4xl font-bold text-gray-900 mb-3">Sign In</h3>
              <p className="text-gray-500 text-lg">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="p-6 md:p-5 space-y-4">
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@email.com"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-md font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center "
                >
                  Sign In
                </button>
              </form>
              <div className="flex justify-center">
                <p className="font-semibold">
                  Dont&apos;t have an account?{" "}
                  <Link className="underline underline-offset-2" to="/signup">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
