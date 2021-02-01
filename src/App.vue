<template>
	<div id="app">
		<HelloWorld class="map"/>
	</div>
</template>

<script>
	
	import HelloWorld from "./components/HelloWorld"
	
	export default {
		name: 'app',
		components: {
			HelloWorld
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	
	*{padding:0; margin:0;}
	html,body{
	  height: 100%;
	}
	#app {
	  height: 100%;
	}

	.map {
			width: 100%;
			height: 100%;
		}
</style>
