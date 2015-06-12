createBinding({
    name: "kendoMultiSelect",
    events: {
        change: function (options, event) {
            var widget = event.sender,
                valuePrimitive = widget.options.valuePrimitive;

            if (options.value) {
                if (valuePrimitive) {
                    options.value(widget.value());
                } else {
                    options.value(widget.dataItems ? widget.dataItems() : widget.dataItem());
                }
            }
        },
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        search: [SEARCH, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        },
        value: function (value) {
            var widget = this,
                dataValueField = widget.options.dataValueField;

            if ((value instanceof Array || value instanceof kendo.data.ObservableArray) && value.length) {
                value = $.map(value, function(item) {
                    return item !== null && item[dataValueField] !== undefined ? item[dataValueField] : item;
                });
            } else if (typeof value === "object" && value !== null && value[dataValueField] !== undefined) {
                value = value[dataValueField];
            }

            widget.value(value);
        }
    }
});