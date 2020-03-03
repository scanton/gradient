(function() {
	var componentName = 'color-stop-details';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-12">
					<div v-for="(stop, index) in stops">
						<color-swatch v-on:colorChange="handleColorChange" :index="index" :color="'rgba(' + stop.r + ', ' + stop.g + ', ' + stop.b + ', ' + stop.a + ')'"></color-swatch>
						<hex-color @change="handleHexChange" :data-index="index" :stop="stop"></hex-color>
						<input min="0" max="100" style="width: 66px" @change="handleStopChange" :data-index="index" :value="stop.stop" type="number"></input>
					</div>
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
			handleColorChange: function(e) {
				store.commit("setStopColor", e);
			},
			handleHexChange: function(e) {
				store.commit("updateHexValue", {index: $(e.target).closest(".hex-color").attr("data-index"), value: e.target.value, _value: e.target._value});
			},
			handleStopChange: function(e) {
				store.commit("updateStopValue", {index: $(e.target).attr("data-index"), value: e.target.value});
			}
		}
	});
})();
