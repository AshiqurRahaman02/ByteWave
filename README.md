# ByteWave

# Interview Preparation IA

This project aims to develop an Interview Preparation Intelligent Assistant (IA) using React and Node.js. The IA will provide users a platform to enhance their interview skills and prepare for various job interviews. This README will guide you through the project's installation, setup, and usage.

# Features:

1.  User registration

2.  Comprehensive interview question database.

3.  Categorized question sets for different roles in fullstack webdevloper position.

4.  Practice mode to simulate real interview scenarios.

5.  AI-powered feedback and suggestions for improvement.

# Tech Stacks:

1.  React : A JavaScript library for building user interfaces.

2.  Node.js: A JavaScript runtime environment for server-side development.

3.  Express.js: A minimal and flexible Node.js web application framework.

4.  MongoDB: A NoSQL database for storing user information and interview questions.

OpenAI for providing the underlying technology and inspiration for this project.
The open-source community for the amazing tools and libraries used in this project.

Thank you for using Interview Preparation IA! We hope this tool helps you excel in your job interviews. Good luck!

# Backend Documentation:

<h2> Deployend Link: https://bytewave-backend.onrender.com/</h2>

<h2> Routes Information </h2>

<h3>1. Registeration Route for user :</h3>

<h3> https://bytewave-backend.onrender.com/ user / register  </h3>

<p> In this route user have to enter his detailes like "name" and "email" for registering in this app. On successful registeration he will get his userID in the response.</p>

</hr>

<h3>2. For start the conversation with the AI : </h3>

<h3> https://bytewave-backend.onrender.com/ session / chat</h3>

<p> When user want to  start the conversation for the first time with the AI then he have to pass "msg", "userID" , "systemMsg" as a requirement. After this for the next time he have to pass the "sessionID" with "userID" and the main "msg" to start the interview then the AI will start the interview process. </p>

# Homepage

![Screenshot (1)]()

# Sign Up

![Screenshot (2)]()

# Login Page

![Screenshot (3)]()

# Interview Page

![Screenshot (4)]()
