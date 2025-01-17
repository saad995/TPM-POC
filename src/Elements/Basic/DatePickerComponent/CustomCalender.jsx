import * as React from 'react';

import { Calendar } from '@progress/kendo-react-dateinputs';

import { CustomCalendarCell } from './CustomCalenderCell';

//working component but is not dynamic yet
export class CustomCalendar extends React.Component {
  render() {
    return (
      <Calendar
        cell={CustomCalendarCell}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}