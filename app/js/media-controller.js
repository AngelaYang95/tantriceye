var media = {
	dom: null,
	player: null,
	playPromise: null,
	isPlaying: false,
	timeInterval: null,
	init: function() {
		media.dom = document.getElementById("media")
		media.player = document.getElementById('media-player')
		media.player.addEventListener('ended', media.handleTrackFinished);
	},
	clear: function() {
		media.dom.classList.remove("active", "ended")
		media.isPlaying = false
		media.player.pause()
		media.player.currentTime = 0
		media.dom.querySelector("source").src = ""
	},
	toggle: function() {
		media.dom.classList.toggle('expand')
	},
	startTime: function() {
		let timeDom = media.dom.querySelector(".currentTime")
		let progressDom = media.dom.querySelector('.progress .bar')
		media.timeInterval = setInterval(() => {
			progressDom.style.width = `${media.player.currentTime / media.player.duration * 100}%`
			let min = Math.floor(media.player.currentTime / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
			let sec = Math.floor(media.player.currentTime - min).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
			timeDom.innerHTML = `${min}:${sec}`
		}, 1000)
	},
	stopTime: function() {
		clearInterval(media.timeInterval)
	},
	togglePlay: function() {
  	media.dom.classList.toggle("active")

  	if(media.player.currentTime > 0 && 
  		!media.player.paused && 
  		!media.player.ended) {
  		media.player.pause()
  		media.stopTime()
  	} else {
	  	media.playPromise = media.player.play()
		  if (media.playPromise !== undefined) {
		    media.playPromise.then(_ => {
  				media.startTime()
		      media.dom.classList.add("play")
		    })
		    .catch(error => {
		    	console.log("Error with audio")
		    });
		  }
  	}
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
		if(app.partnerMode)
			media.dom.querySelector("source").src = trackObj.urlDuo
		else
			media.dom.querySelector("source").src = trackObj.url
			media.dom.querySelector("audio").src = trackObj.url
	},
	handleTrackFinished(e) {
		media.dom.classList.remove("active")
		media.dom.classList.add("ended")
		document.querySelector('.arcs').classList.add('animate')
	},
}

document.addEventListener("DOMContentLoaded", media.init)