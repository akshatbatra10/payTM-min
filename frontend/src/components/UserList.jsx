import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SendMoney } from "./SendMoney";

// eslint-disable-next-line react/prop-types
export const UserList = ({ setBalance }) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) navigate("/signin");

    const getAllUsers = async (filter) => {
      try {
        const response = await axios({
          url: filter
            ? `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
            : "http://localhost:3000/api/v1/user/bulk",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUsers();
  });

  return (
    <div className="px-8 py-4">
      <h1 className="font-bold mb-2 text-xl">Users</h1>

      <form className="max-w-full">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Mockups, Logos..."
          />
        </div>
      </form>
      <div>
        <ul className="list-none mt-4">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between mb-2">
              <span className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                  <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName.charAt(0)}
                  </div>
                </div>
                <p className="text-md font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </span>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                onClick={() => setOpen(true)}
              >
                Send Money
              </button>

              <SendMoney
                open={open}
                setOpen={setOpen}
                user={user}
                setBalance={setBalance}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
