import VectorTile from  "ol/source/VectorTile"
import GeoJSON from  "ol/format/GeoJSON"
import GisqOlMobileStyle from '../style/gisqVetorStyle.js'
import gisqOlMobileProj from "../proj/gisqMobileProj.js"
import TileGrid from "ol/tilegrid/TileGrid"
import {getTopLeft} from "ol/extent"
var GisqGeoJsonVectorTileSource=(function(){
	var proj3857=gisqOlMobileProj.proj3857;
	function VectorTileSource(options){
		var options=options||{};
		this.path=options.path;
		this.resolutions=options.resolutions||proj3857.resolutions;
		this.dataProjection=options.dataProjection||'EPSG:3857';
		this.featureProjection= options.featureProjection||'EPSG:3857';
		this.sqlKey=options.sqlKey||'';
	}
	VectorTileSource.prototype.getTileGrid=function(){
		var extent=this.featureProjection.getExtent();
		var tileGrid = new TileGrid({
			resolutions: proj3857.resolutions,
			tileSize: [256, 256],
			extent: extent,
			origin: getTopLeft(extent),
		});
		return tileGrid;
	}
	VectorTileSource.prototype.getSources=function(){
		var self=this;
		var tileGeoJsonSource = new VectorTile({
			format: new GeoJSON(),
			tileUrlFunction: function(tileCoord) {
				var z = tileCoord[0];
				var x = tileCoord[1];
				var y = Math.abs(tileCoord[2]);
				return x + "/" + y + "/" + z;
		
			},
			tileLoadFunction: function(tile, src) {
				var xyz = src.split("/");
				if (xyz && xyz.length == 3) {
					var format = tile.getFormat();
					var proj=this.projection;
					var promise = self.getGeoJsonTiles(parseInt(xyz[0]), parseInt(xyz[1]), parseInt(xyz[2]),format,proj);
					promise.then(function(geoFeatures,prj){
						tile.onLoad(geoFeatures, prj);
					},function(error){
						console.log("error="+error)
						tile.onError();
					});
		
				}else{
					tile.onError();
				}
			},
			tileGrid: this.getTileGrid(),
			projection: 'EPSG:3857',
		});
		return tileGeoJsonSource;
	}
	VectorTileSource.prototype.getGeoJsonTiles=function(x,y,z,format,projection){
		var self=this;
		return new Promise(function (resolve, reject) {
			
			if(typeof(plus)=="undefined"||!plus) reject("is Hbuilder app?");
			var GeoJsonMapServiceLayer = plus.android.importClass('com.zjzs.gisq.qcjg.layer.GeoJsonMapServiceLayer');
			var nativeGeoJsonSqlLayer = new GeoJsonMapServiceLayer(self.path,self.sqlKey);
			var geoJsonStr = plus.android.invoke(nativeGeoJsonSqlLayer, "getGeoJsonTile", y, x, z);
			if (geoJsonStr) {
				console.log("XYZ=="+ x+","+ y+","+ z);
				var geoFeatures = format.readFeatures(geoJsonStr, {
					dataProjection: self.dataProjection,
					featureProjection: projection
				});
				var prj=format.readProjection(geoJsonStr);
				resolve(geoFeatures,prj);
			}else{
				reject("暂无数据");
			}
			//console.log(777);
			//resolve(emptyImageUrl);

		});
	}
	return VectorTileSource;
})();
export default GisqGeoJsonVectorTileSource;