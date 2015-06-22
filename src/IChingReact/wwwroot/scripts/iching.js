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
var Line = React.createClass({displayName: "Line",
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
		return (React.createElement("tr", {className: cls}, 
			React.createElement("td", null), React.createElement("td", null, cont), React.createElement("td", null)
		));
	}
});


// Spacer Component
//
var Spacer = React.createClass({displayName: "Spacer",
	render: function () {
		return React.createElement("tr", null, React.createElement("td", {colspan: "3"}));
	}
});


// Hexagram Component
// Properties: lines[6] (number) [6 - 9]
//
var Hexagram = React.createClass({displayName: "Hexagram",
	render: function () {
		return (
			React.createElement("table", {className: "hexagram"}, 
				React.createElement(Line, {value: this.props.lines[5]}), 
				React.createElement(Spacer, null), 
				React.createElement(Line, {value: this.props.lines[4]}), 
				React.createElement(Spacer, null), 
				React.createElement(Line, {value: this.props.lines[3]}), 
				React.createElement(Spacer, null), 
				React.createElement(Line, {value: this.props.lines[2]}), 
				React.createElement(Spacer, null), 
				React.createElement(Line, {value: this.props.lines[1]}), 
				React.createElement(Spacer, null), 
				React.createElement(Line, {value: this.props.lines[0]})
			)
		);
	}
});


// Image Component
// Properties:
//	hexagram (object)
//
var Image = React.createClass({displayName: "Image",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("h3", null, "The Image"), 
				React.createElement("pre", null, this.props.hexagram.image)
			)
		);
	}
});


// Judgement Component
// Prints the (multiline) judgement for the selected hexagram.
// Properties: hexagram (object)
//
var Judgement = React.createClass({displayName: "Judgement",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("h3", null, "The Judgement"), 
				React.createElement("pre", null, this.props.hexagram.judgement)
			)
		);
	}
});


// Changes Component
// If any lines are changing, print out the changing message.
// Properties:
//	hexagram (object)
//	lines (array of number) [6 - 9]
//
var Changes = React.createClass({displayName: "Changes",
	render: function () {
		var changingLines = this.getChanges();
		if(changingLines.length > 0) {
			return (
				React.createElement("div", null, 
					React.createElement("h3", null, "Changing Lines"), 
					changingLines.map(function (item) {
						return React.createElement("pre", {className: "changeText"}, item);
					})
				)
			);
		} else {
			return React.createElement("div", null);
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
var Transformation = React.createClass({displayName: "Transformation",
	render: function () {
		var newLines = this.createNewLines(this.props.oldLines);
		var newHex = getHexagramValue(newLines);
		var isChanging = (getHexagramValue(this.props.oldLines) !== newHex);
		var hex = hexagrams[newHex];
		return (
			React.createElement("div", null, 
				 isChanging ? 
					(
						React.createElement("div", null, 
							React.createElement("h3", null, "The Transformation"), 
							React.createElement(Hexagram, {lines: newLines}), 
							React.createElement(TitleBar, {hexagram: hex}), 
							React.createElement(Judgement, {hexagram: hex}), 
							React.createElement(Image, {hexagram: hex})
						)
					)
				: React.createElement("div", null)
			)
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
var TitleBar = React.createClass({displayName: "TitleBar",
	render: function () {
		return (
			React.createElement("p", null, 
				React.createElement("div", {className: "title"}, this.props.hexagram.id), 
				React.createElement("div", {className: "title"}, this.props.hexagram.cname), 
				React.createElement("div", {className: "title"}, this.props.hexagram.ename)
			)
		);
	}
});


// IChingApp Component
// State: lines[6] (number) [6 - 9]
//
var IChingApp = React.createClass({displayName: "IChingApp",
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
			React.createElement("div", null, 
				React.createElement("h1", null, "The I Ching"), 
				/* <Coins /> */ 
				React.createElement(Hexagram, {lines: this.state.lines}), 
				React.createElement(TitleBar, {hexagram: hex}), 
				React.createElement(Judgement, {hexagram: hex}), 
				React.createElement(Image, {hexagram: hex}), 
				React.createElement(Changes, {hexagram: hex, lines: this.state.lines}), 
				React.createElement(Transformation, {oldLines: this.state.lines})
			)
		);
	}
});

React.render(React.createElement(IChingApp, null), document.getElementById("content"));
