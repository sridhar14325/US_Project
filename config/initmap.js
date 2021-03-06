﻿require(["dojo/parser", "dojo/topic", "esri/Map", "esri/views/MapView", "esri/views/SceneView", "esri/geometry/Extent",
    "widgets/BaseMapGallery/BaseMapGallery", "widgets/Locator/Locator", "widgets/Search/Search", "widgets/Layers/Layers",
    "widgets/Help/Help", "widgets/IdentifyQuery/IdentifyQuery", "widgets/Share/Share",
    "esri/geometry/SpatialReference", "esri/geometry/Point", "esri/widgets/Compass",
    "dojo/domReady!"], function (Parser, topic, Map, MapView, SceneView, Extent,
        BaseMapGallery, Cust_Locator, Cust_Search, Cust_Layers, Cust_Help, Cust_IdentifyQuery, Cust_Share,
        SpatialReference, Point, Compass) {

        var map = new Map({ basemap: configOptions.Global.ApplicationBaseMap });
        configOptions.Global.currentMap = map;


        function initializeWidgets() {
            //Installing BaseMap Gallery widget
            var basemampgallery = new BaseMapGallery({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.BaseMapGallery.options
            }, configOptions.widgets.BaseMapGallery.id);
            basemampgallery.startup();

            //Installing Layers widget
            var cust_layers = new Cust_Layers({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Layers.options
            });
            cust_layers.startup();

            //Installing Locator widget
            var cust_locator = new Cust_Locator({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Search.options
            });
            cust_locator.startup();

            //Installing Search widget
            var cust_Search = new Cust_Search({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Search.options
            });
            cust_Search.startup();

            //Installing Search widget
            var cust_help = new Cust_Help({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Help.options
            }, configOptions.widgets.Help.id);
            cust_help.startup();

            //Installing IdentifyQuery widget for get qury bottom inputs
            var cust_identifyQuery = new Cust_IdentifyQuery({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Layers.options,
                Oconfig: configOptions.widgets.IdentifyQuery.otherOptions
            });
            cust_identifyQuery.startup();

            //Installing IdentifyQuery widget for get qury bottom inputs
            var cust_share = new Cust_Share({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Share.options,
            }, configOptions.widgets.Share.id);
            cust_share.startup();

        };
        // Set the extent on the view
        var ext = configOptions.Global.DefaultExtent.split(",");
        var mapextent = new Extent(parseFloat(ext[0]), parseFloat(ext[1]), parseFloat(ext[2]), parseFloat(ext[3]), new SpatialReference({ wkid: 3857 }));
        var initialViewParams = { container: "viewDiv", map: configOptions.Global.currentMap, extent: mapextent }
        // create 2D view and and set active
        configOptions.Global.mapView = createView(initialViewParams, "2d");
        configOptions.Global.mapView.map = map;
        configOptions.Global.activeView = configOptions.Global.mapView;
        configOptions.Global.activeView.when(function (result) {
            //Installing widgets after loading the map view
            initializeWidgets();
            loadSharableView();
        }, function (er) { console.log(er); });


        var compass = new Compass({
            view: configOptions.Global.activeView
        });
        configOptions.Global.activeView.ui.add(compass, "top-left");
        function loadSharableView() {
            //Read a page's GET URL variables and return them as an associative array.
            var parms = {}, hash;
            var urlparms = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < urlparms.length; i++) { keyval = urlparms[i].split('='); parms[keyval[0]] = keyval[1]; }
            if (parms["extent"] && parms["locator"]) {
                var pointer = parms["locator"].split(",");
                var mapPoint = new Point(parseFloat(pointer[0]), parseFloat(pointer[1]), new SpatialReference({ wkid: 3857 }));
                topic.publish("initmap-Search/inputqry", mapPoint);
                var extval = parms["extent"].split(",");
                var mapextent = new Extent(parseFloat(extval[0]), parseFloat(extval[1]), parseFloat(extval[2]), parseFloat(extval[3]), new SpatialReference({ wkid: 3857 }));
                configOptions.Global.activeView.extent = mapextent;
            }
            else if (parms["extent"]) {
                var extval = parms["extent"].split(",");
                var mapextent = new Extent(parseFloat(extval[0]), parseFloat(extval[1]), parseFloat(extval[2]), parseFloat(extval[3]), new SpatialReference({ wkid: 3857 }));
                configOptions.Global.activeView.extent = mapextent;
            }
        }
        //xmin, ymin, xmax, ymax

        /*
       // create 3D view, won't initialize until container is set
       initialViewParams.container = null;
       initialViewParams.map = map;
       configOptions.Global.sceneView = createView(initialViewParams, "3d");
      
       var switchButton = document.getElementById("SwitchView");
       // switch the view between 2D and 3D each time the button is clicked
       switchButton.addEventListener("click", function () {
           switchView();
       });
      
       // Switches the view from 2D to 3D and vice versa
       function switchView() {
           var is3D = configOptions.Global.activeView.type === "3d";
           var activeViewpoint = configOptions.Global.activeView.viewpoint.clone();

           // remove the reference to the container for the previous view
           configOptions.Global.activeView.container = null;

           if (is3D) {
               // if the input view is a SceneView, set the viewpoint on the
               // mapView instance. Set the container on the mapView and flag
               // it as the active view
               configOptions.Global.mapView.viewpoint = activeViewpoint;
               configOptions.Global.mapView.container = configOptions.Global.container;
               configOptions.Global.activeView = configOptions.Global.mapView;
               //switchButton.value = "3D";
           } else {
               configOptions.Global.sceneView.viewpoint = activeViewpoint;
               configOptions.Global.sceneView.container = configOptions.Global.container;
               configOptions.Global.activeView = configOptions.Global.sceneView;
               //switchButton.value = "2D";
           }
       }
       */
        // convenience function for creating a 2D or 3D view
        function createView(params, type) {
            var view;
            var is2D = type === "2d";
            if (is2D) {
                view = new MapView(params);
                return view;
            } else {
                view = new SceneView(params);
            }
            return view;
        }

    });
//      Gconfig(Global Configuration)   get the global configuration inputs
//      Pconfig(Private Configuration)   get own widget configuration inputs
//      Oconfig(Other Configuration)   get othre widget configuration inputs