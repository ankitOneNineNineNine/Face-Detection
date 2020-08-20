import React from 'react';
class Signin extends React.Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  onInputChange = (e) =>{
    var {name, value} = e.target;
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleLogin = (e) =>{
    e.preventDefault();
    fetch('http://localhost:3500/signin',{
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })

    })
    .then(resp=>resp.json())
    .then(data=> {
      if(data === 'success') this.props.onRouteChange('home')
    })
    
  }
  render() {

    return (
      <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange = {this.onInputChange} type="email" name="email" id="email" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange = {this.onInputChange} type="password" name="password" id="password" />
              </div>

            </fieldset>
            <div className="">
              <input onClick={this.handleLogin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </form>
        </main>
      </article>


    );
  }
}
export default Signin;
