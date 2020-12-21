define(["dojo/dom", "dojo/on", "dojo/topic",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/widgets/Locate", "esri/Graphic", "esri/tasks/Locator", "esri/geometry/Point",
    "esri/geometry/SpatialReference", "esri/geometry/projection", "esri/geometry/support/webMercatorUtils",
    "dojo/text!widgets/Locator/templates/Locator.html",
    //"xstyle/css!widgets/Querries/css/Querries.css"
],
    function (dom, on, topic, declare, _WidgetBase, _TemplatedMixin, Locate, Graphic, Locator, Point,
        SpatialReference, Projection, webMercatorUtils,
        template) {

        var Locatorwidget = declare("widgets.Locator", [_WidgetBase, _TemplatedMixin], {
            //return declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
            // Our template - important!
            templateString: template,
            map: null,
            //theme: "HomeButton",
            //baseClass: "Navigation",
            thisGPSLocate: null,
            thisAddressLocator: null,


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
                    currentWidget.PrepareGPSLocator();
                    currentWidget.PrepareAddressLocate();
                    currentWidget.PrepareMapClick();
                    dom.byId("locatorabtn").onclick = function () {
                        currentWidget.thisGPSLocate.locate();
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            PrepareAddressLocate: function () {
                var currentWidget = this;
                try {
                    currentWidget.thisAddressLocator = new Locator({ url: currentWidget.Pconfig.LocatorSettings.Locators[0]["LocatorURL"] });
                } catch (e) {
                    console.log("[PrepareAddressLocate] failed: " + e);
                }
            },
            PrepareGPSLocator: function () {
                var currentWidget = this;
                try {
                    var settings = currentWidget.Pconfig.LocatorSettings;
                    currentWidget.thisGPSLocate = new Locate({
                        view: currentWidget.Gconfig.activeView,   // Attaches the Locate button to the view
                        graphic: new Graphic({
                            symbol: {
                                type: "picture-marker", url: currentWidget.Pconfig.LocatorSettings.LocatorMarkupSymbolPath,
                                width: currentWidget.Pconfig.LocatorSettings.MarkupSymbolSize.width + "px",
                                height: currentWidget.Pconfig.LocatorSettings.MarkupSymbolSize.height + "px"
                            }  // overwrites the default symbol used for the
                            // graphic placed at the location of the user when found
                        })
                    });
                    currentWidget.thisGPSLocate.on("locate", function (locateEvent) {
                        var mapPoint = new Point({ latitude: locateEvent.position.coords.latitude, longitude: locateEvent.position.coords.longitude });//, new SpatialReference({ wkid: 4326 })
                        //var cMapPoint = Projection.project(mapPoint, currentWidget.Gconfig.activeView.spatialReference);
                        var cMapPoint = webMercatorUtils.geographicToWebMercator(mapPoint);
                        currentWidget.thisAddressLocator.locationToAddress({ location: cMapPoint }, 100)
                            .then(function (res) { currentWidget.LocateLocator(res); },
                            function (er) { console.log(er); });
                    });

                } catch (e) {
                    console.log("[PrepareGPSLocator] failed: " + e);
                }
            },
            PrepareMapClick: function () {
                var currentWidget = this;
                try {
                    currentWidget.Gconfig.activeView.on("click", function (evt) {
                        var mapPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, currentWidget.Gconfig.activeView.spatialReference);
                        currentWidget.thisAddressLocator.locationToAddress({ location: mapPoint }, 100)
                            .then(function (res) { currentWidget.LocateLocator(res); },
                            function (er) { console.log(er); });
                    });
                } catch (e) {
                    console.log("[PrepareMapClick] failed: " + e);
                }
            },
            LocateLocator: function (evt) {
                var currentWidget = this;
                try {
                    debugger;
                } catch (e) {
                    console.log("[LocateLocator] failed: " + e);
                }
            },
            // Below function use to activate the button functionalaties
            // connections/subscriptions will be cleaned up during the destroy() lifecycle phase
            destroy: function () {
                this.inherited(arguments);
                var currentWidget = this;
                currentWidget.thisGPSLocate.graphic.layer.graphics.removeAll();
            },// show widget
            show: function () {
                this.set("visible", true);
            },
            // hide widget
            hide: function () {
                this.set("visible", false);
            },
        });
        return Locatorwidget;
    });