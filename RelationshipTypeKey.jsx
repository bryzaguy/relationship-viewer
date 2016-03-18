import React from 'react';

var RelationshipTypeKey = React.createClass({

propTypes:{
	types: React.PropTypes.array
},



getTypesList() {
	return _.map(this.props.types, function(type, index){
		return <li key={index}>{type.name}
		<span style={
			{
			backgroundColor: type.color,
			display: 'inline-block',
			height: '20px',
			width: '60px',
			position: 'absolute',
			right: '10px'
		}
		}>
		</span>
		</li>
	});

},

render(){
	return (<ol className="item_list">
		{this.getTypesList()}
	</ol>)
}

});

module.exports = RelationshipTypeKey;