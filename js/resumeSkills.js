
// ResumeSkills

//import ProgressBar from 'react-bootstrap/lib/ProgressBar';

class ResumeSkills extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			skills: [],
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
					skills: data.skills,
					isLoading: false 
				})
			})
			.catch(error => this.setState({ 
				error, isLoading: false 
			}));
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
		  return <p>Loading...<br/><img src="images/busy.gif"/></p>;
		}
		
		/*
		const mySkills = [].concat(this.state.skills)
			.sort((a, b) => a.itemM > b.itemM)
			.map((item, i) => 
				<div key={i}> {item.matchID} {item.timeM}{item.description}</div>
			);
		*/
		/*
			let rows = [];
			for (let i = 0; i < objectRows.length; i++) {
				rows.push(<ObjectRow key={i} data={objectRows[i]} />);
			}
		*/
		
		return (
			<div>
				<h3>Skill Set</h3>
        		<hr/>
				{this.state.skills.map((item, index) => {
					//return <ProgressBar now={item.level} label={item.name} />
					return <div key={index} className="progress"><div className={this.buildClassName(item.level)} role="progressbar" aria-valuenow={item.level} aria-valuemin="0" aria-valuemax="100" style={{width: item.level + '%'}}>{item.name}</div></div>
				})}				
			</div>
		);
	}
}

ReactDOM.render(
  <ResumeSkills jsonFile="./js/resume.js"/>,
  document.getElementById('resume_skills')
);


