import _ from 'lodash';

var sampleRules = {
  "rules": [
    {
      "id": 2435,
      "fromItemTypeId": 101643,
      "toItemTypeId": 101668,
      "forCoverage": true,
      "relationshipTypeId": 10099
    },
    {
      "id": 2436,
      "fromItemTypeId": 101645,
      "toItemTypeId": 101668,
      "forCoverage": true,
      "relationshipTypeId": 10098
    },
    {
      "id": 2437,
      "fromItemTypeId": 101668,
      "toItemTypeId": 101667,
      "forCoverage": true,
      "relationshipTypeId": 10098
    },
    {
      "id": 2438,
      "fromItemTypeId": 101644,
      "toItemTypeId": 101645,
      "forCoverage": true,
      "relationshipTypeId": 10098
    },
    {
      "id": 2439,
      "fromItemTypeId": 107362,
      "toItemTypeId": 101668,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2440,
      "fromItemTypeId": 107362,
      "toItemTypeId": 101654,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2441,
      "fromItemTypeId": 107362,
      "toItemTypeId": 101643,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2442,
      "fromItemTypeId": 101667,
      "toItemTypeId": 101656,
      "forCoverage": true,
      "relationshipTypeId": 10098
    },
    {
      "id": 2443,
      "fromItemTypeId": 101667,
      "toItemTypeId": 107365,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2444,
      "fromItemTypeId": 104790,
      "toItemTypeId": 107365,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2445,
      "fromItemTypeId": 101643,
      "toItemTypeId": 101656,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2446,
      "fromItemTypeId": 101643,
      "toItemTypeId": 101667,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2447,
      "fromItemTypeId": 104790,
      "toItemTypeId": 101653,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2677,
      "fromItemTypeId": 101667,
      "toItemTypeId": 107391,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2678,
      "fromItemTypeId": 107362,
      "toItemTypeId": 107383,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2681,
      "fromItemTypeId": 107362,
      "toItemTypeId": 107393,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2683,
      "fromItemTypeId": 101667,
      "toItemTypeId": 107386,
      "forCoverage": false,
      "relationshipTypeId": 10096

    },
    {
      "id": 2697,
      "fromItemTypeId": 107362,
      "toItemTypeId": 107386,
      "forCoverage": true,
      "relationshipTypeId": 10098
    },
    {
      "id": 2698,
      "fromItemTypeId": 101667,
      "toItemTypeId": 101654,
      "forCoverage": false,
      "relationshipTypeId": 10098
    },
    {
      "id": 2700,
      "fromItemTypeId": 104790,
      "toItemTypeId": 104790,
      "forCoverage": true,
      "relationshipTypeId": 10098
    },
    {
      "id": 2708,
      "fromItemTypeId": 101667,
      "toItemTypeId": 101667,
      "forCoverage": false,
      "relationshipTypeId": 10098
    }
  ]
}

var itemTypeMap = {
	101668: "Epic", 101667: "Story", 101645: "Requirement", 101654: "Test Case", 101643: "Defect", 101656: "Business Objective", 107365: "Risk", 101653: "Hazard", 107391: "Cost", 107383: "Test Plan", 107393: "Functional Requirement", 107386: "Development Set", 104790: "Regulatory Requirement", 101644: "Marketing Requirement", 107362: "Compliance Risk"
}

var relationshipTypeMap = {
	10098: {name: "Dependent on", color: "blue"},
	10099: {name: "Verified by", color: "green"},
	10096: {name: "Put at risk by", color: "red"}
}

function mapRulesToTypes(rules){
	_.each(rules.rules, function(rule){
		if (itemTypeMap[rule.toItemTypeId]){
			rule.toItemType = itemTypeMap[rule.toItemTypeId];
		}
		if (itemTypeMap[rule.fromItemTypeId]){
			rule.fromItemType = itemTypeMap[rule.fromItemTypeId];
		}
		if (relationshipTypeMap[rule.relationshipTypeId]){
			rule.relationshipType = relationshipTypeMap[rule.relationshipTypeId]
		}
	});
	return rules;
}

module.exports = mapRulesToTypes(sampleRules);

