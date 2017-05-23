require([

    "text!templates.html"


], function ( Templates) {
    var div       = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);
    // views, layouts

    var router = new MyRouter();
});