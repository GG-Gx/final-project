import React, {useState} from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
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




function Login () {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  }


  return (
    <>
    <Flex

     direction="column"
     align="center"
     justify="center"
     className="background"
    >
      <Box 
      border="1px"
      borderColor="white"
      borderRadius="23px"
      padding="2rem"
      background="white"
      >
        
      <form onSubmit={handleSubmit}>
      <FormControl className = "login"
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
     
      <Button 
      disabled={isLoading}
      type="submit" 
      colorScheme="blue"
      >Log in</Button>
      <Link to={'/signup'}><Button
          margin={2}
          h="2.5rem" size="sm"
          width="6rem"
          borderRadius="23px"
          >Sign up</Button></Link>
          {error && <Text color="red.500">{error}</Text>}

      </form>
          
        
      </Box>

     


    </Flex>
    </>
  )
}


export default Login;