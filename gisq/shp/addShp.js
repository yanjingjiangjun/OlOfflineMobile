import GeoJSON from 'ol/format/GeoJSON';
import {Base64Binary} from "../utils/base64ToBinary.js"
import shp from 'shpjs';
var GisqOlMobileShp=(function(){
	
    function gisqOfflineShpLayer(options){
        this.options={};
        this.options.path=options.path;
        this.options.featureName=options.featureName;
        this.options.projection=options.projection;
        console.log(this.options.projection);
    }
    gisqOfflineShpLayer.prototype.addShpLayer=function(layerSource){
        if(shp&&typeof(plus)!="undefined"){
                var ShpMapServiceLayer = plus.android.importClass('com.zjzs.gisq.qcjg.layer.ShpMapServiceLayer');
                var nativeShpLayer = new ShpMapServiceLayer(this.options.path,this.options.featureName);
                var shpArrayBase64=nativeShpLayer.getShpBinary();
                var dbfArrayBase64=nativeShpLayer.getDbfBinary();
                var shpArray,dfbArray,zipArray;
                if(Base64Binary){
                     shpArray = Base64Binary.decode(shpArrayBase64);
                     dfbArray = Base64Binary.decode(dbfArrayBase64);
                     var _projection=this.options.projection;
                     
                     var resolveF=function(geojson){
                        //do something with your geojson
                        console.log(111);

                        var features=(new GeoJSON({dataProjection:_projection,featureProjection: 'EPSG:3857'})).readFeatures(geojson)
                        //features.setStyle(gisqVetorStyle.styles['MultiPolygon']);
                        layerSource.addFeatures(features);

                    }
                     var promise=new Promise(function(resolve){
                        var geojson=shp.combine([shp.parseShp(shpArray),[]]);
                        console.log(geojson)
                        resolve(geojson);
                      });
                      promise.then(resolveF);
                    
                }

        }else{
			console.log("Hbuilder app and has shpjs lib?");
		}
    }
    function convertDataURIToBinary(raw) {
      var rawLength = raw.length;
      var array = new Uint8Array(raw);
    
      return array;
    }
    function stringToUint8Array(str){
      var arr = [];
      for (var i = 0, j = str.length; i < j; ++i) {
    	arr.push(str.charCodeAt(i));
      }
    
      var tmpUint8Array = new Uint8Array(arr);
      return tmpUint8Array
    }
	return gisqOfflineShpLayer;
})()

export default GisqOlMobileShp;