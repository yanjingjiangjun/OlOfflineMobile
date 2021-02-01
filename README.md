# default

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# OlOfflineMobile
OlOfflineMobile
openlayers 移动端离线数据加载项目。包括mbtiles切片和shapefile文件 geojson文件等。要配合hbuilder的android打包项目
示例：
```
<template>
    <div id="map" ref="map" class="map"></div>
</template>

<script>
import 'ol/ol.css';
import { transform } from 'ol/proj'
import OlMap from 'ol/Map'
import OSM from 'ol/source/OSM'
import vectorSource from 'ol/source/Vector'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import View from 'ol/View';
import shpjs from 'shpjs';
import {gisqOlMobileProj,GisqOfflineShpLayer,GisqOfflineMbTilesLayer,gisqOlMobileStyle} from "gisq-ol-mobile-offline"
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
  				alert(1);
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
  			var localMbTilesPath = "/sdcard/gisqmap/cr.mbtiles";
  			var localShpPath = "/sdcard/gisqmap/shp/xzc";
  			var gisqShpLayer=new GisqOfflineShpLayer({
  				path:localShpPath, 
  				featureName:"XZQ",
  				projection:gisqOlMobileProj.proj4528.proj,
  			});
  			var mblayers = new GisqOfflineMbTilesLayer({
  				path: localMbTilesPath,
  				projection: gisqOlMobileProj.proj3857.proj
  			});
			
  			var map = new OlMap({
  				target: 'map', 
  				layers: [ /* new TileLayer({
					source: new OSM()
				}) */mblayers.getLayer(),gisqShpLayer.getLayer()],
  				view: new View({
  					center: transform([120, 30], 'EPSG:4326', 'EPSG:3857'),
  					zoom: 9,
  					minZoom: 1,
  					maxZoom: 15
  				})
  			});
  		}
  	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.map {
		width: 100%;
		height: 100%;
	}
</style>
```
