define(
	"app/FlipButton", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous/Surface", 
		"famous/ContainerSurface", 
		"famous/RenderNode", 
		"famous/ImageSurface", 
		"famous-animation/Easing", 
		"famous-animation/Easing"
	], 
	function (t, i, e) 
	{
        function s() {
            o.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.container = new a({
                size: this.options.size
            }), this.container.setProperties({
                overflow: "hidden"
            }), this.imageOptions = [], this.numOptions = this.options.imageURLs.length, this.shownOption = 0, this.mainNode = new h, this.modifier = new r({
                modifier: n.identity
            }), this.container.link(this.modifier).link(this.mainNode), this.initImages()
        }
        var o = t("famous/View"),
            n = t("famous/Matrix"),
            r = t("famous/Modifier");
        t("famous/Surface");
        var a = t("famous/ContainerSurface"),
            h = t("famous/RenderNode"),
            u = t("famous/ImageSurface"),
            p = t("famous-animation/Easing"),
            p = t("famous-animation/Easing");
        s.prototype = Object.create(o.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            size: [50, 50],
            imageURLs: ["", ""],
            imageSize: 50,
            padding: 10,
            animationDirection: "l-r",
            transition: {
                curve: p.inOutBackNorm,
                duration: 450
            },
            defaultOption: 0
        }, s.prototype.initImages = function () {
            for (var t = 0; t < this.options.imageURLs.length; t++) {
                var i = "l-r" === this.options.animationDirection ? n.translate(this.options.padding / 2 + this.options.imageSize * t, this.options.padding / 2, 0) : n.translate(this.options.padding / 2, this.options.padding / 2 + this.options.imageSize * t, 0),
                    e = {
                        surface: new u({
                            size: [this.options.size[0] - this.options.padding, this.options.size[1] - this.options.padding],
                            content: this.options.imageURLs[t]
                        }),
                        modifier: new r({
                            transform: i
                        })
                    };
                this.mainNode.add(e.modifier).link(e.surface), e.surface.pipe(this), this.imageOptions.push(e)
            }
        }, s.prototype.toggle = function (t) {
            this.shownOption++, this.shownOption == this.numOptions && (this.shownOption = 0), this.animateTo(this.shownOption, t)
        }, s.prototype.animateTo = function (t, i) {
            if (this.shownOption = t, "l-r" === this.options.animationDirection) var e = this.options.size[0] * -this.shownOption,
            s = n.translate(e, 0, 0);
            else var e = this.options.size[1] * -this.shownOption,
            s = n.translate(0, e, 0);
            this.modifier.halt(), this.modifier.setTransform(s, this.options.transition, i)
        }, s.prototype.render = function () {
            return this.container.render()
        }, e.exports = s
    }
); 