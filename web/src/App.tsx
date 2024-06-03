import React from "react";
import Garage from "./pages/garage";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider
      withCssVariables
      withGlobalClasses
      defaultColorScheme="dark"
    >
      <Garage />
    </MantineProvider>
  );
};

export default App;
