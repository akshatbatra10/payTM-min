import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Balance = ({ balance, setBalance }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) navigate("/signin");

    const getBalance = async () => {
      try {
        const response = await axios({
          url: "http://localhost:3000/api/v1/account/balance",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBalance(response.data.balance);
      } catch (error) {
        return (
          <div
            className="bg-red-100 border w-[28rem] border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              {error.response.data.message}
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        );
      }
    };
    getBalance();
  }, [navigate, setBalance]);

  return (
    <div className="px-8 py-4 text-lg">
      <p className="font-semibold">
        Your Balance $<span>{balance}</span>
      </p>
    </div>
  );
};
