  import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Calendar from './containers/Calendar';
import LoginForm from './containers/LoginForm';
import SaveEvents from './containers/SaveEvents';
import { login } from './reducers/login';
import * as loginActions from './actions/login';

const mapStateToProps = ({ login }) => ({
  login,
});

const actions = Object.assign({}, loginActions);
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

class App extends Component {
  constructor(props) {
    super(props);
    this.state={ form: '' };
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.actions.signInByToken(token);
    }
  }
  logout() {
    localStorage.clear();
    this.props.actions.logout();
  }
  renderLoginForm() {
    const { form } = this.state;
    const { login } = this.props;
    return login ? <div><div>logined as {login}</div><button onClick={() => this.logout()}>logout</button></div> :
    <div><LoginForm form={form} login={this.props.actions.login} signUp={this.props.actions.signUp}></LoginForm>
    <button onClick={() => this.showLoginForm()}>Login</button><button onClick={() => this.showSignUpForm()}>Sign up</button></div>;
  }
  showLoginForm() {
    this.setState({ form: 'login' });
  }
  showSignUpForm() {
    this.setState({ form: 'signup' });
  }
  render() {
    return (
      <div>
        <Calendar></Calendar>
        { this.renderLoginForm() }
        <SaveEvents></SaveEvents>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
