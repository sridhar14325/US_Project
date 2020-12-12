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
            }
        },
        Locators: {
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