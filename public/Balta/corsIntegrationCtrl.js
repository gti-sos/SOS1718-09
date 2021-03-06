/* global angular */
/* global $ */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("corsIntegrationCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var apiSpanUnivStats = "/api/v2/span-univ-stats";
    var apiCrime = "https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data";
    var apiLibraries = "https://libraries.io/api/platforms";
    var apiMarvel = "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=75b5994400a36403395f755582313fbb&hash=1951d4a03480afc3b7c19e1f6e5b89e4";
    

    $scope.return = function() {
        $location.path("/spanUnivStats");
    };


    /* CHARTS */

    /* eliminar elementos duplicados*/

    Array.prototype.unique = function(a) {
        return function() { return this.filter(a) }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });

    /*ordenar array*/

    Array.prototype.sortNumbers = function() {
        return this.sort(
            function(a, b) {
                return a - b
            }
        );
    }




    var years = [];


    /* SPANISH UNIVERSITIES STATS*/
    $http.get(apiSpanUnivStats).then(function(responseSpanUnivStats) {
        for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
            years.push(responseSpanUnivStats.data[i].year);

        }









        /*  1) CRIME STATS */

        $http.get(apiCrime).then(function(responseCrime) {
            console.log("Crime data : ", responseCrime.data);

            var totalKills = [];
            var totalEnrolledNumber = [];

            for (var i = 0; i < responseCrime.data.length; i++) {
                years.push(responseCrime.data[i].iyear);

            }

            var actualYear = 0;

            for (var i = 0; i < years.sortNumbers().unique().length; i++) {
                var yearEnrolledNumber = 0;
                var yearKillsNumber = 0;
                actualYear = years.sortNumbers().unique()[i];

                for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                    if (responseSpanUnivStats.data[j].year == actualYear) {
                        yearEnrolledNumber += responseSpanUnivStats.data[j].enrolledNumber;

                    }
                }
                for (var j = 0; j < responseCrime.data.length; j++) {
                    if (responseCrime.data[j].iyear == actualYear) {
                        yearKillsNumber += responseCrime.data[j].nkill;
                    }
                }

                totalEnrolledNumber.push([actualYear, yearEnrolledNumber]);
                totalKills.push([actualYear, yearKillsNumber]);

            }




            /*HIGHCHARTS*/


            Highcharts.chart('crimeSpanUnivStats', {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'FootballStatsApi and SpanUnivStatsApi Integration'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Years'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Data'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x} , {point.y}'
                        }
                    }
                },
                series: [{
                    name: 'EnrolledNumber',
                    color: 'rgba(223, 83, 83, .5)',
                    data: totalEnrolledNumber

                }, {
                    name: 'Kills',
                    color: 'rgba(119, 152, 191, .5)',
                    data: totalKills
                }]
            });




        });









        /* 2) LIBRARIES CHART */

        $http.get(apiLibraries).then(function(responseLibraries) {
            console.log("Libraries data : ", responseLibraries.data);
            var degreeNumber = [];
            var projectCount = [];
            var dataSeries = [];

            for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
                degreeNumber.push(responseSpanUnivStats.data[i].degree);
            }
            for (var j = 0; j < responseLibraries.data.length; j++) {
                projectCount.push(responseLibraries.data[j].project_count);
            }
            console.log(projectCount);
            console.log(degreeNumber);
            dataSeries.push(projectCount);
            dataSeries.push(degreeNumber);


            /* CHARTIST*/

            var data = {
                series: dataSeries
            };

            var options = {
                seriesBarDistance: 15
            };

            var responsiveOptions = [
                ['screen and (min-width: 641px) and (max-width: 1024px)', {
                    seriesBarDistance: 10,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value;
                        }
                    }
                }],
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value[0];
                        }
                    }
                }]
            ];

            new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
        });









        /* 3) MARVEL API */


        $http.get(apiMarvel).then(function(responseMarvel) {
            console.log("Results Marvel´s comics:", responseMarvel.data.data.results);
            var firstSecondCycleNumber = 0;
            var issueNumbers = 0;
            var masterNumber = 0;
            var seriesData = [];

            for (var i = 0; i < responseMarvel.data.data.results.length; i++) {
                issueNumbers += responseMarvel.data.data.results[i].issueNumber;
            }
            for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                firstSecondCycleNumber += responseSpanUnivStats.data[j].firstSecondCycle;
                masterNumber += responseSpanUnivStats.data[j].master;
            }

            seriesData.push(issueNumbers + 100000);
            seriesData.push(firstSecondCycleNumber);
            seriesData.push(masterNumber);


            /*CHARTIST*/

            var marvelChart = new Chartist.Pie('.ct-chart1', {
                series: seriesData,
                labels: ["MarvelApi", "MyApi-FSCycle", "MyApi-Master"]
            }, {
                donut: true,
                showLabel: true
            });

            marvelChart.on('draw', function(data) {
                if (data.type === 'slice') {
                    var pathLength = data.element._node.getTotalLength();

                    data.element.attr({
                        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                    });

                    var animationDefinition = {
                        'stroke-dashoffset': {
                            id: 'anim' + data.index,
                            dur: 1000,
                            from: -pathLength + 'px',
                            to: '0px',
                            easing: Chartist.Svg.Easing.easeOutQuint,
                            fill: 'freeze'
                        }
                    };

                    if (data.index !== 0) {
                        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                    }

                    data.element.attr({
                        'stroke-dashoffset': -pathLength + 'px'
                    });

                    data.element.animate(animationDefinition, false);
                }
            });

            marvelChart.on('created', function() {
                if (window.__anim21278907124) {
                    clearTimeout(window.__anim21278907124);
                    window.__anim21278907124 = null;
                }
                window.__anim21278907124 = setTimeout(marvelChart.update.bind(marvelChart), 10000);
            });
        });





    });
}]);
