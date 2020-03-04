(function() {
	var componentName = 'trixelated-output';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-12" v-html="renderTrixels()">
					
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
			renderTrixels: function() {
				return "trixelated output";
			}
		}
	});
})();
