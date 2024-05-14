import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, Button, Text } from "@chakra-ui/react";


function CopyLinkModal  ({ isOpen, onClose, eventClickInfo, copyLink }) {


  return (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>

      <ModalOverlay />
      <ModalContent borderRadius="23px">
        <ModalHeader>Copy Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Copy the link below to share this calendar:</Text>
          <Input value={copyLink} isReadOnly />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}
          borderRadius={23}
          >Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );





}

export default CopyLinkModal;





