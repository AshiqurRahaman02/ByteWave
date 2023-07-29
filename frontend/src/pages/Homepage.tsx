import React, { useState } from "react";
import logo from "../assets/logo.png";
import interview from "../assets/interview.png";
import { Link } from "react-router-dom";
import MyComponent from "../components/MyComponent";

const Homepage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [validator, setValidator] = useState("");
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleStartButtonClick = () => {
    setIsInputVisible(false);
  };

  return (
    <div className="bg-e8e6e7 min-h-screen">
      <div className="bg-teal-500 text-white py-3 px-4 fixed w-full top-0">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img
              src={logo}
              alt="Logo"
              className="h-8 object-contain"
              // style={{ maxHeight: "40px" }}
            />
          </Link>
          {username && (
            <div className="text-right">
              <p className="font-bold">{username}</p>
              <p className="text-sm">Welcome !</p>
            </div>
          )}
        </div>
      </div>

      {isInputVisible && (
        <div className="fixed inset-0 bg-black opacity-70 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="mb-2 font-bold">Enter your name:</p>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="border rounded-lg px-2 py-1 w-full"
            />
            <p className="mb-2 font-bold">Enter your Email:</p>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="border rounded-lg px-2 py-1 w-full"
            />
            <button
              onClick={() => {
                if (username.length < 5) {
                  setValidator("Username must be at least 5 characters long.");
                  return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  setValidator("Please enter a valid email address.");
                  return;
                }

                if (email && username) {
                  setIsInputVisible(false);
                  setValidator("");
                }
              }}
              className="mt-2 bg-teal-500 text-white px-4 py-1 rounded-lg"
            >
              OK
            </button>
            <p className="text-red-600 mt-2 text-sm">{validator}</p>
          </div>
        </div>
      )}

      {!isInputVisible && (
        <div className="mt-16 p-4">
          <div className="mb-4">
            <input
              type="radio"
              value="MERN"
              checked={selectedOption === "MERN"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label className="mr-4">MERN</label>

            <input
              type="radio"
              value="JAVA"
              checked={selectedOption === "JAVA"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label className="mr-4">JAVA</label>

            <input
              type="radio"
              value="Node"
              checked={selectedOption === "Node"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label>Node</label>
          </div>

          <input
            type="text"
            placeholder="Enter something"
            disabled={!selectedOption}
            className="border rounded-lg px-2 py-1 w-full"
          />
          <div className="flex items-center justify-center">
            <img
              src={interview}
              alt="Logo"
              className="h-80 object-contain rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-xl"
              // style={{ maxHeight: "40px" }}
            />
          </div>
          <button
            onClick={handleStartButtonClick}
            disabled={!selectedOption}
            className={`mt-4 bg-${
              selectedOption ? "teal-500" : "teal-500"
            } text-white px-4 py-2 rounded-lg ${
              selectedOption ? "cursor-pointer" : "cursor-not-allowed"
            } ${selectedOption ? "" : "border-teal-500"}`}
          >
            Start
          </button>
          <MyComponent />
        </div>
      )}
    </div>
  );
};

export default Homepage;
