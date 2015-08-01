var getComponent = function(path){
    var par = path.substr(path.lastIndexOf('/'));
//    console.log('getComponent: par=',par);
    var name = par.substr(par.indexOf('_')+1);
//    console.log('getComponent: name=',name);
    if(name.indexOf('_') > 0){
        return name.substr(0,name.indexOf('_'));
    } else {
        return name;
    }
}

var getStart = function(data, path){
//    console.log('getStart: ', path);
    for(var i = 0; i< data.getNumberOfRows();i++){
        var testPath = data.getValue(i,3);
//        console.log('getStart: Testpath: ',testPath);
        if(testPath === path){
//            console.log('getStart: Start Time: ',convertDateToVideoTime(data.getValue(i, 0)));
            return convertDateToVideoTime(data.getValue(i, 0));
        }
    }
    return 0;
}

var getEnd = function(data, path, duration){
//    console.log('getEnd: ', path);
    var movieEnd = convertDateToVideoTime(duration);
    for(var i = 0; i< data.getNumberOfRows();i++){
        var testPath = data.getValue(i,3);
        if(testPath === path){
//            console.log('getEnd: End Time: ',convertDateToVideoTime(data.getValue(i, 1)));
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