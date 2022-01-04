<template>
	<div id="app">
		
		<!-- <div style="height: 200px;width: 100%;">
			<gisq-upload @onChange="onChange" style=""></gisq-upload>
		</div>
		<LivePlayer 
		        ref="livePlayer"  
		        :videoUrl="videoUrl"
		        fluent
		        autoplay
		        live
		        stretch
		      /> -->
			  <HelloWorld class="map"/>
	</div>
</template>

<script>
	//import "gisq-hb-mobile-upload/lib/gisqMobileUpload.css"
	import HelloWorld from "./components/HelloWorld"
	import gisqUpload from "gisq-hb-mobile-upload"
	import videojs from "video.js"
	import LivePlayer from '@liveqing/liveplayer'
	import DPlayer from 'dplayer'
	export default {
		name: 'app',
		components: {
			HelloWorld,gisqUpload,LivePlayer,DPlayer
		},
		data() {
			return {
				videoUrl:"rtmp://58.200.131.2:1935/livetv/hunantv"
			}
		},
		methods:{
			onChange:function(fileMap){
				console.log(fileMap)
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
