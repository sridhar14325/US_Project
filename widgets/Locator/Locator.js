define(["dojo/dom", "dojo/on",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/widgets/Locate", "esri/Graphic",
    "dojo/text!widgets/Locator/templates/Locator.html",
    //"xstyle/css!widgets/Querries/css/Querries.css"
],
    function (dom, on, declare, _WidgetBase, _TemplatedMixin, Locate, Graphic,
        template) {

        var Locatorwidget = declare("widgets.Locator", [_WidgetBase, _TemplatedMixin], {
            //return declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
            // Our template - important!
            templateString: template,
            map: null,
            //theme: "HomeButton",
            //baseClass: "Navigation",
            thisLocator: null,


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
                    currentWidget.PrepareLocator();
                    dom.byId("locatorabtn").onclick = function () {
                        currentWidget.thisLocator.locate();
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            PrepareLocator: function () {
                var currentWidget = this;
                try {
                    currentWidget.thisLocator = new Locate({
                        view: currentWidget.Gconfig.activeView,   // Attaches the Locate button to the view
                        graphic: new Graphic({
                            symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
                            // graphic placed at the location of the user when found
                        })
                    });
                    currentWidget.thisLocator.on("locate", function (locateEvent) {
                        currentWidget.LocateLocator(locateEvent);
                    })
                } catch (e) {
                    console.log("[PrepareLocator] failed: " + e);
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