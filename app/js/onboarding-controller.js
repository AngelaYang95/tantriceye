var onboarding = {
	dom: null,
	loadTimeout: null,
	init: function() {
		onboarding.dom = document.getElementById('onboarding')
		let carouselDOM = onboarding.dom.firstElementChild
		var observer = new MutationObserver(function(mutationsList, observer) {
    	for(var mutation of mutationsList) {
				if(mutation.type == 'attributes') {
					onboarding._runOnboardingItem()
				}
			}
		});
		observer.observe(carouselDOM, { attributes: true });
		// onboarding.loadTimeout = setTimeout(() => {
		// 	onboarding.load()
		// }, 3000)
	},
	_runOnboardingItem() {
		app.clearTrack()
	},
	load: function() {
		if(onboarding.loadTimeout) clearTimeout(onboarding.loadTimeout)

		document.querySelector('#landing').classList.add("hide")
		document.querySelector('#onboarding').classList.remove("hide")
    document.addEventListener('touchstart', onboarding.handleTouchStart, false);        
		document.addEventListener('touchmove', onboarding.handleTouchMove, false);
	},
	finish: function() {
    document.removeEventListener('touchstart', onboarding.handleTouchStart, false);        
		document.removeEventListener('touchmove', onboarding.handleTouchMove, false);
		app.clearTrack()
		app.showApp()
	},
	handlePlayIntro: function() {
		let button = document.querySelector('#onboarding .intro')
		button.classList.add('active')

		let audio = document.getElementById('intro-audio')
		return audio.paused ? audio.play() : audio.pause()
		// app.playIntroTrack()
	},
	handlePlayArrival: function() {
		let button = document.querySelector('#onboarding .arrival')
		button.classList.add('active')

		let audio = document.getElementById('arrival-audio')
		return audio.paused ? audio.play() : audio.pause()
		// app.playArrivalTrack()
	},
	handleNextClick: function() {
		let button = document.querySelector('#onboarding .buttons .active')
		if(button) button.classList.remove('active')

		app.clearTrack()
		let index = parseInt(onboarding.dom.firstElementChild.getAttribute('data-index'))
		onboarding.dom.firstElementChild.setAttribute('data-index', ++index)
	},
	handleSoloClick: function() {
		app.setMode(CONSTANTS.MODES.SOLO)
		onboarding.handleNextClick()
	},
	handleDuoClick: function() {
		app.setMode(CONSTANTS.MODES.DUO)
		onboarding.handleNextClick()
	},
	handleFinishClick: function() {
		onboarding.finish()
	},
	handleTouchStart: function() {
		// console.log('touch start')
	},
	handleTouchEnd: function() {
		// console.log('touch end')
	},
}
document.addEventListener("DOMContentLoaded", app.registerController('onboarding', onboarding));

