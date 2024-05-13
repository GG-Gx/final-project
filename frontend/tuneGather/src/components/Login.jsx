import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Flex,
} from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <NavBar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="background"
        minHeight="100vh"
      >
        <Box
          border="1px"
          borderColor="white"
          borderRadius="23px"
          padding="2rem"
          background="white"
          color="black"
          width="400px"
          maxWidth="90%"
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              mt={4}
              isLoading={isLoading}
              loadingText="Logging in..."
            >
              Log in
            </Button>
            <Text mt={2}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "blue.400" }}>
                Sign up
              </Link>
            </Text>
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
          </form>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
