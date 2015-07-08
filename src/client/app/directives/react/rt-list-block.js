/** @jsx React.DOM */
(function () {
	'use strict';

	var ListBlock = React.createClass({displayName: "ListBlock",
		render: function() {
			return React.createElement("div", {className: "list-block-container"}, 
				React.createElement("div", {className: "list-block-header"}, 
					React.createElement("div", {onClick: this.closeList, className: "x"}), 
					React.createElement("h1", null, this.props.header)
				), 
				React.createElement("div", {className: "list-block-nav"}, 
					React.createElement("ul", null, 
						React.createElement("li", null, React.createElement("a", {href: ""}, "1")), 
						React.createElement("li", null, React.createElement("a", {href: ""}, "2")), 
						React.createElement("li", null, React.createElement("a", {href: ""}, "3")), 
						React.createElement("li", null, React.createElement("a", {href: ""}, "4")), 
						React.createElement("li", null, React.createElement("a", {href: ""}, "5"))
					)
				), 
				React.createElement("div", {className: "list-block-ul"}, 
					React.createElement("ul", null, this.getItems(this))
				)
			);
		},
		getDefaultProps: function () {
			return {
				header: 'Blocks'
			}
		},
		getItems: function (that) {
			return that.props.scope.blocks.map(function (block) {
				return React.createElement("div", {className: "block-list-item", onClick: that.handleClick.bind(null, block)}, 
					React.createElement("div", {className: "block-list-item-img"}, React.createElement("img", {src: block.imgDescription})), 
					React.createElement("div", {className: "block-list-item-name"}, React.createElement("h2", null, block.name))
				);
			});
		},
		closeList: function (e) {
			$(React.findDOMNode(this)).hide();
			e.stopPropagation();
		},
		handleClick: function (block) {
			this.props.scopes.get(this.props.blockID).changeBlock(block);
			$(React.findDOMNode(this)).hide();
		},
		componentDidMount: function () {
			var that = this;
			React.findDOMNode(this).addEventListener('mousedown', this.onMouseDown);
			this.props.scope.changeBlock  = function (args) {
				that.setProps({blockID: args.id});
				$(React.findDOMNode(that)).show();
				var newPosition = {
					top: args.y - 200,
					left: 200 + args.x
				};
				$(React.findDOMNode(that)).offset(newPosition);
			};
			if (!this.props.scope.showListBlock) {
				$(React.findDOMNode(this)).hide();
			}
		}
	});

	window.ReactComponents.ListBlock = ListBlock;
})(window);


