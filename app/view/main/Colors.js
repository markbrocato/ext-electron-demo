Ext.define('App.view.main.Colors', {
    extend: 'Ext.view.View', 
    itemCls: 'color-item',
    disableSelection: true,
    xtype: 'app-colors',
    itemTpl: [
        '<div class="color-swatch" style="background-color: {hex}"></div>',
        '<div class="color-label">{hex}</div>',
    ]
});