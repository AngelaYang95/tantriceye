const CONSTANTS = {
	MODES: {
		SOLO: 0,
		DUO: 1,
	},
	TRACKS: {
		INTRO: 179,
		ARRIVAL_SOLO: 180,
		ARRIVAL_DUO: 181,
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

	//-------------------------------------------------------------
	//                     Onboarding Functions
	//-------------------------------------------------------------
	showOnboarding: function() {
		if(app.landingTimeout) clearTimeout(app.landingTimeout)

		document.querySelector('#landing').classList.remove("active")
		onboarding.start()
	},
	playIntroTrack: function() {
		app.playTrack(CONSTANTS.TRACKS.INTRO)
	},
	playArrivalTrack: function() {
		console.log('play pro')
		if(app.mode == CONSTANTS.MODES.SOLO) {
			app.playTrack(CONSTANTS.TRACKS.ARRIVAL_SOLO)
		} else {
			app.playTrack(CONSTANTS.TRACKS.ARRIVAL_DUO)
		}
	},

	//-------------------------------------------------------------
	//                     App Functions
	//-------------------------------------------------------------
	showApp: function() {
		document.querySelector('#app').classList.add("active")
	},
	playRandom: function() {
		let tracks = data.tracks.filter((track) => {
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
		if(app.track) {
			tracklist.clearActiveTrack()
			media.clear()
		}
	},

	//-------------------------------------------------------------
	//                     Nav Functions
	//-------------------------------------------------------------
	goToHome: function() {
		document.body.setAttribute("category", "");
		app.category = ""
		nav.open()
	},
	goToCategory: function(category) {
		if(!category || app.category == category) return

		app.category = category;
		document.body.setAttribute("category", category);
		tracklist.render(category)
	},
	goToMedia: function() {

	},
	hideContent: function() {
		document.getElementById('tracklist').classList.add("hide")
	},
	showContent: function() {
		document.getElementById('tracklist').classList.remove("hide")
	},
}

document.addEventListener("DOMContentLoaded", app.init);