'use strict';

//File to convert trainDetails.json -> trainRoutes.geojson
var _ = require('underscore');
var jsonfile = require('jsonfile');
var trainDetails = jsonfile.readFileSync('../data/trainDetails.json');

var fc = {'type': 'FeatureCollection',
          'features': []};


_.keys(trainDetails).forEach(function (trainDetail) {
    var feature = {
        'type': 'Feature',
        'properties': {}
    };

    feature.properties.id = trainDetails[trainDetail].id;
    feature.properties.name = trainDetails[trainDetail].name;
    feature.properties.origin = trainDetails[trainDetail].origin.code;
    feature.properties.destination = trainDetails[trainDetail].destination.code;
    feature.properties.stations = [];
    feature.geometry = {};
    feature.geometry.type = 'LineString';
    feature.geometry.coordinates = [];
    trainDetails[trainDetail].stations.forEach(function (station) {
        feature.properties.stations.push(station.code);
        //Lots of stations don't have geometries, because OSM has unmarked stations/ stations with unmarked 'short_name' tags. For now add geometry only if it exists.
        //This needs addition of data to OSM.
        if (station.geometry) {
            feature.geometry.coordinates.push(station.geometry.coordinates);
        }
    });

    fc.features.push(feature);
});

console.log(JSON.stringify(fc, null, 2));
