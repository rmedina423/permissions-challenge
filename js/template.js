'use strict';

var Handlebars = require('hbsfy/runtime')

var userName = require('./../templates/userName.handlebars')
var permissions = require('./../templates/permissions.handlebars')
var title = require('./../templates/title.handlebars')

module.exports = {
	userName: userName,
	permissions: permissions,
	title: title,
}