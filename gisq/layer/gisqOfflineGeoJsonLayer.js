import VectorLayer from 'ol/layer/Vector'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorSource from  "ol/source/Vector"
import GeoJSON from  "ol/format/GeoJSON"
import GisqOlMobileStyle from '../style/gisqVetorStyle.js'
import GisqGeoJsonVectorTileSource from '../source/gisqGeoJsonVectorTile.js'
import gisqOlMobileProj from "../proj/gisqMobileProj.js"
var GisqOfflineGeoJsonLayer=(function(){
	var proj3857=gisqOlMobileProj.proj3857;
	function GisqVectorLayer(options){
		var options=options||{};
		this.path=options.path;
		var _dataProjection=options.dataProjection||'EPSG:3857';
		var _featureProjection= options.featureProjection||'EPSG:3857';
		this.resolutions=options.resolutions||proj3857.resolutions;
		this.layerProjection=_featureProjection;
		this.jsonDataProjection=_dataProjection;
		this.sqlKey=options.sqlKey||'';   
	}
	GisqVectorLayer.prototype.getLayer=function(){
		if(typeof(plus)=="undefined") return null;
		var GeoJsonMapServiceLayer = plus.android.importClass('com.zjzs.gisq.qcjg.layer.GeoJsonMapServiceLayer');
		var nativeGeoJsonLayer = new GeoJsonMapServiceLayer(this.path);
		var geojsonObject= plus.android.invoke(nativeGeoJsonLayer, "getGeoJson");
		var geoJsonFeatures=(new GeoJSON()).readFeatures(geojsonObject,{
				dataProjection:this.jsonDataProjection,
				featureProjection:this.layerProjection,
				
			});
		var gisqVectorSource = new VectorSource({
		  features: geoJsonFeatures
		}); 
		return new VectorLayer({
		  source: gisqVectorSource,
		  projection: this.layerProjection||'EPSG:3857',
		  style: new GisqOlMobileStyle().styleFunction
		});
	}
	
	GisqVectorLayer.prototype.getVectorTileLayer=function(){
		if(typeof(plus)=="undefined") throw "is Hbuilder app?";
		
		var gisqVectorSource = new GisqGeoJsonVectorTileSource({
			path:this.path,
			resolutions:this.resolutions,
			dataProjection:this.jsonDataProjection,
			featureProjection:this.layerProjection,
			sqlKey:this.sqlKey
		}); 
		return new VectorTileLayer({
		  source: gisqVectorSource.getSources(),
		  projection: this.layerProjection||'EPSG:3857',
		  style: new GisqOlMobileStyle().styleFunction
		});
	}
	return GisqVectorLayer;
})();
export default GisqOfflineGeoJsonLayer;