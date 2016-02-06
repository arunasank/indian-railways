'use strict';

//File to convert stationsAndGeometries.json -> stations.geojson
var _ = require('underscore');
var jsonfile = require('jsonfile');
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
    feature.properties.geometry = trainStations[station];
    fc.features.push(feature);
});

console.log(JSON.stringify(fc, null, 2));
