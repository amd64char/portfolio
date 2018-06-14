
// ResumeAbout

class ResumeAbout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			title: '',
			summary: '',
			email: '',
			phone: '',
			website: '',
			resumeLink: '',
			location: '',
			isLoading: false,
			error: null
		};
	}
	
	componentDidMount() {
    	this.setState({ 
			isLoading: true 
		});
		fetch(this.props.jsonFile)
			.then(response => {
				if (response.ok) {
				  return response.json();
				} else {
				  throw new Error('Could not locate JSON file.');
				}
			})
			.then(data => this.setState({ 
				name: data.about.name,
				title: data.about.title,
				email: data.about.email,
				phone: data.about.phone,
				resumeLink: data.about.resumeDownload,
				website: data.about.website,
				summary: data.about.summary,
				location: data.about.location.city + ' ' + data.about.location.region,
				isLoading: false 
			}))
			.catch(error => this.setState({ 
				error, isLoading: false 
			}));
	}
		
	render() {

		if (this.state.error) {
		  return <p>{this.state.error.message}</p>;
		}

		if (this.state.isLoading) {
		  return <p>Loading...<br/><img src="images/busy.gif"/></p>;
		}
		
		return (
			<div>
				<hr/>
				<div className="row">
					<div className="col-xs-8">
						<h2>{this.state.name}</h2>
					</div>
					<div className="col-xs-4">
						<p className="text-right"><a href={this.state.resumeLink} target="_blank">Download my Resume <span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span></a></p>
					</div>
				</div>
				<hr/>
				<div className="row">
					<div className="col-xs-12 col-sm-8">
						<div className="media">
							<div className="media-body">
								<h3 className="media-heading">{this.state.title}</h3>
								<div dangerouslySetInnerHTML={{ __html: this.state.summary }} />
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-4 well">
						<div className="row">
							<div className="col-lg-12">
								<h5><span className="glyphicon glyphicon-phone" aria-hidden="true"></span> : {this.state.phone}</h5>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<h5><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> : {this.state.email}</h5>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<h5><span className="glyphicon glyphicon-user" aria-hidden="true"></span> : <a href={this.state.website} target="_blank">{this.state.website}</a></h5>
							</div>
						</div>
					</div>
					<hr/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
  <ResumeAbout jsonFile="./js/resume.js"/>,
  document.getElementById('resume_about')
);


