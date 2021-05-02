import * as React from "react";
import {
  Text,
  HStack,
  Spacer,
  Image,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import { atoms } from "../states";
import { useRecoilState } from "recoil";
import logixboardLogo from "../assets/logixboardLogo.png";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();
  const { colorMode } = useColorMode();
  const [isAuth, setIsAuth] = useRecoilState(atoms.isAuth);
  return (
    <HStack
      paddingLeft="2vw"
      paddingRight="2vw"
      height="10vh"
      minHeight="50px"
      maxHeight="120px"
      bg={`header.bg.${colorMode}`}
      textAlign="center"
      fontSize="xl"
    >
      <Image maxHeight="30px" alt="LogixBoardLogo" src={logixboardLogo}></Image>
      <Spacer />
      <HStack spacing="1vw" textAlign="center" fontSize="xl">
        {isAuth ? (
          <>
            <Link href="/dashboard" variant="header">
              Dashboard
            </Link>
            <Spacer />
            <Link href="/#" variant="header">
              My Profile
            </Link>
            <Spacer />
            <Text
              onClick={() => {
                setIsAuth(false);
                history.push("/login");
              }}
              variant="header"
            >
              Logout
            </Text>
          </>
        ) : (
          <>
            <Link href="/" variant="header">
              Home
            </Link>
            <Spacer />
            <Link href="/#" variant="header">
              About
            </Link>
            <Spacer />
            <Link href="/login" variant="header">
              Login
            </Link>
          </>
        )}
      </HStack>
    </HStack>
  );
};
