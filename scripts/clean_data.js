'use strict';

//File to convert trains.json -> cleanTrains.json
var _ = require('underscore');
var jsonfile = require('jsonfile');

var file = '../data/trains.json';
var trains2015 = jsonfile.readFileSync(file);

var cleanTrainsJSON = {};

trains2015.forEach(function (train) {

    var station = {};

    if (_.keys(cleanTrainsJSON).indexOf(train['Train No']['']) === -1) {

        var cleanTrainObject = {};
        cleanTrainObject.id = train['Train No'][''];
        cleanTrainObject.name = train['train Name'];
        cleanTrainObject.origin = train['source Station Name'];
        cleanTrainObject.originCode = train['Source Station Code'];
        cleanTrainObject.destination = train['Destination Station Name'];
        cleanTrainObject.destinationCode = train['Destination station Code'];


        station.islno = train['islno'];
        station.code = train['station Code'];
        station.name = train['Station Name'];
        station.arrival = train['Arrival time'];
        station.departure = train['Departure time'];
        station.distanceFromOrigin = train['Distance'];

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
        cleanTrainsJSON[train['Train No']['']].stations.push(station);
    }

});

console.log(JSON.stringify(cleanTrainsJSON, null, 2));
