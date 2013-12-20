define(
	"core/Fader", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/View", 
		"famous/Modifier"
	], 
	function (t, i, e) 
	{
        function s() {
            n.apply(this, arguments), this.fade = new o({
                properties: {
                    backgroundColor: this.options.color
                },
                classes: ["bg-fader"]
            }), this.fadeMod = new r({
                opacity: this.options.visible ? this.options.fadePercent : 0
            }), this.node.link(this.fadeMod).link(this.fade)
        }

        var o = t("famous/Surface"),
            n = t("famous/View"),
            r = t("famous/Modifier");
        s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            color: "#000000",
            fadePercent: .8,
            visible: !0,
            fadeTransition: {
                curve: "outExpoNorm",
                duration: 500
            },
            fadePercent: .8
        }, s.prototype.show = function () {
            this.fadeMod.setOpacity(this.options.fadePercent, this.options.fadeTransition)
        }, s.prototype.hide = function () {
            this.fadeMod.setOpacity(0, this.options.fadeTransition)
        }, e.exports = s
    }
);