(function() {
	var componentName = 'text-input';
	var s = `
		<div class="` + componentName + `">
			<input @change="handleChange" :value="value" />
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
		},
		computed: {
		},
		props: ["value"],
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
