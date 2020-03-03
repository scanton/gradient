(function() {
	var componentName = 'gradient-settings';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-12">
					<gradient-example></gradient-example>
					<color-stops-slider></color-stops-slider>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-4">
					<color-2d-selector></color-2d-selector>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-4">
					<color-sliders></color-sliders>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-4">
					<color-stop-details></color-stop-details>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<gradient-options></gradient-options>
				</div>
				<div class="col-xs-12 col-sm-6">
					<gradient-swatches></gradient-swatches>
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
		},
		computed: {
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
