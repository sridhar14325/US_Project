define(["dojo/dom", "dojo/on", "dojo/topic",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "esri/tasks/support/Query",
    "esri/tasks/RouteTask", "esri/tasks/support/RouteParameters",
    "dojo/text!widgets/IdentifyQuery/templates/IdentifyQuery.html"],
    function (dom, on, topic, declare, _WidgetBase, _TemplatedMixin,
        IdentifyTask, IdentifyParameters, Query,
        RouteTask, RouteParameters,
        template) {

        var IdentifyQuerywidget = declare("widgets.IdentifyQuery", [_WidgetBase, _TemplatedMixin], {
            //return declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
            // Our template - important!
            templateString: template,
            map: null,
            //theme: "HomeButton",
            //baseClass: "Navigation",
            thisIdentifyTask: null,

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
                    var identyForms = new IdentifyParameters();
                    identyForms.geometry = inputqry;
                    identyForms.layerIds = currentWidget.Pconfig.MapService.SubLayers;
                    identyForms.tolerance = 3;
                    identyForms.mapExtent = configOptions.Global.activeView.extent;

                    currentWidget.thisIdentifyTask.execute(identyForms)
                        .then(function (res) { currentWidget.TaskExecutes(res); }, function (er) { console.log(er); });
                } catch (e) {
                    console.log("[executeIdentificationTsk] failed: " + e);
                }
            },
            TaskExecutes: function () {
                var currentWidget = this;
                try {

                } catch (e) {
                    console.log("[TaskExecutes] failed: " + e);
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