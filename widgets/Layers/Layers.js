define(["dojo/dom", "dojo/on",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/layers/MapImageLayer",
    "dojo/text!widgets/Layers/templates/Layers.html"],
    function (dom, on, declare, _WidgetBase, _TemplatedMixin,
        MapImageLayer,
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
                            visible: servSet.SubLayerVisibiligy["4"]
                        }, {
                            id: 3,
                            visible: servSet.SubLayerVisibiligy["3"]
                        }, {
                            id: 2,
                            visible: servSet.SubLayerVisibiligy["2"]
                        }, {
                            id: 1,
                            visible: servSet.SubLayerVisibiligy["1"]
                        }, {
                            id: 0,
                            visible: servSet.SubLayerVisibiligy["0"]
                        }
                    ];
                    var layer = new MapImageLayer({
                        url: servSet.ServiceUrl, id: servSet.id
                    });

                    layer.loadAll()
                        .catch(function (error) {
                            console.log("All loading Failed");
                            // Ignore any failed resources
                        })
                        .then(function () {
                            console.log("All loaded Success");
                        });
                    currentWidget.map.add(layer);
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