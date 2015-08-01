<%@include file="/apps/corporate/business-center/components/global.jsp"%>

<bedrock:component className="com.icfi.aem.butter.components.content.PopcornVideo" name="popcornVideo"/>

<script type="text/javascript" src="//www.google.com/jsapi"></script>
<cq:includeClientLib categories="popcorn-aem.popcornvideo.v1,popcorn-aem.popcorn.1_5_6,popcorn-aem.chaps-link-library.timeline.2_9_1"/>


<script type="text/javascript">
    //TODO: these global vars === bad
    var video;
    var timeline;
    var data;
    var durationEnd;
    var currentPositionTimerId;
    var popcorn;

    var componentPaths = [];
    <c:forEach items="${popcornVideo.componentPaths}" var="path" varStatus="status">
    componentPaths.push('${path}');</c:forEach>

    $(document).ready(function() {
            // Set callback to run when API is loaded
            google.load("visualization", "1", {"callback" : drawVisualization});


            //TODO: these global vars === bad
            video = document.getElementById("${video_id}");
            video.addEventListener('pause', onpause, false );
            video.addEventListener( 'play', onplay, false );
            video.addEventListener( 'ended', onended, false );
            video.addEventListener( 'seeked', onseeked, false );


            // Called when the Visualization API is loaded.
            function drawVisualization() {
                console.log("drawVisualization: duration: ",video.duration);

                // Create and populate a data table.
                data = new google.visualization.DataTable();
                data.addColumn('datetime', 'start');
                data.addColumn('datetime', 'end');
                data.addColumn('string', 'content');
                data.addColumn('string', 'path');

                var midnight = new Date();
                midnight.setHours(0,0,0,0);
                durationEnd = new Date();
                durationEnd.setHours(0,0,video.duration,0);
                console.log('drawVisualization: midnight', midnight);
                console.log("drawVisualization: durationEnd", durationEnd);

                var testEnd = new Date();
                testEnd.setHours(0,0,5,0);

                var videoTitle = '${video_title}';
                console.log("drawVisualization: video title=", videoTitle)
                data.addRows([
                    [midnight, durationEnd, '<%=resource.getPath()%>', '<%=resource.getPath()%>']
                    <c:forEach items="${popcornVideo.componentPaths}" var="path" varStatus="status">
                    ,[midnight, testEnd, '${path}', '${path}']
                    </c:forEach>
                ]);

                // specify options
                var options = {
                    "width":  "100%",
                    "height": "300px",
                    editable: true, // make the events dragable
                    axisOnTop: true,
                    showNavigation: true,
                    max: durationEnd, //set the min and max for the chart to today
                    min: midnight,
                    showButtonNew: true,
                    showCurrentTime: false,
                    'showCustomTime': true
                };

                // Instantiate our timeline object.
                timeline = new links.Timeline(document.getElementById('mytimeline'));

                // Add event listeners
                google.visualization.events.addListener(timeline, 'select', onselect);
                google.visualization.events.addListener(timeline, 'changed', onchanged);
                google.visualization.events.addListener(timeline, 'add', onadd);
                google.visualization.events.addListener(timeline, 'edit', onedit);
                google.visualization.events.addListener(timeline, 'delete', ondelete);

                // Draw our timeline with the created data and options
                timeline.draw(data, options);
                timeline.setCustomTime(midnight);
                timeline.redraw();

                initializePopcorn(data,durationEnd);

            }

            function initializePopcorn(data, durationEnd){
                popcorn = Popcorn( "#${video_id}" );

                //Popcorn code for video position
                var componentType;
                <c:forEach items="${popcornVideo.componentPaths}" var="path" varStatus="status">
                componentType = getComponent('${path}');
                console.log('initializePopcorn: component type', componentType);
                //TODO: get the data for this
                if(componentType !== 'text'){
                    updatePopcornShowHideTrack(popcorn, '${path}', getStart(data,'${path}'), getEnd(data,'${path}',durationEnd));
                } else {
                    updatePopcornBoldTextTrack(popcorn, '${path}', getStart(data,'${path}'), getEnd(data,'${path}',durationEnd));
                }
                </c:forEach>
            }
    }, false );
    </script>

<!-- timeline component -->
<div id="mytimeline"></div>

<!-- Buttter/Popcorn stuff -->
<%--<div id="timeline-info"></div>--%>
<%--<div class="butter-tray butter-tray-minimized" data-butter-exclude="true" data-butter-content-state="timeline">--%>
	<%--<div class="butter-loading-container"></div>--%>
	<%--<div class="butter-status-area"></div>--%>
	<%--<div class="butter-timeline-area">--%>
		<%--<div class="butter-timeline fadable">--%>
		<%--</div>--%>
	<%--</div>--%>
	<%--<div class="butter-toggle-button">--%>
		<%--<div class="image-container"></div>--%>
	<%--</div>--%>
<%--</div>--%>