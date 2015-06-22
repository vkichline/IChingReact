// Utility functions used by different classes:

function getHexagramValue (lines) {
	// Takes an array[6] of lines (each of which is 6, 7, 8, or 9)
	// and returns the number of the hexagram it represents
	var val = 0;
	for(var i = 0; i < 6; i++) {
		if(lines[i] % 2 != 0) {
			val += Math.pow(2, i);
		}
	}
	return val;
}



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
// Properties:
//	hexagram (object)
//
var Image = React.createClass({
	render: function () {
		return (
			<div>
				<h3>The Image</h3>
				<pre>{this.props.hexagram.image}</pre>
			</div>
		);
	}
});


// Judgement Component
// Prints the (multiline) judgement for the selected hexagram.
// Properties: hexagram (object)
//
var Judgement = React.createClass({
	render: function () {
		return (
			<div>
				<h3>The Judgement</h3>
				<pre>{this.props.hexagram.judgement}</pre>
			</div>
		);
	}
});


// Changes Component
// If any lines are changing, print out the changing message.
// Properties:
//	hexagram (object)
//	lines (array of number) [6 - 9]
//
var Changes = React.createClass({
	render: function () {
		var changingLines = this.getChanges();
		if(changingLines.length > 0) {
			return (
				<div>
					<h3>Changing Lines</h3>
					{changingLines.map(function (item) {
						return <pre className='changeText'>{item}</pre>;
					})}
				</div>
			);
		} else {
			return <div />;
		}
	},
	getChanges: function() {
		// returns an array of strings of chainging lines only
		var changes = [];
		for(var i = 0; i < 6; i++) {
			var line = this.props.lines[i];
			if(line == 6 || line == 9) {
				changes.push(this.props.hexagram.lines[i]);
			}
		}
		return changes;
	}
});


// Transformation Component
// Calculates and shows the transformed hexagram (if any)
// Properties:
//	oldLines (array of numbers) [6 - 9]
//
var Transformation = React.createClass({
	render: function () {
		var newLines = this.createNewLines(this.props.oldLines);
		var newHex = getHexagramValue(newLines);
		var isChanging = (getHexagramValue(this.props.oldLines) !== newHex);
		var hex = hexagrams[newHex];
		return (
			<div>
				{ isChanging ? 
					(
						<div>
							<h3>The Transformation</h3>
							<Hexagram lines={newLines} />
							<TitleBar hexagram={hex} />
							<Judgement hexagram={hex} />
							<Image hexagram={hex} />
						</div>
					)
				: <div />}
			</div>
		);
	},
	createNewLines: function (oldLines) {
		var newLines = [6];
		for(var i = 0; i < 6; i++) {
			switch (oldLines[i]) {
				case 6:
				case 7:
					newLines[i] = 7;
					break;
				case 8:
				case 9:
					newLines[i] = 8;
					break;
			}
		}
		return newLines;
	}
});


// Title Component
// Properties: hexagram (object)
//
var TitleBar = React.createClass({
	render: function () {
		return (
			<p>
				<div className='title'>{this.props.hexagram.id}</div>
				<div className='title'>{this.props.hexagram.cname}</div>
				<div className='title'>{this.props.hexagram.ename}</div>
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
		var coinValues = [6, 7, 7, 8, 7, 8, 8, 9];
		var lines = [6];
		for(var i = 0; i < 6; i++) {
			var raw = Math.floor(Math.random() * 8);
			lines[i] = coinValues[raw];
		}
		return lines;
	},
	regen: function () {
		this.setState(this.generateLines());
	},
	render: function () {
		var hex = hexagrams[getHexagramValue(this.state.lines)];
		return (
			<div>
				<h1>The I Ching</h1>
				{ /* <Coins /> */ }
				<Hexagram lines={this.state.lines} />
				<TitleBar hexagram={hex} />
				<Judgement hexagram={hex} />
				<Image hexagram={hex} />
				<Changes hexagram={hex} lines={this.state.lines} />
				<Transformation oldLines={this.state.lines} />
			</div>
		);
	}
});

React.render(<IChingApp />, document.getElementById("content"));
