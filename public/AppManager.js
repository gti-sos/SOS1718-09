/* global angular */

angular
    .module("AppManager", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl: "AppMenu.html"
            }).when("/analytics", {
                templateUrl: "analytics.html"
            }).when("/integrations", {
                templateUrl: "integrations.html"
            }).when("/about", {
                templateUrl: "about.html"
            }).when("/integracionComun", {
                templateUrl: "integracionComun.html",
                controller:"integracionComunCtrl"
            })
            
            
            /*BALTA */
            .when("/spanUnivStats", {
                templateUrl: "../Balta/spanUnivStatsList.html",
                controller: "spanUnivStatsListCtrl"
            })
            .when("/stat/:autCommunity/:year", {
                templateUrl: "../Balta/spanUnivStatsEdit.html",
                controller: "spanUnivStatsEditCtrl"
            })
            .when("/spanUnivStatsGraphs", {
                templateUrl: "../Balta/spanUnivStatsGraphs.html",
                controller: "spanUnivStatsGraphsCtrl"
            })
            .when("/corsIntegration", {
                templateUrl: "../Balta/corsIntegration.html",
                controller: "corsIntegrationCtrl"

            })
            .when("/proxyIntegrations", {
                templateUrl: "../Balta/proxyIntegrations.html",
                controller: "proxyIntegrationsCtrl"



                /*ALVARO*/
            }).when("/spanishUniversities", {
                templateUrl: "../spanishUniversities/spanishUniversitiesList.html",
                controller: "spanishUniversitiesListCtrl"
            })
            .when("/univ/:autCommunity/:yearFund", {
                templateUrl: "../spanishUniversities/spanishUniversitiesEdit.html",
                controller: "spanishUniversitiesEditCtrl"
            })
            .when("/spanishUniversitiesGraphs", {
                templateUrl: "../spanishUniversities/spanishUniversitiesGraphs.html",
                controller: "spanishUniversitiesGraphsCtrl"

            })
            .when("/spanishUniversitiesCORS", {
                templateUrl: "../spanishUniversities/integraciones/spanishUniversitiesGraphsApiCors.html",
                controller: "spanishUniversitiesGraphsApiCorsCtrl"
            })
            .when("/spanishUniversitiesPROXY", {
                templateUrl: "../spanishUniversities/integraciones/spanishUniversitiesGraphsApiProxy.html",
                controller: "spanishUniversitiesGraphsApiProxyCtrl"
            })
            .when("/spanishUniversitiesInt1", {
                templateUrl: "../spanishUniversities/integraciones/spa_crime.html",
                controller: "spa_crimeCtrl"
            })
            .when("/spanishUniversitiesInt2", {
                templateUrl: "../spanishUniversities/integraciones/spa_students.html",
                controller: "spa_studentsCtrl"
            })
            .when("/spanishUniversitiesInt3", {
                templateUrl: "../spanishUniversities/integraciones/starWars.html",
                controller: "starWarsCtrl"
            })
            .when("/spanishUniversitiesInt4", {
                templateUrl: "../spanishUniversities/integraciones/tiempo.html",
                controller: "tiempoCtrl"
            })
            .when("/spanishUniversitiesInt5", {
                templateUrl: "../spanishUniversities/integraciones/aire.html",
                controller: "aireCtrl"
            })
            .when("/spanishUniversitiesInt6", {
                templateUrl: "../spanishUniversities/integraciones/cervezas.html",
                controller: "cervezasCtrl"
            })
            .when("/spanishUniversitiesInt7", {
                templateUrl: "../spanishUniversities/integraciones/bicis.html",
                controller: "bicisCtrl"
            })
            .when("/spanishUniversitiesInt8", {
                templateUrl: "../spanishUniversities/integraciones/nasa.html",
                controller: "nasaCtrl"
            })
            .when("/spanishUniversitiesInt9", {
                templateUrl: "../spanishUniversities/integraciones/unionEuropea.html",
                controller: "unionEuropeaCtrl"
            })
            /*RAFA*/
            .when("/openSourceContests", {
                templateUrl: "../openSourceContests/list/list.html",
                controller: "ListCtrl"
            }).when("/contest/:year/:university/:project", {
                templateUrl: "../openSourceContests/edit/edit.html",
                controller: "EditCtrl"
            }).when("/openSourceContests/graph", {
                templateUrl: "../openSourceContests/graph/graph.html",
                controller: "GraphCtrl"
            }).when("/openSourceContests/graphApi1", {
                templateUrl: "../openSourceContests/graph/graphApi1.html",
                controller: "GraphApi1Ctrl"
            }).when("/openSourceContestsPROXY/", {
                templateUrl: "../openSourceContests/graph/graphApi2.html",
                controller: "GraphApi2Ctrl"
            }).when("/openSourceContests/graph3/", {
                templateUrl: "../openSourceContests/integrations/graphApi3.html",
                controller: "GraphApi3Ctrl"
            }).when("/openSourceContests/graph4/", {
                templateUrl: "../openSourceContests/integrations/graphApi4.html",
                controller: "GraphApi4Ctrl"
            });
    });
