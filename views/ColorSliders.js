(function() {
	var componentName = 'color-sliders';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-12">
					color sliders
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
