(function() {
	var componentName = 'color-swatch';
	var s = `
		<div v-on:keyup.esc="handleEscape" class="` + componentName + `">
			<div class="background">
				<div @click="togglePallet" class="color-sample" :style="'cursor: pointer; border-radius: 10px; width: 40px; height: 40px; background-color: ' + color"></div>
				<div v-show="showPallet" class="color-pallet">
					<img @click="handleClickColor" @mousemove="handleHoverOverColor" src="./images/spectrum.jpg" />
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		beforeDestroy: function() {
			window.removeEventListener('keyup', this.handleKeyUp);
		},
		created: function() {
			window.addEventListener('keyup', this.handleKeyUp);
			this.lastColor = this.color;
		},
		computed: {
			stops: function() {
				return store.state.stops;
			}
		},
		props: ["color", "index"],
		template: s,
		data: function() {
			return {
				showPallet: false,
				lastColor: null
			}
		},
		methods: {
			getPixelData: function(e) {
				var img = e.target;
				var canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				var context = canvas.getContext('2d');
				context.drawImage(img, 0, 0, img.width, img.height);
				return context.getImageData(e.offsetX, e.offsetY, 1, 1).data;
			},
			handleClickColor: function(e) {
				var pixelData = this.getPixelData(e);
				var red = componentToHex(pixelData[0]);
				var green = componentToHex(pixelData[1]);
				var blue = componentToHex(pixelData[2]);
				this.lastColor = "#" + red + green + blue;
				this.togglePallet();
				this.$emit("colorChange", {index: this.index, r: pixelData[0], g: pixelData[1], b: pixelData[2]});
			},
			handleHoverOverColor: function(e) {
				var pixelData = this.getPixelData(e);
				var red = componentToHex(pixelData[0]);
				var green = componentToHex(pixelData[1]);
				var blue = componentToHex(pixelData[2]);
				this.color = "#" + red + green + blue;
			},
			handleKeyUp: function(e) {
				if(this.showPallet && e.key == "Escape") {
					this.togglePallet();
				}
			},
			togglePallet: function(e) {
				this.color = this.lastColor;
				this.showPallet = !this.showPallet;
			}
		}
	});
})();
