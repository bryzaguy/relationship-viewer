import React from 'react';
import ReactDOM from 'react-dom';
import data from './sampleData.js';

var Test = React.createClass({
	render() {
		return <div>Rulessss: {JSON.stringify(data.rules)}</div>;
	}
});

ReactDOM.render(
	<Test />,
	document.getElementById('relationship-viewer')
);

