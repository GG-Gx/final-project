import React, { useState, useRef } from 'react';
import { Box, Button, Heading, Icon } from '@chakra-ui/react';
import { ExternalLinkIcon, AddIcon,LinkIcon } from '@chakra-ui/icons'

import Modal from 'react-modal';
import AddEventModal from './addEventModal';
import DeleteEventModal from './deleteEventModal';
import axios from 'axios';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function Calendar() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventClickInfo, setEventClickInfo] = useState(null);
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
        title: event.title,
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
        title: event.title,
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
          left: 'prev,next today',
          center: 'title',
          right: 'addEventButton'
        }}
        customButtons={{
          addEventButton: {
            text: 'add' ,
            click: () => setAddModalOpen(true),
            style: {
              backgroundColor: '#3182CE',
              color: 'white',
              borderRadius: '23px',
              padding: '10px',
              border: 'none',
              cursor: 'pointer'
            }
          }
        }}
        titleFormat={{ year: 'numeric', month: 'short'}}
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
      //   eventClick={(eventClickInfo) => {
      //     console.log('Event clicked:', eventClickInfo.event);

      //     const eventId = eventClickInfo.event._def.extendedProps._id;
      //     console.log('Event ID:', eventId);
      //     console.log(eventClickInfo.event.Id);
      //     eventClickInfo.event.remove();
          
      //           axios.delete(`http://localhost:5000/calendar/delete-availability/${eventId}`)
      //             .then(response => {
      //               console.log('Event data deleted successfully:', response.data);
      //             })
      //             .catch(error => {
      //               console.error('Error deleting event data:', error);
      //             });
      //             return false;
      //   }
      // }
      eventClick={(eventClickInfo) => {
        console.log('Event clicked:', eventClickInfo.event);
        setEventClickInfo(eventClickInfo);
        setDeleteModalOpen(true);
      }}
      />



      <AddEventModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onEventadded={onEventadded} />
      <DeleteEventModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onEventDeleted={() => {
        eventClickInfo.event.remove();
        const eventId = eventClickInfo.event._def.extendedProps._id;
        console.log('Event ID:', eventId);console.log(eventClickInfo.event.Id);
        
        axios.delete(`http://localhost:5000/calendar/delete-availability/${eventId}`)
          .then(response => {
            console.log('Event data deleted successfully:', response.data);
          })
          .catch(error => {
            console.error('Error deleting event data:', error);
          });
        setDeleteModalOpen(false);
      }} />


      <Button
        type='button'
        onClick={() => alert('share calendar')}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#3182CE',
          color: 'white',
          borderRadius: '23px',
          border: 'none',
          cursor: 'pointer'
        }}>
          <Icon as={LinkIcon} color='white' /></Button>
          </Box>
  )
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

export default Calendar;
