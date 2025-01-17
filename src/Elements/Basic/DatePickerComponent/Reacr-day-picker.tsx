
//working component but is not dynamic yet
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export const ExampleDayPicker=() =>{
  return (
    <DayPicker
      initialMonth={new Date(2017, 3)}
      disabledDays={[
        new Date(2017, 3, 12),
        new Date(2017, 3, 2),
        {
          after: new Date(2017, 3, 20),
          before: new Date(2017, 3, 25),
        },
      ]}
    />
  );
}
//https://react-day-picker.js.org/docs/input


