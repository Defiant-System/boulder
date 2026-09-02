
let Test = {
	init(APP) {
		// return;

		// setTimeout(() => APP.els.content.find(".button.start").trigger("click"), 500);
		setTimeout(() => {
			APP.dispatch({ type: "show-view", arg: "editor,17" });
			APP.editor.dispatch({ type: "set-scale", arg: .25 });
		}, 500);
		
	}
};
