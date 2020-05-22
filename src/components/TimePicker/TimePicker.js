import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimePicker(props){
  console.log(props.display)
    return (
      <div className="form-group text-center" style={{display: props.display}}>
      <DatePicker
        selected={props.startDate}
        onChange={date => props.setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm:ss"
        timeIntervals={1}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      </div>
    );
}

export default TimePicker;