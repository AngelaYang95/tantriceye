var media = {
	dom: null,
	player: null,
	playPromise: null,
	timeInterval: null,
	progressBar: null,
	init: function() {
		media.dom = document.getElementById("media")
		media.player = document.getElementById('media-player')
		media.player.addEventListener('ended', media.handleTrackFinished);
		media.dom.querySelector('.progress').addEventListener('mousedown', media.handleTrackMouseDown);
	},
	clear: function() {
		media.dom.classList.remove("active", "ended", "play", "expand")
		media.player.pause()
		media.player.currentTime = 0
		media.dom.querySelector("source").src = ""

		if(media.progressBar) media.progressBar.dom.style.width = "0"
		clearInterval(media.timeInterval)
	},
	startTime: function() {
		let timeDom = media.dom.querySelector(".currentTime")
		let progressDom = media.dom.querySelector('.progress .bar')
		media.timeInterval = setInterval(() => {
			progressDom.style.width = `${media.player.currentTime / media.player.duration * 100}%`
			let min = Math.floor(media.player.currentTime / 60)
			let sec = Math.floor(media.player.currentTime - min).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
			min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
			timeDom.innerHTML = `${min}:${sec}`
		}, 1000)
	},
	stopTime: function() {
		clearInterval(media.timeInterval)
	},
	togglePlay: function() {
  	if(media.player.currentTime > 0 && 
  		!media.player.paused && 
  		!media.player.ended) {
  		media.dom.classList.remove("active")
  		media.player.pause()
  		media.stopTime()
  	} else {
	  	media.playPromise = media.player.play()
		  if (media.playPromise !== undefined) {
		    media.playPromise.then(_ => {
  				media.startTime()
  				media.dom.classList.add("active")
		      media.dom.classList.add("play")
		    })
		    .catch(error => {
		    	console.log("Error with audio")
		    });
		  }
  	}
	},
	seekTo: function(seconds) {
		media.player.currentTime = seconds
	},
	expandPlayer: function() {
    media.dom.classList.add("expand")
	},
	setTrack: function(trackObj) {
		media.dom.classList.remove("active", "ended")
		document.querySelector('.arcs').classList.remove('animate')

		if(trackObj.length) {
			let date = new Date(null)
			date.setSeconds(trackObj.length)
			media.dom.querySelector(".duration").innerHTML = date.toISOString().substr(14, 5)
		}
		media.dom.querySelector(".title").innerHTML = trackObj.title
		media.dom.querySelector(".currentTime").innerHTML = "00:00"
		media.dom.querySelector("source").src = trackObj.url
		media.dom.querySelector("audio").src = trackObj.url
	},
	handleClose: function() {
		app.clearTrack()
	},
	handleTrackFinished: function(e) {
		media.dom.classList.remove("active", "play")
		media.dom.classList.add("ended")
		document.querySelector('.arcs').classList.add('animate')
	},
	handleTrackMouseDown: function(e) {
		document.addEventListener('mousemove', media.handleTrackMouseMove);
		document.addEventListener('mouseup', media.handleTrackMouseUp);
		// media.dom.classList.add("active")
		media.progressBar = media.dom.querySelector('.progress').getBoundingClientRect()
		media.progressBar.dom = media.dom.querySelector('.progress .bar')
		media._updateProgressBar(e.clientX)
	},
	handleTrackMouseMove: function(e) {
		console.log('move movee')
		console.log(e)
		media._updateProgressBar(e.clientX)
	},
	handleTrackMouseUp: function(e) {
		console.log('move up')
		media._updateProgressBar(e.clientX)
		// media.dom.classList.remove("active")
		document.removeEventListener('mouseup', media.handleTrackMouseUp)
		document.removeEventListener('mousemove', media.handleTrackMouseMove)
	},
	_updateProgressBar(mouseX) {
		let distance = mouseX - media.progressBar.x
		let percent = distance / media.progressBar.width
		media.progressBar.dom.style.width = `${Math.floor(percent * 100)}%`
		media.player.currentTime = Math.floor(media.player.duration * percent)
	},
}

document.addEventListener("DOMContentLoaded", media.init);
