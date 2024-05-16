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
import { AuthContext } from "../context/AuthContext";
import { useLogout } from '../hooks/useLogout';





function NavBar() {

  const userLogged = React.useContext(AuthContext);
  const { logout } = useLogout();
  const handleClickLogout =  () => {
    logout();
  }


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

                  {userLogged.auth.user ? <MenuItem as='a' onClick={handleClickLogout}>Log out</MenuItem> : null}
                
                  
              </MenuList>
              
              </Menu>
            </Box>
  </>



)

}


export default NavBar;