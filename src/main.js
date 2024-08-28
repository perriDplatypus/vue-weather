import { createApp, h } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";

const store = createStore({
	state() {
		return {
			URL_BASE: "https://api.openweathermap.org/data/2.5/",
		};
	},
	mutations: {},
});

const app = createApp({
	render: () => h(App),
});

app.use(store);

app.mount("#app");
