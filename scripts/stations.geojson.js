'use strict';

//File to convert stationsAndGeometries.json -> stations.geojson
var _ = require('underscore');
var jsonfile = require('jsonfile');
var turfCentroid = require('turf-centroid');

var trainStationsFile = '../data/stationsAndGeometries.json';
var trainStations = jsonfile.readFileSync(trainStationsFile);

var fc = {'type': 'FeatureCollection',
          'features': []};

_.keys(trainStations).forEach(function (station) {
    var feature = {
        'type': 'Feature',
        'properties': {}
    };

    feature.properties.id = station;
    feature.geometry = trainStations[station];
    //Some Stations are polygons, so convert them into points
    fc.features.push((feature.geometry.type === 'Point') ? feature : turfCentroid(feature));
});

console.log(JSON.stringify(fc, null, 2));
