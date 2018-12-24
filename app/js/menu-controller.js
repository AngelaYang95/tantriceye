var menu = {
	dom: null,
	timer: null,
	init: function() {
		menu.dom = document.getElementById('menu')
		document.querySelectorAll('li a[href]').forEach((dom) => {
			dom.addEventListener('click', menu.handleLocationClick)
		})
	}, 
	setActivePath: function(path) {
		console.log('active path is ', path)
		menu.dom.querySelector('a.active').classList.remove('active')
		menu.dom.querySelector(`a[href="${path}"]`).classList.add('active')
	},
	toggleMenu: function() {
		console.log('toggle')
		menu.dom.classList.toggle('active')
	},
	handleLocationClick: function() {
		if(menu.timer) clearTimeout(menu.timer)

		menu.timer = setTimeout(() => {
			menu.toggleMenu()
		}, 500)
	},
	handleSoloClick: function() {
		app.setMode(CONSTANTS.MODES.SOLO)
	},
	handleDuoClick: function() {
		app.setMode(CONSTANTS.MODES.DUO)
	}
}

document.addEventListener('DOMContentLoaded', menu.init)