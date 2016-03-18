var _ = require('lodash');
var data = require('./sampleData.js');


function convertDataToDirectedGraph(){
	var links = [];
	return links;
}

function getUniqueFromRules(property){
	return _.uniq(_.map(data.rules, function(rule){
		return rule[property];
	}));
}

function getUpstreamLinks(){
	var upstreamIds = getUniqueFromRules('fromItemTypeId');
	console.log(upstreamIds);
}


function getDownstreamRulesForId(id){
	return _.filter(data.rules, function(rule){
		rule.fromItemTypeId === id;
	});
}

console.log(getUpstreamLinks(data.rules));


module.exports = {
	convertDataToDirectedGraph: convertDataToDirectedGraph
};



