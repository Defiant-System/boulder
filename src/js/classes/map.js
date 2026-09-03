
class Map {
	constructor(cfg) {
		let { arena } = cfg;

		this.arena = arena;

		this.rec = {
			"a": "m01",
			"b": "m02",
			"c": "m03",
			"d": "m04",
			"e": "m05",
			"f": "m06",
			"g": "m07",
			"h": "m08",
			"i": "m09",
		}

		// items on the map
		this.level = [];

		let lvl = Level[0];
		for (let y=0; y<lvl.height; y++) {
			for (let x=0; x<lvl.width; x++) {
				let i = (y * lvl.width) + x,
					c = lvl.map[i];
				if (!this.level[y]) this.level.push([]);
				this.level[y][x] = (this.rec[c] || "m00").split("");
			}
		}
	}

	update(delta, time) {
		// this.level.map(tile => {
		// 	tile.update(delta, time);
		// });
	}

	render(ctx) {
		let arena = this.arena,
			viewport = arena.viewport,
			size = arena.config.size,
			hT = size >> 1,
			vX = hT - viewport.x,
			vY = hT - viewport.y,
			xMin = Math.floor(vX / size),
			yMin = Math.floor(vY / size),
			xMax = Math.ceil((vX + viewport.w) / size),
			yMax = Math.ceil((vY + viewport.h) / size),
			vhX = viewport.half.w,
			vhY = viewport.half.h;

		for (let y=yMin; y<yMax; y++) {
			for (let x=xMin; x<xMax; x++) {
				let col = this.level[y][x];
				if (!col) return;

				let [m, t, l] = col,
					oX = Math.floor(l * size),
					oY = Math.floor(t * size),
					tX = Math.floor((x * size) - vX),
					tY = Math.floor((y * size) - vY);

				ctx.drawImage(
					arena.assets.tiles.img,
					oX, oY, size, size,
					tX, tY, size, size
				);
			}
		}
	}
}
