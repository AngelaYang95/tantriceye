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
	controllers: {},
	audio: null,

	//-------------------------------------------------------------
	//                     Setup Functions
	//-------------------------------------------------------------
	init: function() {
		Barba.Pjax.start();	
	  app.getMode() && document.body.setAttribute('data-mode', app.getMode())
	  app.audio = document.getElementById('audio')
	  app.audio.addEventListener('ended', app.onTrackFinished);
	  app.handleViewChange()

		Barba.Dispatcher.on('newPageReady', function() {
		  app.handleViewChange()
		});
	},
	registerController: function(name, controller) {
		app.controllers[name] = controller
	},
	initScripts: function() {
		for(let key in app.controllers) {
			app.controllers[key].dom = null
		}

		document.querySelectorAll('[data-controller]').forEach((dom) => {
			let controller = app.controllers[dom.getAttribute('data-controller')]
			if(controller) {
				controller.init()
			}
		})
	},
	setMode: function(mode) {
		app.mode = mode
		window.localStorage.setItem('mode', mode)
		document.body.setAttribute('data-mode', mode)
	},
	getMode: function() {
		return window.localStorage.getItem('mode')
	},
	handleViewChange: function() {
		let path = window.location.pathname
		let params = app.getQueryParam()
		app.initScripts()
		// menu.setActivePath(path)

		if(path.includes('playlist')) {
			app.goToCategory(params.category || app.getCategory())
		} 
		if(path.includes('media')) {
			app.goToMedia(params.track || app.getTrack())
		} 
		if(path.includes('about')) {
			app.goToAbout()
		}
		if(path == '/') {
			app.goToHome()
		}
	},
	getQueryParam: function() {
		let params = {}
		window.location.search.replace('?', '').split('&').forEach((param) => {
			let entry = param.split("=")
			params[entry[0]] = entry[1]
		})
		if(params.track) params.track = parseInt(params.track)
		return params
	},
	//-------------------------------------------------------------
	//                     Onboarding Functions
	//-------------------------------------------------------------
	playIntroTrack: function() {
		app.playTrack(CONSTANTS.TRACKS.INTRO)
	},
	playArrivalTrack: function() {
		if(app.getMode() == CONSTANTS.MODES.SOLO) {
			app.playTrack(CONSTANTS.TRACKS.ARRIVAL_SOLO)
		} else {
			app.playTrack(CONSTANTS.TRACKS.ARRIVAL_DUO)
		}
	},

	//-------------------------------------------------------------
	//                     Audio Functions
	//-------------------------------------------------------------
	playRandom: function() {
		let tracks = data.tracks.filter((track) => {
			return track.url
		})
		let id = tracks[Math.floor(Math.random() * tracks.length)].id
		app.playTrack(id)
	},
	seekTo: function(percent) {
		app.audio.currentTime = Math.floor(app.audio.duration * percent)
		audiobar.setTime(app.audio.currentTime, app.audio.duration)
		media.dom && media.setTime(app.audio.currentTime, app.audio.duration)
	},
	toggleTrack: function() {
		if(app.audio.currentTime > 0 && 
  		!app.audio.paused && 
  		!app.audio.ended) {
			app.pauseTrack()
		} else {
			app.playTrack()
		}
	},
	pauseTrack: function() {
		app.audio.pause()
		audiobar.pause()
		media.dom && media.pause()
		clearInterval(app.audioInterval)
	},
	playTrack: function(id) {
		if(id && app.getTrack() != id) {
			app.setTrack(id)
		}
		audiobar.play()
		console.log("media dom is ", media.dom)
		media.dom && media.play()

		app.playPromise = app.audio.play()
	  if (app.playPromise !== undefined) {
	    app.playPromise.then(_ => {
	    	app.audioInterval = setInterval(() => {
					audiobar.setTime(app.audio.currentTime, app.audio.duration)
					media.dom && media.setTime(app.audio.currentTime, app.audio.duration)
	    	})
    		if(onboarding.dom) audiobar.show()		
	    })
	    .catch(error => {
	    	console.log("Error with audio")
	    });
	  }
	},
	clearTrack: function() {
		app.pauseTrack()
		app.audio.currentTime = 0
		app.track = ''
		audiobar.clearTrack()
		audiobar.hide()
	},
	onTrackFinished: function() {
		audiobar.endTrack()
		media.dom && media.endTrack()
	},

	//-------------------------------------------------------------
	//                     Nav Functions
	//-------------------------------------------------------------
	showApp: function() {
		window.location.replace('/');
	},
	getTrack: function() {
		return app.track
	},
	setTrack: function(id) {
		if(!id) return

		app.track = id
		if(tracklist.dom) {
			tracklist.setActiveTrack(id)
		}
		let trackObj = data.tracks[id]
		if(!trackObj) 
			console.log("Error playing track")
		else
			audiobar.setTrack(trackObj)
			media.dom && media.setTrack(trackObj)
	},
	getCategory: function() {
		return app.category
	},
	setCategory: function(category) {
		app.category = category
		document.body.setAttribute('category', category)
	},
	goToHome: function() {
		app.setCategory('')
		app.clearTrack()
	},
	goToAbout: function() {
		app.setCategory('')
		app.clearTrack()
	},
	goToCategory: function(category) {
		if(!category) return

		app.clearTrack()
		app.setCategory(category)
		tracklist.render(category)
	},
	goToMedia: function(trackId) {
		app.playTrack(trackId)
	},
	hideContent: function() {
		document.getElementById('content').classList.add('hide')
	},
	showContent: function() {
		document.getElementById('content').classList.remove('hide')
	},
}

document.addEventListener("DOMContentLoaded", app.init);
// document.addEventListener("DOMContentLoaded", app.initScripts);