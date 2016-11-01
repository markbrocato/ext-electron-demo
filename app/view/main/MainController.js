/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.MainController', function() {

    var electron = require('electron'),
        remote = electron.remote, 
        getColors = remote.require("get-image-colors"),
        clipboard = electron.clipboard, 
        fs = remote.require('fs');

    return {
        extend: 'Ext.app.ViewController',
        alias: 'controller.main',

        init: function() {
            this.getView().getNativeMenu('app');
        },

        /**
         * Copies the color to the clipboard.
         */
        onSelectColor: function(view, color) {
            var hex = color.get('hex');
            clipboard.writeText(hex);
            Ext.toast('Copied ' + hex + ' to clipboard.')
        },

        /**
         * Extracts the color scheme from the file
         */
        onSelectFile: function(field, file) {
            var store = this.getStore('colors'), 
                view = this.getView();

            this.getViewModel().set('image', file);

            getColors(file, function(err, colors) {
                if (err) {
                    Ext.Msg.alert('Error reading file ' + err.message);
                } else {
                    store.loadData(colors.map(function(c) {
                        return { hex: c.hex() };
                    }));
                }
                view.reloadNativeMenu('app');
            });
        }
    }
});
