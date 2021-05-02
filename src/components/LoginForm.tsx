import * as React from "react";
import {
  Text,
  Link,
  VStack,
  HStack,
  Spacer,
  Center,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { HiUser, HiOutlineKey } from "react-icons/hi";
import { atoms } from "../states";
import { useSetRecoilState } from "recoil";

export const LoginForm = () => {
  const history = useHistory();
  const setIsAuth = useSetRecoilState(atoms.isAuth);
  return (
    <Center>
      <VStack
        height="40vh"
        minHeight="50px"
        maxHeight="120px"
        textAlign="center"
        fontSize="xl"
        spacing="10vh"
      >
        <Spacer />

        <Text>Welcome to LOGIXBOARD</Text>

        <VStack
          padding="20px"
          textAlign="center"
          fontSize="xl"
          spacing={4}
          boxShadow="0px 0px 20px 2px rgb(9 207 191 / 22%)"
        >
          <Text alignSelf="flex-start">Username</Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<HiUser />} />
            <Input type="text" placeholder="Username / Email" />
          </InputGroup>
          <Text alignSelf="flex-start">Password</Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<HiOutlineKey />}
            />
            <Input type="password" placeholder="Enter your password" />
          </InputGroup>
          <Button
            onClick={() => {
              setIsAuth(true);
              setTimeout(() => {
                history.push("/dashboard");
              }, 0);
            }}
            minHeight="40px"
            size="lg"
            variant="solid"
            width="100%"
            _hover={{
              backgroundColor: "#02ccbc",
              color: "#FFFFFF",
            }}
          >
            Login
          </Button>
          <Spacer />
          <HStack spacing="3vw" textAlign="center" fontSize="xl">
            <Link href="/#" variant="login">
              Sign Up
            </Link>
            <Spacer />
            <Link href="/#" variant="login">
              Forgot Password
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  );
};
