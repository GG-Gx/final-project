import React, { useState } from 'react';
import { Input, Button, FormControl, FormLabel, Box, Flex, } from "@chakra-ui/react";
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function AddEventModal({ isOpen, onClose, onEventadded }) {
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
  
    // Combine date and time for start and end
    const startDate = new Date(start);
    const startTime = new Date(start);
    const endDate = new Date(end);
    const endTime = new Date(end);
  
    // Set time part for start and end
    startDate.setHours(startTime.getHours(), startTime.getMinutes());
    endDate.setHours(endTime.getHours(), endTime.getMinutes());
  
    // Validate date/time selection (optional)
    if (startDate >= endDate) {
      alert('Error: End date/time cannot be before start date/time!');
      return;
    }
  
    // Create the event object
    const event = {
      start: startDate.toISOString(), // Ensure ISO 8601 format
      end: endDate.toISOString(), // Ensure ISO 8601 format
      title: title || 'time slot',
    };
  
    // Pass the event object to the parent component
    onEventadded(event);
  
    // Close the modal or perform any other necessary actions
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: '50%',
          height: '60%',
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

        <Flex direction="column" alignItems="center" justifyContent="center" p={8}>
          <form onSubmit={onSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          
          >
            <FormControl mb={4}>
              <Input
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  borderRadius: '23px',
                  padding: '10px',
                }}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Start</FormLabel>
              <Datetime
                value={start}
                onChange={(date) => setStart(date)}
                inputProps={{
                  style: {
                    width: '100%',
                    textAlign: 'center',
                    borderRadius: '23px',
                    padding: '10px',
                  }
                }}
                renderInput={(props, openCalendar) => (
                  <Input {...props} onClick={openCalendar} />
                )}
                timeFormat="HH:mm"
                dateFormat="YYYY-MM-DD"
                renderTimePicker={(props, openCalendar) => (
                  <Button onClick={openCalendar}>Open Calendar</Button>
                )}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>End</FormLabel>
              <Datetime
                value={end}
                onChange={(date) => setEnd(date)}
                inputProps={{
                  style: {
                    width: '100%',
                    textAlign: 'center',
                    borderRadius: '23px',
                    padding: '10px',
                  }
                }}
                renderInput={(props, openCalendar) => (
                  <Input {...props} onClick={openCalendar} />
                )}
                timeFormat="HH:mm"
                dateFormat="YYYY-MM-DD"
                renderTimePicker={(props, openCalendar) => (
                  <button onClick={openCalendar}>Open Calendar</button>
                )}
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
              width={"100%"}
            >
              Add Availability
            </Button>
          </form>
        </Flex>
     
    </Modal>
  );
}

export default AddEventModal;
