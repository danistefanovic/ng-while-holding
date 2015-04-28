'use strict';

/**
 * @ngdoc module
 * @name ngWhileHolding
 * 
 * @description 
 * Module for providing a "while holding" event handler
 */
angular.module('ngWhileHolding', [])

    /**
     * @ngdoc directive
     * @name ngWhileHolding.directive:whileHolding
     * @restrict A
     * @scope
     */
    .directive('whileHolding', function($parse, $interval) {
        return {
            restrict: 'A',
            scope: {
                debounceTime: '=?whileHoldingDebounce'
            },
            link: function(scope, element, attrs) {
                var debounceTime = scope.debounceTime || 200; // ms
                var action = $parse(attrs.whileHolding);
                var intervalPromise;

                /**
                 * Execute the compiled expression
                 */
                var fireAction = function() {
                    // Because we're using an
                    // isolated scope for this directive,
                    // we have to pass the parent scope to
                    // the compiled expression
                    action(scope.$parent);
                }

                /**
                 * Bind the hold-start event
                 */
                var bindBeginAction = function() {
                    element.on('mousedown', beginAction);
                }

                /**
                 * Bind the hold-end event
                 */
                var bindEndAction = function() {
                    element.on('mouseup', endAction);
                    element.on('mouseleave', endAction);
                }

                /**
                 * Hold-start event listener
                 *
                 * @param {Object} event
                 */
                var beginAction = function(event) {
                    event.preventDefault();
                    fireAction();
                    intervalPromise = $interval(fireAction, debounceTime);
                }

                /**
                 * Hold-end event listener
                 */
                var endAction = function() {
                    $interval.cancel(intervalPromise);
                }

                bindBeginAction();
                bindEndAction();
            }
        };
    });
