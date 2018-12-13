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
		app.setPartnerMode(false)
		onboarding.handleNextClick()
	},
	handleDuoClick: function() {
		app.setPartnerMode(true)
		onboarding.handleNextClick()
	},
	handleFinishClick: function() {
		app.showApp()
	},
}

document.addEventListener("DOMContentLoaded", onboarding.init)