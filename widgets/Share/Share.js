define(["dojo/dom", "dojo/on", "dojo/topic",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",

    "dojo/text!widgets/Share/templates/Share.html"],
    function (dom, on, topic, declare, _WidgetBase, _TemplatedMixin,

        template) {

        var Sharewidget = declare("widgets.Share", [_WidgetBase, _TemplatedMixin], {
            //return declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
            // Our template - important!
            templateString: template,
            map: null,
            //theme: "HomeButton",
            //baseClass: "Navigation",
            SearchPointer: null,
            SearchExtent: null,

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
                    topic.subscribe("Search-Share/extent_Point", function (SearchPointer, SearchExtent) {
                        currentWidget.SearchPointer = SearchPointer;
                        currentWidget.SearchExtent = SearchExtent;
                    });
                    on(dom.byId("FaceBookSharing_btn"), "click", function () {
                        //var ed = "-9200610.567820527,3917283.426258621,-8812310.464132018,4081164.4149019597";

                    });
                } catch (e) {
                    console.log(e);
                }
            },
            _FacebookSharing: function () {
                var currentWidget = this;
                try {
                    var url = currentWidget.FormatURL();
                } catch (e) {
                    console.log("[_FacebookSharing] failed: " + e);
                }
            },
            _TwetterSharing: function () {
                var currentWidget = this;
                try {
                    var url = currentWidget.FormatURL();
                } catch (e) {
                    console.log("[_TwetterSharing] failed: " + e);
                }
            },
            _CurrentExtentSharing: function () {
                var currentWidget = this;
                try {
                    var url = currentWidget.FormatURL();
                } catch (e) {
                    console.log("[_CurrentExtentSharing] failed: " + e);
                }
            },
            _IntagramSharing: function () {
                var currentWidget = this;
                try {
                    var url = currentWidget.FormatURL();
                } catch (e) {
                    console.log("[_IntagramSharing] failed: " + e);
                }
            },
            FormatURL: function () {
                var currentWidget = this;
                try {
                    var curext = configOptions.Global.activeView.extent;
                    var extary = curext.xmin + "," + curext.ymin + "," + curext.xmax + "," + curext.ymax;
                    var ext = currentWidget.SearchExtent ? "?extent=" + currentWidget.SearchExtent : "?extent=" + extary;
                    var loc = currentWidget.SearchPointer ? "&locator=" + currentWidget.SearchPointer : "";

                    var Hashlocat = window.location.toString().split("#");
                    var queslocat = Hashlocat[0].split("?");
                    var sharedURL = queslocat + ext + loc;
                    //console.log(sharedURL);
                    return sharedURL;
                } catch (e) {
                    console.log("[FormatURL] failed: " + e);
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
        return Sharewidget;
    });