import React from 'react';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  inputChange = (e) => {
    var { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleRegister = (e) => {
    e.preventDefault();
    fetch('http://localhost:3500/register',
      {
        method: 'post',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      }
    )
    .then(resp=>this.props.onRouteChange('home'))
    .catch(console.log)

    
  }
  render() {
    return (
      <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.inputChange} type="text" name="name" id="name" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.inputChange} type="email" name="email-address" id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.inputChange} type="password" name="password" id="password" />
              </div>

            </fieldset>
            <div className="">
              <input onClick={this.handleRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
            </div>

          </form>
        </main>
      </article>


    );

  }
}
export default Register;
