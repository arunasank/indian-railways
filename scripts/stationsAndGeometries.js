'use strict';

//File to convert overpass-stations.geojson -> stationsAndGeometries.json
var _ = require('underscore');
var jsonfile = require('jsonfile');
var trainStationsFile = '../data/overpass-stations.geojson';
var trainStations = jsonfile.readFileSync(trainStationsFile);
var stationsAndGeometry = {};

trainStations.features.forEach(function (station) {
    //Eliminate duplicates like 'RGS:1;2' and 'RGS:3;4' for now.
    var ref = (station.properties.ref.indexOf(':') === -1) ? station.properties.ref.split(':')[0] : station.properties.ref;
    if (_.keys(stationsAndGeometry).indexOf(ref) === -1) {
        stationsAndGeometry[ref] = {};
        stationsAndGeometry[ref].geometry = station.geometry;
        stationsAndGeometry[ref].name = station.properties.name;
    }
});

console.log(JSON.stringify(stationsAndGeometry, null, 2));
