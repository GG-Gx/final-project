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
  IconButton,
} from '@chakra-ui/react';


function SearchBar() {

  return (
    <>
       <InputGroup
                  size="md"
                  margin="auto"
                  marginBottom="20px"
                  marginTop="20px"

                  width="90%"
                >
                  <Input
                    pr="1rem"
                    type="text"
                    placeholder="Search for music teachers"
                    borderRadius="23px"
                  />
                  <InputRightElement width="6rem"
                  >
                    <Button h="2.5rem" size="sm"
                    width="6rem"
                    borderTopRightRadius="23px" 
                    borderBottomRightRadius="23px"
                    
                    >
                      Search
                    </Button>
                  </InputRightElement>
                </InputGroup>
    </>
  
  );
}


export default SearchBar;