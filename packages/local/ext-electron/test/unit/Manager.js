describe('Ext.electron.menu.Manager', function() {

    // if (Ext.isIE8 || Ext.isIE9 || Ext.isIE10) { return; } // CRAIG WHY???

    function createManager(config) {
        return new Ext.electron.menu.Manager(Ext.apply({
            renderTo: document.body,
            width: 400,
            height: 400
        }, config));
    }

    describe('tags', function () {
        it('try stuff', function() {
            user.tags = ['d','t','dt'];
            dt.tags = ['d','dt'];
        });
        
        xit('should show development items',function (done) {
            var mgr;

                mgr = createManager({
                    tags: ['development']
                });

                console.log(mgr);
                Ext.destroy(mgr);

            done();
        });
    });
});