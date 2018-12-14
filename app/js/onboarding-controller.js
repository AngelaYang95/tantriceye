var onboarding = {
	dom: null,
	init: function() {
		onboarding.dom = document.getElementById('onboarding')
	},
	handleNextClick: function() {
		let index = parseInt(onboarding.dom.firstElementChild.getAttribute('data-index'))
		onboarding.dom.firstElementChild.setAttribute('data-index', ++index)
	},
	handleSoloClick: function() {
		app.setMode(0)
		onboarding.handleNextClick()
	},
	handleDuoClick: function() {
		app.setMode(1)
		onboarding.handleNextClick()
	},
	handleFinishClick: function() {
		app.showApp()
	},
}

document.addEventListener("DOMContentLoaded", onboarding.init)