import React from 'react';
import ReactDOM from 'react-dom';
import data from './sampleData.js';
import createVisualization from './createVisualization.js';

var Test = React.createClass({

	componentDidMount() {
		var el = this.refs.viz_container;
		createVisualization(el);
		
	},
	render() {
		return <div>
			<div ref="viz_container" className="container"></div>
			Project Rules: {JSON.stringify(data.rules)}
		</div>;
	}
});

ReactDOM.render(
	<Test />,
	document.getElementById('relationship-viewer')
);

