(function() {
	var componentName = 'gradient-options';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-6">
					<div class="btn-group" role="group">
						<button @click="setLinearType" type="button" class="btn btn-default" :class="gradientType == 'linear' ? 'active' : ''"><span class="glyphicon glyphicon-resize-horizontal"></span> Linear</button>
						<button @click="setRadialType" type="button" class="btn btn-default" :class="gradientType == 'radial' ? 'active' : ''"><span class="glyphicon glyphicon-record"></span> Radial</button>
					</div>
				</div>
				<div class="col-xs-6">
					<input v-show="gradientType == 'linear'" :value="linearGradientAngle" type="number" />
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
		},
		computed: {
			linearGradientAngle: function() {
				return store.state.linearGradientAngle;
			},
			gradientType: function() {
				return store.state.gradientType;
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			setLinearType: function(e) {
				store.commit("setGradientType", "linear");
			},
			setRadialType: function(e) {
				store.commit("setGradientType", "radial");
			}
		}
	});
})();
