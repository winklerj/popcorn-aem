var getComponent = function(path){
    var par = path.substr(path.lastIndexOf('/'));
    var name = par.substr(par.indexOf('_')+1);
    if(name.indexOf('_') > 0){
        return name.substr(0,name.indexOf('_'));
    } else {
        return name;
    }
}

//This will get you the elements for a component type in the specified parsys
//TODO: return the specific component element requested
var getComponentElement = function(path){
    var parComp = path.substr(path.lastIndexOf('/') + 1);
    var par = parComp.substr(0,parComp.indexOf('_'));
    var name = parComp.substr(parComp.indexOf('_')+1);
    if(name.indexOf('_') > 0){
        name = name.substr(0,name.indexOf('_'));
    } else {
        name = name;
    }
    return $('.' + par + " > ." + name);
}

var getStart = function(data, path){
    for(var i = 0; i< data.getNumberOfRows();i++){
        var testPath = data.getValue(i,3);
        if(testPath === path){
            return convertDateToVideoTime(data.getValue(i, 0));
        }
    }
    return 0;
}

var getEnd = function(data, path, duration){
    var movieEnd = convertDateToVideoTime(duration);
    for(var i = 0; i< data.getNumberOfRows();i++){
        var testPath = data.getValue(i,3);
        if(testPath === path){
            retrievedEnd = convertDateToVideoTime(data.getValue(i, 1));
            if(retrievedEnd <= movieEnd) {
                return retrievedEnd;
            } else {
                return movieEnd;
            }
        }
    }
    return movieEnd;
}

//Calculates seconds away from midnight today
var convertDateToVideoTime = function(date){
    var hours = date.getHours();
    var min = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    return (hours*60*60) + (min*60) + seconds + Math.round(milliseconds);
}

var updatePopcornShowHideTrack = function(popcorn, path, startTime, endTime){
    popcorn.code(path,{
        start:startTime,
        end: endTime,
        onStart: showComponent,
        onEnd: hideComponent
    });
}

var updatePopcornBoldTextTrack = function(popcorn, path, startTime, endTime){
    popcorn.code(path,{
        start:startTime,
        end: endTime,
        onStart: bedazzleText,
        onEnd: undazzleText
    });
}

// Format given date as "yyyy-mm-dd hh:ii:ss"
// @param datetime   A Date object.
function dateFormat(date) {
    var datetime =   date.getFullYear() + "-" +
        ((date.getMonth()   <  9) ? "0" : "") + (date.getMonth() + 1) + "-" +
        ((date.getDate()    < 10) ? "0" : "") +  date.getDate() + " " +
        ((date.getHours()   < 10) ? "0" : "") +  date.getHours() + ":" +
        ((date.getMinutes() < 10) ? "0" : "") +  date.getMinutes() + ":" +
        ((date.getSeconds() < 10) ? "0" : "") +  date.getSeconds();
    return datetime;
}