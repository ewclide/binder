$(document).ready(function(){
        function Binder(options)
        {
            this.setOptions(options).to([
                "elem",
                "target",
                "before",
                "after",
                "append",
                "css",
                "radio",
                "checkbox",
                "addclass",
                "delclass"
            ]);
            this.init(options);
        }
        Binder.prototype.setOptions = function(options)
        {
            var self = this;
            var fn = {};
            fn.to = function(fields)
            {
                fields.forEach(function(field){
                    if (field in options) self[field] = options[field];
                    else self[field] = null;
                });
            }
            return fn;
        }
        Binder.prototype.getAttributes = function(element, options)
        {
            for (var name in options)
            {
                var attribute = element.attr("data-" + name);
                if (attribute !== undefined)
                {
                    switch (options[name])
                    {
                        case "$" :
                            attribute = $(attribute);
                            if (!attribute) console.error("attribute " + name + " in element " + this.elem + " must be selector!");
                            else this[name] = attribute;
                            break;
                        case "$ or null" :
                            if (attribute) attribute = $(attribute);
                            if (!attribute) attribute = true;
                            this[name] = attribute;
                            break;
                        case "text" :
                            this[name] = attribute;
                            break;
                    }

                }
                else this[name] = false;
            }
        }
        Binder.prototype.init = function(options)
        {
            if (this.elem)
            {
                this.getAttributes(this.elem, {
                    target   : "$",
                    radio    : "$ or null",
                    checkbox : "$",
                    append   : "text",
                    before   : "text",
                    after    : "text",
                    css      : "text",
                    addclass : "text",
                    delclass : "text"
                });
                this.id = this.target.attr("id");
                var self = this;
                this.elem.click(function(){
                    self.import();
                });
            }
            //console.log(this);
        }
        Binder.prototype.import = function()
        {
            function setStyles(element, styles)
            {
                styles = styles.split(";");
                if (styles.length) for (var style in styles) setStyle(element, styles[style]);
                else setStyle(element, styles);
            }

            function setStyle(element, style)
            {
                style = style.split(":");
                var prop = "";
                for (var i = 1; i < style.length; i++) prop += style[i];
                element.css(style[0].replace(/^\s+/g, ""), prop.replace(/^\s+/g, ""));
            }

            if (this.target)
            {
                $("[data-binder-id='"+this.id+"']").remove();
                if (this.append) this.target.append("<div data-binder-id='" + this.id + "'>" + this.append + "</div>");
                if (this.before) this.target.before("<div data-binder-id='" + this.id + "'>" + this.before + "</div>");
                if (this.after) this.target.after("<div data-binder-id='" + this.id + "'>" + this.after + "</div>");
                if (this.css) setStyles(this.target, this.css);
                if (this.addclass) this.target.addClass(this.addclass);
                if (this.delclass) this.target.removeClass(this.delclass);
                if (this.radio)
                {
                    if (typeof this.radio == "boolean") this.elem.find("input[type=radio]").prop({'checked': true});
                    else
                    {
                        var radio = $(this.radio);
                        if (radio) radio.prop({'checked': true});
                    }
                }
                if (this.checkbox)
                {
                    if (typeof this.checkbox == "boolean") this.elem.find("input[type=checkbox]").prop({'checked': true});
                    else
                    {
                        var checkbox = $(this.checkbox);
                        if (checkbox) checkbox.prop({'checked': true});
                    }
                }

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
