Ext.define('Ext.electron.Dialog', function () {
    var remote = require('electron').remote;
    var dialog = remote.dialog;

return {
    requires: [
        'Ext.GlobalEvents'
    ],

    singleton: true,

    filePicker: function (options) {
        Ext.applyIf(options, {
            type: 'open'
        });

        return new Promise(function (resolve) {
            Ext.fireEvent('nativemodalopen', {
                type: 'filePicker',
                options: options
            });

            var method = options.type === 'save' ? 'showSaveDialog' : 'showOpenDialog';

            dialog[method](
                //opens as a sheet in OSX
                remote.getCurrentWindow(),
                options,
                function (result) {
                    Ext.fireEvent('nativemodalclose', {
                        type: 'filePicker',
                        options: options
                    });

                    if (result && !result.length) {
                        result = null;
                    }
                    resolve(result);
                });
        });
    }
}},
function () {
    var GlobalEvents = Ext.GlobalEvents;

    //TODO - promote
    Ext.fireEvent = Ext.fireEvent || function () {
        return GlobalEvents.fireEvent.apply(GlobalEvents, arguments);
    };
});
