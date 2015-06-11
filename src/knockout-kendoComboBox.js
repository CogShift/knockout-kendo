createBinding({
    name: "kendoComboBox",
    events: {
        change: function (options, event) {
            var widget = event.sender,
                valuePrimitive = widget.options.valuePrimitive;

            if (valuePrimitive) {
                options.value(widget.value());
            } else {
                options.value(widget.dataItems());
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
        isOpen: [OPEN, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        },
        value: VALUE
    }
});