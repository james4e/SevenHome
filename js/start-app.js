//Created by Shiyang Fei on 6/12/2015
(function($) {
    $(document).ready(function() {
        var $page = $('body');
        var config = {
            dependencyPath: {
                plugin: 'javascripts/'
            }
        }
        var application = new Tc.Application($page, config);
        application.registerModules();
        application.start();
    });
})(Tc.$);