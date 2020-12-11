define(["dojo/dom", "dojo/on",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/widgets/BasemapGallery",
    "dojo/text!widgets/BaseMapGallery/templates/BaseMapGallery.html"
],
    function (dom, on, declare, _WidgetBase, _TemplatedMixin,
        BasemapGallery,
        template_BaseMapGallery) {

        var BaseMapGallery_widget = declare("widgets.BaseMapGallery", [_WidgetBase, _TemplatedMixin], {

            templateString: template_BaseMapGallery,
            map: null,

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
                    var basemapGallery = new BasemapGallery({
                        view: currentWidget.Gconfig.activeView,
                        container: basemapgallerydiv
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
        return BaseMapGallery_widget;
    });