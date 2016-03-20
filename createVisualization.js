import d3 from 'd3';
import processRules from './processRulesUtil.js';
import style from './index.css';
import cx from 'classnames';
import _ from 'lodash';


var createVisualization = function(containerElement){
  var payload = processRules.convertDataToDirectedGraph();
  var realNodes = payload.nodes;
  var realLinks = payload.links;

	// set up SVG for D3
var width  = 495,
    height = 495,
    nodeSize = 20,
    colors = d3.scale.category20(),
    pathColors = ['blue', 'green', 'red'];

var svg = d3.select(containerElement)
  .append('svg')
  .attr('oncontextmenu', 'return false;')
  .attr('width', width)
  .attr('height', height);

// set up initial nodes and links
//  - nodes are known by 'id', not by index in array.
//  - reflexive edges are indicated on the node (as a bold black circle).
//  - links are always source < target; edge directions are set by 'left' and 'right'.


var nodes = realNodes;

// var links = [{
//   source: nodes[0],
//   target: nodes[2],
//   right: true,
//   left: false
//   }];

var links = realLinks;

// var links = [];

  var lastNodeId = 2
  // // nodes = payload.nodes,
  // links = payload.links;

// init D3 force layout
var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkDistance(120)
    .linkStrength(.4)
    .gravity(.1)
    .charge(-500)
    .theta(0.8)
    .alpha(0.1)
    .on('tick', tick)

svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

svg.append('svg:defs').append('svg:marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 4)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M10,-5L0,0L10,5')
    .attr('fill', '#000');

// define arrow markers for graph links
_.map(pathColors, function (color) {
  svg.append('svg:defs').append('svg:marker')
      .attr('id', 'end-arrow-' + color)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 6)
      .attr('markerWidth', 3)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
    .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', color);

  svg.append('svg:defs').append('svg:marker')
      .attr('id', 'start-arrow-' + color)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 4)
      .attr('markerWidth', 3)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
    .append('svg:path')
      .attr('d', 'M10,-5L0,0L10,5')
      .attr('fill', color);
});

// line displayed when dragging new nodes
var drag_line = svg.append('svg:path')
  .attr('class', cx(style.link, style.dragline, style.hidden))
  .attr('d', 'M0,0L0,0');

// handles to link and node element groups
var path = svg.append('svg:g').selectAll('path'),
    circle = svg.append('svg:g').selectAll('g');

// mouse event vars
var selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null;

function resetMouseVars() {
  mousedown_node = null;
  mouseup_node = null;
  mousedown_link = null;
}

// update force layout (called automatically each iteration)
function tick() {
  // draw directed edges with proper padding from node centers
  path.attr('d', function(d) {
    var deltaX = d.target.x - d.source.x,
        deltaY = d.target.y - d.source.y,
        dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        normX = deltaX / dist,
        normY = deltaY / dist,
        sourcePadding = d.left ? nodeSize + 5 : nodeSize,
        targetPadding = d.right ? nodeSize + 5 : nodeSize,
        sourceX = d.source.x + (sourcePadding * normX),
        sourceY = d.source.y + (sourcePadding * normY),
        targetX = d.target.x - (targetPadding * normX),
        targetY = d.target.y - (targetPadding * normY);
    return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
  });

  circle.attr('transform', function(d) {
    return 'translate(' + d.x + ',' + d.y + ')';
  });
}

