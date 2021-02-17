import VectorLayer from 'ol/layer/Vector'
import VectorSource from  "ol/source/Vector"
import GisqOlMobileStyle from '../style/gisqVetorStyle.js'
import GisqOlMobileShp from "../shp/addShp.js"
var GisqOfflineShpLayer=(function(){
	function GisqVectorLayer(options){
		options=options||{};
		this.path=options.path;
		this.featureName=options.featureName;
		this.tilesource=new VectorSource({
			wrapX: false
		});
		this.projection=options.projection;
		this.addShpLayerCallback=new GisqOlMobileShp({path:this.path, 
			featureName:this.featureName,
			projection:this.projection,
		});
		
	}
	GisqVectorLayer.prototype.getLayer=function(){
		this.addShpLayerCallback.addShpLayer(this.tilesource);
		return new VectorLayer({
			source: this.tilesource,
			projection: this.projection,
			style: new GisqOlMobileStyle().styleFunction
		});
	}
	return GisqVectorLayer;
})();
export default GisqOfflineShpLayer;