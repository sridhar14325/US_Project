define(["dojo/dom", "dojo/on",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",

    "dojo/text!widgets/Share/templates/Share.html"],
    function (dom, on, declare, _WidgetBase, _TemplatedMixin,

        template) {

        var Sharewidget = declare("widgets.Share", [_WidgetBase, _TemplatedMixin], {
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
                    on(dom.byId("v-pills-three-tab"), "click", function () {
                        //var ed = "-9200610.567820527,3917283.426258621,-8812310.464132018,4081164.4149019597";
                        var curext = configOptions.Global.activeView.extent;
                        var extary = curext.xmin + "," + curext.ymin + "," + curext.xmax + "," + curext.ymax;
                        var ext = currentWidget.Gconfig.SearchExtent ? "?extent=" + currentWidget.Gconfig.SearchExtent : "?extent=" + extary;
                        var loc = currentWidget.Gconfig.SearchPointer ? "&locator=" + currentWidget.Gconfig.SearchPointer : "";

                        var Hashlocat = window.location.toString().split("#");
                        var queslocat = Hashlocat[0].split("?");
                        var sharedURL = queslocat + ext + loc;
                        console.log(sharedURL);
                    });
                } catch (e) {
                    console.log(e);
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