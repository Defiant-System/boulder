
@import "./levels/01.js"

@import "./classes/arena.js"
@import "./classes/map.js"
@import "./classes/viewport.js"
@import "./classes/player.js"
@import "./classes/stone.js"
@import "./classes/tile.js"
@import "./classes/gem.js"

@import "./modules/test.js"


const boulder = {
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
		};

		// init all sub-objects
		Object.keys(this)
			.filter(i => typeof this[i].init === "function")
			.map(i => this[i].init(this));

		// init settings
		this.dispatch({ type: "init-settings" });

		// DEV-ONLY-START
		Test.init(this);
		// DEV-ONLY-END

		// show start view
		this.dispatch({ type: "show-view", arg: "start" });
	},
	dispatch(event) {
		let Self = boulder,
			name, arg,
			el;
		// console.log(event);
		switch (event.type) {
			// system events
			case "window.init":
				break;
			case "window.focus":
				Self.els.content.data({ state: "" });
				break;
			case "window.blur":
				Self.els.content.data({ state: "paused" });
				break;
			// custom events
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
			case "init-settings":
				break;
			case "show-view":
				// hide current
				name = Self.els.content.data("show");
				if (name) Self[name].dispatch({ type: "hide-view" });

				arg = (event.arg || event.el.data("arg")).split(",");
				name = arg.shift();
				if (name) Self[name].dispatch({ type: "show-view", arg });
				Self.els.content.data({ show: name });

				// save reference to active view
				Self.active = name;
				break;
			// proxy event
			case "toggle-shadow":
			case "set-scale":
				return Self.editor.dispatch(event);
			default:
				el = event.el;
				if (!el && event.origin) el = event.origin.el;
				if (el && el.length) {
					let pEl = el.parents(`?div[data-area]`);
					if (pEl.length) {
						name = pEl.data("area");
						return Self[name].dispatch(event);
					}
				} else if (Self.active) {
					Self[Self.active].dispatch(event);
				}
		}
	},
	start: @import "./areas/start.js",
	game: @import "./areas/game.js",
	editor: @import "./areas/editor.js",
};

window.exports = boulder;
