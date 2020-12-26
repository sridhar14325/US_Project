define(["dojo/dom", "dojo/on", "dojo/topic",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/core/units", "esri/Color",
    "esri/geometry/geometryEngine",
    "esri/geometry/SpatialReference", "esri/geometry/projection", "esri/geometry/support/webMercatorUtils",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Graphic", "esri/symbols/PictureMarkerSymbol",
    "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "esri/tasks/support/Query",
    "esri/tasks/RouteTask", "esri/tasks/support/RouteParameters", "esri/tasks/support/FeatureSet",
    "esri/layers/GraphicsLayer",
    "dojo/text!widgets/IdentifyQuery/templates/IdentifyQuery.html"],
    function (dom, on, topic, declare, _WidgetBase, _TemplatedMixin,
        units, Color, geometryEngine,
        SpatialReference, Projection, webMercatorUtils,
        SimpleLineSymbol, SimpleFillSymbol, Graphic, PictureMarkerSymbol,
        IdentifyTask, IdentifyParameters, Query,
        RouteTask, RouteParameters, FeatureSet,
        GraphicsLayer,
        template) {

        var IdentifyQuerywidget = declare("widgets.IdentifyQuery", [_WidgetBase, _TemplatedMixin], {
            //return declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
            // Our template - important!
            templateString: template,
            map: null,
            //theme: "HomeButton",
            //baseClass: "Navigation",
            thisIdentifyTask: null,
            thisRouteTask: null,
            thisRouteLayer: null,
            thisRouteParams: null,
            thisRouteSymbol: null,
            areaBoundaries: [],
            thisSeletedPointGraphicLayer: null,

            constructor: function (params, srcNodeRef) {
                params = params || {};
                try {
                    this.domNode = this.domNode;
                } catch (e) {
                    console.log(e);
                }

            },
            postCreate: function () {
                // Get a DOM node reference for the root of our widget
                //var domNode = this.domNode;
                try {
                    this.inherited(arguments);
                    this.thisSeletedPointGraphicLayer = new GraphicsLayer({ id: this.Oconfig.selectLayerId });
                    this.map.add(this.thisSeletedPointGraphicLayer);
                } catch (e) {
                    console.log(e);
                }

            },
            startup: function () {
                var currentWidget = this;
                try {
                    currentWidget.PrepareRouteTask();
                    currentWidget.PrepareIdentificationTask();
                    topic.subscribe("Search-IdentifyQuery/inputqry", function (qry) {
                        currentWidget.executeIdentificationTask(qry);
                        currentWidget.ClearSelectedPointGraphics();
                    });
                    //topic.subscribe("Locator-IdentifyQuery/inputqry", function (qry) { currentWidget.executeIdentificationTask(qry); });
                    topic.subscribe("Layers-IdentifyQuery/areapolygons", function (graphics) { currentWidget.areaBoundaries = graphics; });
                } catch (e) {
                    console.log(e);
                }
            },
            PrepareIdentificationTask: function () {
                var currentWidget = this;
                try {
                    var url = currentWidget.Pconfig.MapService.ServiceUrl;
                    currentWidget.thisIdentifyTask = new IdentifyTask({ url: url });

                } catch (e) {
                    console.log("[PrepareIdentificationTask] failed: " + e);
                }
            },
            executeIdentificationTask: function (inputqry) {
                var currentWidget = this;
                try {
                    //var cGeometry = webMercatorUtils.webMercatorToGeographic(inputqry);
                    //var bufferGeometry = geometryEngine.geodesicBuffer(inputqry, currentWidget.Oconfig.BufferDistance, currentWidget.Oconfig.DistanceType);
                    var union = geometryEngine.union(currentWidget.areaBoundaries);

                    //var sfs = new SimpleFillSymbol(); var polygonGraphic = new Graphic({ geometry: union, symbol: sfs });
                    //currentWidget.thisRouteLayer.add(polygonGraphic);
                    var identyForms = new IdentifyParameters();
                    identyForms.geometry = union;
                    identyForms.layerIds = currentWidget.Pconfig.MapService.SubLayers;
                    identyForms.tolerance = 3;
                    identyForms.layerOption = "all";
                    identyForms.mapExtent = configOptions.Global.activeView.extent;
                    identyForms.returnGeometry = true;

                    currentWidget.thisIdentifyTask.execute(identyForms)
                        .then(function (res) { currentWidget.iTaskExecutes(inputqry, res, currentWidget.Oconfig.DistanceType); }, function (er) { console.log(er); });
                } catch (e) {
                    console.log("[executeIdentificationTsk] failed: " + e);
                }
            },
            iTaskExecutes: function (FromPoint, iFLayers, dType) {
                var currentWidget = this;
                try {
                    var domALLid = dom.byId("ul_ALL"); domALLid.innerHTML = "";
                    var domSTATEWIDEid = dom.byId("ul_SPN"); domSTATEWIDEid.innerHTML = "";
                    var domAIRid = dom.byId("ul_AQ"); domAIRid.innerHTML = "";
                    var domBLWMid = dom.byId("ul_LW"); domBLWMid.innerHTML = "";
                    var domOCRMid = dom.byId("ul_OC"); domOCRMid.innerHTML = "";
                    var domWATERid = dom.byId("ul_BW"); domWATERid.innerHTML = "";
                    var features = iFLayers.results;
                    for (var i = 0; i < features.length; i++) {
                        var litag = document.createElement("li");
                        var atag = document.createElement("a");
                        atag.dataset["layerId"] = features[i]["layerId"];
                        atag.dataset["OBJECTID"] = features[i]["feature"]["attributes"]["OBJECTID"];
                        atag.dataset["geometry"] = JSON.stringify(features[i]["feature"]["geometry"]);
                        atag.dataset["attributes"] = JSON.stringify(features[i]["feature"]["attributes"]);
                        atag.href = "#";
                        atag.innerHTML = features[i]["feature"]["attributes"]["SiteName"] + " (" + geometryEngine.distance(FromPoint, features[i]["feature"]["geometry"], dType).toFixed(2) + " " + dType + ")";
                        litag.appendChild(atag);
                        if (features[i]["layerName"] == "ALL") { domALLid.appendChild(litag); }
                        else if (features[i]["layerName"] == "WATER") { domWATERid.appendChild(litag); }
                        else if (features[i]["layerName"] == "STATEWIDE") { domSTATEWIDEid.appendChild(litag); }
                        else if (features[i]["layerName"] == "AIR") { domAIRid.appendChild(litag); }
                        else if (features[i]["layerName"] == "BLWM") { domBLWMid.appendChild(litag); }
                        else if (features[i]["layerName"] == "OCRM") { domOCRMid.appendChild(litag); }
                        else { console.log("Unknown Data"); }
                    }
                    dojo.query("#ul_ALL a").forEach(function (aNode) { on(aNode, "click", function (evt) { currentWidget.ResultsClickOut(evt); }); });
                    dojo.query("#ul_SPN a").forEach(function (aNode) { on(aNode, "click", function (evt) { currentWidget.ResultsClickOut(evt); }); });
                    dojo.query("#ul_AQ a").forEach(function (aNode) { on(aNode, "click", function (evt) { currentWidget.ResultsClickOut(evt); }); });
                    dojo.query("#ul_LW a").forEach(function (aNode) { on(aNode, "click", function (evt) { currentWidget.ResultsClickOut(evt); }); });
                    dojo.query("#ul_OC a").forEach(function (aNode) { on(aNode, "click", function (evt) { currentWidget.ResultsClickOut(evt); }); });
                    dojo.query("#ul_BW a").forEach(function (aNode) { on(aNode, "click", function (evt) { currentWidget.ResultsClickOut(evt); }); });
                } catch (e) {
                    console.log("[TaskExecutes] failed: " + e);
                }
            },
            distanceCalculation: function (FrmPoint, ToPoint, dType) {
                var currentWidget = this;
                try {
                    var distance = geometryEngine.distance(FrmPoint, ToPoint, dType);
                    return distance;
                } catch (e) {
                    console.log("[distanceCalculation] failed: " + e);
                }
            },
            ResultsClickOut: function (evt) {
                var currentWidget = this;
                try {

                    currentWidget.ClearSelectedPointGraphics();
                    // First create a point geometry
                    var point = {
                        type: "point",  // autocasts as new Point()
                        longitude: -71.2643,
                        latitude: 42.0909
                    };
                    var pA = JSON.parse(evt.currentTarget.dataset.attributes);
                    var pG = JSON.parse(evt.currentTarget.dataset.geometry);
                    pG["type"] = "point";
                    var popupTemplate = {
                        // autocasts as new PopupTemplate()
                        title: "{" + currentWidget.Gconfig.InfoWindowHeader + "}",
                        content: infoContent
                    }
                    // Create a symbol for drawing the point
                    //var markerSymbol = {
                    //    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                    //    color: [226, 119, 40, 1],
                    //    size: 1
                    //};
                    var markerSymbol = {
                        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                        url: "images/loader_Point.gif",
                        width: "64px",
                        height: "64px"
                    };
                    // Create a graphic and add the geometry and symbol to it
                    var pointGraphic = new Graphic({
                        geometry: pG,
                        attributes: pA,
                        popupTemplate: popupTemplate,
                        symbol: markerSymbol
                    });

                    currentWidget.thisSeletedPointGraphicLayer.add(pointGraphic);

                    currentWidget.Gconfig.activeView.popup.features = [pointGraphic];
                    currentWidget.Gconfig.activeView.popup.selectedFeatureIndex = 0;
                    currentWidget.Gconfig.activeView.popup.location = pG;
                    currentWidget.Gconfig.activeView.popup.visible = true;
                    // go to the given point
                    currentWidget.Gconfig.activeView.goTo(pointGraphic);

                    currentWidget.Gconfig.SearchPointer = pG.x + "," + pG.y;
                    setTimeout(function () {
                        var ext = configOptions.Global.activeView.extent;
                        var extary = ext.xmin + "," + ext.ymin + "," + ext.xmax + "," + ext.ymax;
                        currentWidget.Gconfig.SearchExtent = extary;
                    }, 10);

                } catch (e) {
                    console.log("[ResultsClickOut] failed: " + e);
                }
            },
            ClearSelectedPointGraphics: function () {
                var currentWidget = this;
                try {
                    currentWidget.thisSeletedPointGraphicLayer.graphics.removeAll();
                    currentWidget.Gconfig.activeView.popup.visible = false;
                } catch (e) {
                    console.log("[ClearSelectedPointGraphics] failed: " + e);
                }
            },
            ShowRoute: function (FrmPoint, ToPoint) {
                var currentWidget = this;
                try {
                    currentWidget.thisRouteParams.stops.features = [];
                    currentWidget.thisRouteParams.stops.features[0] = new Graphic(FrmPoint, null);
                    currentWidget.thisRouteParams.stops.features[1] = new Graphic(ToPoint, null);

                    currentWidget.thisRouteTask.solve(currentWidget.thisRouteParams)
                        .then(function (res) { debugger; }, function (er) { debugger; });

                } catch (e) {
                    console.log("[ShowRoute] failed: " + e);
                }
            },
            PrepareRouteTask: function () {
                var currentWidget = this;
                try {
                    currentWidget.thisRouteTask = new RouteTask(currentWidget.Gconfig.RouteServiceURL);

                    currentWidget.thisRouteParams = new RouteParameters();
                    currentWidget.thisRouteParams.stops = new FeatureSet();
                    currentWidget.thisRouteParams.returnRoutes = false;
                    currentWidget.thisRouteParams.returnDirections = true;
                    currentWidget.thisRouteParams.directionsLengthUnits = currentWidget.Oconfig.DistanceType;//units.MILES;
                    currentWidget.thisRouteParams.outSpatialReference = currentWidget.Gconfig.activeView.spatialReference;

                    currentWidget.thisRouteLayer = new GraphicsLayer();
                    currentWidget.thisRouteLayer.id = currentWidget.Oconfig.routeLayerId;
                    currentWidget.map.add(currentWidget.thisRouteLayer);

                    currentWidget.thisRouteSymbol = new SimpleLineSymbol();
                    currentWidget.thisRouteSymbol.color = new Color(currentWidget.Oconfig.RouteColor);
                    currentWidget.thisRouteSymbol.width = currentWidget.Oconfig.RouteWidth;

                } catch (e) {
                    console.log("[TaskExecutes] failed: " + e);
                }
            },
            ShowRouteHandler: function () {
                var currentWidget = this;
                try {

                } catch (e) {
                    console.log("[ShowRouteHandler] failed: " + e);
                }
            },
            ErrorRouteHandler: function () {
                var currentWidget = this;
                try {

                } catch (e) {
                    console.log("[ErrorRouteHandler] failed: " + e);
                }
            },
            // Below function use to activate the button functionalaties
            // connections/subscriptions will be cleaned up during the destroy() lifecycle phase
            destroy: function () {
                this.inherited(arguments);
            },// show widget
            show: function () {
                this.set("visible", true);
            },
            // hide widget
            hide: function () {
                this.set("visible", false);
            },
        });
        return IdentifyQuerywidget;
    });