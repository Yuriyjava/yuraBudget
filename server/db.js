/**
 * Created by Yurii on 15.12.2017.
 */
var mongoose = require('mongoose');
var url = 'mongodb://admin:admin3105@ds141766.mlab.com:41766/budget-test';
mongoose.connect (url);
module.exports = mongoose.connection;

