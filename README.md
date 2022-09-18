# reseau-social
A social media platform where users can share articles and `photos`, `comment`, and **like** other users' `posts/photos`.

This web app built with using <a href="https://reactjs.org/">React</a> + <a href="https://expressjs.com/">ExpressJS</a>

### Project Details
<ul>
  <li><a href="https://reactjs.org/">React<a/></li>
  <li><a href="https://expressjs.com/">ExpressJS<a/> for handling requests</li>
  <li><a href="https://reactjs.org/docs/context.html">Context API<a/> for state management</li>
  <li><a href="https://axios-http.com/docs/intro">Axios<a/> for making API calls</li>
  <li><a href="https://jwt.io">JSON WEB TOKEN<a/> for user actions</li>
 </ul>

![resim](https://user-images.githubusercontent.com/66440491/190895221-09c543e1-4b08-4a99-97e2-605758c8d12b.png)

## Getting Started
<ul>
  <li>Clone this repo</li>
  <li>Backend Setup</li>
  <ul>
    <li>Navigate back folder with <code>cd back</code> command</li>
    <li> <code>npm install</code>  to install all required dependencies</li>
    <li>Create MongoDb Cluster and Get Connection MongoDb URI</li>
    <li>Set environment variables in <code>.env</code></li>
    <ul>
      <li>Set <code>JWT_SECRET = YOUR_SECRET_KEY </code> </li>
        <li>Set <code>JWT_REFRESH_SECRET = YOUR_REFRESH_SECRET_KEY </code></li>
        <li>Set <code>MONGO_URI = YOUR_MONGO_URI </code></li>
    </ul>
    <li><code>npm run start</code> to start the local server</li>
  </ul>
  <li>
    Frontend Setup
  </li>
  <ul>
     <li>Navigate front folder with <code>cd back</code> command</li>
    <li> <code>npm install</code>  to install all required dependencies</li>
    <li>Set environment variables in <code>.env</code></li>
    <ul>
      <li>Set <code>REACT_APP_ENDPOINT = YOUR_BACKEND_URI </code> </li>
    </ul>
    <li><code>npm run start</code> to start the local server</li>
  </ul>
</ul>

## Authentication
Requests are authenticated using the `Authorization ` header and value `<YOUR_JWT_TOKEN>` with a valid JWT.
We define express middlewares in `back/src/helpers/jwt` in `verifyAccessToken` function that can be used to authenticate requests. The required middlewares returns `401` or `403`.

## Credits
berkanefesunal

## .ENV
### For Frontend
Key | defaultValue | Description 
--- | --- | ---
REACT_APP_ENDPOINT | localhost:5000 | Your Backend URL
### For Backend
Key | defaultValue | Description 
--- | --- | ---
JWT_SECRET | null | YOUR_SECRET_KEY
JWT_REFRESH_SECRET | null | YOUR_DIFFERENT_SECRET_KEY
MONGO_URI | null | YOUR_MONGODB_DATABASE_URI
