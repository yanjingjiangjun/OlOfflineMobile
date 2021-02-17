import gisqOlMobileProj from "../proj/gisqMobileProj.js"
import TileGrid from "ol/tilegrid/TileGrid"
import TileImage from "ol/source/TileImage"
import {getTopLeft} from "ol/extent"


var GisqMobileMbTileSource=(function(){
	var GisqTileMap = new Map();
	var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
	var nativeMbTilesLayer;
	var proj3857=gisqOlMobileProj.proj3857;
	function MbTileSource(_path,options){
		this.path=_path;
		this.options={};
		var projection=proj3857.proj;
		
		if(options){
			this.options.resolutions=options.resolutions||proj3857.resolutions;
			this.options.projection=options.projection||projection
		}
		if(typeof(plus)!="undefined"&&plus!=null){
			this.MbTilesMapServiceLayer = plus.android.importClass('com.zjzs.gisq.qcjg.layer.MbTilesMapServiceLayer');
			nativeMbTilesLayer = new this.MbTilesMapServiceLayer(this.path, "");
		}
	}
	
	MbTileSource.prototype.getTileGrid=function(){
		var extent=this.options.projection.getExtent();
		console.log(this.options)
		var tileGrid = new TileGrid({
			resolutions: this.options.resolutions,
			tileSize: [256, 256],
			extent: extent,
			origin: getTopLeft(extent),
		});
		return tileGrid;
	}
	
	MbTileSource.prototype.getMbTiles=function(x,y,z){
		
		return new Promise(function (resolve, reject) {
			if(typeof(plus)=="undefined"||!plus) reject(emptyImageUrl);
			if(GisqTileMap&&GisqTileMap.size>1024){
				for (var i = 0; i < 512; i++) {
					GisqTileMap.delete(GisqTileMap.keys().next());
				}
			}
			var key=y+","+x+","+z;
			
			if(GisqTileMap&&GisqTileMap.has(key)){
				var rtile=GisqTileMap.get(key);
				console.log("L.TileLayer.GisqTileMap resolve==");
				resolve("data:image/png;base64,"+rtile);
			}else{
				var rtile = plus.android.invoke(nativeMbTilesLayer, "getTile", y, x, z);
				if (rtile) {
					if(GisqTileMap){
						GisqTileMap.set(key,rtile);
					}
					resolve("data:image/png;base64,"+rtile);
				}else{
					reject(emptyImageUrl);
				} 
				//console.log(777);
				//resolve("https://iknow-base.bj.bcebos.com/zl-xingzhijihua1201.jpg");
	
			}
		});
	}
	MbTileSource.prototype.getTileSource=function(){
		var self=this;
		var tilesource=new TileImage({
			tileUrlFunction: function(tileCoord) {
				var z = tileCoord[0];
				var x = tileCoord[1];
				var y = Math.abs(tileCoord[2]);
				return  x + "/" + y + "/" + z;
			},
			tileLoadFunction:function(imageTile,src){
				console.log(imageTile.getImage())
				if(!!src){
					var xyz=src.split("/");
					if(xyz&&xyz.length==3){
						var promise=self.getMbTiles(parseInt(xyz[0]),parseInt(xyz[1]),parseInt(xyz[2]));
						promise.then(function (returnTile) {
							imageTile.getImage().src  =returnTile;
							console.log("dddd=resolve="+returnTile)
						},function (returnTile) {
							imageTile.getImage().src  =returnTile;
							console.log("dddd=reject")
						});
					}
				}
			},
			tileGrid: this.getTileGrid(),
			projection: this.options.projection,
			
		});
		return tilesource;
	};
	return MbTileSource;
})();
export default GisqMobileMbTileSource;