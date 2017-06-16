import React, { Component } from 'react';

class LoginForm extends Component {
  submitForm() {
    const { form } = this.props;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (form === 'login') {
      this.props.login({ email, password });
    } else {
      const displayName = this.refs.displayName.value;
      this.props.signUp({ displayName, email, password });
    }
  }
  renderForm() {
    const { form } = this.props;
    return (
      <div>
        { form === 'login' ? '' : <input type='text' placeholder='enter name' ref='displayName' /> }
        <input type='email' placeholder='enter email' ref='email' required />
        <input type='password' placeholder='enter password' ref='password' required />
        <button onClick={() => this.submitForm()}>Submit</button>
      </div>
    );
  }
  render() {
    return (
      <div>
        { this.renderForm() }
      </div>
    );
  }
}

export default LoginForm;
