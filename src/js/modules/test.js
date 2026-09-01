
let Test = {
	init(APP) {
		// return;

		// setTimeout(() => APP.els.content.find(".button.start").trigger("click"), 500);
		setTimeout(() => {
			APP.dispatch({ type: "show-view", arg: "editor" });
			APP.editor.dispatch({ type: "render-level", arg: 0 });
		}, 500);
		
	}
};
