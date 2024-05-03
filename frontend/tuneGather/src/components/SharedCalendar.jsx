import React, { useState, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import Modal from 'react-modal';
import AddEventModal from './addEventModal';
import BookingFormModal from './bookingFormModal';
import DeleteEventModal from './deleteEventModal';
import axios from 'axios';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function SharedCalendar() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false); // Added
  const [events, setEvents] = useState([]);
  const [eventClickInfo, setEventClickInfo] = useState(null);
  const calendarRef = useRef(null);



  const handleDatesSet = async (date) => {
    try {
      const startDate = moment(date.start).toISOString();
      const endDate = moment(date.end).toISOString();

      const response = await axios.get(`http://localhost:5000/calendar/get-availability?start=${startDate}&end=${endDate}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  return (
    <Box
      style={{ position: 'relative', zIndex: 0 }}
      height={['90%', '80%']}
      width={['90%', '70%']}
      shadow='lg'
      borderRadius='23px'
      bg='#f5f5f5'
      p={5}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        ref={calendarRef}
        eventContent={renderEventContent}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today',
        }}
        titleFormat={{ year: 'numeric', month: 'short' }}
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
        eventClick={(eventClickInfo) => {
          console.log(eventClickInfo);
          setBookingModalOpen(true);
          
        
        }}
        datesSet={(date) => handleDatesSet(date)}
        events={events}
      />

      <BookingFormModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />


    </Box>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i> {eventInfo.event.title}</i>
    </>
  )
}

Modal.setAppElement('#root');

export default SharedCalendar;
