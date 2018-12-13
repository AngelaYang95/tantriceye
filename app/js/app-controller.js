var app = {
	category: "",
	track: "",
	partnerMode: false,
	init: function() {
		// window.addEventListener("hashchange", app.handleHashChange, false);
		// media.clear()
		setTimeout(() => {
			document.querySelector('#landing').classList.remove("active")
			app.showOnboarding()
		}, 4000)
	},
	handleHashChange: function() {a
		app.goToCategory(cat)
		nav.selectCategory(cat)
	},
	setPartnerMode: function(isDuo) {
		app.partnerMode = isDuo
		document.body.setAttribute('data-duo-mode', isDuo)
		document.querySelector('.arcs').classList.add('duo')
	},
	showOnboarding: function() {
		document.querySelector('#onboarding').classList.add("active")
		app.playTrack(179)
	},
	showApp: function() {
		document.querySelector('#onboarding').classList.remove("active")
		document.querySelector('#app').classList.add("active")
	},
	playTrack: function(id) {
		if(app.track != id) {
			app.track = id

			if(tracklist.activeTrack) {
				tracklist.activeTrack.classList.remove('active')
				tracklist.activeTrack = document.querySelector(`#tracklist .track[data-id="${id}"]`)
				tracklist.activeTrack.classList.add('active')
			}

			let trackObj = data.tracks[id]
			if(!trackObj) 
				console.log("error playing track")
			else
				media.setTrack(trackObj)
		}
		media.togglePlay()
	},
	goToCategory: function(category) {
		if(app.category == category) return

		app.category = category;
		document.body.setAttribute("category", category);
		tracklist.render(category)
	},
	goToHome: function() {
		nav.open()
	},
	hideContent: function() {
		document.getElementById('tracklist').classList.add("hide")
	},
	showContent: function() {
		document.getElementById('tracklist').classList.remove("hide")
	},
}

document.addEventListener("DOMContentLoaded", app.init);