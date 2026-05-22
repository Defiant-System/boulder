
class Viewport {
	constructor(cfg) {
		let { arena, x, y, w, h } = cfg;
		
		this.arena = arena;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		// mid point of viewport
		this.half = { w: w >> 1, h: h >> 1 };
	}

	update(delta, time) {
		
	}

	center() {
		
	}
}
