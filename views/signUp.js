/**
 * Created by Yurii on 14.12.2017.
 */

import Template from '../signUp.html';

function SignUp() {
    var self = this;

    var View  = Backbone.View.extend({
        el         : "#content",
        initialize : function () {
           // this.render();
        },
        events: {
            "submit form.formSingUp"         : "submitSignUp",
          },
        render     : function () {
            this.$el.html(Template);
            //this.$el.find('form').on("submit", this.submitForm)
        },
        submitSignUp: function(e){
            var name = $(e.target).find("input#inputLogin").val();
            var email = $(e.target).find("input#inputEmail").val();

            var pass =  $(e.target).find("input#inputPassword").val();
            var passConfirm = $(e.target).find("input#confirmPassword").val();
            debugger
            if(pass!=passConfirm){
               alert("Введенные пароли не совпадают!");
                return false;
            }

            $.post( "/signup", {
                username: name,
                password: pass,
                email: email
            } ).done(function(data) {
                debugger
                window.location.replace("/#home");
            }).fail(function(data){
                debugger
            });
            return false;
        },


    });

    self.view = new View();

}

export default SignUp;