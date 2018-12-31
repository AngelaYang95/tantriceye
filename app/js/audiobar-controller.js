var audiobar = {
	dom: null,
	progressBar: null,
	init: function() {
		audiobar.dom = document.getElementById("audiobar")
		audiobar.dom.querySelector('.progress').addEventListener('mousedown', audiobar.handleTrackMouseDown);
	},
	show: function() {
		audiobar.dom.classList.add("active")
	},
	hide: function() {
		audiobar.dom.classList.remove("active")	
	},
	setTime: function(currentTime, duration) {
		let timeDom = audiobar.dom.querySelector(".currentTime")
		let progressDom = audiobar.dom.querySelector('.progress .bar')

		progressDom.style.width = `${currentTime / duration * 100}%`
		let min = Math.floor(currentTime / 60)
		let sec = Math.floor(currentTime - min * 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
		min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
		timeDom.innerHTML = `${min}:${sec}`
	},
	pause: function() {
		audiobar.dom.classList.remove('playing')
	},
	play: function() {
		audiobar.dom.classList.add('playing')
	},
	setTrack: function(trackObj) {
		audiobar.dom.classList.remove("active", "ended", "playing")

		if(trackObj.length) {
			let date = new Date(null)
			date.setSeconds(trackObj.length)
			audiobar.dom.querySelector(".duration").innerHTML = date.toISOString().substr(14, 5)
		}
		audiobar.dom.querySelector(".title").innerHTML = trackObj.title
		audiobar.dom.querySelector(".currentTime").innerHTML = "00:00"
		audiobar.dom.querySelector("source").src = trackObj.url
		audiobar.dom.querySelector("audio").src = trackObj.url
	},
	clearTrack: function() {
		audiobar.dom.classList.remove('active', 'ended', 'playing', 'error')
		audiobar.dom.querySelector('source').src = ''
		audiobar.dom.querySelector('.title').innerHTML = ''
		audiobar.dom.querySelector('.currentTime').innerHTML = ''
		audiobar.dom.querySelector('audio').src = ''
		audiobar.dom.querySelector('.progress .bar').style.width = '0'
	},
	endTrack: function() {
		audiobar.dom.classList.remove("active", "playing")
		audiobar.dom.classList.add('ended')
	},
	setError: function() {
		audiobar.dom.classList.add('error')
	},
	clearError: function() {
		audiobar.dom.classList.removd('error')
	},

	/** Handlers */
	handleClose: function() {
		app.clearTrack()
	},
	handlePlayClick: function() {
		app.toggleTrack()
	},
	handleTrackMouseDown: function(e) {
		document.addEventListener('mousemove', audiobar.handleTrackMouseMove);
		document.addEventListener('mouseup', audiobar.handleTrackMouseUp);
		// audiobar.dom.classList.add("active")
		audiobar.progressBar = audiobar.dom.querySelector('.progress').getBoundingClientRect()
		audiobar.progressBar.dom = audiobar.dom.querySelector('.progress .bar')
		audiobar._updateProgressBar(e.clientX)
	},
	handleTrackMouseMove: function(e) {
		audiobar._updateProgressBar(e.clientX)
	},
	handleTrackMouseUp: function(e) {
		audiobar._updateProgressBar(e.clientX)
		// audiobar.dom.classList.remove("active")
		document.removeEventListener('mouseup', audiobar.handleTrackMouseUp)
		document.removeEventListener('mousemove', audiobar.handleTrackMouseMove)
	},
	_updateProgressBar(mouseX) {
		let distance = mouseX - audiobar.progressBar.x
		let percent = distance / audiobar.progressBar.width
		// audiobar.progressBar.dom.style.width = `${Math.floor(percent * 100)}%`
		// audiobar.player.currentTime = Math.floor(audiobar.player.duration * percent)
		app.seekTo(percent)
	},
}
// document.addEventListener("DOMContentLoaded", audiobar.init);
document.addEventListener("DOMContentLoaded", app.registerController('audiobar', audiobar));
