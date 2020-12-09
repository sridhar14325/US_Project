define(["dojo/dom", "dojo/on",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    
    "dojo/text!widgets/Navigation/templates/Navigation.html"
    //"xstyle/css!widgets/Navigation/css/Navigation.css"
],
    function (dom, on, declare, _WidgetBase, _TemplatedMixin,
        
        template) {

        var Navigationwidget = declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
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
        return Navigationwidget;
    });