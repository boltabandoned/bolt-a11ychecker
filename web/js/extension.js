(function(){
    var scripts = document.getElementsByTagName('script');
    var a11yconfig = JSON.parse(scripts[scripts.length-1].dataset.config);
    var path = scripts[scripts.length-1].src.split('?')[0];
    var mydir = path.split('/').slice(0, -1).join('/')+'/';
    var CKEDITORPluginExtras = false;
    $(document).ready(function(){
        if (typeof(CKEDITOR) != 'undefined' ) {
            CKEDITOR.on('instanceReady',function(event, instance){
                if (CKEDITORPluginExtras) {
                    return;
                }
                var config = event.editor.config;
                CKEDITOR.instances.body.destroy();
                CKEDITOR.plugins.addExternal('balloonpanel', mydir + 'balloonpanel/plugin.js');
                CKEDITOR.plugins.addExternal('a11ychecker', mydir + 'a11ychecker/plugin.js');
                config.extraPlugins += ',balloonpanel,a11ychecker';
                config.a11ychecker_quailParams = {
                    guideline: a11yconfig.guideline
                }
                config.toolbar.push({
                    name: 'Accessibility',
                    items: ['A11ychecker']
                });
                CKEDITOR.replace('body', config);
                CKEDITORPluginExtras = true;
            });
        }
    });
})();