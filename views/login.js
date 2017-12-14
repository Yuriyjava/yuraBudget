/**
 * Created by Yurii on 14.12.2017.
 */

import Template from '../login.html';

function Login() {
    var self = this;

    var View  = Backbone.View.extend({
        el         : "#content",
        initialize : function () {
            this.render();
        },
        events: {
            "submit form.formSingIn"         : "submitForm",
            "click #signUpBTN"    : "signUp"
        },
        render     : function () {
            this.$el.html(Template);
            //this.$el.find('form').on("submit", this.submitForm)
        },
        submitForm: function(e){
            var name = $(e.target).find("input#inputLogin").val();
            var pass =  $(e.target).find("input#inputPassword").val();

            $.post( "/login", {
                username: name,
                password: pass
            } ).done(function(data) {
                window.location.replace("#home");
            });
            return false;
        },
        signUp: function(){
            window.location.replace(window.location.href +"#signUp");
        }

    });

    self.view = new View();

}

export default Login;