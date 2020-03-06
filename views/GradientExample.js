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
					if($("#trixelator-canvas")[0]) {
						svgToCanvas($("#svg-container svg")[0], $("#trixelator-canvas")[0]);
					}
				}, 33);
				return s;
			}
		}
	});
})();
