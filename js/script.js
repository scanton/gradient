const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const fs = require('fs-extra');

require('./custom_modules/utils/enableContextMenu.js')();

const stripObservers = function(obj) {
	return JSON.parse(JSON.stringify(obj, null, 4));
}
const toDegrees = function (rad) {
	return rad * (180 / Math.PI);
}
const toRadians = function (deg) {
	return deg * (Math.PI / 180);
}
const svgTag = function (tag, attrs) {
	var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs) {
		el.setAttribute(k, attrs[k]);
	}
	return el;
}
const averagePixelData = function(arr) {
	var l = arr.length;
	var count = 0;
	var r = 0;
	var g = 0;
	var b = 0;
	var a = 0
	for(var i = 0; i < l; i+= 4) {
		r += arr[i];
		g += arr[i + 1];
		b += arr[i + 2];
		a += arr[i + 3];
		++count;
	}
	return [Math.floor(r/count), Math.floor(g/count), Math.floor(b/count), Math.floor(a/count)];
}
const rgbToHsl = function(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if (max == min) {
		h = s = 0;
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: 
				h = (g - b) / d + (g < b ? 6 : 0); 
				break;
			case g: 
				h = (b - r) / d + 2; 
				break;
			case b: 
				h = (r - g) / d + 4; 
				break;
		}
		h /= 6;
	}
	return [h, s, l];
}

const getColorFromData = function(data) {
	return 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';
}
const componentToHex = function (c) {
	if(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	} else {
		return "00";
	}
}
const hexToComponent = function(hex) {
	return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), 255];
}
const getHexColorFromData = function(data) {
	return '#' + componentToHex(data[0]) + componentToHex(data[1]) + componentToHex(data[2]);
}
const getHexColorFromMap = function(data) {
	if(store.state.paletteData && store.state.paletteData.colors) {
		var c, d, componentColor, bestColor;
		var diff = Number.POSITIVE_INFINITY;
		var colors = store.state.paletteData.colors;
		var l = colors.length;
		while(l--) {
			c = colors[l];
			componentColor = hexToComponent(c);
			d = Math.abs(componentColor[0] - data[0]) + Math.abs(componentColor[1] - data[1]) + Math.abs(componentColor[1] - data[1]);
			if(d < diff) {
				bestColor = c;
				diff = d;
			}
		}
		return bestColor;
	} else {
		return getHexColorFromData(data);
	}
}
const minColorDiff = function(color, data) {
	var diff = Number.POSITIVE_INFINITY;
	var l = data.length;
	var d, colorDiff;
	while(l--) {
		d = data[l];
		colorDiff = Math.abs(d[0] - color[0]) + Math.abs(d[1] - color[1]) + Math.abs(d[2] - color[2]);
		diff = Math.min(diff, colorDiff);
	}
	return diff;
}
const colorSort = function(a, b) {
	var aC = hexToComponent(a);
	var bC = hexToComponent(b);
	return (bC[0] - aC[0]) + (bC[1] - aC[1]) + (bC[2] - aC[2]);
}

const eqRad = toRadians(60);
const eqSin = Math.sin(eqRad);
const eqCos = Math.cos(eqRad);

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		baseWidth: 40,
		colorList: [],
		sampleSize: 15,
		defaultPath: 'gradient.svg',
		isModalDialogVisible: false,
		modalDialogTitle: '',
		modalDialogBody: '',
		modalDialogButtons: [],
		stops: [
			{
				r: 255,
				g: 0,
				b: 0,
				a: 1,
				stop: 0
			},
			{
				r: 0,
				g: 0,
				b: 255,
				a: 1,
				stop: 100
			}
		]
	},
	actions: {
		/*
		savePalette: function({commit, state}, args) {
			return new Promise((resolve, reject) => {
				if(args.name && args.colors) {
					fs.writeJson(paletteDirectory + "/" + args.name + ".json", args, {spaces: '\t'}, function(err) {
						if(err) {
							reject(err);
						} else {
							resolve();
						}
					});
				}
			});
		}
		*/
	},
	mutations: {
		hideModalDialog: function(state) {
			state.isModalDialogVisible = false;
		},
		showModalDialog: function(state, args) {
			if(args && args.title && args.body && args.buttons) {
				state.modalDialogTitle = args.title;
				state.modalDialogBody = args.body;
				state.modalDialogButtons = args.buttons;
				state.isModalDialogVisible = true;
			} else {
				console.error("insufficient modal args: ", args);
			}
		}
	}
});

const vm = new Vue({
	el: '#main-app',
	store: store
});
/*
store.commit("showModalDialog", {
	title: "test title", 
	body: "Test body copy", 
	buttons: [
		{
			label: "Cancel",
			class: "btn btn-warning",
			handler: function(e) {
				store.commit("hideModalDialog");
			}
		},
		{
			label: "Do it",
			class: "btn btn-danger",
			handler: function(e) {
				console.log("consider it done");
				store.commit("hideModalDialog");
			}
		}
	]}
);
*/
//const paletteDirectory = __dirname + '/palettes';
