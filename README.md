# reseau-social
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
