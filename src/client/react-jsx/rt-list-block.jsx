/** @jsx React.DOM */
(function () {
	'use strict';

	var ListBlock = React.createClass({
		render: function() {
			return <div className="list-block-container">
				<div className="list-block-header">
					<h1>{this.props.header}</h1>
				</div>
				<div className="list-block-nav">
					<ul>
						<li><a href="">1</a></li>
						<li><a href="">2</a></li>
						<li><a href="">3</a></li>
						<li><a href="">4</a></li>
						<li><a href="">5</a></li>
					</ul>
				</div>
				<div className="list-block-ul">
					<ul>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>;
		},
		getDefaultProps: function () {
			return {
				// allow the initial position to be passed in as a prop
				initialPos: {x: 0, y: 0},
				header: 'Blocks'
			}
		},
		getInitialState: function () {
			return {
				pos: this.props.initialPos,
				dragging: false,
				rel: null // position relative to the cursor
			}
		},
		componentDidMount: function () {
			React.findDOMNode(this).addEventListener('mousedown', this.onMouseDown);
		},
		componentDidUpdate: function (props, state) {
			if (this.state.dragging && !state.dragging) {
				document.addEventListener('mousemove', this.onMouseMove);
				document.addEventListener('mouseup', this.onMouseUp);
			} else if (!this.state.dragging && state.dragging) {
				document.removeEventListener('mousemove', this.onMouseMove);
				document.removeEventListener('mouseup', this.onMouseUp);
			}
		},
		// calculate relative position to the mouse and set dragging=true
		onMouseDown: function (e) {
			// only left mouse button
			if (e.button === 0) {
				var pos = $(React.findDOMNode(this)).offset();
				this.setState({
					dragging: true,
					rel: {
						x: e.pageX - pos.left,
						y: e.pageY - pos.top
					}
				});
				e.stopPropagation();
				e.preventDefault();
			}
		},
		onMouseUp: function (e) {
			this.setState({dragging: false});
			e.stopPropagation();
			e.preventDefault();
		},
		onMouseMove: function (e) {
			if (this.state.dragging) {
				this.setState({
					pos: {
						x: e.pageX - this.state.rel.x,
						y: e.pageY - this.state.rel.y
					}
				});
				$(React.findDOMNode(this)).offset({
					top: this.state.pos.y,
					left: this.state.pos.x
				});
				e.stopPropagation();
				e.preventDefault();
			}
		}
	});
	window.ReactComponents.ListBlock = ListBlock;
})(window);


