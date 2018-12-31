var media = {
	dom: null,
	progressBar: null,
	init: function() {
		media.dom = document.getElementById("media")
		// media.dom.querySelector('.progress').addEventListener('mousedown', audiobar.handleTrackMouseDown);
	},
	show: function() {
		media.dom.classList.add("active")
	},
	hide: function() {
		media.dom.classList.remove("active")	
	},
	setTime: function(currentTime, duration) {
		let timeDom = media.dom.querySelector(".currentTime")
		let progressDom = media.dom.querySelector('.progress .bar')

		// progressDom.style.width = `${currentTime / duration * 100}%`
		let min = Math.floor(currentTime / 60)
		let sec = Math.floor(currentTime - min).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
		min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
		timeDom.innerHTML = `${min}:${sec}`
	},
	pause: function() {
		 media.dom.classList.remove('playing')
	},
	play: function() {
		 media.dom.classList.add('playing')
	},
	setTrack: function(trackObj) {
		media.dom.classList.remove("active", "ended", "playing")

		if(trackObj.length) {
			let date = new Date(null)
			date.setSeconds(trackObj.length)
			media.dom.querySelector(".duration").innerHTML = date.toISOString().substr(14, 5)
		}
		media.dom.querySelector(".title").innerHTML = trackObj.title
		media.dom.querySelector(".currentTime").innerHTML = "00:00"
	},
	clearTrack: function() {
		media.dom.classList.remove('active', 'ended', 'playing')
		media.dom.querySelector('source').src = ''
		media.dom.querySelector('.title').innerHTML = ''
		media.dom.querySelector('.currentTime').innerHTML = ''
		media.dom.querySelector('.progress .bar').style.width = '0'
	},
	endTrack: function() {
		media.dom.classList.remove("playing")
		media.dom.classList.add("ended")
	},

	/** Handlers */
	handleClose: function() {
		app.clearTrack()
	},
	handlePlayClick: function() {
		app.toggleTrack()
	},
	handleTrackMouseDown: function(e) {
		document.addEventListener('mousemove', media.handleTrackMouseMove);
		document.addEventListener('mouseup', media.handleTrackMouseUp);
		media.progressBar = media.dom.querySelector('.progress').getBoundingClientRect()
		media.progressBar.dom = media.dom.querySelector('.progress .bar')
		media._updateProgressBar(e.clientX)
	},
	handleTrackMouseMove: function(e) {
		media._updateProgressBar(e.clientX)
	},
	handleTrackMouseUp: function(e) {
		media._updateProgressBar(e.clientX)
		document.removeEventListener('mouseup', media.handleTrackMouseUp)
		document.removeEventListener('mousemove', media.handleTrackMouseMove)
	},
	_updateProgressBar(mouseX) {
		let distance = mouseX - media.progressBar.x
		let percent = distance / media.progressBar.width
		// audiobar.progressBar.dom.style.width = `${Math.floor(percent * 100)}%`
		// audiobar.player.currentTime = Math.floor(audiobar.player.duration * percent)
		app.seekTo(percent)
	},
}

document.addEventListener("DOMContentLoaded", app.registerController('media', media));
