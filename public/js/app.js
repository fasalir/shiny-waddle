var app = angular.module('myApp', [
		'ngRoute',
		'loginApp',
		'ngCookies',
		'calendarApp',
		'ui.bootstrap.datetimepicker',
		'booking',
		'member',
		'app.tables',
		'app.ui.services',
		'postMessage'
	]);

app.config(function($routeProvider){
	$routeProvider
	.when('/admin-panel', { templateUrl: 'partials/login.html', controller: 'loginCtrl' })
	.when('/dashboard', { templateUrl: 'partials/dashboard.html', controller: 'loginCtrl' })
	.when('/about-us', { templateUrl: 'partials/about-us.html', controller: 'loginCtrl' })
	.when('/services', { templateUrl: 'partials/services.html', controller: 'loginCtrl' })
	.when('/portfolio', { templateUrl: 'partials/portfolio.html', controller: 'loginCtrl' })
	.when('/booking', { templateUrl: 'partials/calendar.html', controller: 'loginCtrl' })
	.when('/contact-us', { templateUrl: 'partials/contact-us.html', controller: 'loginCtrl' })
	.when('/shortcodes', { templateUrl: 'partials/shortcodes.html', controller: 'loginCtrl' })
	.when('/pricing', { templateUrl: 'partials/pricing.html', controller: 'loginCtrl' })
	.when('/blog-item', { templateUrl: 'partials/blog-item.html', controller: 'loginCtrl' })
	.when('/members', { templateUrl: 'partials/admin/members.html', controller: 'memberController' })
	.when('/report', { templateUrl: 'partials/admin/report.html', controller: 'tableCtrl'})
	.when('/messages', { templateUrl: 'partials/admin/messages.html', controller: 'messageCtrl'})
	.when('/booking-form', { templateUrl: 'partials/admin/bookForm.html', controller: 'bookingController'})
	.when('/index', { templateUrl: 'partials/index.html', controller: 'loginCtrl' })
	.otherwise({ redirectTo: '/index' });
})