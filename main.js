
    import Grid from './views/grid.js';
   // import Templates from './templates.html';
    jQuery.migrateMute=true;
    jQuery.migrateTrace = false;
    jQuery.migrateReset();
  /*  var div       = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);*/



    // views, layouts
    $(document).ready(function(){
        var GridView= new Grid();
        var MyRouter= Backbone.Router.extend({

            routes     : {
                ""         : "home",
                "home"     : "home",
                "sport"    : "sport",
                "learning" : "learning",
                "multi"    : "multi",
                "chars"    : "chars",
                "contacts" : "contacts"
            },
            initialize : function () {
                Backbone.history.start()
            },
            home       : function () {
                GridView.view.render();

            }


        });
        var router = new MyRouter();
    });

