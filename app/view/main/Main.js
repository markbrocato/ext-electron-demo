/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'App.view.main.MainController',
        'App.view.main.MainModel',
        'App.view.main.Colors'
    ],
    
    mixins: ['Ext.electron.menu.Manager'],
    nativeAppMenu: 'app', // a named menu in "nativeMenus" 

    initComponent: function() {
        this.callParent();
        var me = this;

        this.setNativeMenus({
            app: [{
                submenu: [{
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: function() {
                        window.close();
                    }
                }]
            }, {
                label: 'Edit',
                submenu: [{
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                }, {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                }, {
                    type: 'separator'
                }, {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                }, {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                }, {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                }, {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                }]
            }, {
                label: 'View',
                submenu: [{
                    label: 'Reload',
                    development: true,
                    accelerator: 'CmdOrCtrl+R',
                    click: 'onAppReload'
                }, {
                    label: 'Toggle Full Screen',
                    accelerator: {
                        darwin: 'Ctrl+Command+F',
                        otherwise: 'F11'
                    },
                    click: 'onAppToggleFullScreen'
                }, {
                    label: 'Toggle Developer Tools',
                    development: true,
                    accelerator: {
                        darwin: 'Alt+Command+I'
                    },
                    click: 'onAppToggleDevTools'
                }]
            }]
        });        
    },

    controller: 'main',
    viewModel: 'main',
    bodyPadding: 20,
    scrollable: true,

    title: 'Ext JS in Electron',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        emptyText: 'Select an image...',
        xtype: 'electronfilefield',
        options: {
            properties: ['openFile']
        },
        reference: 'file',
        listeners: {
            change: 'onSelectFile'
        }
    }, {
        xtype: 'component',
        height: 500,
        bind: {
            hidden: '{!image}',
            html: '<img height="500" src="/image?path={image}"/>'
        }
    }, {
        xtype: 'component', 
        margin: '20 0 0 0',
        style: 'font-weight: normal',
        html: 'Click to add to clipboard:',
        bind: {
            hidden: '{!image}'
        }
    }, {
        xtype: 'app-colors', 
        bind: {
            store: '{colors}'
        },
        listeners: {
            itemclick: 'onSelectColor'
        }
    }]
});
