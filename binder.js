$(document).ready(function(){
    function gettype(value, type)
    {
        var json = {};
        switch (type)
        {
            case "select" :
                var element = $(value);
                    element.length ? json.success = element : json.error = "undefined element of selector " + value + "'";
                break;
            case "html"   : json.success = value; break;
            case "boolean":
                if (typeof value == "string")
                if (!value || value == "true") json.success = true;
                else json.error = "'" + value + "' must be boolean type!";
                break;
            case "css"    : json.success = value; break;
            case "text"   : json.success = value; break;
        }
        return json;
    }

    function Binder(options)
    {
        this.targetsLimit = options.targetsLimit || 5;
        this.elem = options.elem || null;
        this.attrs = {};
        this.init(options);
    }
    Binder.prototype.init = function(options)
    {
        if (this.elem)
        {
            this.getAttributes(this.elem, {
                name     : { type : "text", root : true },
                target   : { type : "select", root : true},
                radio    : { type : "boolean" },
                checkbox : { type : "boolean" },
                append   : { type : "html" },
                before   : { type : "html" },
                after    : { type : "html" },
                replace  : { type : "html" },
                css      : { type : "css" },
                addclass : { type : "text" },
                delclass : { type : "text" },
                value    : { type : "text" },
                radio_inset    : { type : "boolean" },
                checkbox_inset : { type : "boolean" }
            });

            var self = this;
            this.elem.click(function(){
                self.import();
            });
        }
        //console.log(this)
    }
    Binder.prototype.getAttributes = function(element, options)
    {
        for (var name in options)
        {
            var optname = name.replace("_", "-");
            var attribute = element.attr("data-" + optname);
            if (attribute !== undefined)
            {
                var type = gettype(attribute, options[name].type);
                if (type.success !== undefined)
                {
                    if (!options[name].root)
                    {
                        this.attrs[name] = {}
                        this.attrs[name].value = type.success;
                        if (~name.indexOf("_inset")) this.attrs[name].targets = [element];
                        else this.attrs[name].targets = this.getTargets(element, optname);
                    }
                    else this[name] = type.success;
                }
                else
                {
                    console.error(type.error);
                    return false;
                }
            }
        }
    }
    Binder.prototype.getTargets = function(element, option)
    {
        var onetarget = element.attr("data-" + option + "-target");
            onetarget ? onetarget = $(onetarget) : onetarget = false;
        if (!onetarget.length)
        {
            var targets = []
            for (var i = 0; i < this.targetsLimit; i++)
            {
                var target = false;
                var selector = element.attr("data-" + option + "-target-" + i);
                if (selector) target = $(selector);
                if (target.length) targets.push(target);
            }
            if (targets.length) return targets;
            else return false;
        }
        else return [onetarget];
    }
    Binder.prototype.import = function()
    {
        var self = this;

        for (var attr in this.attrs)
        {
            if (this.attrs[attr])
            {
                deleteData(attr, self.name);
                var data = this.attrs[attr].value;
                var targets = this.attrs[attr].targets;
                if (targets)
                {
                    if (targets.length)
                    for (var target in targets) importData(targets[target], data, attr);
                }
                else if (this.target) importData(this.target, data, attr);
            }
        }

        function importData(target, data, type)
        {
            var div = "<div data-binder-" + attr + "='" + self.name + "'>" + data + "</div>";
            switch (type)
            {
                case "append"  : target.append(div); break;
                case "before"  : target.before(div); break;
                case "after"   : target.after(div); break;
                case "replace" : target.empty(); target.append(div); break;
                case "css"     : target.attr("style", data); break;
                case "addclass": target.addClass(data); break;
                case "delclass": target.removeClass(data); break;
                case "value"   : target.attr("value", data); break;
                case "radio"   : target.find("input[type=radio]").prop({'checked': true}); target.change(); break;
                case "checkbox":
                    var checkbox = target.find("input[type=checkbox]");
                    if (checkbox.prop() == 'checked') checkbox.prop({'checked': false});
                    else checkbox.prop({'checked': true});
                    checkbox.change();
                    break;
                case "radio_inset" : target.find("input[type=radio]").prop({'checked': true}); target.change(); break;
                case "checkbox_inset" : target.find("input[type=checkbox]").prop({'checked': true}); target.change(); break;
            }
        }

        function deleteData(type, name)
        {
            if (type == "append" || type == "before" || type == "replace")
            $("[data-binder-" + type + "='" + name + "']").remove();
        }
    }

    $.fn.binder = function(options)
    {
        this.each(function(){
            if (options) options.elem = $(this);
            else options = { elem: $(this) };
            this.binder = new Binder(options);
        });
    }

    $(document).ready(function(){
        $('.binder').binder();
    });
});
