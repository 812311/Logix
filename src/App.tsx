import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { atoms } from "./states";
import { useRecoilValue } from "recoil";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { DashBoard } from "./components/Dashboard";
import { theme } from "./theme";
import { PrivateRoute } from "./utils/PrivateRoute";

export const App = () => {
  const isAuth = useRecoilValue(atoms.isAuth);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to={isAuth ? "/dashboard" : "/login"} />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <PrivateRoute path="/dashboard">
            <DashBoard />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};
