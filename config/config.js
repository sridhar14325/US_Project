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

        // ------------------------------------------------------------------------------------------------------------------------
        // DRIVING DIRECTIONS SETTINGS
        // ------------------------------------------------------------------------------------------------------------------------
        // Set URL for routing service (network analyst).
        RouteServiceURL: "https://gis.dhec.sc.gov/arcgis/rest/services/protected/Network/NAServer",
    },
    widgets: {
        Help: {
            id: "Widget_Help",
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
            id: "Widget_SearchLocator",
            options: {
                LocatorSettings: {
                    //Used below Search widget for inputs
                },
            }
        },
        Search: {
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
                        NameofSearch: "Search Address",//Set name of search selection
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
        },
        //Operational layer collection.
        Layers: {
            id: "Widget_SearchLocator",
            options: {
                MapService: {
                    BaseSericeUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/Baselayers/Baselayers/MapServer/0",
                    Baseid: "PublicNoticeLive_BaseService",
                    ServiceUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/environment/Public_Notice/MapServer",
                    Serviceid: "PublicNoticeLive_MapService",
                    SubLayers: [0, 5, 1, 2, 3, 4],
                    SubLayerIdKeys: { ALL: 0, STATEWIDE: 5, AIR: 1, BLWM: 2, OCRM: 3, WATER: 4 },
                    SubLayerVisibiligy: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: true }
                },
                Services: {
                    ALL: {
                        Name: "All Notice Types",
                        Image: "images/publicNotice_art.png",
                        HasRendererImage: false,
                        ServiceUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/environment/Public_Notice/MapServer/0",
                        distance: 4,
                        FieldNames: [{
                            FieldName: "SiteName",
                            //WA edits-------add FieldID to allow for miles to not to be displayed for statewide points
                            FieldId: "Group_"
                        }],
                        LayerVisibility: true,
                        ShowBeyondBuffer: true
                    },
                    STATEWIDE: {
                        Name: "Statewide Public Notice",
                        Image: "images/STATE.png",
                        HasRendererImage: false,
                        ServiceUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/environment/Public_Notice/MapServer/5",
                        distance: 4,
                        FieldNames: [{
                            FieldName: "SiteName",
                            //WA edits-------add FieldID to allow for miles to not be displayed for statewide points
                            FieldId: "Group_"
                        }],
                        LayerVisibility: true,
                        ShowBeyondBuffer: true
                    },
                    AIR: {
                        Name: "Bureau of Air Quality",
                        Image: "images/AQ.png",
                        HasRendererImage: false,
                        ServiceUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/environment/Public_Notice/MapServer/1",
                        distance: 4,
                        FieldNames: [{
                            FieldName: "SiteName",
                            //WA edits-------add FieldID to allow for miles to not be displayed for statewide points
                            FieldId: "Group_"
                        }],
                        LayerVisibility: true,
                        ShowBeyondBuffer: true
                    },
                    BLWM: {
                        Name: "Bureau of Land and Waste Management",
                        Image: "images/LW.png",
                        HasRendererImage: false,
                        ServiceUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/environment/Public_Notice/MapServer/2",
                        distance: 4,
                        FieldNames: [{
                            FieldName: "SiteName",
                            //WA edits-------add FieldID to allow for miles to not be displayed for statewide points
                            FieldId: "Group_"
                        }],
                        LayerVisibility: true,
                        ShowBeyondBuffer: true
                    },
                    OCRM: {
                        Name: "Division of Ocean and Coastal Resource Management",
                        Image: "images/OC.png",
                        HasRendererImage: false,
                        ServiceUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/environment/Public_Notice/MapServer/3",
                        distance: 4,
                        FieldNames: [{
                            FieldName: "SiteName",
                            //WA edits-------add FieldID to allow for miles to not be displayed for statewide points
                            FieldId: "Group_"
                        }],
                        LayerVisibility: true,
                        ShowBeyondBuffer: true
                    },
                    WATER: {
                        Name: "Bureau of Water",
                        Image: "images/BW.png",
                        HasRendererImage: false,
                        ServiceUrl: "https://gis.dhec.sc.gov/arcgis/rest/services/environment/Public_Notice/MapServer/4",
                        distance: 4,
                        FieldNames: [{
                            FieldName: "SiteName",
                            //WA edits-------add FieldID to allow for miles to not be displayed for statewide points
                            FieldId: "Group_"
                        }],
                        LayerVisibility: true,
                        ShowBeyondBuffer: true
                    }
                }
            }
        },
        IdentifyQuery: {
            id: "Widget_IdentifyQuery",
            options: {
                //used above Layers widget in this options
            },
            otherOptions: {
                BufferDistance: 4,
                DistanceType: "miles",// available calculation types --> "meters"|"feet"|"kilometers"|"miles"|"nautical-miles"|"yards"
                routeLayerId: "RoutGraphicLayer",
                RouteColor: "#CC6633",
                RouteWidth: 4,
                SearchforDirections: false,
            }
        }

    }
};