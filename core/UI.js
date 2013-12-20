define(
	"core/UI", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Surface", 
		"famous/Utility", 
		"famous/Modifier", 
		"famous/Engine", 
		"famous-animation/Easing", 
		"famous-ui/AutoUI", 
		"famous-ui/Buttons/RotateButton", 
		"famous-utils/Time", 
		"famous-utils/Utils"
	], 
	function (t, i, e) 
	{
	    function s() {
            o.apply(this, arguments), this.buttonOpacity = .25, this.uiShowMatrix, this.uiHideMatrix, this.shownPositions, this.hiddenPositions, this.button, this.buttonModifier, this.ui, this.uiModifier, this._uiAdded = !1, this._uiVisible = !1, this.positions(), this.initButton(), this.initUI(), this.events(), this.show()
        }

        var o = t("famous/View"),
            n = t("famous/Matrix");
        t("famous/Surface"), t("famous/Utility");
        var r = t("famous/Modifier");
        t("famous/Engine");
        var a = t("famous-animation/Easing"),
            h = t("famous-ui/AutoUI"),
            u = t("famous-ui/Buttons/RotateButton");
        t("famous-utils/Time");
        var p = t("famous-utils/Utils");
        s.prototype = Object.create(o.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            buttonSize: [40, 40],
            offset: [20, 20],
            uiFadeTransition: {
                curve: a.inOutBackNorm,
                duration: 400
            },
            uiScaleTransition: {
                curve: a.inOutCubicNorm,
                duration: 400
            },
            hoverTransition: {
                curve: a.inOutSineNorm,
                duration: 800
            }
        }, s.prototype.positions = function () {
            this.uiShowMatrix = n.translate(this.options.offset[0], 1.75 * this.options.offset[1] + this.options.buttonSize[1], 0), this.uiHideMatrix = n.multiply(n.scale(1, 1e-4, 1), this.uiShowMatrix), this.shownPositions = {
                button: n.translate(this.options.offset[0], this.options.offset[1], 0)
            }, this.hiddenPositions = {
                button: n.translate(this.options.offset[0], -(this.options.buttonSize[0] + this.options.offset[1]), 0)
            }
        }, s.prototype.initButton = function () {
            this.button = new u({
                surfaceOptions: {
                    properties: {
                        backgroundColor: "rgba( 0, 0, 0, 0.0)"
                    },
                    content: '<img draggable="false" class="no-user-select" src="js/core/plus.svg" height="' + this.options.buttonSize[1] + '"></img>',
                    size: this.options.buttonSize
                }
            }), this.buttonModifier = new r({
                size: this.options.buttonSize,
                transform: this.hiddenPositions.button,
                opacity: this.buttonOpacity
            }), this.node.add(this.buttonModifier).link(this.button)
        }, s.prototype.initUI = function () {
            this.ui = new h, this.uiModifier = new r({
                transform: this.uiHideMatrix,
                opacity: 0
            }), this.node.add(this.uiModifier).link(this.ui)
        }, s.prototype.events = function () {
            this.button.on("open", this.showUI.bind(this)), this.button.on("close", this.hideUI.bind(this))
        }, s.prototype.mousemove = function (t, i) {
            var e = p.distance(t.pageX, t.pageY, this.buttonX, this.buttonY);
            i > e || this.uiModifier.getOpacity() > .01 ? 1 != this.buttonOpacity && (this.buttonOpacity = 1, this.buttonModifier.halt(), this.buttonModifier.setOpacity(this.buttonOpacity, this.options.hoverTransition)) : .5 != this.buttonOpacity && (this.buttonOpacity = .5, this.buttonModifier.halt(), this.buttonModifier.setOpacity(this.buttonOpacity, this.options.hoverTransition))
        }, s.prototype.resize = function () {
            this.positions(), this.ui.panel.setOptions({
                clipSize: window.innerHeight - 2 * this.options.offset[1] - this.options.buttonSize[1]
            })
        }, s.prototype.showAll = function () {
            this._uiVisible && this.button.open(), this.show()
        }, s.prototype.hideAll = function () {
            this._uiVisible && this.button.close(), this.hide()
        }, s.prototype.showUI = function () {
            this._uiVisible = !0, this.uiModifier.halt(), this.uiModifier.setTransform(this.uiShowMatrix, this.options.uiScaleTransition), this.uiModifier.setOpacity(1, this.options.uiFadeTransition), this.eventOutput.emit("showUI")
        }, s.prototype.hideUI = function () {
            this._uiVisible = !1, this.uiModifier.halt(), this.uiModifier.setTransform(this.uiHideMatrix, this.options.uiScaleTransition), this.uiModifier.setOpacity(0, this.options.uiFadeTransition), this.eventOutput.emit("hideUI")
        }, s.prototype.show = function () {
            var t = this.shownPositions.button,
                i = this.options.buttonSize;
            this.buttonX = t[12] + .5 * i[0], this.buttonY = t[13] + .5 * i[1], this.buttonModifier.halt(), this.buttonModifier.setTransform(t, this.options.uiFadeTransition)
        }, s.prototype.hide = function () {
            var t = this.hiddenPositions.button,
                i = this.options.buttonSize;
            this.buttonX = t[12] + .5 * i[0], this.buttonY = t[13] + .5 * i[1], this.buttonModifier.halt(), this.buttonModifier.setTransform(t, this.options.uiFadeTransition)
        }, s.prototype.setCurrentObject = function (t) {
            this.ui.setCurrentObject(t)
        }, e.exports = s
    }
); 