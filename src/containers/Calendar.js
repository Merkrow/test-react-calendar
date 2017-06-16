import React, { Component } from 'react';
import TimeColumn from '../components/TimeColumn';
import EventsContainer from './EventsContainer';
import AddEvent from './AddEvent';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = ({ showModal: false });
  }
  getTimeColumn(min, max) {
    const res = [];
    for (let i = min; i <= max; i ++) {
      const fullHour = i < 10 ? `0${i}:00` : `${i}:00`;
      const halfHour = i < 10 ? `0${i}:30` : `${i}:30`;
      res.push(fullHour);
      if (i !== max) {
        res.push(halfHour);
      }
    }
    return res;
  }
  showModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }
  renderModal(timeHeight) {
    const { showModal } = this.state;
    if (showModal) {
      return <AddEvent showModal={this.showModal.bind(this)} min={8} max={17} range={timeHeight}></AddEvent>
    }
    return '';
  }
  getTimeHeight(min, max) {
    return (max - min) * 60;
  }
  render() {
    const dayHours = this.getTimeColumn(8, 17);
    const timeHeight = this.getTimeHeight(8, 17);
    return (
      <div>
        <div className='calendar-container'>
          <TimeColumn dayHours={dayHours}></TimeColumn>
          <EventsContainer timeHeight={timeHeight} height={dayHours.length}></EventsContainer>
          { this.renderModal(timeHeight) }
        </div>
        <button onClick={() => this.showModal()}>Add event</button>
      </div>
    );
  }
}

export default Calendar;
