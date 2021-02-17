import Projection from 'ol/proj/Projection';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {transform,get as getProj,addProjection} from 'ol/proj';
let gisqOlMobileProj={};
(function(){
	
	var gisqMobileProj = {
		resolutions: {
			res4490: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625,
				0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
				0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125,
				8.58306884765629E-05, 4.29153442382814E-05, 2.14576721191407E-05, 1.07288360595703E-05,
				5.36441802978515E-06, 2.68220901489258E-06, 1.34110450744629E-06
			],
			res3857: [156543.03392804097, 78271.51696402048, 39135.75848201024,
				19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282,
				611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813,
				19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879,
				0.5971642834779395
			],
			res4326: [
				0.703913007855028,0.35195650392751515,0.17597825196375638,0.08798912598187819,0.043994562990939096,
				0.021997281495469548,0.010998640747734774,0.005499320373868577,0.0027496601869330985,0.001374830093467739,
				0.0006874150467326798,0.0003437075233663399,0.00017185376168316996,0.00008592688084158498,0.00004296344042198222,
				0.00002148172021099111,0.000010740860104305824,0.0000053704300533426425,0.000002685215025481591
			]
		},
		registerProj:function(){
			proj4.defs("EPSG:4490","+proj=longlat +ellps=GRS80 +no_defs");
			proj4.defs("EPSG:4528","+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=40500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
			proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");
			register(proj4);
			//this.init();
		},
		transform:function(obj,inProj,outProj){
			return transform(obj, inProj, outProj);
		}
		
	}
	
	var Projection4528=function(){
		this.proj=getProj("EPSG:4528");
		this.extent=this.proj.getExtent();
		//this.center=[40500000.00,4305182.26];
	}
	var Projection4490=function(){
		this.proj=new Projection({
				code: 'EPSG:4490',
				extent: [-180,-90,180,90],
				units: 'degrees',
				worldExtent:[-180,-90,180,90],
		});
		addProjection(this.proj);
		this.extent=this.proj.getExtent();
		this.resolutions=gisqMobileProj.resolutions.res4490;
	}
	
	var Projection4326=function(){
		this.proj=new getProj("EPSG:4326");
		this.extent=this.proj.getExtent();
		this.resolutions=gisqMobileProj.resolutions.res4326;
	}
	
	var Projection3857=function(){
		this.proj=new getProj("EPSG:3857");
		this.extent=this.proj.getExtent();
		this.resolutions=gisqMobileProj.resolutions.res3857;
	}
	gisqMobileProj.registerProj();
	
	
	gisqOlMobileProj= gisqMobileProj;
	var _proj4528=new Projection4528();
	var _proj4490=new Projection4490();
	var _proj4326=new Projection4326();
	var _proj3857=new Projection3857();
	gisqOlMobileProj.proj4528=_proj4528;
	gisqOlMobileProj.proj4490=_proj4490;
	gisqOlMobileProj.proj4326=_proj4326;
	gisqOlMobileProj.proj3857=_proj3857;
})()
export default gisqOlMobileProj;