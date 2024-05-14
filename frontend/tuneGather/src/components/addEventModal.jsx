import React, { useState } from 'react';
import { Input, Button, FormControl, FormLabel, Flex, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import 'react-datetime/css/react-datetime.css';

function AddEventModal({ isOpen, onClose, onEventadded }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    // Check if start, end, and title are defined
    if (!start || !end || !title) {
      console.error('Error: Missing required fields in the event object');
      setError('Please fill out all fields  :)');
      return;
    }

    // Combine date and time for start and end
    const event = {
      start: new Date(start).toISOString(), // Ensure ISO 8601 format
      end: new Date(end).toISOString(), // Ensure ISO 8601 format
      title: title || 'time slot',
    };

    // Pass the event object to the parent component
    onEventadded(event);

    // Close the modal or perform any other necessary actions
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered
    borderRadius="23px"
    >
      <ModalOverlay />
      <ModalContent>
        <Flex direction="column" alignItems="center" justifyContent="center" p={8}>
          <form onSubmit={onSubmit} style={{ width: '100%', borderRadius:'23px' }} >
            <FormControl mb={4}>
              <Input
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%' }}
                borderRadius={23}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Start</FormLabel>
              <Input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                style={{ width: '100%' }}
                borderRadius={23}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>End</FormLabel>
              <Input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                style={{ width: '100%' }}
                borderRadius={23}
              />
            </FormControl>
            <Button
              mt={4}
              borderRadius={23}
              backgroundColor="#fa0559"
              color="#fff"
              _hover={{ bg: "#fa0540" }}
              type="submit"
              padding={4}
              width="100%"
            >
              Add Availability
            </Button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default AddEventModal;
