(function() {
	var componentName = 'color-stops-slider';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row" style="margin: 5px 0; border: 2px solid #ccc; padding: 4px; border-radius: 5px;">
				<div @mousedown="handleMouseDown" @mousemove="handleMouseMove" class="col-xs-12 slider-bar" style="width: 100%; height: 30px;" :style="getStyle()">
					<div class="color-stop-handle" v-for="stop, index in stops" :data-index="index" :style="getStopStyle(stop)"></div>
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
			getStopStyle: function(stop) {
				var s = 'cursor: col-resize; margin: 0 -3px; height: 30px; width: 7px; position: absolute; top: -1px; left: ' + stop.stop + '%; background: rgba(' + stop.r + ' ' + stop.g + ' ' + stop.b + ' ' + stop.a + '); border-radius: 5px; border: 2px solid #FFF;';
				return s;
			},
			getStyle: function() {
				var a = [];
				var stop;
				var stops = store.state.stops;
				var l = stops.length;
				var s =  'background: rgb(2,0,36); background: ';
				s += 'linear-gradient(90deg, ';
				for(var i = 0; i < l; i++) {
					stop = stops[i];
					a.push('rgba(' + stop.r + ', ' + stop.g + ', ' + stop.b + ', ' + stop.a + ') ' + stop.stop + '%');
				}
				s += a.join(", ");
				s += ');';
				return s;
			},
			handleMouseDown: function(e) {
				var $target = $(e.target);
				if($target.hasClass("color-stop-handle")) {
					store.commit("beginColorStopDrag", {index: $target.attr("data-index"), context: $target.closest(".slider-bar") });
				}
			},
			handleMouseMove: function(e) {
				if(store.state.isDraggingHandle) {
					var offiset = $(e.target).offset().left;
					var loc = ((e.x - offiset) / $(e.target).width());
					if(loc > 0 && loc < 1) {
						var val = Math.round(loc * 100);
						store.commit("updateStopValue", {value: val, index: store.state.handleDragIndex});
					}
				}
			}
		}
	});
})();
