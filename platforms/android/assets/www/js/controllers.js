//Main controller
app.controller('mainController', function appController($scope, $interval, ModelFactory) {

});

//News controllers
app.controller('newsController', function appController($scope, $rootScope, $location, $timeout, ApiServices) {
    var gotAllNews = false;
    var beginIndex = 0;
    var endIndex = 9;
    var isCallingService = false;

    var getAllNews = function(beginIndex, endIndex, reset) {
        ApiServices.getAllNews("sergioariza@outlook.com", beginIndex, endIndex).success(function(data) {
                if (data.length < (endIndex - beginIndex + 1)) {
                    gotAllNews = true;
                    $(".lastRowLabel").text("No hay más noticias");
                } else {
                    gotAllNews = false;
                    $(".lastRowLabel").text("¿Más noticias?");
                }

                if (reset) {
                    $rootScope.news = data;
                } else {
                    $rootScope.news = $rootScope.news.concat(data);
                }

                isCallingService = false;
            })
            .error(function(status, data) {
                isCallingService = false;
            });
    };

    if (!($rootScope.news)) {
        getAllNews(beginIndex, endIndex, true);
    }

    $('.scroll-content').scroll(function() {
        if ($(this).scrollTop() + $(this).innerHeight() + 5 >= this.scrollHeight) {
            if (!isCallingService && !gotAllNews) {
                console.log('Calling for more news!!!');
                beginIndex = beginIndex + 10;
                endIndex = endIndex + 10;
                isCallingService = true;
                getAllNews(beginIndex, endIndex, false);
            }
        }
    });

    $scope.doRefresh = function() {
        // if(!gotAllNews){
        console.log('Refreshing news!');
        $timeout(function() {
            beginIndex = 0;
            endIndex = 9;
            getAllNews(beginIndex, endIndex, true);
        }, 100);
        //}

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.$on('ngRepeatNewsFinished', function(ngRepeatFinishedEvent) {
        var p = $('.newsBodyContainer p');
        var divh = $('.newsBodyContainer').height();
        var index = 0;
        var totalNews = p.length;

        while (index < totalNews) {
            while (angular.element("#" + p[index].id).prop('offsetHeight') > divh) {
                angular.element("#" + p[index].id).text(function(index, text) {
                    return text.replace(/\W*\s(\S)*$/, '...');
                });
            }
            index++;
        }
    });

    $scope.go = function(path) {
        $location.url(path);
    };
});

app.controller('newsDetailsController', function appController($scope, $rootScope, ModelFactory, $routeParams) {
    $scope.newsDetails = ModelFactory.findById($rootScope.news, $routeParams.newsId);
});

//Shows controllers
app.controller('showsController', function appController($scope, $rootScope, $location, $timeout, ApiServices) {
    var gotAllShows = false;
    var beginIndex = 0;
    var endIndex = 9;
    var isCallingService = false;

    var getAllShows = function(beginIndex, endIndex, reset) {
        ApiServices.getAllShows("demo@demo.com", beginIndex, endIndex).success(function(data) {
                if (data.length < (endIndex - beginIndex + 1)) {
                    gotAllShows = true;
                    $(".lastRowLabel").text("No hay más conciertos");
                } else {
                    gotAllShows = false;
                    $(".lastRowLabel").text("¿Más conciertos?");
                }

                if (reset) {
                    $rootScope.shows = data;
                } else {
                    $rootScope.shows = $rootScope.shows.concat(data);
                }

                isCallingService = false;
            })
            .error(function(status, data) {
                isCallingService = false;
            });
    };

    if (!($rootScope.shows)) {
        getAllShows(beginIndex, endIndex, true);
    }

    $('.scroll-content').scroll(function() {
        if ($(this).scrollTop() + $(this).innerHeight() + 5 >= this.scrollHeight) {
            if (!isCallingService && !gotAllShows) {
                console.log('Calling for more shows!!!');
                beginIndex = beginIndex + 10;
                endIndex = endIndex + 10;
                isCallingService = true;
                getAllShows(beginIndex, endIndex, false);
            }
        }
    });

    $scope.doRefresh = function() {
        // if(!gotAllShows){
        console.log('Refreshing shows!');
        $timeout(function() {
            beginIndex = 0;
            endIndex = 9;
            getAllShows(beginIndex, endIndex, true);
        }, 100);
        //}

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.go = function(path) {
        $location.url(path);
    };
});

app.controller('showsDetailsController', function appController($scope, $rootScope, ModelFactory, $routeParams) {
    $scope.showsDetails = ModelFactory.findById($rootScope.shows, $routeParams.showsId);

    var map;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address': $scope.showsDetails.linkGoogleMaps
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            $('#map-canvas').show();
            var latlng = new google.maps.LatLng(results[0].geometry.location.k, results[0].geometry.location.D);
            var mapOptions = { // options for map
                zoom: 16,
                center: latlng
            };

            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); // create new map in the map-canvas div
            map.setCenter(results[0].geometry.location); // center the map on address
            var marker = new google.maps.Marker({ // place a marker on the map at the address
                map: map,
                position: results[0].geometry.location
            });
        } else {
            $('#map-canvas').hide();
        }
    });
});

