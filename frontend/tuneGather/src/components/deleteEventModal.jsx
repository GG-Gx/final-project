import React from 'react';
import { Box, Flex, Heading, Button, Modal, ModalOverlay, ModalContent, useToast} from "@chakra-ui/react";
export default function DeleteEventModal({ isOpen, onClose, onEventDeleted }) {


  const toast = useToast();

  

  const confirmDeleteEvent = () => {
    // Perform the deletion action
    onEventDeleted();
    onClose();
    toast({
      title: "Event deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  const cancelDeleteEvent = () => {
    onClose();
  }


  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} isCentered
      style={{
        content: {
          width: '30%',
          height: '25%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '23px',
          padding: '20px',
          border: 'none',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }} 
    >
              <ModalOverlay />
      <ModalContent
        borderRadius="23px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        p={4}
      >
      <Box
 
      >
        <Flex
          
          direction="column"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
          p={4}
          color="black"
        >
          <Heading as="h2" size="lg" mb={4}>Delete Event</Heading>
          <Button onClick={confirmDeleteEvent} colorScheme="red" mb={4} borderRadius={23}> Delete</Button>
          <Button onClick={cancelDeleteEvent} colorScheme="blue" borderRadius={23}> Cancel </Button>
        </Flex>
      </Box>
      </ModalContent>
    </Modal>
  );
}


