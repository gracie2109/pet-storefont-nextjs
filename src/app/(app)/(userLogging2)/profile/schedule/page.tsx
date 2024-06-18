'use client';


import { useState } from 'react'
import {Shell} from "@/components/shell";
import {CardContent, CardDescription, CardFooter, CardTitle, CardHeader, Card} from "@/components/ui/card"
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import {format, parse, startOfWeek, startOfHour, addHours, getDay} from "date-fns"

import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'



export default function ScheduleEmployeePage() {
    const locales = {
        'en-US': enUS,
    }
    const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)

    const start = endOfHour(new Date())
    const end = addHours(start, 2)
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })
//@ts-ignore
    const DnDCalendar = withDragAndDrop(Calendar)
    const [events, setEvents] = useState<Event[]>([
        {
            title: 'Washing cat',
            start,
            end,
        },
        {
            title: 'Washing cat2',
            start,
            end,
        },
        {
            title: 'Washing 3',
            start,
            end,
        },
        {
            title: 'Washing cat24',
            start,
            end,
        },
    ])

    console.log("star", start)
    const onEventResize: withDragAndDropProps['onEventResize'] = data => {
        const { start, end } = data

        setEvents(currentEvents => {
            const firstEvent = {
                start: new Date(start),
                end: new Date(end),
            }
            return [...currentEvents, firstEvent]
        })
    }

    const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
        console.log(data)
    }


    return (
        <Shell variant="sidebar">
            <Card>
                <CardHeader>
                    <CardTitle>  Your schedule  </CardTitle>
                </CardHeader>
                <CardContent>
                    <DnDCalendar
                        defaultView='week'
                        events={events}
                        localizer={localizer}
                        resizable
                        style={{ height: '100vh' }}
                    />
                </CardContent>
            </Card>
        </Shell>
    )
}