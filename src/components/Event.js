import React from 'react';

function Event(props) {
  const width = 100/(props.neighbours.left + props.neighbours.right + 1);
  const styles = {
    top: `${props.top}%`,
    height: `${props.height}%`,
    width: `${width}%`,
    left: `${props.neighbours.left * width}%`,
  };
  return (
    <div onClick={() => props.removeEvent(props.id)} className='event' style={styles}>
      { props.event.title }
    </div>
  );
}

export default Event;
