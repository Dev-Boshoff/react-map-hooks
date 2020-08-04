import React, { useEffect } from 'react';
import Map from 'ol/Map';
import View from "ol/View";
import { Tile as TileLayer } from 'ol/layer';
import { OSM} from 'ol/source';
import {Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import './App.css';
import { defaults as defaultControls, ScaleLine, FullScreen, Control } from "ol/control.js";
import {drawTools} from './MapControls.js';

var source = new VectorSource({
  wrapX: false
});

var vector = new VectorLayer({
  source: source,
});

vector.set("layername", "vector", true);

const olMap = new Map({
  controls: defaultControls().extend([new ScaleLine(), new FullScreen(), new drawTools({drawTypes:['Polygon','Circle','Line','Point'],top:5.5,left:.5})]),
  layers: [
    
    new TileLayer({
      source: new OSM()
    }),
    vector
  ],
  view: new View({
    center: [-357509.106, 7256652.10], 
    zoom: 10
  })

});

export default function MapOL() {
  useEffect(() => {
    olMap.setTarget('map')
    return () => olMap.setTarget(undefined);
  }, []);

  return (
    <div id='map'>
    </div>
  )
}