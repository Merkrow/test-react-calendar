import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { events } from '../reducers/events';
import * as eventActions from '../actions/events';
import Event from '../components/Event';

const mapStateToProps = ({ events }) => ({
  events,
});

const actions = Object.assign({}, eventActions);
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

class EventsContainer extends Component {
  constructor(props) {
    super(props);
  }
  renderEventRow() {
    const { height } = this.props;
    const res = [];
    for (let i = 0; i < height; i++) {
      res.push(<div key={`event-row-${i}`} className='event-row'></div>);
    }
    return res;
  }
  countTopCoord(start) {
    const { timeHeight } = this.props;
    return start / (timeHeight + 35) * 100;
  }
  countEventHeight(duration) {
    const { timeHeight } = this.props;
    return (duration / (timeHeight + 30)) * 100;
  }
  countNeighbours(events, id) {
    const startTime = events[id].start;
    const endTime = startTime + events[id].duration;
    let left = 0;
    let right = 0;
    events.map((event, i) => {
      if (i === id) return;
      const eventStart = event.start;
      const eventEnd = event.start + event.duration;
      if (endTime > eventStart && endTime <= eventEnd) {
        right++;
        return ;
      }
      if (startTime >= eventStart && startTime < eventEnd) {
        left++;
        return ;
      }
    });
    return { left, right };
  }
  renderEvents() {
    const { events, timeHeight } = this.props;
    return events.map((event, i) => (<Event key={`event-${i}`} id={i}
      top={this.countTopCoord(event.start)}
      height={this.countEventHeight(event.duration)}
      event={event}
      removeEvent={this.props.actions.removeEvent}
      neighbours={this.countNeighbours(events, i)}>
    </Event>));
  }
  render() {
    return (
      <div className='events-container'>
      { this.renderEventRow() }
      { this.renderEvents() }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
