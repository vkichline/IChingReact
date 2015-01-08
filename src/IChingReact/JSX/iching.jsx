// Coin Component
// Properties: heads (boolean)
//
var Coin = React.createClass({
	propTypes: {
		heads: React.PropTypes.bool
	},
	render: function () {
		return this.props.heads ? <img src="img/heads.png" /> : <img src="img/tails.png" />;
	}
});


// Coins Component
// State coins[3] (boolean)
//
var Coins = React.createClass({
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
			<div className="CoinsComponent" onClick={this.clickHandler}>
				<Coin heads={this.state.coins[0]} />
				<Coin heads={this.state.coins[1]} />
				<Coin heads={this.state.coins[2]} />
			</div>
		);
	},
	clickHandler: function (e) {
		this.setState({coins: this.generateCoinSet()});
		return false;
	}
});


// Hexagram Component
//
var Hexagram = React.createClass({
	render: function () {
		return <div>Hexagram</div>;
	}
});


// Info Component
//
var Info = React.createClass({
	render: function () {
		return <div>Info</div>;
	}
});


// IChingApp Component
//
var IChingApp = React.createClass({
	render: function () {
		return (
			<div>
				<h1>I Ching App</h1>
				<Coins />
				<Hexagram />
				<h2>The Judgement</h2>
				<Info />
				<h2>The Transformation</h2>
				<Info />
			</div>
			);
	}
});

React.render(<IChingApp />, document.getElementById("content"));
