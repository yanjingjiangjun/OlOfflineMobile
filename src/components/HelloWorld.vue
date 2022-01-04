<template>
	<div id="map" ref="map" class="map"></div>
</template>

<script>
	import 'ol/ol.css';
	import {
		transform
	} from 'ol/proj'
	import OlMap from 'ol/Map'
	import OSM from 'ol/source/OSM'
	import vectorSource from 'ol/source/Vector'
	import TileLayer from 'ol/layer/Tile'
	import VectorLayer from 'ol/layer/Vector'
	import GeoJSON from 'ol/format/GeoJSON'
	import View from 'ol/View';
	import shpjs from 'shpjs';
	
	import proj4 from 'proj4'
	import parseCode from 'proj4/lib/parseCode.js'
	import projections from 'proj4/lib/projections.js'
	import Projection from 'ol/proj/Projection';
	import {
	  addProjection,
	  get as getProjection
	} from 'ol/proj'
	import {
	  register
	} from 'ol/proj/proj4.js'
	import {
		gisqOlMobileProj,
		GisqOfflineShpLayer,
		GisqOfflineMbTilesLayer,
		gisqOlMobileStyle,
		GisqOfflineGeoJsonLayer,
		GisqOfflineSqliteLayer
	} from "gisq-ol-mobile-offline"
	export default {
		name: 'HelloWorld',
		components: {

		},
		data() {
			return {

			}
		},
		mounted() {

			var plusReady = function(callback) {
				if (window.plus) {
					callback();
				} else {
					document.addEventListener('plusready', callback);
				}
			};
			plusReady(this.initMap)
			//this.initMap();
		},
		methods: {
			initMap() {
				//alert(1);
				/* var proj4549=new Projection({
						code: 'EPSG:4549',
						extent: [347872.25, 2703739.74, 599933.05, 5912395.20],
						units: 'm'
				});
				addProjection(proj4549); */
				var localMbTilesPath = "/sdcard/gisqmap/cr.mbtiles";
				localMbTilesPath = "/sdcard/3306830010010000000";
				var metadata=GisqOfflineMbTilesLayer.getMedata(localMbTilesPath);
				//alert(metadata)
				proj4.defs('EPSG:4549', '+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs')
				register(proj4)
				let proj4549 = getProjection('EPSG:4549')
				//proj4549.setExtent([-5123200,-10002100,5123200,10002100])
				
				//localMbTilesPath = "/sdcard/gisqmap/A3857.sqlite";
				//localMbTilesPath = "/sdcard/gisqmap/4549";
				var localShpPath = "/sdcard/gisqmap/shp/xzc";
				var localGeoJsonSqlPath = "/sdcard/gisqmap/geojson/xhq_dk.sqlite";
				var gisqShpLayer = new GisqOfflineShpLayer({
					path: localShpPath,
					featureName: "XZQ",
					projection: gisqOlMobileProj.proj4528.proj,
				});
				var nativeLayers = new GisqOfflineMbTilesLayer({
					path: localMbTilesPath,
					projection: proj4549,
					resolutions:[33.0729828126323,16.9333672000677,8.46668360003387,4.23334180001693,2.11667090000847,1.05833545000423,0.529167725002117,0.264583862501058,0.132291931250529],
					origin:[-5123200,10002100],
					tileType:"arcgis"
				}); 
				/* var nativeLayers = new GisqOfflineMbTilesLayer({
					path: localMbTilesPath,
					projection: gisqOlMobileProj.proj3857.proj,
				}); */
				/* var nativeLayers = new GisqOfflineSqliteLayer({
					path: localMbTilesPath,
					projection: proj4549,
					resolutions:[33.0729828126323,16.9333672000677,8.46668360003387,4.23334180001693,2.11667090000847,1.05833545000423,0.529167725002117,0.264583862501058,0.132291931250529],
					origin:[-5123200,10002100]
				}); */
				var geoJsonTile=new GisqOfflineGeoJsonLayer({
					path: localGeoJsonSqlPath,
					dataProjection: gisqOlMobileProj.proj3857.proj,
					featureProjection: gisqOlMobileProj.proj3857.proj,
				});
				var map = new OlMap({
					target: 'map',
					layers: [
						/* new TileLayer({
					source: new OSM()
				}), */
						nativeLayers.getLayer()
					],
					view: new View({
						//center: transform([120.113033,30.33038], 'EPSG:4326', 'EPSG:3857'),
						center: transform([120.82, 29.58], 'EPSG:4326', 'EPSG:4549'),
						//resolutions:res4490,//4490等非4326,3857的底图 需要带上resolutions
						//projection:prj4490,//4490等非4326,3857的底图 需要带上prj4490 同时配合resolutions
						resolutions:[33.0729828126323,16.9333672000677,8.46668360003387,4.23334180001693,2.11667090000847,1.05833545000423,0.529167725002117,0.264583862501058,0.132291931250529],
						projection:proj4549,
						zoom: 0,
						minZoom: 0,
						maxZoom: 9
					})
				});
				//map.zoomToExtent([578607.882699996,3274410.0292,579295.189500004,3274927.8496]);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.map {
		width: 100%;
		height: 100%;
	}
</style>
