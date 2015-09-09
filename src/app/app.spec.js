describe( 'AppCtrl', function() {
  describe( 'isCurrentUrl', function() {
    var controller, $scope;

    beforeEach( module( 'app' ) );

    beforeEach( inject( function( $controller, $rootScope ) {
      $scope = $rootScope.$new();
      controller = $controller( 'AppCtrl', { $scope: $scope });
    }));

    it( 'should have a dummy test', inject( function() {
      expect( controller.pageTitle ).to.equal('Cookeasy');
    }));
  });
});
