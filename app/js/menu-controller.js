var menu = {
	dom: null,
	timer: null,
	init: function() {
		menu.dom = document.getElementById('menu')
		document.querySelectorAll('#menu a[href]').forEach((dom) => {
			dom.addEventListener('click', menu.handleLocationClick)
		})
	}, 
	setActivePath: function(path) {
		let pathLink = menu.dom.querySelector(`a[href="${path}"]`)
		if(pathLink) {
			pathLink.classList.add('active')
			menu.dom.querySelector('a.active').classList.remove('active')
		}
	},
	toggleMenu: function() {
		menu.dom.classList.toggle('active')
		if(!menu.dom.classList.contains('ready')) {
			menu.dom.classList.add('ready')
		}
	},
	handleLocationClick: function() {
		if(menu.timer) clearTimeout(menu.timer)

		menu.timer = setTimeout(() => {
			menu.toggleMenu()
		}, 100)
	},
	handleSoloClick: function() {
		app.setMode(CONSTANTS.MODES.SOLO)
	},
	handleDuoClick: function() {
		app.setMode(CONSTANTS.MODES.DUO)
	}
}

document.addEventListener("DOMContentLoaded", app.registerController('menu', menu));
