    import Grid from './views/grid.js';
    import SignUp from './views/signUp.js';
    import Login from './views/login.js';
    import Templates from './templates.html';

    $(document).ready(function(){

    var div       = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);



    // views, layouts




        var MyRouter= Backbone.Router.extend({
            routes     : {
                ""         : "login",
                "home"     : "home",
                "signUp"    : "signUp",

            },
            initialize : function () {
                Backbone.history.start()
            },
            home       : function () {
                var GridView= new Grid();
                GridView.view.render();
            },
            login:function () {
                var LoginView= new Login();
                LoginView.view.render();

            },
            signUp: function(){
                var SignUpView= new SignUp();
                SignUpView.view.render();
            }


        });
        var router = new MyRouter();

    });

