(function() {
	var componentName = 'gradient-options';
	var s = `
		<div class="` + componentName + ` container-fluid">
			<div class="row">
				<div class="col-xs-12 col-sm-8">
					<div class="btn-group" role="group">
						<button @click="setLinearType" type="button" class="btn btn-default" :class="gradientType == 'linear' ? 'active' : ''"><span class="glyphicon glyphicon-resize-horizontal"></span> Linear</button>
						<button @click="setRadialType" type="button" class="btn btn-default" :class="gradientType == 'radial' ? 'active' : ''"><span class="glyphicon glyphicon-record"></span> Radial</button>
					</div>
				</div>
				<div class="col-xs-12 col-sm-4">
					<input style="width: 66px;" min="0" max="359" @keyup="handleAngleChange" @mouseup="handleAngleChange" @change="handleAngleChange" v-show="gradientType == 'linear'" :value="linearGradientAngle" type="number" />
					<select @change="handleRadialTypeChange" v-show="gradientType != 'linear'">
						<option v-for="type in supportedRadialGradientTypes">{{type}}</option>
					</select>
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
			},
			supportedRadialGradientTypes: function() {
				return store.state.supportedRadialGradientTypes;
			}
		},
		props: [],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			handleAngleChange: function(e) {
				store.commit("setGradientAngle", e.target.value);
			},
			handleRadialTypeChange: function(e) {
				store.commit("setRadialGradientType", e.target.value);
			},
			setLinearType: function(e) {
				store.commit("setGradientType", "linear");
			},
			setRadialType: function(e) {
				store.commit("setGradientType", "radial");
			}
		}
	});
})();
