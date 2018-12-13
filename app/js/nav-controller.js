var nav = {
	dom: null,
	activeCatDOM: null,
	timeoutId: "",
	init: function() {
		nav.dom = document.getElementById("nav");
		// getComputedStyle(document.body).getPropertyValue('--color-font-general'));
	},
	handleClick: function(category, catDom) {
		if(nav.dom.classList.contains("close")) {
			nav.open()
		} else {
			app.goToCategory(category)
			nav.selectCategory(category, catDom)
		}
	},
	selectCategory: function(category, optDom) {
		if(nav.activeCatDOM) {
			nav.activeCatDOM.classList.remove("active")
		}
		nav.activeCatDOM = optDom ? optDom : nav.dom.querySelector("[data-category='" + category + "']")
		nav.activeCatDOM.classList.add("active")
		nav.close()
	},
	close: function() {
		nav.dom.classList.add("close")
		app.showContent()

		setTimeout(() => {
			nav.dom.querySelectorAll(".category:not(.active)").forEach((catDom) => {
				catDom.classList.add("hidden")
			})
		}, 500)
	},
	open: function() {
		if(nav.timeoutId) clearTimeout(nav.timeoutId)

		nav.dom.querySelectorAll(".category:not(.active)").forEach((catDom) => {
			catDom.classList.remove("hidden")
		})
		nav.dom.classList.remove("close")
		app.hideContent()
	}
}

document.addEventListener("DOMContentLoaded", nav.init);