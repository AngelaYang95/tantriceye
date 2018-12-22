var carousel = {
	dom: null,
	init: function() {
		carousel.dom = document.getElementById('carousel')

		var observer = new MutationObserver(function(mutationsList, observer) {
    	for(var mutation of mutationsList) {
				if(mutation.type == 'attributes') {
					carousel._goToIndex(parseInt(carousel.dom.getAttribute(mutation.attributeName)))
				}
			}
		});
		observer.observe(carousel.dom, { attributes: true });
		carousel._goToIndex(0)
	},
	onDotClicked: function(index) {
		carousel.dom.setAttribute('data-index', index)
	},
	_goToIndex: function(index) {
		let carouselSize = parseInt(carousel.dom.getAttribute('data-num-items'))
		if(index == carouselSize) return

		let container = carousel.dom.querySelector(".container")
		container.style.transform = `translateX(${index * -100 / carouselSize}%)`

		carousel.dom.querySelectorAll('.dot').forEach((dot, i) => {
			dot.classList.remove('active')
			if(i == index) dot.classList.add('active')
		})
	},
}

document.addEventListener("DOMContentLoaded", carousel.init);