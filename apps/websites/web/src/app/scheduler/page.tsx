"use client"

import {useForm} from "@tanstack/react-form";
import {FormEvent, useEffect, useRef, useState} from "react";
import {Select, SelectTrigger, SelectContent, SelectItem} from "@/components/input/Select";
import {useStore} from "@tanstack/react-store";

type TimeSlot = {
    start: string;
    end: string;
}

type DayofWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

const halfHoursInDay = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00",
    "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30",
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "11:30", "12:00"
]

interface Handler {
    (slot: TimeSlot): void;
}

const isValidTime = (time:Partial<TimeSlot>) => {
    return true;
}

const isConflict = (time:Partial<TimeSlot>) => {
    return true;
}


const TimeSlot = ({
                      slot,
                      onValueChange,
                      isConflict,
                  }: {
    slot: Partial<TimeSlot>;
    onValueChange: Handler;
    isConflict: (slot: TimeSlot) => boolean;
}) => {
    const [innerSlot, setSlot] = useState<Partial<TimeSlot>>(slot);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (isValidTime(innerSlot) && !isConflict(innerSlot as TimeSlot)) {
            onValueChange(innerSlot as TimeSlot);
        }
    }, [innerSlot]);

    const updateStart = (value: string) =>
        setSlot(prev => ({ ...prev, start: value }));

    const updateEnd = (value: string) =>
        setSlot(prev => ({ ...prev, end: value }));

    return (
        <>
            <div>
                <label>Start</label>
                <Select value={innerSlot.start} onValueChange={updateStart}>
                    <SelectTrigger>Start Time</SelectTrigger>
                    <SelectContent>
                        {halfHoursInDay.map((time, index) => (
                            <SelectItem value={time} key={`start-${time}-${index}`}>
                                {time}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label>End</label>
                <Select value={innerSlot.end} onValueChange={updateEnd}>
                    <SelectTrigger>End Time</SelectTrigger>
                    <SelectContent>
                        {halfHoursInDay.map((time, index) => (
                            <SelectItem value={time} key={`end-${time}-${index}`}>
                                {time}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};


export const Page = () => {
    const form = useForm({
        defaultValues: {
            monday: [] as TimeSlot[],
            tuesday: [] as TimeSlot[],
            wednesday: [] as TimeSlot[],
            thursday: [] as TimeSlot[],
            friday: [] as TimeSlot[],
            saturday: [] as TimeSlot[],
            sunday: [] as TimeSlot[]
        }
    });

    const submit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.handleSubmit(e);
    }

    const schedule = useStore(form.store, ({values})=>values);

    const updateSchedule = (slot:TimeSlot, day:DayofWeek, index:number) => {
        if (schedule[day].length <= index) {
            // new value
        }
        else {
            form.setFieldValue(day, schedule[day].map((s, i) => i === index ? slot : s))
        }
    }

    return (
        <form onSubmit={submit}>
            {
                Object.keys(schedule).map((day) => (
                    <form.Field name={day as DayofWeek} key={day}>
                        {(field) => (
                            <>
                                <h2>{day}</h2>
                                <div  className={`flex gap-4`}>
                                    {field.state.value.map((slot, index)=>(
                                        <TimeSlot key={JSON.stringify(slot)} slot={slot} onValueChange={(slot)=>updateSchedule(slot, day as DayofWeek, index)} />
                                    ))}
                                </div>
                            </>
                        )}
                    </form.Field>
                ))
            }
        </form>
    );
};