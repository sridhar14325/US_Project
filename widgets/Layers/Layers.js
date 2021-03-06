﻿define(["dojo/dom", "dojo/on", "dojo/topic", "dojo/mouse",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/layers/MapImageLayer", "esri/layers/FeatureLayer", "esri/tasks/support/Query", "esri/PopupTemplate",
    "dojo/text!widgets/Layers/templates/Layers.html"],
    function (dom, on, topic, mouse, declare, _WidgetBase, _TemplatedMixin,
        MapImageLayer, FeatureLayer, Query, PopupTemplate,
        template) {

        var Layerswidget = declare("widgets.Layers", [_WidgetBase, _TemplatedMixin], {
            //return declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
            // Our template - important!
            templateString: template,
            map: null,
            //theme: "HomeButton",
            //baseClass: "Navigation",


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
                    currentWidget.LayersAddToMap();
                } catch (e) {
                    console.log(e);
                }
            },
            LayersAddToMap: function () {
                var currentWidget = this;
                try {
                    var servSet = currentWidget.Pconfig.MapService;
                    var popuptemplate = new PopupTemplate("Location", "Street: ${ADDRESS}");

                    var sublayers = [
                        {
                            id: 5,
                            visible: servSet.SubLayerVisibiligy["5"],
                            popupTemplate: {
                                title: "{SiteName}",
                                outFields: ["*"],
                                content: infoContent
                            }
                        }, {
                            id: 4,
                            visible: servSet.SubLayerVisibiligy["4"],
                            popupEnabled: true,
                            // popupTemplate: popuptemplate
                            popupTemplate: {
                                title: "{SiteName}",
                                outFields: ["*"],
                                content: infoContent
                            }
                        }, {
                            id: 3,
                            visible: servSet.SubLayerVisibiligy["3"],
                            popupEnabled: true,
                            // popupTemplate: popuptemplate
                            popupTemplate: {
                                title: "{SiteName}",
                                outFields: ["*"],
                                content: infoContent
                            }
                        }, {
                            id: 2,
                            visible: servSet.SubLayerVisibiligy["2"],
                            popupEnabled: true,
                            // popupTemplate: popuptemplate
                            popupTemplate: {
                                title: "{SiteName}",
                                outFields: ["*"],
                                content: infoContent
                            }
                        }, {
                            id: 1,
                            visible: servSet.SubLayerVisibiligy["1"],
                            popupEnabled: true,
                            // popupTemplate: popuptemplate
                            popupTemplate: {
                                title: "{SiteName}",
                                outFields: ["*"],
                                content: infoContent
                            }
                        }, {
                            id: 0,
                            visible: servSet.SubLayerVisibiligy["0"],
                            popupEnabled: true,
                            // popupTemplate: popuptemplate
                            popupTemplate: {
                                title: "{SiteName}",
                                outFields: ["*"],
                                content: infoContent
                            }
                        }
                    ];
                    var Baselayer = new FeatureLayer({ url: servSet.BaseSericeUrl, id: servSet.Baseid, blendMode: "normal" });
                    var Servicelayer = new MapImageLayer({ url: servSet.ServiceUrl, id: servSet.Serviceid, sublayers: sublayers });

                    Baselayer.load().then(function (evt) {
                        var qry = new Query(); qry.where = "1=1"; qry.outFields = ["OBJECTID"]; qry.returnGeometry = true;
                        evt.queryFeatures(qry)
                            .then(function (response) {
                                var graphics = [];
                                for (var i = 0; i < response.features.length; i++) {
                                    graphics.push(response.features[i]["geometry"]);
                                }
                                topic.publish("Layers-IdentifyQuery/areapolygons", graphics);
                            });
                    }, function (er) { console.log(er); });
                    currentWidget.map.add(Baselayer);
                    currentWidget.map.add(Servicelayer);
                } catch (e) {
                    console.log("[LayersAddToMap] failed: " + e);
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
        return Layerswidget;
    });