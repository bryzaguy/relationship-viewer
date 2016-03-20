var _ = require('lodash');
var rules = require('./sampleData.js').rules;

function convertDataToDirectedGraph(){
var nodes = createNodes();
var links = createLinks(nodes);

	return {
		nodes: nodes,
		links: links,
		lastNodeId: _.last(links).source.id
	    }
}	

function createLinks(nodes){
	var links = [];

	_.each(rules, function(rule, i){
		links.push({
			source: _.find(nodes, {itemType: rule.fromItemType}),
			target: _.find(nodes, {itemType: rule.toItemType}),
			relationshipType: rule.relationshipType,
			forCoverage: rule.forCoverage,
			left: false,
			right: true
		});
	});

	return links;
}

function createNodes(){
	var nodes = _.uniqBy(_.concat(
		_.map(rules, function(rule, index){
		return {
			itemType: rule.fromItemType,
			icon: rule.fromIcon
		}
	}), 
		_.map(rules, function(rule, index){
		return {
			itemType: rule.toItemType, 
			icon: rule.toIcon
		}
	})), 'itemType');

	_.each(nodes, function(node, index){
		index = index + 1
		node.id = index;
	});
	return nodes;
}

module.exports = {
	convertDataToDirectedGraph: convertDataToDirectedGraph
};
