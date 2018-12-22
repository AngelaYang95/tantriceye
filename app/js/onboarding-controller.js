var onboarding = {
	dom: null,
	init: function() {
		onboarding.dom = document.getElementById('onboarding')
		let carouselDOM = onboarding.dom.firstElementChild
		var observer = new MutationObserver(function(mutationsList, observer) {
    	for(var mutation of mutationsList) {
				if(mutation.type == 'attributes') {
					onboarding._runOnboardingItem(parseInt(carouselDOM.getAttribute(mutation.attributeName)))
				}
			}
		});
		observer.observe(carouselDOM, { attributes: true });
	},
	start: function() {
		document.querySelector('#onboarding').classList.add("active")
    document.addEventListener('touchstart', onboarding.handleTouchStart, false);        
		document.addEventListener('touchmove', onboarding.handleTouchMove, false);
		onboarding._runOnboardingItem(0)
	},
	finish: function() {
		document.querySelector('#onboarding').classList.remove("active")
    document.removeEventListener('touchstart', onboarding.handleTouchStart, false);        
		document.removeEventListener('touchmove', onboarding.handleTouchMove, false);
		app.clearTrack()
		app.showApp()
	},
	_runOnboardingItem(index) {
		console.log('running onbaording for ', index)
		app.clearTrack()
		if(index == 0) {
			app.playIntroTrack()
		} else if(index == 1) {
			// Nothing to be done.
		} else {
			app.playArrivalTrack()
		}
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
		onboarding.finish()
	},
	handleTouchStart: function() {
		console.log('touch start')
	},
	handleTouchEnd: function() {
		console.log('touch end')
	},
}

document.addEventListener("DOMContentLoaded", onboarding.init)