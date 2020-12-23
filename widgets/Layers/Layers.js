define(["dojo/dom", "dojo/on", "dojo/topic",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/layers/MapImageLayer", "esri/layers/FeatureLayer",
    "dojo/text!widgets/Layers/templates/Layers.html"],
    function (dom, on, topic, declare, _WidgetBase, _TemplatedMixin,
        MapImageLayer, FeatureLayer,
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
                    var sublayers = [
                        {
                            id: 5,
                            visible: servSet.SubLayerVisibiligy["5"]
                        }, {
                            id: 4,
                            visible: servSet.SubLayerVisibiligy["4"],
                            popupEnabled: true,
                            //popupTemplate: {
                            //    title: "{COUNTY}",
                            //    content: "{POP2007} people lived in this county in 2007"
                            //}
                        }, {
                            id: 3,
                            visible: servSet.SubLayerVisibiligy["3"],
                            popupEnabled: true
                        }, {
                            id: 2,
                            visible: servSet.SubLayerVisibiligy["2"],
                            popupEnabled: true
                        }, {
                            id: 1,
                            visible: servSet.SubLayerVisibiligy["1"],
                            popupEnabled: true
                        }, {
                            id: 0,
                            visible: servSet.SubLayerVisibiligy["0"],
                            popupEnabled: true
                        }
                    ];
                    var Baselayer = new FeatureLayer({ url: servSet.BaseSericeUrl, id: servSet.Baseid });
                    var Servicelayer = new MapImageLayer({ url: servSet.ServiceUrl, id: servSet.Serviceid, sublayers: sublayers });

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