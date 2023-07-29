import React, { useState } from "react";

const MyComponent: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make an API request to the ChatGPT API with the input text
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Your_api_key",
            // Authorization: "Bearer YOUR_API_KEY",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // Specify the model you want to use
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant.",
              },
              {
                role: "user",
                content: inputText,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      // Extract the response from the API and update the state
      console.log(data);
      setResponseText(data.choices[0].message.content);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 border rounded-lg shadow-md bg-white">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        className="w-full border border-teal-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200"
        placeholder="Enter your message..."
      />
      <button
        onClick={handleSubmit}
        disabled={!inputText}
        className={`mt-4 w-full bg-${
          inputText ? "teal-500" : "gray-300"
        } text-white px-4 py-2 rounded-md ${
          inputText ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        Start
      </button>
      {responseText && (
        <div className="mt-4 border-t pt-4">
          <p className="text-teal-500 font-bold">Response:</p>
          <p className="mt-2">{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
