'use strict';

var _ = require('underscore');
var jsonfile = require('jsonfile');

var trainStationsFile = '../data/overpass-stations.geojson';
var trainStations = jsonfile.readFileSync(trainStationsFile);

var missing = {
    'short_codes': [],
    'geometries': []
};
_.keys(trainStations.features).forEach(function (station) {
    if (!station.geometry) {
        missing.geometries.push(station.properties.id)
    } else if (!station.properties.id) {
        missing['short_codes'].push(station.geometry);
    }
});
