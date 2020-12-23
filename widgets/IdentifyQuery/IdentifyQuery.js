define(["dojo/dom", "dojo/on", "dojo/topic",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/geometry/geometryEngine",
    "esri/geometry/SpatialReference", "esri/geometry/projection", "esri/geometry/support/webMercatorUtils",
    "esri/symbols/SimpleLineSymbol", "esri/Graphic",
    "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "esri/tasks/support/Query",
    "esri/tasks/RouteTask", "esri/tasks/support/RouteParameters", "esri/tasks/support/FeatureSet",
    "esri/layers/GraphicsLayer",
    "dojo/text!widgets/IdentifyQuery/templates/IdentifyQuery.html"],
    function (dom, on, topic, declare, _WidgetBase, _TemplatedMixin,
        geometryEngine,
        SpatialReference, Projection, webMercatorUtils,
        SimpleLineSymbol, Graphic,
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
                } catch (e) {
                    console.log(e);
                }

            },
            startup: function () {
                var currentWidget = this;
                try {
                    currentWidget.PrepareRouteTask();
                    currentWidget.PrepareIdentificationTask();
                    topic.subscribe("Search-IdentifyQuery/inputqry", function (qry) { currentWidget.executeIdentificationTask(qry); });
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
                    var cGeometry = webMercatorUtils.webMercatorToGeographic(inputqry);

                    var bufferGeometry = geometryEngine.geodesicBuffer(cGeometry, currentWidget.Oconfig.BufferDistance, currentWidget.Oconfig.DistanceType);

                    var identyForms = new IdentifyParameters();
                    identyForms.geometry = bufferGeometry;
                    identyForms.layerIds = currentWidget.Pconfig.MapService.SubLayers;
                    identyForms.tolerance = 3;
                    identyForms.mapExtent = configOptions.Global.activeView.extent;
                    identyForms.returnGeometry = false;

                    currentWidget.thisIdentifyTask.execute(identyForms)
                        .then(function (res) { currentWidget.iTaskExecutes(inputqry, res, currentWidget.Oconfig.DistanceType); }, function (er) { console.log(er); });
                } catch (e) {
                    console.log("[executeIdentificationTsk] failed: " + e);
                }
            },
            iTaskExecutes: function (FromPoint, iFLayers, dType) {
                var currentWidget = this;
                try {
                    for (var i = 0; i < length; i++) {
                        currentWidget.distanceCalculation(FromPoint, "", dType);
                    }
                } catch (e) {
                    console.log("[TaskExecutes] failed: " + e);
                }
            },
            distanceCalculation: function (FrmPoint, ToPoint, dType) {
                var currentWidget = this;
                try {
                    var distance = geometryEngine.distance(FrmPoint, ToPoint, dType);
                } catch (e) {
                    console.log("[distanceCalculation] failed: " + e);
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
                    currentWidget.thisRouteParams.directionsLengthUnits = esri.Units.MILES;
                    currentWidget.thisRouteParams.outSpatialReference = currentWidget.Gconfig.activeView.spatialReference;

                    currentWidget.thisRouteLayer = new GraphicsLayer();
                    currentWidget.thisRouteLayer.id = currentWidget.Oconfig.routeLayerId;
                    currentWidget.map.add(currentWidget.thisRouteLayer);

                    currentWidget.thisRouteSymbol = new SimpleLineSymbol();
                    currentWidget.thisRouteSymbol.color(currentWidget.Oconfig.RouteColor);
                    currentWidget.thisRouteSymbol.width(currentWidget.Oconfig.RouteWidth);

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