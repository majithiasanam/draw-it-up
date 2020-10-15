function ToolBox() {
    return {
        templateUrl: 'toolbox.tpl.html',
        controller: 'toolBoxController',
        controllerAs: 'toolBoxCtrl',
        restrict: 'AE',
        replace: true,
        bindToController: {}
    };
}

angular
.module('drawItUp')
.directive('toolbox', ToolBox);