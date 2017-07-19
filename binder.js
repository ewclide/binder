$(document).ready(function(){
        function Binder(options)
        {
            this.setOptions(options).to([
                "id",
                "elem",
                "target",
                "before",
                "after",
                "append",
                "replace",
                "css",
                "radio",
                "radio_target",
                "checkbox",
                "checkbox_target",
                "addclass",
                "delclass",
                "append_target",
                "replace_target"
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
                var attribute = element.attr("data-" + name.replace("_", "-"));
                if (attribute !== undefined)
                {
                    switch (options[name])
                    {
                        case "selector" :
                            attribute = $(attribute);
                            if (!attribute) console.error("attribute " + name + " in element " + this.elem + " must be selector!");
                            else this[name] = attribute;
                            break;
                        case "html" :
                            this[name] = attribute;
                            break;
                        case "null" :
                            this[name] = true;
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
                    target   : "selector",
                    radio    : "selector",
                    checkbox : "selector",
                    append   : "html",
                    before   : "html",
                    after    : "html",
                    replace  : "html",
                    css      : "html",
                    addclass : "html",
                    delclass : "html",
                    radio_target    : "selector",
                    checkbox_target : "selector",
                    append_target   : "selector",
                    replace_target  : "selector"
                });
                if (!this.target.attr("data-binder-target-id")) this.target.attr("data-binder-target-id", Math.random());
                this.id = this.target.attr("data-binder-target-id");
                var self = this;
                this.elem.click(function(){
                    self.import();
                });
            }
        }
        Binder.prototype.import = function()
        {
            if (this.target)
            {
                $("[data-binder-id='"+this.id+"']").remove();
                if (this.append)
                {
                    var content = "<div data-binder-id='" + this.id + "'>" + this.append + "</div>";
                    if (this.append_target) this.append_target.append(content);
                    else this.target.append(content);
                }
                if (this.before) this.target.before("<div data-binder-id='" + this.id + "'>" + this.before + "</div>");
                if (this.after) this.target.after("<div data-binder-id='" + this.id + "'>" + this.after + "</div>");
                if (this.replace)
                {
                    var content = "<div data-binder-id='" + this.id + "'>" + this.replace + "</div>";
                    if (this.replace_target)
                    {
                         this.replace_target.empty();
                         this.replace_target.append(content);
                    }
                    else
                    {
                        this.target.empty();
                        this.target.append(content);
                    }
                }
                if (this.css) this.target.attr("style", this.css);
                if (this.addclass) this.target.addClass(this.addclass);
                if (this.delclass) this.target.removeClass(this.delclass);
                if (this.radio_target)
                {
                    var radio = this.radio_target;
                        radio.prop({'checked': true});
                        radio.change();
                }
                if (this.radio)
                {
                    var radio = this.elem.find("input[type=radio]");
                        radio.prop({'checked': true});
                        radio.change();
                }
                if (this.checkbox_target)
                {
                    var checkbox = this.checkbox_target;
                        checkbox.prop({'checked': true});
                        checkbox.change();
                }
                if (this.checkbox)
                {
                    var checkbox = this.elem.find("input[type=checkbox]")
                        checkbox.prop({'checked': true});
                        checkbox.change();
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
