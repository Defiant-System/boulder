
// boulder.editor

{
	init() {
		// fast references
		this.els = {
			content: window.find("content"),
			el: window.find("content .editor-view .level"),
		};
	},
	dispatch(event) {
		let APP = boulder,
			Self = APP.editor,
			value,
			el;
		// console.log(event);
		switch (event.type) {
			// custom events
			case "show-view":
				break;
			case "hide-view":
				break;
			case "render-level":
				let lvl = level[event.arg],
					str = [];
				for (let y=0; y<lvl.height; y++) {
					for (let x=0; x<lvl.width; x++) {
						let i = (y * lvl.width) + x;
						str.push(`<b class="t${lvl.map[i]}"></b>`);
					}
				}
				Self.els.el
					.css({ "--mW": lvl.width, "--mH": lvl.height })
					.html(str.join(""));
				break;
		}
	}
}
