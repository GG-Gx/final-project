import React, { useState, useRef } from 'react';
import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react';
import { ExternalLinkIcon, AddIcon,LinkIcon, WarningIcon } from '@chakra-ui/icons'

import Modal from 'react-modal';
import AddEventModal from './addEventModal';
import DeleteEventModal from './deleteEventModal';
import axios from 'axios';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { AuthContext } from '../context/AuthContext';
import { warning } from 'framer-motion';

function Calendar() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventClickInfo, setEventClickInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const calendarRef = useRef(null);
  const { logout } = useLogout();
  const authContext = React.useContext(AuthContext);


  const user = authContext.auth.user;

  console.log('usuario:', user);
  console.log('authContext:', authContext);

  
  


 

  const handleClickLogout =  () => {
    logout();
  }

  const handleEventAdd = async (event) => {

  
    try {

      // Ensure user is logged in
      if (!user) {
        console.error('Error: User is not logged in');
        return true; // Return synchronously
      }

      // Ensure required fields
      if (!event || !event.start || !event.end || !event.title) {
        console.error('Error: Missing required fields in the event object');
        return ; // Return synchronously
      }


      // Add event to FullCalendar
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent(event);
      console.log('Event added:', event);

      // Send event data to the server (optional)
      const response = await axios.post('http://localhost:5000/calendar/create-availability',  {
        start: event.start,
        end: event.end,
        title: event.title,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Example header
          Authorization: `Bearer ${user.token}`, // Example authorization header
          // Add other headers as needed
        },
      }
      );
      console.log('Event added successfully:', response.data);
      return false; // Return synchronously
    } catch (error) {
      console.error('Error adding event:', error);
      return true; // Or handle the error differently
    }
  };

  const handleDatesSet = async (date) => {

    

    // Ensure user is logged in

    if (user) {
    


    try {
      const startDate = moment(date.start).toISOString();
      const endDate = moment(date.end).toISOString();
  
      console.log('Fetching availability...');
      console.log('Start date:', startDate);
      console.log('End date:', endDate);

      
      const response = await axios.get(`http://localhost:5000/calendar/get-availability?start=${startDate}&end=${endDate}`, {
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
        });

      
      console.log('Availability data:', response.data);

      const userId = response.data.map(event => event.user_id)[0];
      console.log('User ID:', userId);
      setUserId(userId);

      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }

    }

  };


  

  const handleClickCopyLink =  () => {
      console.log('userId:', userId);

      userId && navigator.clipboard.writeText(`http://localhost:5173/sharedcalendar/${userId}`);

      alert('Link copied to clipboard');



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
       {user && <Text
        textAlign='left'
        marginLeft={3}
        size='s' >{user.email}
        </Text>}


       {user &&  
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
        eventMouseEnter={(event) => {
          event.el.style.backgroundColor = '#63B3ED';
          event.el.style.cursor = 'pointer';
        }}
        eventMouseLeave={(event) => {
          event.el.style.backgroundColor = '#3182CE';
        }
        }
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
    }  



      <AddEventModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onEventadded={handleEventAdd} />
      <DeleteEventModal 
  isOpen={deleteModalOpen} 
  onClose={() => setDeleteModalOpen(false)} 
  onEventDeleted={async () => {
    try {
      eventClickInfo.event.remove();
      const eventId = eventClickInfo.event._def.extendedProps._id;
      console.log('Event ID:', eventId);

      const response = await axios.delete(`http://localhost:5000/calendar/delete-availability/${eventId}`,
      {headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }}
      );
      console.log('Event data deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting event data:', error);
    } finally {
      setDeleteModalOpen(false);
    }
  }} 
/>
      
      <Button
        type='button'
        onClick =  {handleClickCopyLink}
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
          <Button
           type='button'
            onClick={() => {
              handleClickLogout();
            }} style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              backgroundColor: '#3182CE',
              color: 'white',
              borderRadius: '23px',
              border: 'none',
              cursor: 'pointer'
            }}
           >Log out</Button>


    
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
