define( function () {

    return function () {

        var self   = this;
        var dataGrid = new kendo.data.DataSource({
            data     : dataBudget,
            autoSync : false,
            schema   : {
                model : {
                    id     : "FieldId",
                    fields : {
                        FieldId    : {
                            validation : {
                                required : true
                            }
                        },
                        FieldName  : {
                            validation : {
                                required : true
                            }
                        },
                        FieldType  : {
                            validation : {
                                required : true
                            }
                        },
                        Prefix     : {
                            validation : {
                                required : true
                            }
                        },
                        Fixed      : {
                            type : "boolean"
                        },
                        Properties : {
                            defaultValue : {}
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

                   columns : [
                       {
                           field      : "FieldId",
                           title      : "Field Id",
                           filterable : {
                               mode : "row"
                           }
                       },

                       {
                           field : "FieldName",
                           title : "Field Name"

                       },
                       {
                           field : "FieldType",
                           title : "Field Type"
                       },
                       {
                           field      : "Prefix",
                           title      : "Prefix",
                           filterable : {
                               cell : {
                                   template      : function (elem) {
                                       prefixFilter(elem, prefixArr)
                                   },
                                   showOperators : false
                               }
                           }
                       },
                       {
                           field : "Fixed",
                           title : "Fixed"
                       },
                       {
                           field  : "Properties",
                           hidden : true

                       },
                       {
                           command : ["edit", "destroy"]
                       }],

                   dataSource : dataGrid,
                   scrollable : true,
                   selectable : true,
                   filterable : {
                       mode : "row"
                   },
                   toolbar    : "<span><b>Shema & Custom & System</b></br><a class='k-button k-button-icontext k-grid-add' href='\\#'>addNew</a></span>",
                   editable   : {
                       mode : "popup"

                   },
                   height     : 600,
                   edit       : function (e) {

                       e.model.bind("change", function (data) {

                           data.field === "FieldType" && bind();

                       });

                       var bind = function () {

                           e.container.html(generateTemplate(e.model, e.model.isNew(), baseFields, baseProperties, fieldTypeList));
                           e.container.css("min-width", "400px");
                           $(e.container).find("#propertiesEdit").off();
                           $(e.container).find("#propertiesEdit").on("click", function (event) {
                               var $t        = $(event.target),
                                   arrButton = $t.closest(".arrayButton"),
                                   arrField  = arrButton.length && arrButton.attr("data-field");

                               if (arrButton.length) {
                                   e.model.Properties[arrField] ? e.model.Properties[arrField] : e.model.Properties[arrField]=[];
                                   e.model.Properties[arrField]=propsPopup(e.model.Properties[arrField]);
                               }
                           });
                           kendo.unbind(e.container, e.model);
                           kendo.bind(e.container, e.model);

                       };
                       bind();
                   },


               }).data("kendoGrid");

                this.render();
            },
            render     : function () {

                this.$el.html(this.grid.element);
                this.grid.render();
            }

        });
        self.view = new View();

    }





});