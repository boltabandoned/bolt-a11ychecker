var ckAdditionalExternalPlugins = typeof ckAdditionalExternalPlugins === 'undefined' ? {} : ckAdditionalExternalPlugins;
var ckAdditionalConfigs = typeof ckAdditionalConfigs === 'undefined' ? {toolbar: []} : ckAdditionalConfigs; 
var CkEditorReplaced = typeof CkEditorReplaced === 'undefined' ? [] : CkEditorReplaced;

(function(){
    var scripts = document.getElementsByTagName('script');
    var a11yconfig = JSON.parse(scripts[scripts.length-1].dataset.config);
    var path = scripts[scripts.length-1].src.split('?')[0];
    var mydir = path.split('/').slice(0, -1).join('/')+'/';

    ckAdditionalExternalPlugins = $.extend(true, {
        'balloonpanel': mydir + 'balloonpanel/plugin.js',
        'a11ychecker': mydir + 'a11ychecker/plugin.js',
    }, ckAdditionalExternalPlugins);

    ckAdditionalConfigs.toolbar.push({
        name: 'Accessibility',
        items: ['A11ychecker']
    });
    
    ckAdditionalConfigs.a11ychecker_quailParams = {
        guideline: a11yconfig.guideline
    }

    $(document).ready(function(){
        if (typeof(CKEDITOR) != 'undefined') {
            CKEDITOR.on('instanceReady',function(event, instance){
                if (CkEditorReplaced[event.editor.name]) {
                    return;
                }
                var config = event.editor.config;
                CKEDITOR.instances[event.editor.name].destroy();
                for (var pluginName in ckAdditionalExternalPlugins) {
                    CKEDITOR.plugins.addExternal(pluginName, ckAdditionalExternalPlugins[pluginName]);
                }
                for (var additionalConfig in ckAdditionalConfigs) {
                    if(config[additionalConfig] && config[additionalConfig].constructor === Array){
                        config[additionalConfig] = config[additionalConfig].concat(ckAdditionalConfigs[additionalConfig]);
                    }else if (config[additionalConfig]) {
                        config[additionalConfig] = ckAdditionalConfigs[additionalConfig];
                    }
                }
                config.extraPlugins += ',' + Object.keys(ckAdditionalExternalPlugins).join(',');
                CKEDITOR.replace(event.editor.name, config);
                CkEditorReplaced[event.editor.name] = true;
            });
        }
    });
})();