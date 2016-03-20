import React from 'react';
import ReactDOM from 'react-dom';
import data from './sampleData.js';
import processRulesUtil from './processRulesUtil.js';
import RelationshipTypeKey from './RelationshipTypeKey.jsx';
import createVisualization from './createVisualization.js';

var Test = React.createClass({

	componentDidMount() {
		var el = this.refs.viz_container;
		createVisualization(el, processRulesUtil.convertDataToDirectedGraph(data));
		
	},
	getRelationshipTypesForKey(){
		var relTypesinRules = _.uniq(_.map(data.rules, function(rule){return rule.relationshipType;}))
		return <RelationshipTypeKey types={relTypesinRules} />

	},
	render() {
		return <div>
			<div className="outer_container">
				<div ref="viz_container" className="container">
				<h1 className="title">Relationship Rules for Jama Main</h1>
				<div className=" container key"><h1 className="title">Relationship Types</h1>
				{this.getRelationshipTypesForKey()}
				</div>
				</div>
			</div>
		</div>;
	}
});

ReactDOM.render(
	<Test />,
	document.getElementById('relationship-viewer')
);
