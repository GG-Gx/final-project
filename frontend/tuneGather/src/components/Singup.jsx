import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import validator from "validator";
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
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorEmail, setErrorEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 20 || !validator.isStrongPassword(password) || !validator.isAlphanumeric(password) ) {
      return false;
    }
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
              isInvalid={error && error.field === "password"}
              mb={4}
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!validatePassword(password)) {
                    setErrorEmail('Password must be between 8 and 20 characters, contain letters and numbers');
                    setIsEmailValid(false);
                  } else {
                    setErrorEmail('');
                    setIsEmailValid(true);
                  }
                }}
                placeholder="Enter your password"
              />
                {error && error.field === "general" && (
                              <Text color="red.500">{error.message}</Text>
                            )}
            {error && error.field === "password" && (
              <Text color="red.500">{error.message}</Text>
            )}
            {!isEmailValid && (
              <Text color="red.500">{errorEmail}</Text>
            )}
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              mb={4}
              isLoading={isLoading}
              loadingText="Signing up..."
              disabled={!validatePassword(password) || isLoading}
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

        </Box>
      </Flex>
    </>
  );
}

export default Signup;
