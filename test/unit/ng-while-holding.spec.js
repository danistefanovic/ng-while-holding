var expect = chai.expect;

describe('whileHolding directive', function() {

    var element;
    var $scope;
    var $timeout;

    beforeEach(module('ngWhileHolding'));

    beforeEach(inject(function($compile, $rootScope, _$timeout_) {
        $timeout = _$timeout_;
        $scope = $rootScope.$new();
        element = $compile('<button while-holding="testFn()" while-holding-debounce="200"></button>')($scope);
        $scope.$digest();
        $scope.testFn = sinon.spy();
    }));

    it('should call the dummy function once', function() {
        element.triggerHandler('mousedown');
        expect($scope.testFn.calledOnce).to.be.true;
    });

    it('should call the dummy function multiple times', function() {
        var count = 6;
        var i;

        for (i = 0; i < count; i++) {
            element.triggerHandler('mousedown');
        }

        expect($scope.testFn.callCount).to.equal(count);
    });

    it.skip('should trigger the dummy function while pressed', function(done) {
        element.triggerHandler('mousedown');

        setTimeout(function() {
            element.triggerHandler('mouseup');
            expect($scope.testFn.callCount).to.equal(4);
            done();
        }, 1200);
    });

});
