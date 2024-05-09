import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, Button, Text } from "@chakra-ui/react";
import SharedCalendar, {renderEventContent} from "./SharedCalendar";

function BookingFormModal({ isOpen, onClose, eventClickInfo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [comment, setComment] = useState('');
  const [formError, setFormError] = useState('');

  console.log('Event info', eventClickInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !timeSlot) {
      setFormError('Please fill in all required fields.');
      return;
    }
    // Handle form submission
    console.log("Form submitted");
    onClose(); // Close the modal
    // Clear input fields
    setName('');
    setEmail('');
    setPhone('');
    setTimeSlot('');
    setComment('');
    setFormError('');
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="23px">
        <ModalHeader>Book a lesson</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Selected Time Slot</FormLabel>
            <Input placeholder={ eventClickInfo || "Selected Time Slot"} value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />

            {/* <Input placeholder={ eventInfo || "Select Time Slot"} value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} /> */}

            

          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Phone</FormLabel>
            <Input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Comment</FormLabel>
            <Textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          </FormControl>

          {formError && (
            <Text mt={2} color="red.500">
              {formError}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookingFormModal;
