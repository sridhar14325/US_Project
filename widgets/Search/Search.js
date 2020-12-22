define(["dojo/dom", "dojo/on", "dojo/topic",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "esri/widgets/Search", "esri/tasks/Locator", "esri/Graphic",
    "dojo/text!widgets/Search/templates/Search.html"
    //"xstyle/css!widgets/Navigation/css/Navigation.css"
],
    function (dom, on, topic, declare, _WidgetBase, _TemplatedMixin,
        Search, Locator, Graphic,
        template) {

        var Searchwidget = declare("widgets.Search", [_WidgetBase, _TemplatedMixin], {
            //return declare("widgets.Navigation", [_WidgetBase, _TemplatedMixin], {
            // Our template - important!
            templateString: template,
            map: null,
            //theme: "HomeButton",
            thisSearch: null,

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
                    currentWidget.PrepareSearchUI();
                    topic.subscribe("Locator-Search/inputqry", function (qry) { currentWidget.thisSearch.search(qry); });
                } catch (e) {
                    console.log(e);
                }
            },
            PrepareSearchUI: function () {
                var currentWidget = this;
                try {
                    var settings = currentWidget.Pconfig.LocatorSettings;
                    const sources = [
                        {
                            locator: new Locator({ url: settings.Locators[0]["LocatorURL"] }),
                            singleLineFieldName: settings.Locators[0]["LocatorParameters"][0],
                            LocatorFieldValues: settings.Locators[0]["LocatorFieldValues"],
                            name: settings.Locators[0]["NameofSearch"],
                            placeholder: settings.Locators[0]["DisplayText"],
                            maxResults: 6,
                            maxSuggestions: 6,
                            suggestionsEnabled: true,
                            minSuggestCharacters: 0,
                            resultSymbol: {
                                type: "picture-marker", url: currentWidget.Pconfig.LocatorSettings.LocatorMarkupSymbolPath,
                                width: currentWidget.Pconfig.LocatorSettings.MarkupSymbolSize.width + "px",
                                height: currentWidget.Pconfig.LocatorSettings.MarkupSymbolSize.height + "px",
                                xoffset: 0,
                                yoffset: 0
                            }
                        }];
                    currentWidget.thisSearch = new Search({
                        view: currentWidget.Gconfig.activeView,
                        sources: [],
                        searchTerm: settings.Locators[0]["DefaultValue"],
                        includeDefaultSources: false,
                        searchAllEnabled: false,
                        container: SearchInput
                    });
                    currentWidget.thisSearch.sources = sources;
                    //on(currentWidget.thisSearch, "search-complete", function (res) { debugger; });
                    on(currentWidget.thisSearch, "select-result", function (res) { currentWidget.SearchResultsDisplay(res); });
                } catch (e) {
                    console.log("[PrepareSearchUI] failed: " + e);
                }
            },
            SearchResultsDisplay: function (qry) {
                var currentWidget = this;
                try {
                    //debugger;
                    topic.publish("Search-IdentifyQuery/inputqry", qry.result.feature.get("geometry"));
                } catch (e) {
                    console.log("[SearchResultsDisplay] failed: " + e);
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
        return Searchwidget;
    });