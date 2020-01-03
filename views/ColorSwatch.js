(function() {
	var componentName = 'color-swatch';
	var s = `
		<div class="` + componentName + `">
			<div class="background">
				<div class="color-sample" :style="'border-radius: 10px; width: 40px; height: 40px; background-color: ' + color"></div>
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
		props: ["color"],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			
		}
	});
})();
