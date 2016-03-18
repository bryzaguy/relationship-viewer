import React from 'react';
import ReactDOM from 'react-dom';
import data from './sampleData.js';
import processRulesUtil from './processRulesUtil.js';
import createVisualization from './createVisualization.js';

var Test = React.createClass({

	componentDidMount() {
		var el = this.refs.viz_container;
		createVisualization(el, processRulesUtil.convertDataToDirectedGraph(data));
		
	},
	render() {
		return <div>
			<div className="outer_container">
				<div ref="viz_container" className="container">
				<h1 className="title">Relationship Rules for Jama Main</h1>
				<div className=" container key"><h1 className="title">Relationship Types</h1>
				</div>
				</div>
			</div>

			Project Rules: {JSON.stringify(data.rules)}
		</div>;
	}
});

ReactDOM.render(
	<Test />,
	document.getElementById('relationship-viewer')
);

