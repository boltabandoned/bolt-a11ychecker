(function(){
    var scripts = document.getElementsByTagName('script');
    var a11yconfig = JSON.parse(scripts[scripts.length-1].dataset.config);
    var path = scripts[scripts.length-1].src.split('?')[0];
    var mydir = path.split('/').slice(0, -1).join('/')+'/';
    var CKEDITORa11yconfigInitialized = [];
    $(document).ready(function(){
        if (typeof(CKEDITOR) != 'undefined' ) {
            CKEDITOR.on('instanceReady',function(event, instance){
                if (CKEDITORa11yconfigInitialized[event.editor.name]) {
                    return;
                }
                var config = event.editor.config;
                CKEDITOR.instances[event.editor.name].destroy();
                CKEDITOR.plugins.addExternal('balloonpanel', mydir + 'balloonpanel/plugin.js');
                CKEDITOR.plugins.addExternal('a11ychecker', mydir + 'a11ychecker/plugin.js');
                config.extraPlugins += ',balloonpanel,a11ychecker';
                config.toolbar.push({
                    name: 'Accessibility',
                    items: ['A11ychecker']
                });
                CKEDITOR.replace(event.editor.name, config);
                CKEDITORa11yconfigInitialized[event.editor.name] = true;
            });
        }
    });
})()