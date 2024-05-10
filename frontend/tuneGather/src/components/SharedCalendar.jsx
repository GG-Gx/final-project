import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventClickInfo, setEventClickInfo] = useState(null);
  const calendarRef = useRef(null);
  const { userId } = useParams();
  const { userEmail } = useParams();

  console.log('userEmail:', userEmail);
  console.log('userId:', userId);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://final-project-navy.vercel.app/public/get-availability/${userId}`);
        const events = response.data.map((event) => ({
          id: event._id,
          title: event.title,
          start: event.start,
          end: event.end,
        }));
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

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
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventBackgroundColor='#3182CE'
        eventTextColor='white'
        eventDisplay='block'
        eventBorderColor='#3182CE'
        eventClick={(eventClickInfo) => {
          setBookingModalOpen(true);
          setEventClickInfo(eventClickInfo);
          console.log('Event clicked:', eventClickInfo);

        }}
        events={events}
        eventMouseEnter={(event) => {
          event.el.style.backgroundColor = '#63B3ED';
          event.el.style.cursor = 'pointer';
        }}
        eventMouseLeave={(event) => {
          event.el.style.backgroundColor = '#3182CE';
        }}
      />

      <BookingFormModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} 
        eventClickInfo={eventClickInfo} userEmail={userEmail} />

       

    </Box>
  );
}

export function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i> {eventInfo.event.title}</i>
    </>
  )
}

Modal.setAppElement('#root');

export default SharedCalendar;
