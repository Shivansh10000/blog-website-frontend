# Blog Website Frontend

<p align="center">
  <img src="https://github.com/Shivansh10000/blog-website-frontend/assets/94700224/8f1d7e58-bec0-4c09-8c18-c9b655b34a1f" alt="Home Page" width="945">
</p>

Welcome to the frontend of the Blog Website! This repository contains the code for the frontend of the blog website, which allows users to view and interact with blogs, post their own blogs, like, comment, and perform various other actions.

The backend of this blog website is hosted separately, and you can find its repository here: [Blog Website Backend](https://github.com/Shivansh10000/blog-website-backend)

## Features

- **View Blogs:** Users can explore and view blogs posted by other users. Blogs are sorted based on the total number of likes, ensuring the most liked ones appear on top.

- **Post Blogs:** Authenticated users can create and publish their own blogs. The website provides a user-friendly interface to write and share their thoughts.

- **Like Blogs:** Users can like blogs that they find interesting. The number of likes on each blog is displayed, allowing users to see which blogs are popular.

- **Comment on Blogs:** Authenticated users can leave comments on blogs, engaging in discussions and providing feedback.

- **Login and Signup Functionality:** The website offers secure user authentication through a login and signup functionality.

- **JWT Encryption:** To enhance security, we use JSON Web Tokens (JWT) to encrypt sensitive information like passwords, ensuring secure communication between the frontend and backend.

- **Protected Routes:** Sensitive routes, such as updating or deleting posts, are protected by middleware and authorization, ensuring that only the authenticated user who posted the blog can perform these actions.

- **Update and Delete Blogs:** Users can edit or delete their own blogs, allowing them to make changes later if needed.

- **Save Blogs:** Users can save blogs they like to view them later in a separate section.

- **Sorting Options:** Users can choose to view blogs based on likes or show them in chronological order, displaying the most recent ones on top.

- **MongoDB Database:** All user information, blogs, likes, and comments are stored in a MongoDB database.

- **Hosting:** The frontend of the blog website is hosted on Netlify, and the backend is hosted on Render.

**Note:** As the website is hosted, it may take some time for blogs to load, depending on the server response.

<p align="center">
  <img src="https://github.com/Shivansh10000/blog-website-frontend/assets/94700224/ecbc0846-22a6-46b6-b567-d75ab52670e7" alt="Inside a Post" width="939">
</p>

## Technologies Used

- **React:** The website is built using React, a popular JavaScript library for building user interfaces, providing a dynamic and interactive user experience.

- **Tailwind CSS:** We've used Tailwind CSS to style the website. Tailwind CSS is a utility-first CSS framework, offering a responsive and customizable design.

- **Node.js and Express.js:** The backend of the blog website is built using Node.js and Express.js, providing a robust server-side environment.

- **MongoDB:** We use MongoDB, a NoSQL database, to store all user information, blogs, likes, and comments.

- **JWT (JSON Web Tokens):** JSON Web Tokens are used to encrypt sensitive information, ensuring secure communication between the frontend and backend.

- **Netlify and Render:** The frontend is hosted on Netlify, while the backend is hosted on Render.

<p align="center">
  <img src="https://github.com/Shivansh10000/blog-website-frontend/assets/94700224/4b3e8203-b725-42c8-a52f-8631475a6361" alt="Features of Each Post" width="942">
</p>

<p align="center">
  <img src="https://github.com/Shivansh10000/blog-website-frontend/assets/94700224/5b4d13b8-978a-4d7f-b801-51796f9dff1e" alt="User's Saved Posts" width="934">
</p>

<p align="center">
  <img src="https://github.com/Shivansh10000/blog-website-frontend/assets/94700224/c37008ec-8f4c-4ba7-821c-64cf9d14721c" alt="Login Page" width="942">
</p>

<p align="center">
  <img src="https://github.com/Shivansh10000/blog-website-frontend/assets/94700224/a171378b-fd96-498d-aa46-add49c505c0d" alt="User Profile Page" width="927">
</p>

<p align="center">
  <img src="https://github.com/Shivansh10000/blog-website-frontend/assets/94700224/0d7c328c-16bc-4597-acda-33717012ad6c" alt="Specific Tag Show Up Only on Loggedin User's Post" width="937">
</p>

---

Thank you for exploring the frontend of our blog website! We hope you find the platform engaging and user-friendly. If you have any questions or feedback, please feel free to contact us. Enjoy reading and writing blogs!
