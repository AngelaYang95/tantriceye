var tracklist = {
	dom: null,
	template: null,
	activeTrack: null,
	init: function() {
		tracklist.dom = document.getElementById("tracklist")
		tracklist.template = document.getElementById("template-tracklist-item").content
	},
	handleClick: function(dom) {
		let id = dom.getAttribute("data-id")
		// if(tracklist.activeTrack && tracklist.activeTrack.getAttribute("data-id") == id) return

		if(tracklist.activeTrack) tracklist.activeTrack.classList.remove('active')
		dom.classList.add('active')
		tracklist.activeTrack = dom
		app.playTrack(id)
	},
	render: function(category) {
		var fragment = document.createDocumentFragment();
		var number = 0;
		console.log("dat is ///" + data)
		data.categories[category].forEach((id, index) => {
			let trackObj = data.tracks[id]

			if(app.mode != parseInt(trackObj.type)) {
				console.log(trackObj)
				return
			}
			let templ = document.importNode(tracklist.template, true)
			templ.querySelector(".track").setAttribute("data-id", id)
			templ.querySelector(".id").innerHTML = ++number
			templ.querySelector(".title").innerHTML = trackObj.title
			templ.querySelector(".description").innerHTML = trackObj.description
      if(trackObj.length) {
        let date = new Date(null)
			  date.setSeconds(trackObj.length)
			  templ.querySelector(".length").innerHTML = date.toISOString().substr(14, 5)
      }

      console.log("adding...")
      if(trackObj.url == "") {
      	templ.querySelector(".track").classList.add('disable')
      	templ.querySelector(".track").onclick = ""
      }
			fragment.appendChild(templ)
		})

		tracklist.dom.querySelector('.category').innerHTML = category
		tracklist.dom.querySelector('.tracks').innerHTML = ""
		tracklist.dom.querySelector('.tracks').appendChild(fragment)
	},
}

document.addEventListener("DOMContentLoaded", tracklist.init);