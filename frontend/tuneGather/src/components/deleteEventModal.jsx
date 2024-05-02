import React from 'react';
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import Modal from 'react-modal';

export default function DeleteEventModal({ isOpen, onClose, onEventDeleted }) {

  const confirmDeleteEvent = () => {
    // Perform the deletion action
    onEventDeleted();
    onClose();
  }

  const cancelDeleteEvent = () => {
    onClose();
  }

  



  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Box>
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
          <Button onClick={confirmDeleteEvent} colorScheme="red" mb={4}> Delete</Button>
          <Button onClick={cancelDeleteEvent} colorScheme="blue"> Cancel </Button>
        </Flex>
      </Box>
    </Modal>
  );
}


