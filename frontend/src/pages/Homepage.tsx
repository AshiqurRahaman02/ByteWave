import React, { useState } from "react";
import logo from "../assets/logo.png";
// import interview from "../assets/interview.png";
import interview from "../assets/interview.jpg";
import { Link } from "react-router-dom";
import MyComponent from "../components/MyComponent";
import AestheticLoading from "../components/AestheticLoading";

const Homepage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [validator, setValidator] = useState("");
  const [welcome, setWelcome] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState("");
  const [textarea, setTextArea] = useState("");

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextArea(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleReplyClick = () => {};
  const handleStartButtonClick = () => {
    setIsInputVisible(false);
    setChat("");
    const userID = localStorage.getItem("bytewaveid");
    if (userID && selectedOption) {
      const interviewData = {
        msg: "Start the Interview",
        userID: userID,
        systemMsg:
          "I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the position of Backend Software Developer.That will require me to have the following content:Node basics Express Mongodb Redis web-sockets.I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the coding technical interview with me. Ask me the questions and wait for my answers. I will say the phrase “start the interview” for you to start. Ask one question at a time.{<Ask me the questions individually like an interviewer and wait for my answers.>}Questions can include both new questions and follow up questions from the previous questions. Continue the process until I ask you to stop.  And, you will stop the interview when I tell you to stop using the phrase “stop the interview”. After that, you would provide me feedback.The feedback should be evaluated using the following rubrics:Subject Matter Expertise Communication skills Hiring criteria : Options are Reject, Waitlist, Hire and Strong Hire .Feedback for Subject Matter Expertise and Communication skills should contain ratings on my interview responses from 0 - 10 Some Example questions:1. Create a todo app 2. Explain useState and useEffect through code 3. How to debug this piece of code.important note - only ask one question at a time and share the feedback as soon as interview stops",
      };
      // Make the POST request
      console.log("here");
      setLoading(true);
      fetch("https://bytewave-backend.onrender.com/session/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interviewData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data if needed
          setLoading(false);
          console.log(data);
          setChat(data.reply);
          localStorage.setItem("bytewavesessionID", data.sessionID);
        })
        .catch((error) => {
          // Handle errors if necessary
          console.error("Error:", error);
        });
    }
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
              <p className="font-bold">Hi, {username}</p>
              <p className="text-sm">{welcome}</p>
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
              onClick={async () => {
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
                // Make the post request
                try {
                  const response = await fetch(
                    "https://bytewave-backend.onrender.com/user/register",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email: email,
                        name: username,
                      }),
                    }
                  );

                  const data = await response.json();

                  // Store the userid in local storage with the key name "bytewaveid"

                  if (data?.user?._id) {
                    localStorage.setItem("bytewaveid", data.user._id);
                  }
                  setWelcome(data.message);
                } catch (error) {
                  console.error("Error:", error);
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
          <h2>
            Choose A course from Below and the Click on the Start Interview
            Button ⬇️
          </h2>
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
          <div className="flex justify-center items-center ">
            <div className="bg-gray-200 rounded-lg p-4 w-70">
              {loading ? <AestheticLoading /> : null}
              <p className="font-bold">
                {chat && selectedOption
                  ? chat
                  : selectedOption
                  ? ""
                  : "Loading.....!"
                  ? !chat && !selectedOption
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <textarea
              value={textarea}
              onChange={handleTextAreaChange}
              placeholder="Enter your Response"
              disabled={!selectedOption || chat === ""}
              className="border rounded-lg px-2 py-1"
              style={{ width: "70%", minHeight: "100px" }}
            />

            <button
              className={`mt-2 bg-teal-500 text-white px-4 py-2 rounded-lg ${
                chat === "" ? "cursor-not-allowed opacity-20" : "cursor-pointer"
              }`}
              disabled={chat === ""}
              onClick={handleReplyClick}
            >
              Reply
            </button>
          </div>

          <div className="flex items-center justify-center">
            {!chat ? (
              <img
                src={interview}
                alt="Logo"
                className="h-80 object-contain rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-xl"
                // style={{ maxHeight: "40px" }}
              />
            ) : null}
          </div>
          <button
            onClick={handleStartButtonClick}
            disabled={(!selectedOption && chat === "") || loading}
            className={`mt-4 bg-${
              selectedOption ? "teal-500" : "gray-400"
            } text-white px-4 py-2 rounded-lg ${
              selectedOption ? "cursor-pointer" : "cursor-not-allowed"
            } ${selectedOption ? "" : "border-black  bg-teal-500 "}`}
            style={{ opacity: selectedOption ? 1 : 0.2 }} // Optional: Reduce opacity for disabled button
          >
            Start the Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
