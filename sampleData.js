var _ = require('lodash');
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
      "relationshipTypeId": 10099
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
      "relationshipTypeId": 10096
    },
    {
      "id": 2677,
      "fromItemTypeId": 101667,
      "toItemTypeId": 107391,
      "forCoverage": false,
      "relationshipTypeId": 10096
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
      "relationshipTypeId": 10099

    },
    {
      "id": 2697,
      "fromItemTypeId": 107362,
      "toItemTypeId": 107386,
      "forCoverage": true,
      "relationshipTypeId": 10099
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
      "toItemTypeId": 101667,
      "forCoverage": true,
      "relationshipTypeId": 10098
    },
    {
      "id": 2708,
      "fromItemTypeId": 101667,
      "toItemTypeId": 104790,
      "forCoverage": false,
      "relationshipTypeId": 10098
    }
  ]
}

var itemTypeMap = {
    101668: "Epic",
    101667: "Story",
    101645: "Requirement",
    101654: "Test Case",
    101643: "Defect",
    101656: "Business Objective",
    107365: "Risk",
    101653: "Hazard",
    107391: "Cost",
    107383: "Test Plan",
    107393: "Functional Requirement",
    107386: "Development Set",
    104790: "Regulatory Requirement",
    101644: "Marketing Requirement",
    107362: "Compliance Risk"
}

var itemTypeIconMap = {
    101668: "\uf318",
    101667: "\uf472",
    101645: "\uf229",
    101654: "\uf120",
    101643: "\uf2be",
    101656: "\uf356",
    107365: "\uf39b",
    101653: "\uf2a4",
    107391: "\uf316",
    107383: "\uf454",
    107393: "\uf43d",
    107386: "\uf412",
    104790: "\uf2ad",
    101644: "\uf2ab",
    107362: "\uf2ad"
}

       
var relationshipTypeMap = {
    10098: { name: "Dependent on", color: "blue" },
    10099: { name: "Verified by", color: "green" },
    10096: { name: "Put at risk by", color: "red" }
}


function mapRulesToTypes(rules){
	_.each(rules.rules, function(rule){
    rule.toItemType = itemTypeMap[rule.toItemTypeId];
    rule.fromItemType = itemTypeMap[rule.fromItemTypeId];
    rule.toIcon = itemTypeIconMap[rule.toItemTypeId];
    rule.fromIcon = itemTypeIconMap[rule.fromItemTypeId];
		rule.relationshipType = relationshipTypeMap[rule.relationshipTypeId];
	});
	return rules;
}

module.exports = mapRulesToTypes(sampleRules);

