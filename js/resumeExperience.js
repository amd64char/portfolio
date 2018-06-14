
// ResumeExperience

class ResumeExperience extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
				this.setState({ 
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
		  return <p>Loading...<br/><img src="images/busy.gif"/></p>;
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
  <ResumeExperience jsonFile="./js/resume.js"/>,
  document.getElementById('resume_experience')
);


