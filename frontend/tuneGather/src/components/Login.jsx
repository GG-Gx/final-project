import React from "react";
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
} from '@chakra-ui/react';
import { Link } from "react-router-dom";



function Login () {

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
        <Heading
        textAlign={"center"}
        >Log in</Heading>
        
        <Box>
          <InputGroup
            padding={2}
          >
            <Input
            pr="1rem"
            type="text"
            borderRadius="23px"                  
            placeholder="E-mail" />
          </InputGroup>
          <InputGroup
            padding={2}
          >
            <Input
            pr="1rem"
            type="text"
            borderRadius="23px"  
            placeholder="Password" />
          </InputGroup>
          <Link to={'/calendar'} ><Button
          margin={2}
          h="2.5rem" size="sm"
          width="6rem"
          borderRadius="23px"
          >Login</Button></Link>
          <Link to={'/singin'}><Button
          margin={2}
          h="2.5rem" size="sm"
          width="6rem"
          borderRadius="23px"
          >Sign in</Button></Link>
        </Box>
        
      </Box>
    </Flex>
    </>
  )
}



export default Login;