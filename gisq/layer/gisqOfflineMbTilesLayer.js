import TileLayer from 'ol/layer/Tile'
import GisqMobileMbTileSource from '../source/gisqMbTilesSource.js'
import gisqOlMobileProj from "../proj/gisqMobileProj.js"
var GisqOfflineMbTilesLayer=(function(){
	var proj3857=gisqOlMobileProj.proj3857;
	function TilesLayer(options){
		options=options||{};
		this.path=options.path;
		this.projection=options.projection||'EPSG:3857';
		this.resolutions=options.resolutions||proj3857.resolutions;
		var tilesource=new GisqMobileMbTileSource(this.path,{
			projection:this.projection,
			resolutions:this.resolutions
		});
		this.tilesource=tilesource.getTileSource();
		
		
	}
	TilesLayer.prototype.getLayer=function(){
		return new TileLayer({
		  		source: this.tilesource,
		  		projection: this.projection,
		  	});
	}
	return TilesLayer;
})();
export default GisqOfflineMbTilesLayer;