import React from "react"
import "./form.css"

const initialState = {
	work: true,
	jobs: false,
	name: "",
	contact: "",
	inquiry: "",	
	nameError: "",
	contactError: ""	
}

class Form extends React.Component {
	state = initialState;
	
	validateName = () => {
		let nameError = "";

		if (!this.state.name) {
			nameError = "Please tell us your name.";
		}

		if (nameError) {
			this.setState({nameError});
			return false;
		}
		return true;
	}

	validateContact = () => {
		let contactError = "";
		let contact = this.state.contact;

		// If no value is submitted
		if (!contact) {
			contactError = "1-999-999-9999 or example@email.com";
		} 
		
		// If the value contains any alphabets, validate the email address
		if (contact.match(/[a-z]/i)) {
			if (!this.validateEmail(contact)) {
				contactError = "999-999-9999 or example@email.com";
			}
		} else {
			if (!this.validatePhoneNo(contact)) {
				contactError = "999-999-9999 or example@email.com";
			}
		}
		
		if (contactError) {
			this.setState({contactError});
			return false;
		}
		return true;
	}

	validateEmail = (email) => {
		const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regexEmail.test(email);
	}

	validatePhoneNo = (phoneNo) => {
		const regexPhoneNo = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
		return regexPhoneNo.test(phoneNo);
	}

	handleChange = (event) => {
		this.setState({ 
			[event.target.name]: event.target.value
		});
	}
	
	handleRadio = (event) => {
		if (event.target.id === 'jobs') {
			this.setState({
				jobs: true,
				work: false
			})
		} else {
			this.setState({
				work: true,
				jobs: false
			})
		} 
	}

	handleSubmit = event => {		
		event.preventDefault();
		const isValidName = this.validateName();
		const isValidContact = this.validateContact();

		if (isValidName) {
			this.state.nameError = "";
			if (isValidContact) {
				this.state.contactError = "";
				this.setState(initialState);
				console.log(this.state);
			}			
		}	
	};

	render () {
		return (
			<form name="contact" onSubmit={this.handleSubmit}>

				<div className="question">
				<label>Reason for contacting us?</label><br/>		
					<div className="horizontal">
						<input type="radio" name="work" id="work" checked={this.state.work}
							onChange={this.handleRadio}/>
						<label className="btn-rounded" htmlFor="work">Work with TW</label>

						<input type="radio" name="jobs" id="jobs" checked={this.state.jobs}
							onChange={this.handleRadio}/>
						<label className="btn-rounded" htmlFor="jobs">Jobs at TW</label>
					</div>	
				</div>	
					
				<div className="question">
					<label>What is your name?</label><br/>
					<input type="text" name="name" value={this.state.name} placeholder="First and last name please"
						onChange={event => this.handleChange(event, "name")}/>
					<p style={{ color: "red "}}>{this.state.nameError}</p>

				</div>
				
				<div className="question">
					<label>How can we get in touch with you?</label><br/>
					<input type="text" name="contact" value={this.state.contact} placeholder="Phone or email address"
						onChange={event => this.handleChange(event, "name")}/>
					<p style={{ color: "red "}}>{this.state.contactError}</p>
				</div>
				
				<div className="question">
					<label>Want to tell us anything else?</label><br/>
					<textarea rows="1" cols="90" name="inquiry" value={this.state.inquiry} placeholder="We're listening"
					onChange={event => this.handleChange(event, "name")}/>
				</div>
					
				<input type="submit"/>
			</form>
		)			
	}	
}
 
export default Form