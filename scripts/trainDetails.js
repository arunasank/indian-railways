'use strict';

//File to convert trains.json -> trainDetails.json
//Load geometries for stations from stationsAndGeometries.json
var _ = require('underscore');
var jsonfile = require('jsonfile');

var trainRoutes = jsonfile.readFileSync('../data/trains.json');
var trainStations = jsonfile.readFileSync('../data/stationsAndGeometries.json');

var cleanTrainsJSON = {};

trainRoutes.forEach(function (train) {

    var station = {};

    if (_.keys(cleanTrainsJSON).indexOf(train['Train No']['']) === -1) {

        var cleanTrainObject = {};
        cleanTrainObject.id = train['Train No'][''];
        cleanTrainObject.name = train['train Name'];
        cleanTrainObject.origin = {};
        cleanTrainObject.origin.name = train['source Station Name'];
        cleanTrainObject.origin.code = train['Source Station Code'];
        cleanTrainObject.origin.geometry = trainStations[cleanTrainObject.origin.code];

        cleanTrainObject.destination = {};
        cleanTrainObject.destination.name = train['Destination Station Name'];
        cleanTrainObject.destination.code = train['Destination station Code'];
        cleanTrainObject.destination.geometry = trainStations[cleanTrainObject.destination.code];

        station.islno = train['islno'];
        station.code = train['station Code'];
        station.name = train['Station Name'];
        station.arrival = train['Arrival time'];
        station.departure = train['Departure time'];
        station.distanceFromOrigin = train['Distance'];
        station.geometry = trainStations[station.code];

        cleanTrainObject.stations = [];
        cleanTrainObject.stations.push(station);

        cleanTrainsJSON[cleanTrainObject.id] = cleanTrainObject;

    } else {

        station.islno = train['islno'];
        station.code = train['station Code'];
        station.name = train['Station Name'];
        station.arrival = train['Arrival time'];
        station.departure = train['Departure time'];
        station.distanceFromOrigin = train['Distance'];
        station.geometry = trainStations[station.code];
        cleanTrainsJSON[train['Train No']['']].stations.push(station);
    }

});

console.log(JSON.stringify(cleanTrainsJSON, null, 2));
