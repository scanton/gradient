(function() {
	var componentName = 'trixelated-output';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div id="output-svg" class="col-xs-12">
					
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
		},
		computed: {
			stops: function() {
				return store.state.stops;
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			generateMosaic: function(e) {
				/*
				var base = store.state.trixelWidth;
				var halfBase = base / 2;
				var baseSin = base * eqSin;

				var img = document.getElementById("trixelator-target");
				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				
				var ctx = canvas.getContext('2d');
				
				if(store.state.globalFilters.length) {
					ctx.filter = store.state.globalFilters;
				}
				ctx.drawImage(img, 0, 0, img.width, img.height);
				
				var widthSteps = Math.floor(img.width / halfBase);
				var heightSteps = Math.floor(img.height / baseSin);
				*/
				/*
				var canvas = $("#trixelator-canvas")[0];
				if(canvas) {
					var ctx = canvas.getContext('2d');

					var overlapSize = 0.75;
					var pixelData, color, x, y, pointUp, hsl, a;
					var portWidth = canvas.width - base;
					var portHeight = canvas.height - baseSin;
					var s = '<?xml version="1.0" encoding="utf-8"?>\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" x="0px" y="0px" viewBox="0 0 ' + portWidth + ' ' + portHeight + '" enable-background="new 0 0 ' + portWidth + ' ' + portHeight + '" xml:space="preserve"><g inkscape:groupmode="layer" inkscape:label="Layer 1"><g>';
					for(y = 0; y < heightSteps; y++) {
						for(x = 0; x < widthSteps; x++) {
							pixelData = averagePixelData(canvas.getContext('2d').getImageData(x * halfBase, y * baseSin, this.sampleSize, this.sampleSize).data);
							if(store.state.isPaletteMappingEnabled) {
								color = getHexColorFromMap(pixelData);
							} else {
								color = getHexColorFromData(pixelData);
							}
							hsl = rgbToHsl(pixelData[0], pixelData[1], pixelData[2]);
							pointUp = (x + y) % 2 ? 'point-up' : '';
							a = [];
							s += '\n<polygon fill="' + color + '" ';
							if(pointUp) {
								a.push(Math.round((x * halfBase) - overlapSize - halfBase) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
								a.push(Math.round((x * halfBase) + base + overlapSize - halfBase) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
								a.push(Math.round((x * halfBase)) + "," + Math.round((y * baseSin) - overlapSize));
							} else {
								a.push(Math.round((x * halfBase) - overlapSize - halfBase) + "," + Math.round((y * baseSin) - overlapSize));
								a.push(Math.round(((x * halfBase) + base) + overlapSize - halfBase) + "," + Math.round((y * baseSin) - overlapSize));
								a.push(Math.round((x * halfBase)) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
							}
							s += 'points="' + (a.join(" ")) + '"';
							s += ' />';
						}
					}
					s += '\n</g></g></svg>';
					console.log(s);
					return s;
				}
				*/
			}
		}
	});
})();
