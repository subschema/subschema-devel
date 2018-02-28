["List", "Mixed", "Autocomplete", "Conditional", "Content", "ContentWrapper", "Object", "ObjectType",
    "Button", "Checkbox", "Checkboxes", "Date", "DateInput", "Hidden", "NumberInput", "Number", "Password", "RadioInput", "Radio",
    "Restricted", "Select", "Text", "TextArea", "ToggleLink", "ToggleButton"].forEach(
    function (type) {
        schema.schema[type] = {
            type      : type,
            fieldClass: 'row'
        }
    });
