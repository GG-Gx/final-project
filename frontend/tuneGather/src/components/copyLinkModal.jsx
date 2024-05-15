import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, Button, Text, useToast } from "@chakra-ui/react";


function CopyLinkModal  ({ isOpen, onClose, eventClickInfo, copyLink }) {

  const toast=useToast();


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
          <Button colorScheme="blue" mr={3} borderRadius={23} onClick={
            () => {
              navigator.clipboard.writeText(copyLink);
              toast({
                title: "Link copied to clipboard",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
              onClose();
            }
          
          }>Copy</Button>

          <Button colorScheme="red" borderRadius={23} onClick={onClose}
          
          >Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );





}

export default CopyLinkModal;





