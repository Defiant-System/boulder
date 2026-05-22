
// boulder.game

{
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
			cvs: window.find("content .game-view canvas.game"),
			el: window.find("content .game-view"),
		};
		// create arena
		this.arena = new Arena(this.els.cvs);
	},
	dispatch(event) {
		let APP = boulder,
			Self = APP.game,
			value,
			el;
		// console.log(event);
		switch (event.type) {
			// custom events
			case "show-view":
				Self.arena.fpsControl.start();
				break;
			case "hide-view":
				Self.arena.fpsControl.stop();
				break;
		}
	}
}
