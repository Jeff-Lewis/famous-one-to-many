define(
	"app/widgets/SplitImages", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Surface", 
		"famous/ImageSurface", 
		"famous/Modifier", 
		"famous-animation/Easing"
	], 
	function (t, i, e) 
	{
        function s() {
            n.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.modifiers = [], o.call(this)
        }

        function o() {
            for (var t = 0; t < this.options.images.length; t++) this.addImage(this.options.images[t]);
            this.setDepth(this.options.depth)
        }

        var n = t("famous/View"),
            r = t("famous/Matrix"),
            a = t("famous/Surface");
        t("famous/ImageSurface");
        var h = t("famous/Modifier"),
            u = t("famous-animation/Easing");
        s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            images: [],
            size: [400, 400],
            depth: 50,
            classes: ["backface-visible", "no-user-select"]
        }, s.prototype.setDepth = function (t) {
            for (var i = 0; i < this.modifiers.length; i++) this.modifiers[i].halt(), this.modifiers[i].setTransform(r.translate(0, 0, t * i), {
                curve: u.outCubicNorm,
                duration: 400
            }), i == this.modifiers.length - 1 && (this._maxDepth = t * i)
        }, s.prototype.getMaxDepth = function () {
            return this._maxDepth
        }, s.prototype.addImage = function (t) {
            var i = this.modifiers.length,
                e = new a({
                    content: '<img class="no-user-select", width="' + this.options.size[0] + '" draggable="false" src="' + t + '"></img>',
                    size: this.options.size,
                    classes: this.options.classes
                }),
                s = new h({
                    transform: r.translate(0, 0, i * this.options.depth)
                });
            e.pipe(this), this.modifiers.push(s), this.node.add(s).link(e)
        }, e.exports = s
    }
);