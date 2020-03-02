(function() {
	var componentName = 'gradient-example';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-12" :style="getStyle">
					
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
			getStyle: function() {

				//background-image: radial-gradient(circle, rgb(2, 0, 36) 0%, rgb(45, 41, 180) 23%, rgb(9, 9, 121) 41%, rgb(6, 75, 164) 52%, rgb(0, 0, 0) 73%, rgb(3, 146, 212) 89%, rgb(0, 212, 255) 100%)
			}
		}
	});
})();