// update graph (called when needed)
function restart() {
  // path (link) group
  path = path.data(links);

  // update existing links
  path
    .style('stroke', (d) => d.relationshipType.color)
    .classed('selected', (d) => d.forCoverage)
    .style('marker-start', (d) => d.left ? 'url(#start-arrow-' + d.relationshipType.color + ')' : '')
    .style('marker-end', (d) => d.right ? 'url(#end-arrow-' + d.relationshipType.color + ')' : '');


  // add new links
  path.enter().append('svg:path')
    .attr('class', 'link')
    .style('stroke', (d) => d.relationshipType.color)
    .classed('selected', (d) => d.forCoverage)
    .style('marker-start', (d) => d.left ? 'url(#start-arrow-' + d.relationshipType.color + ')' : '')
    .style('marker-end', (d) => d.right ? 'url(#end-arrow-' + d.relationshipType.color + ')' : '');

  // remove old links
  path.exit().remove();


  // circle (node) group
  // NB: the function arg is crucial here! nodes are known by id, not by index!
  circle = circle.data(nodes, function(d) { return d.itemType; });

  // update existing nodes (reflexive & selected visual states)
  circle.selectAll('circle')
    .style('fill', '#FFF')
    .classed(style.reflexive, function(d) { return d.reflexive; });

  // add new nodes
  var g = circle.enter().append('svg:g');

  g.append('svg:circle')
    .attr('class', 'node')
    .style('fill', '#FFF')
    .attr('r', nodeSize)
    .style('stroke', function(d) { return colors(d.id); })
    .classed(style.reflexive, function(d) { return d.reflexive; })
    .on('mouseover', function(d) {
      if(!mousedown_node || d === mousedown_node) return;
      // enlarge target node
      d3.select(this).attr('transform', 'scale(1.1)');
    })
    .on('mouseout', function(d) {
      if(!mousedown_node || d === mousedown_node) return;
      // unenlarge target node
      d3.select(this).attr('transform', '');
    })
    .on('mouseover', function(d) {
      var hovered = d3.select(this.parentNode);

      hovered.append('svg:text')
        .attr('id', 'hover-text-stroke-' + d.id)
        .attr('x', 0)
        .attr('y', -(nodeSize + 5))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('z-index', '15')
        .style('stroke', '#FFF')
        .style('stroke-width', 5)
        .style('stroke-alignment', 'outer')
        .text(function(d) { return d.itemType; });

      hovered.append('svg:text')
        .attr('id', 'hover-text-' + d.id)
        .attr('x', 0)
        .attr('y', -(nodeSize + 5))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('z-index', '16')
        .style('fill', '#000')
        .text(function(d) { return d.itemType; });
    })
    .on('mouseleave', function (d) {
      d3.select('#hover-text-' + d.id).remove();
      d3.select('#hover-text-stroke-' + d.id).remove();
    })
    .on('mousedown', function(d) {
      if(d3.event.ctrlKey) return;

      // select node
      mousedown_node = d;
      if(mousedown_node === selected_node) selected_node = null;
      else selected_node = mousedown_node;
      selected_link = null;

      // reposition drag line
      drag_line
        .style('marker-end', 'url(#end-arrow)')
        .classed(style.hidden, false)
        .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);

      restart();
    })
    .on('mouseup', function(d) {
      if(!mousedown_node) return;

      // needed by FF
      drag_line
        .classed(style.hidden, true)
        .style('marker-end', '');

      // check for drag-to-self
      mouseup_node = d;
      if(mouseup_node === mousedown_node) { resetMouseVars(); return; }

      // unenlarge target node
      d3.select(this).attr('transform', '');

      // add link to graph (update if exists)
      // NB: links are strictly source < target; arrows separately specified by booleans
      var source, target, direction;
      if(mousedown_node.id < mouseup_node.id) {
        source = mousedown_node;
        target = mouseup_node;
        direction = 'right';
      } else {
        source = mouseup_node;
        target = mousedown_node;
        direction = 'left';
      }

      var link;
      link = links.filter(function(l) {
        return (l.source === source && l.target === target);
      })[0];

      if(link) {
        link[direction] = true;
      } else {
        link = {source: source, target: target, left: false, right: false};
        link[direction] = true;
        links.push(link);
      }

      // select new link
      selected_link = link;
      selected_node = null;
      restart();
    });

  // show node IDs
  g.append('svg:text')
      .attr('x', 0)
      .attr('y', nodeSize / 2)
      .style('fill', function(d) { return colors(d.id); })
      .style('font-family', 'Ionicons')
      .attr('text-anchor', 'middle')
      .style('font-size', '23px')
      .text(function(d) { return d.icon; });

  // remove old nodes
  circle.exit().remove();

  // set the graph in motion
  force.start();
}

function mousedown() {
  // prevent I-bar on drag
  //d3.event.preventDefault();

  // because :active only works in WebKit?
  svg.classed(style.active, true);

  if(d3.event.ctrlKey || mousedown_node || mousedown_link) return;
}

function mousemove() {
  if(!mousedown_node) return;

  // update drag line
  drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);

  restart();
}

function mouseup() {
  if(mousedown_node) {
    // hide drag line
    drag_line
      .classed(style.hidden, true)
      .style('marker-end', '');
  }

  // because :active only works in WebKit?
  svg.classed(style.active, false);

  // clear mouse event vars
  resetMouseVars();
}

function spliceLinksForNode(node) {
  var toSplice = links.filter(function(l) {
    return (l.source === node || l.target === node);
  });
  toSplice.map(function(l) {
    links.splice(links.indexOf(l), 1);
  });
}

// only respond once per keydown
var lastKeyDown = -1;

function keydown() {
  d3.event.preventDefault();

  if(lastKeyDown !== -1) return;
  lastKeyDown = d3.event.keyCode;

  // ctrl
  if(d3.event.keyCode === 17) {
    circle.call(force.drag);
    svg.classed(style.ctrl, true);
  }

  if(!selected_node && !selected_link) return;
  switch(d3.event.keyCode) {
    case 8: // backspace
    case 46: // delete
      if(selected_node) {
        nodes.splice(nodes.indexOf(selected_node), 1);
        spliceLinksForNode(selected_node);
      } else if(selected_link) {
        links.splice(links.indexOf(selected_link), 1);
      }
      selected_link = null;
      selected_node = null;
      restart();
      break;
    case 66: // B
      if(selected_link) {
        // set link direction to both left and right
        selected_link.left = true;
        selected_link.right = true;
      }
      restart();
      break;
    case 76: // L
      if(selected_link) {
        // set link direction to left only
        selected_link.left = true;
        selected_link.right = false;
      }
      restart();
      break;
    case 82: // R
      if(selected_node) {
        // toggle node reflexivity
        selected_node.reflexive = !selected_node.reflexive;
      } else if(selected_link) {
        // set link direction to right only
        selected_link.left = false;
        selected_link.right = true;
      }
      restart();
      break;
  }
}

function keyup() {
  lastKeyDown = -1;

  // ctrl
  if(d3.event.keyCode === 17) {
    circle
      .on('mousedown.drag', null)
      .on('touchstart.drag', null);
    svg.classed(style.ctrl, false);
  }
}

// app starts here
svg.on('mousedown', mousedown)
  .on('mousemove', mousemove)
  .on('mouseup', mouseup);
d3.select(window)
  .on('keydown', keydown)
  .on('keyup', keyup);
restart();


	return containerElement;
}

module.exports = createVisualization;