//Videos controllers
app.controller('videosController', function appController($scope, $window, $rootScope, $location, $timeout, ApiServices) {
    var gotAllVideos = false;
    var beginIndex = 0;
    var endIndex = 9;
    var isCallingService = false;

    var getAllVideos = function(beginIndex, endIndex, reset) {
        ApiServices.getAllVideos("demo@demo.com", beginIndex, endIndex).success(function(data) {
                if (data.length < (endIndex - beginIndex + 1)) {
                    gotAllVideos = true;
                    $(".lastRowLabel").text("No hay más vídeos");
                } else {
                    gotAllVideos = false;
                    $(".lastRowLabel").text("¿Más vídeos?");
                }

                if (reset) {
                    $rootScope.videos = data;
                } else {
                    $rootScope.videos = $rootScope.videos.concat(data);
                }

                isCallingService = false;
            })
            .error(function(status, data) {
                isCallingService = false;
            });
    };

    if (!($rootScope.videos)) {
        getAllVideos(beginIndex, endIndex, true);
    }

    $('.scroll-content').scroll(function() {
        if ($(this).scrollTop() + $(this).innerHeight() + 5 >= this.scrollHeight) {
            if (!isCallingService && !gotAllVideos) {
                console.log('Calling for more videos!!!');
                beginIndex = beginIndex + 10;
                endIndex = endIndex + 10;
                isCallingService = true;
                getAllVideos(beginIndex, endIndex, false);
            }
        }
    });

    $scope.doRefresh = function() {
        // if(!gotAllVideos){
        console.log('Refreshing videos!');
        $timeout(function() {
            beginIndex = 0;
            endIndex = 9;
            getAllVideos(beginIndex, endIndex, true);
        }, 100);
        //}

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    };
});

app.controller('videosItemController', function appController($scope, $http) {
    var id = $scope.$parent.x.youtubeURL.match("[\\?&]v=([^&#]*)");
    id = id[1];
    $http.get("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=AIzaSyDf3_B7JrBwhqJreIE4uVeSWP4BYb_Mwd0%20&fields=items(statistics)&part=statistics").success(function(data) {
            //Get the view count
            var numViews = data.items[0].statistics.viewCount;

            //Append the image in preview container
            var thumb_url = "http://i.ytimg.com/vi/" + id + "/mqdefault.jpg";
            $('<img src="' + thumb_url + '" class="imageYoutubeURL" />').appendTo($('.videoPreviewContainer'));
            $('<p>' + numViews + " visitas" + "</p>").appendTo($('.videoDescriptionContainer'));
            $('.imageYoutubeURL').width('100%');

            //Calculate row height
            var totalHeight = 30;
            $('.videoDescriptionContainer p').each(function() {
                totalHeight = totalHeight + $(this).height();
            });

            //Set the calculated row height
            $('.videoPreviewContainer').css('height', totalHeight);
            $('.videoDescriptionContainer').css('height', totalHeight);
        })
        .error(function(status, data) {

        });
});
