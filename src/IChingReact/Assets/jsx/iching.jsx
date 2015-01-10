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
		var cls = '';
		var cont = '';
		switch(this.props.value) {
			case 6:
				cls = 'yin changing';
				cont = 'X';
				break;
			case 7: cls = 'yang';
				break;
			case 8: cls = 'yin';
				break;
			case 9:
				cls = 'yang changing';
				cont = 'O';
				break;
		}
		return (<tr className={cls}>
			<td></td><td>{cont}</td><td></td>
		</tr>);
	}
});


// Spacer Component
//
var Spacer = React.createClass({
	render: function () {
		return <tr><td colspan='3'></td></tr>;
	}
});


// Hexagram Component
// Properties: lines[6] (number) [6 - 9]
//
var Hexagram = React.createClass({
	render: function () {
		return (
			<table className='hexagram'>
				<Line value={this.props.lines[5]} />
				<Spacer />
				<Line value={this.props.lines[4]} />
				<Spacer />
				<Line value={this.props.lines[3]} />
				<Spacer />
				<Line value={this.props.lines[2]} />
				<Spacer />
				<Line value={this.props.lines[1]} />
				<Spacer />
				<Line value={this.props.lines[0]} />
			</table>
		);
	}
});


// Image Component
// Properties: hexagram (object)
//
var Image = React.createClass({
	render: function () {
		return (
			<div className='part'>
				<h3>The Image</h3>
				<pre>{this.props.hexagram.image}</pre>
			</div>
		);
	}
});


// Judgement Component
// Properties: hexagram (object)
//
var Judgement = React.createClass({
	render: function () {
		return (
			<div className='part'>
				<h3>The Judgement</h3>
				<pre>{this.props.hexagram.judgement}</pre>
			</div>
		);
	}
});


// Changes Component
// If any lines are changing, print out the changing message.
// Properties: hexagram (object)
//
var Changes = React.createClass({
	render: function () {
		if(this.isChaging) {
			return (
			<div  className='part'>
					<h3>Changing Lines</h3>
				</div>
			);
		} else {
			return;
		}
	},
	isChaging: function() {
		for(var i = 0; i < 6; i++) {
			var line = this.props.hexagram[i];
			if(line == 6 || line == 9) {
				return true;
			}
		}
		return false;
	}
});


// Transformation Component
// Properties: hexagram (object)
//
var Transformation = React.createClass({
	render: function () {
		return (
			<div  className='part'>
				<h3>The Transformation</h3>
			</div>
		);
	}
});


// Title Component
// Properties: hexagram (object)
//
var Title = React.createClass({
	render: function () {
		return (
			<p>
				<div className='title'>{this.props.hexagram.id}</div>
				<div className='title'>{this.props.hexagram.cname} - {this.props.hexagram.ename}</div>
			</p>
		);
	}
});


// IChingApp Component
// State: lines[6] (number) [6 - 9]
//
var IChingApp = React.createClass({
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
	regen: function () {
		this.setState(this.generateLines());
	},
	render: function () {
		var hex = hexagrams[this.getHexagramValue()];
		return (
			<div>
				<h1>I Ching App</h1>
				<Coins />
				<Hexagram lines={this.state.lines} />
				<Title hexagram={hex} />
				<Image hexagram={hex} />
				<Judgement hexagram={hex} />
				<Changes hexagram={hex} />
				<Transformation hexagram={hex} />
			</div>
		);
	},
	getHexagramValue: function () {
		var val = 0;
		for(var i = 0; i < 6; i++) {
			if(this.state.lines[i] % 2 != 0) {
				val += Math.pow(2, i);
			}
		}
		return val;
	}
});

React.render(<IChingApp />, document.getElementById("content"));
