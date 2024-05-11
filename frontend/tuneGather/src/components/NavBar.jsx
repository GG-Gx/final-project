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
import { HamburgerIcon } from '@chakra-ui/icons';




function NavBar() {

return (
  <>
  <Box className='navBar' >
          <Text className='smallLogo' >
                  tuneGather
                </Text>
               
              <Menu >
                <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                width={20} style={{ padding:'10px', marginRight: '30px'}}>Menu</MenuButton>
                <MenuList>
                  <MenuItem  as='a' href='/login'>Log in</MenuItem>
              
                  <MenuItem as='a' href='/signup'>Sign up</MenuItem>
                
                  <MenuItem as='a' >About</MenuItem>
                  
              </MenuList>
              
              </Menu>
            </Box>
  </>



)

}


export default NavBar;