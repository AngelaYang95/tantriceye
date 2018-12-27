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
	controllers: {},

	//-------------------------------------------------------------
	//                     Settings Functions
	//-------------------------------------------------------------
	init: function() {
		Barba.Pjax.start();	
		// window.addEventListener('hashchange', app.handleHashChange)
		// window.addEventListener('load', app.handleHashChange)

	  app.handleViewChange()
		Barba.Dispatcher.on('newPageReady', function() {
			console.log('new page ready')
		  // app.initScripts()
		  app.handleViewChange()
		});
	},
	registerController: function(name, controller) {
		app.controllers[name] = controller
	},
	initScripts: function() {
		document.querySelectorAll('[data-controller]').forEach((dom) => {
			let controller = app.controllers[dom.getAttribute('data-controller')]
			if(controller) {
				controller.init()
			}
		})
	},
	setMode: function(mode) {
		app.mode = mode
		document.body.setAttribute('data-mode', mode)
		document.querySelector('.arcs').classList.add(CONSTANTS.MODES.DUO)
	},
	handleViewChange: function() {
		let path = window.location.pathname
		let params = app.getQueryParam()
		app.initScripts()
		menu.setActivePath(path)

		if(path.includes('playlist')) {
			console.log(params['category'])
			app.goToCategory(params['category'])
		} else {
			app.clearArcs()
		}
	},
	getQueryParam: function() {
		let params = {}
		window.location.search.replace('?', '').split('&').forEach((param) => {
			let entry = param.split("=")
			params[entry[0]] = entry[1]
		})
		return params
	},

	//-------------------------------------------------------------
	//                     Onboarding Functions
	//-------------------------------------------------------------
	playIntroTrack: function() {
		app.playTrack(CONSTANTS.TRACKS.INTRO)
	},
	playArrivalTrack: function() {
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
		window.location.replace('/');
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
			// if(tracklist != undefined) tracklist.setActiveTrack(id)

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
			// if(tracklist) tracklist.clearActiveTrack()
			media.clear()
		}
	},

	//-------------------------------------------------------------
	//                     Nav Functions
	//-------------------------------------------------------------
	goToHome: function() {
		app.hideContent()
		app.clearArcs()
		app.category = ""
		app.showContent()
	},
	goToAbout: function() {

	},
	goToCategory: function(category) {
		if(!category || app.category == category) return

		app.hideContent()
		app.category = category;
		tracklist.render(category)
		app.setArcs(category)
		app.showContent()
	},
	goToMedia: function() {

	},
	setArcs: function(category) {
		document.body.setAttribute("category", category)
	},
	clearArcs: function() {
		document.body.setAttribute("category", "")
	},
	hideContent: function() {
		document.getElementById('content').classList.add('hide')
	},
	showContent: function() {
		document.getElementById('content').classList.remove('hide')
	},
}

document.addEventListener("DOMContentLoaded", app.init);
document.addEventListener("DOMContentLoaded", app.initScripts);