
// boulder.editor

{
	init() {
		// fast references
		this.els = {
			doc: $(document),
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
				// pan viewport events
				Self.els.el.on("mousedown", Self.doPan);
				if (event.arg) Self.dispatch({ type: "render-level", arg: +event.arg[0] });
				break;
			case "hide-view":
				break;
			case "set-scale":
				Self.els.el.parent().css({ "--scale": event.arg });
				break;
			case "render-level":
				let lvl = level[event.arg-1],
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
	},
	doPan(event) {
		let APP = boulder,
			Self = APP.editor,
			Pan = Self.pan;
		switch (event.type) {
			case "mousedown":
				if (event.button != 0) return;
				// prevent default behaviour
				event.preventDefault();

				let el = Self.els.el,
					offset = el.offset(".editor-view"),
					data = {
						...offset,
						y: +el.cssProp("--y"),
						x: +el.cssProp("--x"),
						tile: parseInt(el.cssProp("--tile"), 10),
					},
					click = {
						y: event.clientY - offset.top,
						x: event.clientX - offset.left,
					};
				// save drag details
				Self.pan = { el, data, click };

				// bind events
				Self.els.doc.on("mousemove mouseup", Self.doPan);
				break;
			case "mousemove":
				let top = event.clientY - Pan.click.y,
					left = event.clientX - Pan.click.x;
				Pan.el.css({ top, left, });
				break;
			case "mouseup":
				// unbind events
				Self.els.doc.off("mousemove mouseup", Self.doPan);
				break;
		}
	}
}
