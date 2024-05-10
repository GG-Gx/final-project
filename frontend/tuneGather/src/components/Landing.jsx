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





function Landing() {
    return (
      <Flex
      direction="column"
      align="center"
      justify="center"
      >

          <Box className="background">
            <Box textAlign="right" padding={2}>
              <Menu style={{ padding: '20px', marginRight: '30px' }}>
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
            <Divider />

            <Box className = 'boxBig'>
            

              <Box className='tuneGatherbox' style={{ padding: '100px' }}>


                <Heading as="h1" size="2xl" textAlign="center" margin="2rem" className='bigLogo'>
                  tuneGather
                </Heading>
                <Text style={{ margin: 'auto', padding: '5px', color:'black', fontFamily: 'Lato',  }}>
                  Calendar for booking freelancers music teachers
                </Text>

                <InputGroup
                  size="md"
                  margin="auto"
                  marginBottom="20px"
                  maxWidth="400px"
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
              </Box>




              <Box >
              
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
</Box>

              
          
            </Box>


          </Box>  
          </Flex>
  
          
        );

}

export default Landing;
