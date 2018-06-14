
//contactForm

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissionStatus: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ 
            submissionStatus: 'Submitting...' 
        });
        const form = event.target;
        const data = new FormData(form);
        this.submitForm(form, data);
    }

    handleKeyUp(event) {
        if (event.keyCode == 13) { 
            this.handleSubmit(event);
        }
    }

    submitForm(form, data) {

        const myForm = new Map();

        for(let fieldName of data.keys()) {
            const fieldInput = form.elements[fieldName];
            const fieldValue = form.elements[fieldName].value;

            if (fieldInput.className == "form-control") {
                //console.log(fieldName, fieldValue);
                myForm.set(fieldName, fieldValue);
            }
        }
        
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: myForm.get('name'),
                body: myForm.get('message'),
                userId: 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (response.ok) {
				  return response.json();
            } else {
                this.setState({ 
                    submissionStatus: 'Unable to send form data' 
                });
            }
        })
        .then(json => {
            console.log(json);
            myForm.clear();
            this.setState({ 
                submissionStatus: 'Thank you, your information has been recieved!' 
            });
        })
    }

    render() {
        return(
            <div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-offset-3 col-xs-12 col-lg-6">
                      <div className="jumbotron">
                        <div className="row text-center">
                            <div className="submission_result">{this.state.submissionStatus}</div>
                        </div>
                        <div className="row text-center">
                          <div className="text-center col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
                          <div className="text-center col-lg-12"> 
                            <form role="form" id="contactForm" className="text-center" onKeyUp={this.handleKeyUp} onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Name" required />
							  </div>
                              <div className="form-group">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email Address" required />
							  </div>
                              <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea rows="5" cols="100" className="form-control" id="message" name="message" placeholder="Message" required></textarea>
							  </div>
							  <div className="form-group">
								  <button type="submit" id="contactFormSubmit" className="btn btn-primary btn-lg">Send</button>
							  </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
  <ContactForm />,
  document.getElementById('contact_form')
);