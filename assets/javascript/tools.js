//commonly used tools
var tools = {
	// returns a random number
	getRandom: function(max) {
		return Math.floor(Math.random() * max);
	},

  capFirst: function(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

};