sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createServiceModel: function () {
			var oServices = [{
				"url": "<Sharepoint URL>",
				"name": "Go to Sharepoint"
			}, {
				"url": "<Support page URL>",
				"name": "Go to Support page"
			}, {
				"url": "<Chatbot app URL>",
				"name": "Open ChatBot Helper"
			}];

			var oModel = new JSONModel(oServices);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}
	};
});