/** @jsx React.DOM */
(function () {
	'use strict';

	var ListBlock = React.createClass({
		render: function() {
			return <div className="list-block-container">
				<div className="list-block-header">
					<div onClick={this.closeList} className="x"></div>
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
					<ul>{this.getItems(this)}</ul>
				</div>
			</div>;
		},
		getDefaultProps: function () {
			return {
				header: 'Blocks'
			}
		},
		getItems: function (that) {
			return that.props.scope.blocks.map(function (block) {
				return <div className="block-list-item" onClick={that.handleClick.bind(null, block)}>
					<div className="block-list-item-img"><img src={block.imgDescription}/></div>
					<div className="block-list-item-name"><h2>{block.name}</h2></div>
				</div>;
			});
		},
		closeList: function (e) {
			$(React.findDOMNode(this)).hide();
			e.stopPropagation();
		},
		handleClick: function (a) {
			this.props.scopes.get(this.props.blockID).$broadcast(this.props.blockID + '-ChangeBlock', {block: a});
			$(React.findDOMNode(this)).hide();
		},
		componentDidMount: function () {
			var that = this;
			React.findDOMNode(this).addEventListener('mousedown', this.onMouseDown);
			this.props.scope.$on('BlockClicked', function (data, args) {
				that.setProps({blockID: args.id});
				$(React.findDOMNode(that)).show();
				var newPosition = {
					top: args.y - 200,
					left: 200 + args.x
				};
				$(React.findDOMNode(that)).offset(newPosition);
			});
			if (!this.props.scope.showListBlock) {
				$(React.findDOMNode(this)).hide();
			}
		}
	});

	window.ReactComponents.ListBlock = ListBlock;
})(window);


