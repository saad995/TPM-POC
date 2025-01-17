import * as React from 'react';

import { classNames } from '@progress/kendo-react-common';


//working component but is not dynamic yet

// US Holidays in 2019
const usHolidays = [
 { name: "New Year's Day", date: new Date("2019-01-01"), emoji: "🍾" },
 { name: "Martin Luther King Day", date: new Date("2019-01-21"), emoji: "💭" },
 { name: "President's Day", date: new Date("2019-02-18"), emoji: "👴" },
 { name: "Memorial Day", date: new Date("2019-05-27"), emoji: "🇺🇸" },
 { name: "Independence Day", date: new Date("2019-07-04"), emoji: "🎆" },
 { name: "Labor Day", date: new Date("2019-09-02"), emoji: "🛠️" },
 { name: "Columbus Day", date: new Date("2019-10-14"), emoji: "🌎" },
 { name: "Veterans Day", date: new Date("2019-11-11"), emoji: "🎖️" },
 { name: "Thanksgiving Day", date: new Date("2019-11-28"), emoji: "🦃" },
 { name: "Christmas Day", date: new Date("2019-12-25"), emoji: "🎅🏻" }
];

export class CustomCalendarCell extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.value);
  }

  render() {
    // make weekends a bit opaque since a holiday calendar mostly focuses on what ADDITIONAL days we have off during the year (weekends are already off!)
    let style = {
        cursor: 'pointer',
        opacity: this.props.isWeekend ? .6 : 1
    };
    
    let emoji, renderSpan, disable;

    const className = classNames({
        'k-state-selected': this.props.isSelected,
        'k-state-focused': this.props.isFocused,
         'k-state-disabled': this.props.isDisabled
    });

    // find our holidays and assign the proper emoji - a simple for loop should do!
    for (let i = 0; i < usHolidays.length; i++) {
      if (usHolidays[i].date.getUTCFullYear() == this.props.value.getUTCFullYear() && 
          usHolidays[i].date.getUTCMonth() == this.props.value.getUTCMonth() && 
          usHolidays[i].date.getUTCDate() == this.props.value.getUTCDate()) {
        emoji = usHolidays[i].emoji;
        style.backgroundColor = "rgba(255, 50, 85, 0.3)";
        //this.props.isDisabled; 
        style.pointerEvents = "none";
            disable = true;
        this.title = usHolidays[i].name;
        break;
      };
    }
    // a regular day and emoji are fairly similar, but we need to make the span content EITHER the emoji or a regular day which we just pass `this.props.children` to achieve
    if(emoji) {
      renderSpan = <span className="k-link" title={this.title} >{emoji}</span>;
    }
    else {
      renderSpan = <span className="k-link" title={this.props.title}>{this.props.children}</span>;
    }
    return (
        <td
            onClick={this.handleClick}
            className={className}
            style={style}
        >
          {renderSpan}
        </td>
    );
  }
}