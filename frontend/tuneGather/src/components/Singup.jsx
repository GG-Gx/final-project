import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
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

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
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
        color="black"
      >
        <Box
          border="1px"
          borderColor="white"
          borderRadius="23px"
          padding="2rem"
          background="white"
          width="400px"
          maxWidth="90%"
        >
          <form onSubmit={handleSubmit}>
            <FormControl
              id="email"
              isRequired
              isInvalid={error && error.field === "email"}
              mb={4}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
              {error && error.field === "email" && (
                <Text color="red.500">{error.message}</Text>
              )}
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={error && error.field === "try another password"}
              mb={4}
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
                {error && error.field === "general" && (
                              <Text color="red.500">{error.message}</Text>
                            )}
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              mb={4}
              isLoading={isLoading}
              loadingText="Signing up..."
            >
              Sign up
            </Button>
            {error && error.field === "general" && (
              <Text color="red.500">{error.message}</Text>
            )}
            <Text>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "blue.400" }}>
                Log in
              </Link>
            </Text>
          </form>
          {error && error.field === "general" && (
            <Text color="red.500">{error.message}</Text>
          )}
        </Box>
      </Flex>
    </>
  );
}

export default Signup;
