import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";

function BookingFormModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    onClose(); // Close the modal
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="23px">
        <ModalHeader>Book an Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
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



// Path: frontend/tuneGather/src/components/bookingFormModal.jsx