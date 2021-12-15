import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function Calendar() {
    const [trainings, setTrainings] = useState([]);
    
    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(setTrainings([]))
        .then(responseData => responseData.forEach(element => {
            let end = dayjs(element.date).add(element.duration, "minute").toDate();
            setTrainings(trainings => [...trainings, {title: element.activity, start: element.date, end: end}]);
        })
        )
        .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchTrainings();
    }, [])
    

    return(
        <div style={{width:"90%", margin: "15px"}}>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="timeGridWeek"
                events={trainings}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,timeGridWeek,dayGridMonth'
                  }}
                slotMinTime={"06:00:00"}
                firstDay={1}
                weekNumberCalculation={"ISO"}
                weekNumbers={true}
                stickyHeaderDates={true}
                navLinks={true}
                nowIndicator={true}
                eventColor={'#3c9690'}
            />
        </div>
    )
}
export default Calendar;