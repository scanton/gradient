(function() {
	var componentName = 'color-stop-details';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-12">
					<div v-for="(stop, index) in stops">
						<color-swatch :color="'rgba(' + stop.r + ', ' + stop.g + ', ' + stop.b + ', ' + stop.a + ')'"></color-swatch>
						<hex-color :stop="stop"></hex-color>
						<text-input :value="stop.stop"></text-input>
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
			
		}
	});
})();