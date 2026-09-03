
class Tile {
	constructor(cfg) {
		let { arena, parent, tile, x, y } = cfg;

		this.arena = arena;
		this.parent = parent;
		this.tile = tile || 150;
		this.x = x || 0;
		this.y = y || 0;

		this.sprite = this.arena.assets.tiles.img;
	}

	update(delta, time) {
		
	}

	render(ctx) {
		let f = 0,
			w = this.tile;
		ctx.drawImage(this.sprite,
			f, 0, w, w,
			10, 10, w, w
		);
	}
}
