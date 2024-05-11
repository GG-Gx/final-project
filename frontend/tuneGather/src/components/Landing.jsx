import React from 'react';
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
import NavBar from './NavBar';
import SearchBar from './SearchBar';






function Landing() {




    return (
      <Flex
      direction="column"
      align="center"
      justify="center"
      >

          <Box className="background">

            <NavBar />

            
            <Box className = 'boxBig'>
            

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" marginBottom='10px'>


                <Heading  as="h1" size="xl" textShadow='2px 3px 0px rgba(150, 150, 150, 1)' padding='20px'  style={{  fontFamily: 'Lato'  }}>
                The easiest way to schedule music lessons!
                </Heading>

                <Heading as="h2" size="lg"  padding='20px' style={{  fontFamily: 'Lato'  }} marginBottom='10px'>
                sign up now to get started
                or 
                search for music teachers
                
                </Heading>
                <SearchBar />

              </Box>





              {/* <Box >
              
  <Stack direction='row' spacing={10} align='center' style={{color:'white'}}>
    <Box display="flex" justifyContent="center" alignItems="center" style={{}}>
      <Button
      size='md'
      height='100px'
      width='100px'
      colorScheme='white'
      margin={4}
      borderRadius='23px'
      background={'#a93199'}
      boxShadow='10px 10px 14px 1px rgba(0, 0, 0, 0.2)'
      >
        Efficient
      </Button>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
      size='md'
      height='100px'
      width='100px'
      colorScheme='white'
      margin={4}
      borderRadius='23px'
      background={'#a93199'}
      boxShadow='10px 10px 14px 1px rgba(0, 0, 0, 0.2)'

      >
        User-friendly
      </Button>
    </Box>
  </Stack>
  <Stack direction='row' spacing={10} align='center' style={{color:'white'}}>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        size='md'
        height='100px'
        width='100px'
        colorScheme='white'
        margin={4}
        borderRadius='23px'
        background={'#a93199'}
        boxShadow='10px 10px 14px 1px rgba(0, 0, 0, 0.2)'
      >
        Flexible
      </Button>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        size='md'
        height='100px'
        width='100px'
        colorScheme='white'
        margin={4}
        borderRadius='23px'
        background={'#a93199'}
        boxShadow='10px 10px 14px 1px rgba(0, 0, 0, 0.2)'
      >
        Seamless
      </Button>
    </Box>
  </Stack>
</Box> */}

              
          
          </Box>


          </Box>  
          </Flex>
  
          
        );

}

export default Landing;
