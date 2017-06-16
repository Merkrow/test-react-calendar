import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../reducers/login';
import { events } from '../reducers/events';
import * as loginActions from '../actions/login';

const mapStateToProps = ({ login, events }) => ({
  login,
  events,
});

const actions = Object.assign({}, loginActions);
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

class SaveEvents extends Component {
  componentDidUpdate() {
    const { events, login } = this.props;
    if (login) {
      this.props.actions.saveEvents({ email: login, events });
    }
  }
  showJson() {
    const { events } = this.props;
    alert(JSON.stringify(events));
  }
  render() {
    return (
      <div><button onClick={() => {this.showJson()}}>show JSON</button></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveEvents);
