<template>
	<div
		id="app"
		:class="
			typeof weather.main == 'undefined'
				? ''
				: weather.main.temp > 16
				? 'warm'
				: 'cold'
		"
	>
		<main>
			<div class="search-box">
				<input
					type="text"
					class="search-bar"
					placeholder="Search..."
					v-model="query"
					@keypress="fetchWeather"
				/>
			</div>
			<div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
				<div class="location-box">
					<div class="location">
						{{ weather.name }}, {{ weather.sys.country }}
					</div>
					<div class="date">{{ dateBuilder() }}</div>
				</div>
				<div class="weather-box">
					<div class="temp">
						{{ Math.round(weather.main.temp) }}°C
					</div>
					<div class="weather">{{ weather.weather[0].main }}</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			// for API key, import from .env file
			api_key: process.env.VUE_APP_API_KEY,
			url_base: this.$store.state.URL_BASE,
			query: "",
			weather: {},
		};
	},
	methods: {
		fetchWeather(e) {
			if (e.key == "Enter") {
				fetch(
					`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
				)
					.then((res) => {
						return res.json();
					})
					.then(this.setResults);
			}
		},
		setResults(results) {
			this.weather = results;
		},
		dateBuilder() {
			let d = new Date();
			let months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"November",
				"December",
			];
			let days = [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			];

			let day = days[d.getDay()];
			let date = d.getDate();
			let month = months[d.getMonth()];
			let year = d.getFullYear();

			return `${day}, ${date} ${month} ${year}`;
		},
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: "Exo", sans-serif;
}

#app {
	position: relative;
	width: 100%;
	height: 100vh;
	background: #627e75;
	overflow: hidden;
}

#app.warm {
	background: #e9c429;
	transition: 0.4s;
}

#app.cold {
	background: #226ba3;
	transition: 0.4s;
}

main {
	min-height: 100vh;
	padding: 25px;
	background-image: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.25),
		rgba(0, 0, 0, 0.75)
	);
}

.search-box {
	width: 100%;
	margin-bottom: 30px;
}

.search-box .search-bar {
	display: block;
	width: 100%;
	padding: 15px;

	color: #313131;
	font-size: 20px;

	appearance: none;
	border: none;
	outline: none;
	background: none;

	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 16px;
	transition: 0.4s;
}

.search-box .search-bar:focus {
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
	background-color: rgba(255, 255, 255, 0.75);
}

.location-box .location {
	color: #fff;
	font-size: 32px;
	font-weight: 500;
	text-align: center;
	text-shadow: 0px 2px rgba(0, 0, 0, 0.25);
}

.location-box .date {
	color: #fff;
	font-size: 20px;
	font-weight: 200;
	font-style: italic;
	text-align: center;
}

.weather-box {
	text-align: center;
}

.weather-box .temp {
	display: inline-block;
	padding: 10px 25px;
	color: #fff;
	font-size: 102px;
	font-weight: 900;

	text-shadow: 0px 2px rgba(0, 0, 0, 0.25);
	margin: 30px 0px;
}

.weather-box .weather {
	color: #fff;
	font-size: 48px;
	font-weight: 700;
	font-style: italic;
	text-shadow: 0px 2px rgba(0, 0, 0, 0.25);
}
</style>
