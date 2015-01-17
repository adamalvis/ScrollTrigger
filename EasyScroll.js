'use strict';

$.fn.scrollEvent = function() {
	// set defaults
	var props = {
		elem: this,
		func: function() {},
		reset: function() {},
		triggered: false, 
		centered: false,
		offset: 0
	};

	// accepts object or single function
	if(typeof arguments[0] === 'object') {
		
		for(var key in arguments[0]) {
			if(arguments[0].hasOwnProperty(key) && props.hasOwnProperty(key)) {
				props[key] = arguments[0][key];
			}
		}

	} else {
		props.func = arguments[0];
	}

	var methods = {
		init: function() {
			$(window).scroll(function() {

				var fromTop = $(window).scrollTop(),
					trigger = methods.setTrigger();

				// Check if scroll depth is more than trigger
				if(fromTop >= trigger) {
					if(!props.triggered) {
						props.func();
						props.triggered = true;
					}
				} else {
					if(props.triggered) {
						props.reset();
						props.triggered = false;
					}
				}

			});
		},
		setTrigger: function() {

			var trigger,
				elemOffset = props.elem.offset().top,
				winHeight = $(window).height(),
				halfElemHeight = props.elem.height() / 2;

			trigger = elemOffset - (winHeight / 2);

			// adds half of element height to center
			if(props.centered) {
				trigger = trigger + halfElemHeight;
			}

			// adjusts according to offset
			if(props.offset) {
				trigger = trigger + props.offset;
			}

			return trigger;

		}
	};

	// initiate ScrollEvents
	methods.init();
}