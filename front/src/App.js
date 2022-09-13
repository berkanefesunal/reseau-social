import MainRouter from "router/MainRouter";
import React from "react";
import { UserProvider } from "context/UserContext";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <>
      <ChakraProvider>
        <UserProvider>
          <MainRouter />
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
