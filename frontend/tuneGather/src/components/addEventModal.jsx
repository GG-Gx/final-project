import React from 'react';
import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react';
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
      <form onSubmit={onSubmit}>
        <input value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />

        <div>
          <label>Start</label>
          <Datetime value={start} onChange={date => setStart(date)} />
        </div>
        <div>
          <label>End</label>
          <Datetime value={end} onChange={date => setEnd(date)} />
        </div>

        <Button type="submit">Add Availability</Button>

      </form>

    </Modal>
  );
}