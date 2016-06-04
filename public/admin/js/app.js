var app = angular.module('myApp', [
		'ngRoute',
		'loginApp',
		'mymodal',
		'ngCookies'
		// 'ngCookies'
	]);

app.config(function($routeProvider){
	$routeProvider
	.when('/admin-panel', { templateUrl: 'partials/login.html', controller: 'loginCtrl' })
	.when('/dashboard', { templateUrl: 'partials/dashboard.html', controller: 'loginCtrl' })
	.when('/about-us', { templateUrl: 'partials/about-us.html', controller: 'loginCtrl' })
	.when('/services', { templateUrl: 'partials/services.html', controller: 'loginCtrl' })
	.when('/portfolio', { templateUrl: 'partials/portfolio.html', controller: 'loginCtrl' })
	.when('/blog', { templateUrl: 'partials/blog.html', controller: 'loginCtrl' })
	.when('/contact-us', { templateUrl: 'partials/contact-us.html', controller: 'loginCtrl' })
	.when('/shortcodes', { templateUrl: 'partials/shortcodes.html', controller: 'loginCtrl' })
	.when('/pricing', { templateUrl: 'partials/pricing.html', controller: 'loginCtrl' })
	.when('/blog-item', { templateUrl: 'partials/blog-item.html', controller: 'loginCtrl' })
	.when('/dashboard', { templateUrl: 'admin/index.html', controller: 'loginPopup'})
	.when('/index', { templateUrl: 'partials/index.html', controller: 'loginCtrl' })
	.otherwise({ redirectTo: '/index' });
})