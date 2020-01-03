(function() {
	var componentName = 'hex-color';
	var s = `
		<div class="` + componentName + `">
			<text-input :value="hexColor"></text-input>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
		},
		computed: {
			hexColor: function() {
				return getHexColorFromData([stop.r, stop.g, stop.b]);
			}
		},
		props: ["stop"],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			
		}
	});
})();
