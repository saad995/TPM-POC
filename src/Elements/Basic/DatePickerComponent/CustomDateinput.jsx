import React from "react";


//working component but is not dynamic yet
export class CustomDateInput extends React.Component{
 
  inputStyle = {
    width: 90
  };
  handleChange =syntheticEvent => {
    const date = {
      day: this.props.value.getDate(),
      month: this.props.value.getMonth(),
      year: this.props.value.getFullYear()
    };

    date[event.target.getAttribute("data-section")] = Number(
      event.target.value
    );

    const value = new Date(date.year, date.month, date.day);

    this.props.onChange({
      value,
      syntheticEvent,
      target: this
    });
  };

  
  render() {
    return [
      <input
        style={this.inputStyle}
        type="number"
        data-section="day"
        value={this.props.value.getDate()}
        onChange={this.handleChange}
      />,
      <input
        style={this.inputStyle}
        type="number"
        data-section="month"
        value={this.props.value.getMonth()}
        onChange={this.handleChange}
      />,
      <input
        style={this.inputStyle}
        type="number"
        data-section="year"
        value={this.props.value.getFullYear()}
        onChange={this.handleChange}
      />
    ];
  }
}
