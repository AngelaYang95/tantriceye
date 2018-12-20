var onboarding = {
	dom: null,
	init: function() {
		onboarding.dom = document.getElementById('onboarding')
	},
	start: function() {
		document.querySelector('#onboarding').classList.add("active")
    document.addEventListener('touchstart', onboarding.handleTouchStart, false);        
		document.addEventListener('touchmove', onboarding.handleTouchMove, false);
		app.playTrack(179)
	},
	handleNextClick: function() {
		let index = parseInt(onboarding.dom.firstElementChild.getAttribute('data-index'))
		onboarding.dom.firstElementChild.setAttribute('data-index', ++index)
		media.clear()
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
    document.removeEventListener('touchstart', onboarding.handleTouchStart, false);        
		document.removeEventListener('touchmove', onboarding.handleTouchMove, false);
	},
	handleTouchStart: function() {
		console.log('touch start')
	},
	handleTouchEnd: function() {
		console.log('touch end')
	},
}

document.addEventListener("DOMContentLoaded", onboarding.init)