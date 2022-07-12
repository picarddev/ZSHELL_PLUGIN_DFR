/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/picard/refresh/ZSHELL_PLUGIN/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});