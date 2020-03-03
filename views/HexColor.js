(function() {
	var componentName = 'hex-color';
	var s = `
		<div class="` + componentName + `">
			<text-input @change="handleChange" :value="hexColor"></text-input>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
		},
		computed: {
			hexColor: function() {
				return getHexColorFromData([this.stop.r, this.stop.g, this.stop.b]);
			}
		},
		props: ["stop"],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			handleChange: function(e) {
				this.$emit("change", e);
			}
		}
	});
})();
