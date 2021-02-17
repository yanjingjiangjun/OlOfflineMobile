import {Circle,Fill,Icon,IconImage,Image,RegularShape,Stroke,Style,Text} from 'ol/style';
var GisqOlMobileStyle=(function(){
	
    var vetorStyle=function(){
        var image = new  Circle({
          radius: 5,
          fill: null,
          stroke: new  Stroke({color: 'red', width: 1}),
        });

        var styles = {
          'Point': new  Style({
            image: image,
          }),
          'LineString': new  Style({
            stroke: new  Stroke({
              color: 'green',
              width: 1,
            }),
          }),
          'MultiLineString': new  Style({
            stroke: new  Stroke({
              color: 'green',
              width: 1,
            }),
          }),
          'MultiPoint': new  Style({
            image: image,
          }),
          'MultiPolygon': new  Style({
            stroke: new  Stroke({
              color: 'yellow',
              width: 2,
            }),
            fill: new  Fill({
              color: 'rgba(255, 255, 0, 0.1)',
            }),
          }),
          'Polygon': new  Style({
            stroke: new  Stroke({
              color: 'blue',
              lineDash: [4],
              width: 3,
            }),
            fill: new  Fill({
              color: 'rgba(0, 0, 255, 0.1)',
            }),
          }),
          'GeometryCollection': new  Style({
            stroke: new  Stroke({
              color: 'magenta',
              width: 2,
            }),
            fill: new  Fill({
              color: 'magenta',
            }),
            image: new  Circle({
              radius: 10,
              fill: null,
              stroke: new  Stroke({
                color: 'magenta',
              }),
            }),
          }),
          'Circle': new  Style({
            stroke: new  Stroke({
              color: '#ff0000',
              width: 2,
            }),
            fill: new  Fill({
              color: '#ff0000',
            }),
          }),
        };

        var styleFunction = function (feature) {
			
          return styles[feature.getGeometry().getType()];
        };
		vetorStyle.prototype.styles=styles;
		vetorStyle.prototype.styleFunction=styleFunction;
    }
	return vetorStyle;
})()
export default GisqOlMobileStyle;