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
	generateCoinSet: function () {
		var coins = [3];
		for(var i = 0; i < 3; i++) {
			var t = Math.floor(Math.random() * 4 + 6);
			coins[i] = (0 == t % 2);
		}
		return coins;
	},
	clickHandler: function (e) {
		this.setState({coins: this.generateCoinSet()});
		return false;
	}
});


// Line Component
// Properties:  value (number) [6 - 9]
//
var Line = React.createClass({
	render: function() {
	console.log(this.props.value);
		return (<tr className={(0 == this.props.value % 2) ? 'yin' : 'yang'}>
			<td></td><td></td><td></td>
		</tr>);
	}
});


// Hexagram Component
// State: lines[6] (number) [6 - 9]
//
var Hexagram = React.createClass({
	getInitialState: function() {
		return {lines: this.generateLines()};
	},
	generateLines: function () {
		var lines = [6];
		for(var i = 0; i < 6; i++) {
			lines[i] = Math.floor(Math.random() * 4 + 6);
		}
		return lines;
	},
	render: function () {
		//console.log(this.props.lines);
		return (<table className='hexagram'  onClick={this.clickHandler}>
			<Line value={this.state.lines[5]} />
			<tr><td colspan='3'></td></tr>
			<Line value={this.state.lines[4]} />
			<tr><td colspan='3'></td></tr>
			<Line value={this.state.lines[3]} />
			<tr><td colspan='3'></td></tr>
			<Line value={this.state.lines[2]} />
			<tr><td colspan='3'></td></tr>
			<Line value={this.state.lines[1]} />
			<tr><td colspan='3'></td></tr>
			<Line value={this.state.lines[0]} />
		</table>);
	},
	clickHandler: function (e) {
		this.setState({lines: this.generateLines()});
		return false;
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
