(function() {
	var componentName = 'gradient-example';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div id="svg-container" v-html="renderSvg()" style="width: 100%; min-height: 200px;"></div>
				<canvas id="trixelator-canvas" style="width: 100%; height: 200px;"></canvas>
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
			calculateColorDifference: function(compareColor, color1, color2) {
				var c1 = hexToComponent(color1);
				var c2 = hexToComponent(color2);
				var c3 = hexToComponent(compareColor);
				var delta1 = minColorDiff(c3, [c1]);
				var delta2 = minColorDiff(c3, [c2]);
				var percent1 = Math.round((1 - (delta1 / (delta1 + delta2))) * 10) * 10;
				var percent2 = Math.round((1 - (delta2 / (delta1 + delta2))) * 10) * 10;
				console.log(percent1, percent2, percent1 + percent2);
				return [percent1, percent2, percent1 + percent2];
			},
			renderSvg: function() {
				var a = [];
				var stop;
				var stops = store.state.stops;
				var l = stops.length;
				var s =  '<svg  width="100%" height="100%"><defs>';
				var endTag;
				if(store.state.gradientType == 'linear') {
					var angle = store.state.linearGradientAngle;
					s += '<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"  gradientTransform="rotate(' + angle + ')">';
					endTag = '</linearGradient>';
				} else {
					var type = store.state.radialGradientType;
					s += '<radialGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">';
					endTag = '</radialGradient>';
				}
				for(var i = 0; i < l; i++) {
					stop = stops[i];
					s += '<stop offset="' + stop.stop + '%" style="stop-color:rgb(' + stop.r + ',' + stop.g + ',' + stop.b + ');stop-opacity:' + stop.a + '" />'
				}
				s += '</defs><rect width="100%" height="100%" fill="url(#grad1)" /></svg>';
				setTimeout(function() {
					var trixCanvas = $("#trixelator-canvas")[0];
					if(trixCanvas) {
						svgToCanvas($("#svg-container svg")[0], trixCanvas);

						var sampleSize = store.state.sampleSize;
						var base = store.state.trixelWidth;
						var halfBase = base / 2;
						var baseSin = base * eqSin;
						var ctx = trixCanvas.getContext('2d');
						var overlapSize = 0.75;
						var portWidth = trixCanvas.width - base;
						var portHeight = trixCanvas.height - baseSin;
						var widthSteps = Math.floor(trixCanvas.width / halfBase);
						var heightSteps = Math.floor(trixCanvas.height / baseSin);

						var pixelData, color, x, y, pointUp, hsl, a;
						
						var htmlOutput = '<?xml version="1.0" encoding="utf-8"?>\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" x="0px" y="0px" viewBox="0 0 ' + portWidth + ' ' + portHeight + '" enable-background="new 0 0 ' + portWidth + ' ' + portHeight + '" xml:space="preserve"><g inkscape:groupmode="layer" inkscape:label="Layer 1"><g>';
						for(y = 0; y < heightSteps; y++) {
							for(x = 0; x < widthSteps; x++) {
								pixelData = averagePixelData(ctx.getImageData(x * halfBase, y * baseSin, sampleSize, sampleSize).data);
								if(store.state.isPaletteMappingEnabled) {
									color = getHexColorFromMap(pixelData);
								} else {
									color = getHexColorFromData(pixelData);
								}
								hsl = rgbToHsl(pixelData[0], pixelData[1], pixelData[2]);
								pointUp = (x + y) % 2 ? 'point-up' : '';
								a = [];
								htmlOutput += '\n<polygon fill="' + color + '" ';
								if(pointUp) {
									a.push(Math.round((x * halfBase) - overlapSize - halfBase) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
									a.push(Math.round((x * halfBase) + base + overlapSize - halfBase) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
									a.push(Math.round((x * halfBase)) + "," + Math.round((y * baseSin) - overlapSize));
								} else {
									a.push(Math.round((x * halfBase) - overlapSize - halfBase) + "," + Math.round((y * baseSin) - overlapSize));
									a.push(Math.round(((x * halfBase) + base) + overlapSize - halfBase) + "," + Math.round((y * baseSin) - overlapSize));
									a.push(Math.round((x * halfBase)) + "," + Math.round(((y * baseSin) + baseSin) + overlapSize));
								}
								htmlOutput += 'points="' + (a.join(" ")) + '"';
								htmlOutput += ' />';
							}
						}
						htmlOutput += '\n</g></g></svg>';
						$("#output-svg").html(htmlOutput);
					}
				}, 33);
				return s;
			}
		}
	});
})();
