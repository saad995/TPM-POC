
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Tooltip } from '@progress/kendo-react-tooltip';

import { CustomCalendar } from '../DatePickerComponent/CustomCalender';

//working component but is not dynamic yet

//https://www.telerik.com/blogs/powerful-react-datepicker-component-example

export class CalenderComponent extends React.Component {
  tooltip = null;

  //we need to handle the blur event to ensure that mouseout causes tooltips to disappear
  handleBlur = (e) => {
    this.tooltip.handleMouseOut({clientX: 0, clientY: 0})
  }

  render() {
    return (
      <div
        onMouseOver={event => this.tooltip && this.tooltip.handleMouseOver(event)}
        onMouseOut={event => this.tooltip  && this.tooltip.handleMouseOut(event)}
      >
        <DatePicker
          onBlur={this.handleBlur}
          calendar={CustomCalendar}
        />
        <Tooltip ref={(tooltip) => this.tooltip = tooltip} anchorElement="target" position="top" openDelay={300} />
      </div>
    );
  }
}
