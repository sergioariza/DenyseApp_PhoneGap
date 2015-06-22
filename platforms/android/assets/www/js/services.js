appServices.service('ApiServices', function($window, $http, $rootScope) {
    return {
        getAllNews: function(user, begin, end) {
            return $http.get("http://musikapp.herokuapp.com/news/" + user + "/" + begin + "/" + end);
        },
        getAllShows: function(user, begin, end) {
            return $http.get("http://musikapp.herokuapp.com/shows/" + user + "/" + begin + "/" + end);
        },
        getAllVideos: function(user, begin, end) {
            return $http.get("http://musikapp.herokuapp.com/videos/" + user + "/" + begin + "/" + end);
        },
        getAllServices: function() {
            $http.get("http://musikapp.herokuapp.com/news/sergioariza@outlook.com").success(function(data) {
                    $rootScope.news = data;
                })
                .error(function(status, data) {

                });
            $http.get("http://musikapp.herokuapp.com/shows/demo@demo.com").success(function(data) {
                    $rootScope.shows = data;
                })
                .error(function(status, data) {

                });
            $http.get("http://musikapp.herokuapp.com/videos/demo@demo.com").success(function(data) {
                    $rootScope.videos = data;
                })
                .error(function(status, data) {

                });
        }
    };
});
