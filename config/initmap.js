require(["dojo/parser", "esri/Map", "esri/views/MapView", "esri/views/SceneView", "esri/geometry/Extent",
    "widgets/BaseMapGallery/BaseMapGallery", "widgets/Locator/Locator", "widgets/Search/Search",
    "esri/geometry/SpatialReference",
    "dojo/domReady!"], function (Parser, Map, MapView, SceneView, Extent,
        BaseMapGallery, Cust_Locator, Cust_Search,
        SpatialReference) {

        var map = new Map({ basemap: configOptions.Global.ApplicationBaseMap });
        configOptions.Global.currentMap = map;

        function initializeWidgets() {
            //Installing BaseMap Gallery widget
            var basemampgallery = new BaseMapGallery({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.BaseMapGallery.options
            }, configOptions.widgets.BaseMapGallery.id);
            basemampgallery.startup();

            //Installing Locator widget
            var cust_locator = new Cust_Locator({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Locator.options
            });
            cust_locator.startup();

            //Installing Search widget
            var cust_Search = new Cust_Search({
                map: map, Gconfig: configOptions.Global,
                Pconfig: configOptions.widgets.Search.options
            });
            cust_Search.startup();

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
        }, function (er) { console.log(er); });

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
//      Gconfig(Global Configuration)  means get the global configuration inputs
//      Pconfig(Private Configuration)  means get own widget configuration inputs
//      Oconfig(Other Configuration)  means get othre widget configuration inputs