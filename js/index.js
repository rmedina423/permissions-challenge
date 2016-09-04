'use strict';

var $ = require('jquery');
var template = require('./template.js');

$(function () {

	var getPermissions = $.get('http://localhost:3000/permissions');
	var getNames = $.get('http://localhost:3000/users');

	$('button').on('click', function (event) {
		event.preventDefault();

		$('li').remove();
		$('h3').remove();

		getNames
			.done(function (users) {
				users.forEach(function (user) {
					$('main').append(renderName(user));
				});
			});
	});

	$('main').on('click', 'a', function (event) {
		event.preventDefault();

		var id = $(this).parent().data('id');

		$('li').remove();

		getNames
			.done(function (users) {
				users.forEach(function (user) {
					if (id === user.id) {
						$('button').after(renderTitle(user));
					}
				});
			});

		getPermissions
			.done(function (permissions) {
				permissions.forEach(function (permission) {
					if(id === permission.userId) {
						$('main').append(renderPermissions(permission));
					}				
				});
			});

	});

	function renderName(user) {

		var theData = {
			user: user
		};

		return template.userName(theData);
	}

	function renderPermissions(permission) {
		var theData = {
			permission: permission
		};

		return template.permissions(theData);
	}

	function renderTitle(user) {
		var theData = {
			user: user
		};

		return template.title(theData);
	}

});