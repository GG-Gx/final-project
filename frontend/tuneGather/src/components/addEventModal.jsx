import React from 'react';
import { Input, Button, FormControl, FormLabel, Box, Flex} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useState } from 'react';
import Datetime from 'react-datetime';

export default function AddEventModal({ isOpen, onClose, onEventadded }) {

  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (e) => {
    e.preventDefault();
  
    // Check if start, end, and title are defined
    if (!start || !end || !title) {
      console.error('Error: Missing required fields in the event object');
      return;
    }
  
    // Validate date/time selection (optional)
    if (start >= end) {
      alert('Error: End date/time cannot be before start date/time!');
      return;
    }
  
    // Create the event object
    const event = {
      start: start.format('YYYY-MM-DDTHH:mm:ss'), // Ensure ISO 8601 format (adjust if needed)
      end: end.format('YYYY-MM-DDTHH:mm:ss'), // Ensure ISO 8601 format (adjust if needed)
      title,
    };
  
    // Pass the event object to the parent component
     onEventadded(event);
  
    // Close the modal or perform any other necessary actions
    onClose();
  };

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
          <form onSubmit={onSubmit}>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Start</FormLabel>
              <Datetime value={start} onChange={date => setStart(date)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>End</FormLabel>
              <Datetime value={end} onChange={date => setEnd(date)} />
            </FormControl>

            <Button type="submit" mt={4} colorScheme="blue">Add Availability</Button>
          </form>
        </Flex>
      </Box>
    </Modal>
  );
}