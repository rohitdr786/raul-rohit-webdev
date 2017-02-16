/**
 * Created by Rohit on 15-Feb-17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.update=updateWidget;
        vm.delete=deleteWidget;
        vm.create=createWidget;

        function createWidget(widgetType){
            var status=WidgetService.createWidgetFromType(vm.pageId,widgetType);
            if(status==null){
                vm.error="Unable to create a widget";
            }else{
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+status);
            }
        }

        function deleteWidget() {
            var status=WidgetService.deleteWidget(vm.widgetId);
            if(status==null){
                vm.error="Unable to delete widget";
            }else{
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
        }

        function updateWidget(newWidget){
            var status=WidgetService.updateWidget(newWidget);
            if(status==null){
                vm.error="Unable to update widget";
            }else{
                vm.message="Widget successfully updated";
            }
        }

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }
    }
})();