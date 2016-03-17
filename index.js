import React from 'react';
import ReactDOM from 'react-dom';

var Test = React.createClass({
	render() {
		return <div>Hello</div>;
	}
});

ReactDOM.render(
	<Test />,
	document.getElementById('relationship-viewer')
);

