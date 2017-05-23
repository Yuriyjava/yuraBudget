define( function () {

    return function () {

        var self   = this;

       var dataBudget={
           MonthToPay   : "",
           SumToPay : 800,
           SumUAH  : "",
           ExchangeRate     : "",
           DateUAHPay     : "",
           SumUSD : "",
           DateUSDPay   :""
       };

        var dataGrid = new kendo.data.DataSource({
            data     : dataBudget,
            autoSync : false,

            schema   : {
                model : {
                    id     : "MonthToPay",
                    fields : {
                        MonthToPay   : {

                            type:"date"
                        },
                        SumToPay : {

                            type:"number"
                        },
                        SumUAH  : {
                            type:"number"
                        },
                        ExchangeRate     : {
                            type:"number"
                        },
                        DateUAHPay     : {
                            type:"date"
                        },
                        SumUSD : {
                            type:"number"
                        },
                        DateUSDPay     : {
                            type:"date"
                        }
                    }
                }
            }


        });


        var View  = Backbone.View.extend({
            el         : "#content",

            initialize : function () {
                var gridEl = $("<div></div>");

               this.grid = gridEl.kendoGrid({
                   toolbar: ["create"],
                   editable: "inline",
                   columns : [
                       {
                           field      : "MonthToPay",
                           title      : "Месяц оплаты"


                       },

                       {
                           field : "SumToPay",
                           title : "Сумма к оплате"

                       },
                       {
                           field : "SumUAH",
                           title : "Сумма гривен"
                       },
                       {
                           field      : "ExchangeRate",
                           title      : "Курс"

                       },
                       {
                           field : "DateUAHPay",
                           title : "Дата получения UAH"
                       },
                       {
                           field  : "SumUSD",
                           title : "Сумма USD"

                       },
                       {
                           field  : "DateUSDPay",
                           title : "Дата получения USD"

                       },
                       {
                           command : ["edit", "destroy"]
                       }],

                   dataSource : dataGrid,

                   height     : 600



               }).data("kendoGrid");

                this.render();
            },
            render     : function () {

                this.$el.html(this.grid.element);

            }

        });
        self.view = new View();

    }





});