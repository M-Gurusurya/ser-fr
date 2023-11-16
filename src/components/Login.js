import React, { Component } from "react";
import "./Login.css";
import FileUpload from "./FileUpload";
class Login extends Component {
    
        constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      hh:false
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.username ==="111" && this.state.password ==="111"){
      this.setState({hh:true})
    }
    else{
      alert("Invalid username or password")
    }
  }

  render() {
    if(!this.state.hh){
    return (
      <div className="login-page">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );}
    else{
      return (
        <FileUpload/>
      )
    }
      }
    }
export default Login;