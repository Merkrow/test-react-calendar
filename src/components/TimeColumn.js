import React from 'react';

function TimeColumn(props) {
  const renderTimeMarker = (hour, i) => {
    if (i % 2) {
      return (<div key={i} className='hour half-hour'>{hour}</div>);
    }
    return (<div key={i} className='hour full-hour'>{hour}</div>);
  }
  return (
    <div className='time-column' style={ { width: '80px', } }>
      {props.dayHours.map(renderTimeMarker)}
    </div>
  )
}

export default TimeColumn;
