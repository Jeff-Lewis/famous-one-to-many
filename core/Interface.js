define(
	"core/Interface", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/Modifier", 
		"famous/Matrix", 
		"famous/Utility", 
		"famous-scene/Scene", 
		"famous-utils/Utils", 
		"famous-utils/KeyCodes", 
		"famous-animation/Easing", 
		"famous-utils/Time", 
		"famous/Transitionable", 
		"famous-physics/utils/PhysicsTransition", 
		"./NextButton", 
		"./Signup2", 
		"./UI"
	], 
	function (t, i, e) 
	{
        function s() {
            o.apply(this, arguments), this.options.useUI && (this.UI = new c({
                offset: this.options.offset,
                buttonSize: this.options.buttonSize
            }), this.UI.pipe(this.eventOutput), this.node.add(this.UI)), this.options.useNext && "s.codepen.io" !== window.location.host && (this.nextButton = new u({
                offset: this.options.offset,
                buttonSize: this.options.buttonSize,
                position: this.options.nextPosition
            }), this.node.add(this.nextButton)), this.options.useSignup && (this.signup = new p({
                offset: this.options.offset,
                buttonSize: this.options.buttonSize,
                textInputScale: this.options.textInputScale,
                submitScale: this.options.submitScale
            }), this.node.add(this.signup)), this._uiHidden = !1, this.initForm = this.options.useSignup ? !1 : !0
        }

        t("famous/Surface"), t("famous/Modifier"), t("famous/Matrix"), t("famous/Utility");
        var o = t("famous-scene/Scene"),
            n = t("famous-utils/Utils");
        t("famous-utils/KeyCodes");
        var r = t("famous-animation/Easing");
        t("famous-utils/Time");
        var a = t("famous/Transitionable"),
            h = t("famous-physics/utils/PhysicsTransition");
        a.registerMethod("physics", h);
        var u = t("./NextButton"),
            p = t("./Signup2"),
            c = t("./UI");
        s.prototype = Object.create(o.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            useUI: !0,
            useNext: !0,
            useSignup: !1,
            buttonSize: [40, 40],
            offset: [20, 20],
            nextPosition: "tr",
            submitScale: 2,
            textInputScale: 6,
            uiFadeTransition: {
                curve: r.inOutBackNorm,
                duration: 400
            },
            uiScaleTransition: {
                curve: r.inOutCubicNorm,
                duration: 400
            },
            hoverTransition: {
                curve: r.inOutSineNorm,
                duration: 800
            },
            hideAllTransition: {
                curve: r.inOutBackNorm,
                duration: 800
            }
        }, s.prototype.hideAllUI = function () {
            this._uiHidden = !0, this.signup && this.signup.hideAll(), this.UI && this.UI.hideAll(), this.nextButton && this.nextButton.hideAll()
        }, s.prototype.showAllUI = function () {
            this._uiHidden = !1, this.signup && this.signup.showAll(), this.UI && this.UI.showAll(), this.nextButton && this.nextButton.showAll()
        }, s.prototype.setCurrentObject = function (t) {
            this.UI.setCurrentObject(t)
        }, s.prototype.resize = function () {
            this.width = n.getWidth(), this.height = n.getHeight(), !this._uiHidden && this.signup && this.signup.showLogo(), this.nextButton && this.nextButton.resize(), this.signup && this.signup.resize(), this.UI && this.UI.resize()
        }, s.prototype.mousemove = function (t) {
            if (!this._uiHidden) {
                var i = Math.max(this.height / 3, this.options.buttonSize[0] * (this.options.textInputScale + this.options.submitScale) + 3 * this.options.offset[0]);
                this.UI && this.UI.mousemove(t, i), this.nextButton && this.nextButton.mousemove(t, i)
            }
        }, s.prototype.update = function () {}, e.exports = s
    }
); 