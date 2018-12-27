var nav = {
	dom: null,
	activeCatDOM: null,
	init: function() {
		nav.dom = document.getElementById("nav");
	},
	handleClick: function(category, catDom) {
		if(category == "random") {
			app.playRandom()
		}
	},
	close: function() {
		nav.dom.classList.add("hide")
	},
	open: function() {
		nav.dom.classList.remove("hide")
	}
}

document.addEventListener("DOMContentLoaded", app.registerController('nav', nav));
