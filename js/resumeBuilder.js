
// ResumeBuild

class ResumeBuilder extends React.Component {
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
			skills: [],
			work: [],
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
			.then(data => {
				//console.log("skills", data.skills);
				//console.log("work", data.work);
				this.setState({  
					name: data.about.name,
					title: data.about.title,
					email: data.about.email,
					phone: data.about.phone,
					resumeLink: data.about.resumeDownload,
					website: data.about.website,
					summary: data.about.summary,
					location: data.about.location.city + ' ' + data.about.location.region,
					skills: data.skills,
					work: data.work,
					isLoading: false 
				})
			})
			.catch(error => this.setState({ 
				error, isLoading: false 
			}));
	}
		
	render() {

		if (this.state.error) {
		  return <p>{this.state.error.message}</p>;
		}

		if (this.state.isLoading) {
		  return <p>Loading About...<br/><img src="images/busy.gif"/></p>;
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
				<div className="row">
				  <div className="col-xs-12 col-sm-8">
					<ResumeExperience work={this.state.work} isLoading={this.state.isLoading} />
				  </div>
				  <div className="col-xs-12 col-sm-4">
					<ResumeSkills skills={this.state.skills} isLoading={this.state.isLoading} />
				  </div>
				</div>
			</div>
		);
	}
}

class ResumeSkills extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			skill: this.props.work,
			isLoading: this.props.isLoading
		};
	}
	
	buildClassName(level) {
		if (level >= 80) {
			return "progress-bar progress-bar-success";
		} else if ((level >= 70) && (level >= 60)) {
			return "progress-bar progress-bar-info";
		} else if ((level >= 50) && (level >= 40)) {
			return "progress-bar progress-bar-warning";
		} else {
			return "progress-bar progress-bar-danger";
		}
	}
	
	buildWidth(level) {
		return "width: " + level + "%";
	}
	
	render() {
		
		if (this.state.error) {
		  return <p>{this.state.error.message}</p>;
		}

		if (this.state.isLoading) {
		  return <p>Loading Skills...<br/><img src="images/busy.gif"/></p>;
		}
		
		return (
			<div>
				<h3>Skill Set</h3>
				<hr/>
				{this.props.skills.map((item, index) => {
					//return <ProgressBar now={item.level} label={item.name} />
					return <div key={index} className="progress"><div className={this.buildClassName(item.level)} role="progressbar" aria-valuenow={item.level} aria-valuemin="0" aria-valuemax="100" style={{width: item.level + '%'}}>{item.name}</div></div>
				})}				
			</div>
		)
	}
	
}

class ResumeExperience extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			work: this.props.work,
			isLoading: this.props.isLoading
		};
	}
	
	render() {

		if (this.state.isLoading) {
		  return <p>Loading Experience...<br/><img src="images/busy.gif"/></p>;
		}
				
		return (
			<div>
				<h3>Work Experience</h3>
				<hr/>
				{this.state.work.map((item, index) => {
				return ( 
					<div key={index} className="row">
						<div className="col-xs-6">
							<h4>{item.company}</h4>
						</div>
						<div className="col-xs-6">
						  <h4 className="text-right"><span className="glyphicon glyphicon-calendar" aria-hidden="true"></span> {item.startDate} - {item.endDate}</h4>
						</div>
						<div>
							<h4><span className="label label-default">{item.position}</span></h4>
							<p dangerouslySetInnerHTML={{ __html: item.summary }} />
						</div>
					</div>
				)})}			
			</div>
		);
	}
}

ReactDOM.render(
  <ResumeBuilder jsonFile="./js/resume.js"/>,
  document.getElementById('resume_builder')
);


