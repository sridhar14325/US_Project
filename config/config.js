var PortUrl = "", instanse = "", AppPath = "", RestServices = "/server/rest/services/";
var Env = ["Deve", "Test", "Stage", "Prod"];//Enveronment.
var AppEnv = "Deve";//this for set the deployment enveronment.
if (AppEnv == "Deve") { PortUrl = "https://www.arcgis.com"; instanse = "arcgis"; AppPath = window.location.origin; }
else if (AppEnv == "Test") { PortUrl = ""; instanse = "portal"; AppPath = window.location.protocol + window.location.host; }
else if (AppEnv == "Stage") { PortUrl = ""; instanse = "portal"; AppPath = window.location.protocol + window.location.host; }
else if (AppEnv == "Prod") { PortUrl = ""; instanse = "portal"; AppPath = window.location.protocol + window.location.host; }

configOptions = {

    Global: {
        currentMap: null,
        container: "viewDiv",
        mapView: null,
        sceneView: null,
        activeView: null,
        // ------------------------------------------------------------------------------------------------------------------------
        // GENERAL SETTINGS
        // ------------------------------------------------------------------------------------------------------------------------
        // Set application title.
        ApplicationName: "Environmental Public Notices",

        // Set application icon path.
        ApplicationIcon: "images/publicNotice_art.png",

        // URL to proxy program
        ProxyURL: "https://gis.dhec.sc.gov/proxy40/proxy.ashx",
        // Initial map extent. Use comma (,) to separate values and don't delete the last comma.
        DefaultExtent: "-9454742.6334016, 3757687.37008406, -8547171.46647788, 4244429.44843421",
        ApplicationBaseMap: "topo",

        // ------------------------------------------------------------------------------------------------------------------------
        // INFO-POPUP SETTINGS
        // ------------------------------------------------------------------------------------------------------------------------
        // Info-popup is a popup dialog that gets displayed on selecting a feature

        //Field for Displaying the features as info window header.
        InfoWindowHeader: "SiteName",
        // Set the content to be displayed on the info-Popup. Define labels, field values, field types and field formats.
        InfoPopupFieldsCollection: [{
            DisplayText: "Applicant:",
            FieldName: "Applicant"
        }, {
            DisplayText: "Notice Type:",
            FieldName: "Title"
        }, {
            DisplayText: "Longitude:",
            FieldName: "Longitude"
        }, {
            DisplayText: "Latitude:",
            FieldName: "Latitude"
        }, {
            DisplayText: "Location Accuracy:",
            FieldName: "Accuracy"
        }, {
            DisplayText: "Notice Location:",
            FieldName: "Location"
        }, {
            DisplayText: "Start Date:",
            FieldName: "Start_txt"
        }, {
            DisplayText: "End Date:",
            FieldName: "End_txt"
            //}, {
            //	DisplayText: "Comment End Date:",
            //   FieldName: "CommentEnd_txt" 
        }, {
            DisplayText: "More Info:",
            FieldName: "URL"
        }],
        // Set size of the info-Popup - select maximum height and width in pixels.
        //minimum height should be 200 for the info-popup in pixels
        InfoPopupHeight: 280,

        //minimum width should be 300 for the info-popup in pixels
        InfoPopupWidth: 350,

        // Set string value to be shown for null or blank values.
        ShowNullValueAs: "",

        // ------------------------------------------------------------------------------------------------------------------------
        // GEOMETRY SERVICE SETTINGS
        // ------------------------------------------------------------------------------------------------------------------------
        // Set geometry service URL.
        GeometryService: "https://gis.dhec.sc.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer",

    },
    widgets: {
        Navigation: {
            id: "Navigationdiv",
            options: {
            }
        },
        BaseMapGallery: {
            id: "Widget_BasemapGallery",
            options: {
                BaseMapLayers: [{
                    Key: "topoMap",
                    ThumbnailSource: AppPath + "/images/Topographic.jpg",
                    Name: "Topographic",
                    MapURL: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
                }, {
                    Key: "streets",
                    ThumbnailSource: AppPath + "/images/streets.png",
                    Name: "Streets",
                    MapURL: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"
                }, {
                    Key: "natgeo",
                    ThumbnailSource: AppPath + "/images/nationalgeo.png",
                    Name: "Nat'l Geographic",
                    MapURL: "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer"
                }, {

                    Key: "imageryMap",
                    ThumbnailSource: AppPath + "/images/imagery.jpg",
                    Name: "Imagery",
                    MapURL: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
                }],
            }
        },
        Locator: {
            // ------------------------------------------------------------------------------------------------------------------------
            // ADDRESS SEARCH SETTINGS
            // ------------------------------------------------------------------------------------------------------------------------
            // Set Locator service URL.

            id: "Widget_SearchLocator",
            options: {
                LocatorSettings: {
                    LocatorMarkupSymbolPath: "images/RedPushpin.png", // Set pushpin image path.
                    MarkupSymbolSize: {
                        width: 25,
                        height: 25
                    },
                    Locators: [{
                        DisplayText: "Search Address", //Set placeholder text
                        DefaultValue: "2600 Bull St. Columbia, SC 29201", // Set default address to search.
                        LocatorParameters: ["SingleLine"], // Set Locator fields (fields to be used for searching).
                        LocatorURL: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
                        CandidateFields: "Loc_name, Score, Match_addr", //Set which fields are returned in results
                        DisplayField: "${Match_addr}", //Set which field from results is displayed
                        AddressMatchScore: 80, //Set minimum score to be considered a match
                        LocatorFieldName: 'Loc_name', //The returned field which specifies match type (specific locator within composite)
                        LocatorFieldValues: ["USA.StreetName", "USA.PointAddress", "USA.StreetAddress", "USA.POI", "World"] //List of acceptable individual locators (within composite)
                    }]
                },
            }
        }

    }
};