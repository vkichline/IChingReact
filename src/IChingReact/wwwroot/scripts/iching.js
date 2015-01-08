// Coin Component
// Properties: heads (boolean)
//
var Coin = React.createClass({displayName: "Coin",
	propTypes: {
		heads: React.PropTypes.bool
	},
	render: function () {
		return this.props.heads ? React.createElement("img", {src: "img/heads.png"}) : React.createElement("img", {src: "img/tails.png"});
	}
});


// Coins Component
// State coins[3] (boolean)
//
var Coins = React.createClass({displayName: "Coins",
	generateCoinSet: function () {
		var coins = [3];
		for(var i = 0; i < 3; i++) {
			var t = Math.floor(Math.random() * 4 + 6);
			coins[i] = (0 == t % 2);
		}
		return coins;
	},
	getInitialState: function () {
		return { coins: this.generateCoinSet() };
	},
	render: function () {
		return (
			React.createElement("div", {className: "CoinsComponent", onClick: this.clickHandler}, 
				React.createElement(Coin, {heads: this.state.coins[0]}), 
				React.createElement(Coin, {heads: this.state.coins[1]}), 
				React.createElement(Coin, {heads: this.state.coins[2]})
			)
		);
	},
	clickHandler: function (e) {
		this.setState({coins: this.generateCoinSet()});
		return false;
	}
});


// Line Component
// Properties:  value (number) [6 - 9]
//
var Line = React.createClass({displayName: "Line",
	render: function() {
		return (React.createElement("tr", {className: (0 == this.props.value % 2) ? 'even' : 'odd'}, 
			React.createElement("td", null), React.createElement("td", null), React.createElement("td", null)
		));
	}
});


// Hexagram Component
//
var Hexagram = React.createClass({displayName: "Hexagram",
	render: function () {
		return (React.createElement("table", {className: "hexagram"}, 
			React.createElement(Line, {value: "6"}), 
			React.createElement(Line, {value: "7"}), 
			React.createElement(Line, {value: "8"}), 
			React.createElement(Line, {value: "9"}), 
			React.createElement(Line, {value: "8"}), 
			React.createElement(Line, {value: "7"})
		));
	}
});


// Info Component
//
var Info = React.createClass({displayName: "Info",
	render: function () {
		return React.createElement("div", null, "Info");
	}
});


// IChingApp Component
//
var IChingApp = React.createClass({displayName: "IChingApp",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "I Ching App"), 
				React.createElement(Coins, null), 
				React.createElement(Hexagram, null), 
				React.createElement("h2", null, "The Judgement"), 
				React.createElement(Info, null), 
				React.createElement("h2", null, "The Transformation"), 
				React.createElement(Info, null)
			)
			);
	}
});

React.render(React.createElement(IChingApp, null), document.getElementById("content"));
