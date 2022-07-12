sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/picard/refresh/ZSHELL_PLUGIN/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.picard.refresh.ZSHELL_PLUGIN.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			this._createLaunchpadButton();
			this.setModel(models.createServiceModel(), "service");
			this.setModel(models.createDeviceModel(), "device");
		},
		// https://blogs.sap.com/2021/05/03/add-custom-button-in-fiori-launchpad-shell-bar-header-bar/
		_getRenderer: function () {
			var oDeferred = new jQuery.Deferred();
			this._oShellContainer = jQuery.sap.getObject("sap.ushell.Container");
			if (!this._oShellContainer) {
				oDeferred.reject("Illegal state: shell container not available");
			} else {
				var oRenderer = this._oShellContainer.getRenderer();
				if (oRenderer) {
					oDeferred.resolve(oRenderer);
				} else {
					this._onRendererCreated = function (oEvent) {
						oRenderer = oEvent.getParameter("renderer");
						if (oRenderer) {
							oDeferred.resolve(oRenderer);
						} else {
							oDeferred.reject("Illegal state: shell container not available");
						}
					};
					this._oShellContainer.attachRendererCreatedEvent(this._onRendererCreated);
				}
			}
			return oDeferred.promise();
		},

		_createLaunchpadButton: function () {
			this._getRenderer().fail(function (sErrorMessage) {
				jQuery.sap.log.error(sErrorMessage, undefined, "shellExtended.shellExtend.Component");
			}).done(function (oRenderer) {
				oRenderer.addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem", {
					id: "shellExtend.shellExtend",
					icon: "sap-icon://refresh",
					tooltip: "Actualiser",
					press: this._reloadPage.bind(this)
				}, true, false);
			}.bind(this));
		},

		_reloadPage: function (oEvent) {
	/*		var oButton = oEvent.getSource();
			if (!this._cMenu) {
				this._cMenu = sap.ui.xmlfragment("com.picard.refresh.ZSHELL_PLUGIN.view.ActionSheet", this);
				this._cMenu.setModel(this.getModel("service"), "service");
			}
			this._cMenu.openBy(oButton);*/
			
				window.location.reload(true); // eslint-disable-line sap-no-location-reload
				
		},

		onServiceSelected: function (oEvent) {
/*			var oBindingContext = oEvent.getSource().getBindingContext("service");
			var sSelectedServiceUrl = oBindingContext.getProperty("url");
			window.open(sSelectedServiceUrl, '_blank');*/
			window.location.reload(); // eslint-disable-line sap-no-location-reload
		}
	});
});