import React, { useState, useRef } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import Modal from 'react-modal';
import AddEventModal from './addEventModal';
import axios from 'axios';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

 

  const handleEventAdd = async (event) => {
    try {
      // Ensure the event object has the required fields
      if (!event.start || !event.end || !event.title) {
        console.error('Missing required fields:', event);
        return false;
      }
  
      // If all required fields are present, add the event to the calendar
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({ 
        start: event.start,
        end: event.end,
        title: event.title,
      });
  
      // Send the event data to the server to create
      const response = await axios.post('http://localhost:5000/calendar/create-availability', {
        start: event.start,
        end: event.end,
        title: event.title
      });
  
      console.log('Event added successfully:', response.data);
      return false; // Return synchronously
    } catch (error) {
      console.error('Error adding event:', error);
      return true;
    }
  };

  const handleDatesSet = async (date) => {
    try {
      const startDate = moment(date.start).toISOString();
      const endDate = moment(date.end).toISOString();
  
      console.log('Fetching availability...');
      console.log('Start date:', startDate);
      console.log('End date:', endDate);
  
      const response = await axios.get(`http://localhost:5000/calendar/get-availability?start=${startDate}&end=${endDate}`);
      
      console.log('Availability data:', response.data);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };


  const onEventadded = async (event) => {
    
    try {
      // Ensure the event object has the required fields
      if (!event.start || !event.end || !event.title) {
        console.error('Missing required fields:', event);
        return false;
      }
      
      // If all required fields are present, add the event to the calendar
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
        start: event.start,
        end: event.end,
        title: event.title,
      });

      // Send the event data to the server to create

      const response = await axios.post('http://localhost:5000/calendar/create-availability', {
        start: event.start,
        end: event.end,
        title: event.title
      });
      
      console.log('Event added successfully:', response.data);
      return false; // Return synchronously

    } catch (error) {
      console.error('Error adding event:', error);
      return true;
    }
  }

  

  return (
    <Box
      style={{ position: 'relative', zIndex: 0 }}
      height={['80%', '70%']}
      width={['90%', '60%']}
      shadow='lg'
      borderRadius='23px'
      bg='#f5f5f5'
      p={5}
    >
      <Heading
        as='h1'
        size='xl'
        textAlign='center'
        color='black'
        mb='auto'
        mt='auto'
      >Calendar</Heading>

      <Button
        colorScheme='blue'
        display='flex'
        width='25%'
        borderRadius='23px'
        mt='auto'
        mb='auto'
        ml='auto'
        mr='left'
        marginRight={3}
        onClick={() => setModalOpen(true)}
      >Add Availability</Button>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        ref={calendarRef}
        eventContent={renderEventContent}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        aspectRatio={1}
        height={'90%'}
        handleWindowResize={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventBackgroundColor='#3182CE'
        eventTextColor='white'
        eventDisplay='block'
        eventBorderColor='#3182CE'
        eventAdd={(event) => handleEventAdd(event)}
        datesSet={(date) => handleDatesSet(date)}
        events={events}
      />
      <AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventadded={onEventadded} />
    </Box>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

Modal.setAppElement('#root');

export default Calendar;
