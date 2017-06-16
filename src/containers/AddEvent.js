import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/events';

const mapStateToProps = () => ({});

const actions = Object.assign({}, eventActions);
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { startMin: 0, startHour: props.min, duration: 0, title: '', };
  }
  handleStartHourBlur(e) {
    const { value } = e.target;
    const { min, max, range } = this.props;
    const { duration, startMin } = this.state;
    if (Number(value) !== Number(value)) {
      this.setState({ startHour: min });
      return;
    }
    if (value >= min && value < max) {
      this.setState({ startHour: value });
    } else {
      this.setState({ startHour: min });
    }
    this.countDuration();
  }
  countDuration(value = 0) {
    const { min, max, range } = this.props;
    const { duration, startMin, startHour } = this.state;
    if (startMin >= 60 || startHour >= max) {
      return;
    }
    const startInMinutes = (Number(startHour) - Number(min)) * 60 + Number(startMin);
    const allowedDuration = Number(range) - Number(startInMinutes);
    if (allowedDuration >= value) {
      this.setState({ duration: value });
    } else if (allowedDuration < duration){
      this.setState({ duration: allowedDuration || 0 });
    }
  }
  handleStartMinBlur(e) {
    const { value } = e.target;
    const { duration, startHour } = this.state;
    const { min, max, range } = this.props;
    if (Number(value) !== Number(value)) {
      this.setState({ startMin: 0 });
      return;
    }
    if (value >= 0 && value < 60) {
      this.setState({ startMin: value });
    } else {
      this.setState({ startMin: 0 });
    }
    this.countDuration();
  }
  handleDurationBlur(e) {
    const { value } = e.target;
    if (Number(value) !== Number(value)) {
      this.setState({ duration: 0 });
      return;
    }
    this.countDuration(value);
  }
  handleOnChange(e) {
    this.setState({ [e.target.className]: e.target.value });
  }
  submitEvent() {
    if (this.state.duration > 0 && this.state.title) {
      this.props.actions.addEvent(this.state);
      this.props.showModal();
    }
  }
  render() {
    const { min, max } = this.props;
    return (
      <div className='event-modal'>
        <div className='inputs-container'>
          <div className='input-wrapper'>
            <span>Set start hour</span>
            <input onBlur={(e) => this.handleStartHourBlur(e)}
              onChange={(e) => this.handleOnChange(e)}
              value={this.state.startHour}
              className='startHour'
            />
          </div>
          <div className='input-wrapper'>
            <span>Set start minutes</span>
            <input
              onBlur={(e) => this.handleStartMinBlur(e)}
              onChange={(e) => this.handleOnChange(e)}
              value={this.state.startMin}
              className='startMin'
            />
          </div>
          <div className='input-wrapper'>
            <span>Set duration</span>
            <input
              onBlur={(e) => this.handleDurationBlur(e)}
              onChange={(e) => this.handleOnChange(e)}
              value={this.state.duration}
              className='duration'
            />
          </div>
          <div className='input-wrapper'>
            <span>Set event title</span>
            <input
              className='title'
              onChange={(e) => this.handleOnChange(e)}
            />
          </div>
          <button
            onClick={() => this.submitEvent()}
            className='event-submit'
          >Submit Event</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
