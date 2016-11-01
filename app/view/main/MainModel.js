/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('App.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        image: null
    },

    stores: {
        colors: {
            fields: ['hex'],

            generateScss: function() {
                return this.getRange().map(function(color, i) {
                    return "$color" + i + ": " + color.get('hex') + ";"
                }).join('\n')
            }
        }
    }
});
