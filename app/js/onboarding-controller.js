var onboarding = {
	dom: null,
	loadTimeout: null,
	introTimer: null,
	arrivalTimer: null,
	init: function() {
		onboarding.dom = document.getElementById('onboarding')
		let carouselDOM = onboarding.dom.firstElementChild
		var observer = new MutationObserver(function(mutationsList, observer) {
    	for(var mutation of mutationsList) {
				if(mutation.type == 'attributes') {
					onboarding._pauseAudio()
					//app.clearTrack()
				}
			}
		});
		observer.observe(carouselDOM, { attributes: true });
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
	handleToggleIntro: function() {
		let button = document.querySelector('#onboarding .intro')
		button.classList.toggle('active')

		if(onboarding.introTimer) {
			clearInterval(onboarding.introTimer)
		}
		onboarding.introTimer = setInterval(() => {
			let audio = document.getElementById('intro-audio')
			let progressDom = document.querySelector('#onboarding .intro-progress')
			// progressDom.style.width = `calc(${audio.currentTime / audio.duration * 100}% -24px)`
			progressDom.style.width = `${audio.currentTime / audio.duration * 100}%`
		}, 1000)
		let audio = document.getElementById('intro-audio')
		return audio.paused ? audio.play() : audio.pause()
		// app.playIntroTrack()
	},
	handleToggleArrival: function() {
		let button = document.querySelector('#onboarding .arrival')
		button.classList.toggle('active')

		if(onboarding.arrivalTimer) {
			clearInterval(onboarding.arrivalTimer)
		}
		onboarding.arrivalTimer = setInterval(() => {
			let audio = onboarding._getArrivalAudio()
			let progressDom = document.querySelector('#onboarding .arrival-progress')
			// progressDom.style.width = `calc(${audio.currentTime / audio.duration * 100}% -24px)`
			progressDom.style.width = `${audio.currentTime / audio.duration * 100}%`
		}, 1000)

		let audio = onboarding._getArrivalAudio()
		return audio.paused ? audio.play() : audio.pause()
		// app.playArrivalTrack()
	},
	_getArrivalAudio: function() {
		return app.getMode() == CONSTANTS.MODES.SOLO 
				? document.getElementById('arrival-audio-solo') 
				: document.getElementById('arrival-audio-partner');
	},
	handleNextClick: function() {
		let button = document.querySelector('#onboarding .buttons .active')
		if(button) button.classList.remove('active')

		// app.clearTrack()
		onboarding._pauseAudio()

		let index = parseInt(onboarding.dom.firstElementChild.getAttribute('data-index'))
		onboarding.dom.firstElementChild.setAttribute('data-index', ++index)
	},
	_pauseAudio: function() {
		let introAudio = document.getElementById('intro-audio')
		let arrivalAudio = onboarding._getArrivalAudio()
		if(!introAudio.paused) onboarding.handleToggleIntro()
		if(!arrivalAudio.paused) onboarding.handleToggleArrival()
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

