const CONSTANTS = {
	MODES: {
		SOLO: 0,
		DUO: 1,
	}
}

var app = {
	category: "",
	track: "",
	mode: CONSTANTS.MODES.SOLO,
	landingTimeout: null,
	init: function() {
		app.landingTimeout = setTimeout(() => {
			app.showOnboarding()
		}, 4000)
	},
	handleHashChange: function() {
		app.goToCategory(cat)
		nav.selectCategory(cat)
	},
	setMode: function(mode) {
		app.mode = mode
		document.body.setAttribute('data-duo-mode', mode)
		document.querySelector('.arcs').classList.add('duo')
	},
	showOnboarding: function() {
		if(app.landingTimeout) clearTimeout(app.landingTimeout)

		document.querySelector('#landing').classList.remove("active")
		onboarding.start()
	},
	showApp: function() {
		document.querySelector('#onboarding').classList.remove("active")
		document.querySelector('#app').classList.add("active")
	},
	playRandom: function() {
		let tracks = data.tracks.filter((track)=> {
			return track.url
		})
		let id = tracks[Math.floor(Math.random() * tracks.length)].id
		app.playTrack(id)
	},
	playTrack: function(id, expandPlayer) {
		if(app.track != id) {
			app.track = id
			tracklist.setActiveTrack(id)

			let trackObj = data.tracks[id]
			if(!trackObj) 
				console.log("error playing track")
			else
				media.setTrack(trackObj)
		}
		media.togglePlay()

		if(expandPlayer) {
			media.expandPlayer()
		}
	},
	clearTrack: function() {
		tracklist.clearActiveTrack()
		media.clear()
	},
	goToCategory: function(category) {
		if(!category || app.category == category) return

		app.category = category;
		document.body.setAttribute("category", category);
		tracklist.render(category)
	},
	goToHome: function() {
		document.body.setAttribute("category", "");
		app.category = ""
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