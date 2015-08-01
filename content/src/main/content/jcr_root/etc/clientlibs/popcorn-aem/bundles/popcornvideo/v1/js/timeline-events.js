var onpause = function( e ) {
    if(currentPositionTimerId){
        clearTimeout(currentPositionTimerId);
    }
}

var onplay = function(options) {
    updateTimelineOnStart(options);
}

var onended = function( options ) {
    onpause(options)
}


//Timer to update the current time on the timeline
var updateTimelineOnStart = function (options) {
    var newTime = new Date();
//    console.log('updateTimelineOnStart: video current time',video.currentTime);
    newTime.setHours(0, 0, 0, video.currentTime*1000);
    timeline.setCustomTime(newTime);
    timeline.repaintCustomTime();
    currentPositionTimerId = setTimeout(function () {
//        console.log("updateTimelineOnStart: setTimeout");
        updateTimelineOnStart(options);
    }, 50);
};

function getSelectedRow() {
    //TODO: timeline is global === bad
    if(!timeline){
        return {};
    }
    var row = undefined;
    var sel = timeline.getSelection();
    if (sel.length) {
        if (sel[0].row != undefined) {
            row = sel[0].row;
        }
    }
    return row;
}



// Make a callback function for the select item
var onselect = function (event) {
    var row = getSelectedRow();

    if (row != undefined) {
        console.log( "onselect: item " + row + " selected<br>");
        // Note: you can retrieve the contents of the selected row with
        //       data.getValue(row, 2);
    }
    else {
        console.log( "onselect: no item selected<br>");
    }
};

// callback function for the change item
var onchanged = function (event) {
    var row = getSelectedRow();
    console.log( "onchange: item " + row + " changed<br>");
    var start = data.getValue(row,0);
    var end = data.getValue(row,1);
    var content = data.getValue(row,2);
    var path = data.getValue(row,3);
    var componentType = getComponent(path);
    console.log('onchange: ' + path + ':start: ' + convertDateToVideoTime(start) + '; end: ' + convertDateToVideoTime(end));
    if(componentType !== 'text') {
        updatePopcornShowHideTrack(popcorn, path, convertDateToVideoTime(start), convertDateToVideoTime(end));
    } else {
        updatePopcornBoldTextTrack(popcorn, path, convertDateToVideoTime(start), convertDateToVideoTime(end));
    }
};

// callback function for the delete item
var ondelete = function () {
    var row = getSelectedRow();
    console.log(  "ondelete: item " + row + " deleted<br>");
};

// callback function for the edit item
var onedit = function () {
    var row = getSelectedRow();
    console.log("onedit: item " + row + " edit<br>");
    var content = data.getValue(row, 2);
    var newContent = prompt("Enter content", content);
    if (newContent != undefined) {
        data.setValue(row, 2, newContent);
    }
    timeline.redraw();
};

// callback function for the add item
var onadd = function () {
    var row = getSelectedRow();
    console.log( "onadd: item " + row + " created<br>");
    var content = data.getValue(row, 2);
    var newContent = prompt("Enter content", content);
    if (newContent != undefined) {
        var today = new Date();
        today.setHours(0,60,0,0);
        data.setValue(row, 0, today);
        data.setValue(row, 1, today);
        data.setValue(row, 2, newContent);
        timeline.redraw();
    }
    else {
        // cancel adding the item
        timeline.cancelAdd();
    }
};

function onrangechange() {
    // adjust the values of startDate and endDate
    //var range = timeline.getVisibleChartRange();
    //console.log('startDate', dateFormat(range.start));
    //console.log('endDate', dateFormat(range.end));
}

function onrangechanged() {
    console.log(  "onrangechanged: range changed<br>");
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

var hideComponent = function(event){
    var componentType = getComponent(event.id);
    console.log("hideComponent: componentType:",componentType);
    $('.' + componentType).hide();
}

var showComponent = function(event){
    var componentType = getComponent(event.id);
    console.log("showComponent: componentType:",componentType);
    $('.' + componentType).show();

}

var bedazzleText = function(event) {
    var componentType = getComponent(event.id);
    console.log("bedazzleText: componentType:",componentType);
    var elem = $('.' + componentType)
    elem.css("font-weight","bold");
    elem.css("text-transform","uppercase");
}

var undazzleText = function(event) {
    var componentType = getComponent(event.id);
    console.log("undazzleText: componentType:",componentType);
    var elem = $('.' + componentType)
    elem.css("font-weight","normal");
    elem.css("text-transform","none");
}