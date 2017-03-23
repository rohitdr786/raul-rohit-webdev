/**
 * Created by Rohit on 02-Mar-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .directive('wbdvSortable', sortableDir)

    function sortableDir($routeParams) {
        function linkFunc(scope, element,controller) {
            var startIndex;
            element.sortable({
                axis: 'y',
                start: function (event,ui) {
                    startIndex=ui.item.index();
                },
                stop:function (event,ui) {
                    var stopIndex=ui.item.index();
                    if(startIndex!=stopIndex){
                        // alert("startIndex="+startIndex+" stopIndex="+stopIndex+" id="+$routeParams['pid']);
                        scope.widgetIndexController.updateIndex(startIndex,stopIndex,$routeParams['pid']);
                    }
                }
            });
        }
        return {
            scope:{},
            link: linkFunc,
            controller:widgetIndexController,
            controllerAs:'widgetIndexController'
        };
    }
    
    function widgetIndexController(WidgetService) {
        var vm=this;
        vm.updateIndex=updateIndex;
        var widget={};

        function updateIndex(start,stop,pageId){
            var promise=WidgetService.updateWidgetIndex(start,stop,pageId);
            promise.success(function(response){

            });
            promise.error(function(response){

            });
        };
    }
})();