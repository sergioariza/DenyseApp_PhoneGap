app.factory('ModelFactory', function($interval, ApiServices) {
    return {
        findById: function(modelData, id) {
            var modelDataDetails = null;
            var l = modelData.length;
            var i;

            for (i = 0; i < l; i = i + 1) {
                if (modelData[i].id == id) {
                    modelDataDetails = modelData[i];
                    break;
                }
            }
            return modelDataDetails;
        },
        minutes: 5,
        startServices: $interval(function() {
            // ApiServices.getAllServices();
        }, 5 * 1000 * 60)
    };
});
