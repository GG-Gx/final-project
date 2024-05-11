import React, {useState} from "react";
import { useSignup } from "../hooks/useSignup";
import { 
  Box, 
  Image, 
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Flex,
  Stack, 
  Card,
  background,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormErrorIcon,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import NavBar from "./NavBar";




function Singup () {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  }


  return (
    <>
      <NavBar/>
    <Flex

     direction="column"
     align="center"
     justify="center"
     className="background"
     color="black"
    >
      <Box 
      border="1px"
      borderColor="white"
      borderRadius="23px"
      padding="2rem"
      background="white"
      >
        
      <form onSubmit={handleSubmit}>
      <FormControl 
      className="signup"
      id="email" isRequired
      >
        <FormLabel>Email address</FormLabel>
        <Input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input 
       
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
         />
      </FormControl>
      
      
      <Button type="submit" 
      colorScheme="blue"
      disabled={isLoading}
      >Sign up</Button>
      <Link to={'/login'}>
        <Button
          margin={2}
          h="2.5rem" size="sm"
          width="6rem"
          borderRadius="23px"
          >Login
          </Button>
          </Link>
          {error && <Text color="red.500">{error}</Text>}
      </form>
          
        
      </Box>

     


    </Flex>
    </>
  )
}


export default Singup;