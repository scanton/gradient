(function() {
	var componentName = 'gradient-example';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div id="trixelator-target" class="col-xs-12" style="width: 100%; min-height: 200px;" :style="getStyle()">
				</div>
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
			getStyle: function() {
				var a = [];
				var stop;
				var stops = store.state.stops;
				var l = stops.length;
				var s =  'background: rgb(2,0,36); background: ';
				if(store.state.gradientType == 'linear') {
					var angle = store.state.linearGradientAngle;
					s += 'linear-gradient(' + angle + 'deg, ';
				} else {
					var type = store.state.radialGradientType;
					s += 'radial-gradient(' + type + ', ';
				}
				for(var i = 0; i < l; i++) {
					stop = stops[i];
					a.push('rgba(' + stop.r + ', ' + stop.g + ', ' + stop.b + ', ' + stop.a + ') ' + stop.stop + '%');
				}
				s += a.join(", ");
				s += ');';
				return s;
			}
		}
	});
})();
