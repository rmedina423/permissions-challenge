'use strict';

var $ = require('jquery');
var template = require('./template.js');

$(function () {

	var getPermissions = $.get('http://localhost:3000/permissions');
	var getNames = $.get('http://localhost:3000/users');

	$('button').on('click', onButtonClick);
	$('main').on('click', 'a', onAnchorClick);

	function onButtonClick(event) {
		event.preventDefault();

		$('ul li').remove();
		$('h1').remove();

		getNames.done(function (users) {
			users.forEach(function (user) {
				renderOntoList(renderName(user));
			});
		});
	}

	function onAnchorClick(event) {
		event.preventDefault();

		var parentElement = event.currentTarget.parentElement;
		var id = $(parentElement).data('id');

		$('ul li').remove();

		getNames.done(function (users) {
			users.forEach(function (user) {
				if (id === user.id) {
					$('button').after(renderTitle(user));
				}
			});
		});

		getPermissions.done(function (permissions) {
			permissions.forEach(function (permission) {
				if(id === permission.userId) {
					renderOntoList(renderPermissions(permission));
				}				
			});
		});
	}

	function renderOntoList(listTemplate) {
		$('ul').append(listTemplate);
	}

	function renderName(user) {
		return template.userName({
			user: user
		});
	}

	function renderPermissions(permission) {
		return template.permissions({
			permission: permission
		});
	}

	function renderTitle(user) {
		return template.title({
			user: user
		});
	}
});