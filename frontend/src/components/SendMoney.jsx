import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export const SendMoney = ({ open, setOpen, user, setBalance }) => {
  const { firstName, lastName, _id } = user;
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState({
    state: false,
    message: "",
  });

  const handleTransfer = async () => {
    if (!token) return navigate("/signin");

    try {
      await axios({
        url: "http://localhost:3000/api/v1/account/transfer",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { to: _id, amount },
      });

      setBalance((prevBalance) => prevBalance - amount);
      setOpen(false);
    } catch (error) {
      setShowErrorMessage({
        state: true,
        message: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          !open ? "hidden" : "backdrop-blur-sm transition-transform"
        } flex flex-col overflow-y-auto overflow-x-hidden fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        {showErrorMessage.state && (
          <div
            className="bg-red-100 border w-[28rem] border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{showErrorMessage.message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() =>
                  setShowErrorMessage({ state: false, message: "" })
                }
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
              onClick={() => setOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <h1 className="text-3xl font-bold mb-8">Send Money</h1>
              <div className="flex items-center mb-4">
                <div className="rounded-full h-12 w-12 text-white bg-green-500 flex justify-center mt-1 mr-2">
                  <div className="flex flex-col justify-center h-full text-xl">
                    {firstName.charAt(0)}
                  </div>
                </div>
                <h3 className="text-xl font-medium">
                  {firstName} {lastName}
                </h3>
              </div>
              <div>
                <div className="mb-5">
                  <label
                    htmlFor="amount"
                    className="text-left block mb-2 text-md font-medium text-gray-900"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleTransfer}
                className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center "
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
