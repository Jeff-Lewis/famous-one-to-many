define(
	"core/SignupError", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Engine", 
		"famous/View", 
		"famous/Matrix", 
		"famous/ImageSurface", 
		"famous/Surface", 
		"./ExpandingSurface", 
		"famous/Modifier", 
		"famous/Utility", 
		"./Fader", 
		"famous-animation/Easing", 
		"famous-utils/Utils", 
		"famous-utils/KeyCodes", 
		"app/ID", 
		"famous-utils/Time", 
		"./Submit", 
		"famous/RenderNode", 
		"app/SceneController", 
		"./SignupData", 
		"./SignupContent", 
		"famous/Transitionable", 
		"famous-physics/utils/PhysicsTransition"
	], 
	function (t, i, e) 
	{
        function s() {
            a.apply(this, arguments), this.error, this.errorMod, this.signupData, this._isVisible = !0, this.initError(), this.events()
        }

        function o(t) {
            this.signupData = t, this.dataEvents()
        }

        function n(t) {
            this.setErrorFailed(), this.setErrorContent(t), this.showError()
        }

        function r() {
            this.setErrorSuccess(), this.setErrorContent("Success!"), this.showError()
        }
        t("famous/Engine");
        var a = t("famous/View"),
            h = t("famous/Matrix");
        t("famous/ImageSurface");
        var u = t("famous/Surface");
        t("./ExpandingSurface");
        var p = t("famous/Modifier");
        t("famous/Utility"), t("./Fader"), t("famous-animation/Easing"), t("famous-utils/Utils"), t("famous-utils/KeyCodes"), t("app/ID");
        var c = t("famous-utils/Time");
        t("./Submit"), t("famous/RenderNode"), t("app/SceneController"), t("./SignupData"), t("./SignupContent");
        var l = t("famous/Transitionable"),
            f = t("famous-physics/utils/PhysicsTransition");
        l.registerMethod("physics", f), s.prototype = Object.create(a.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            signup: void 0,
            animateScene: !0,
            closeSize: [50, 50],
            hideOpen: !1,
            hideOpenOnMobile: !0,
            openButtonZPos: 2,
            errorFailedProperties: {
                color: "rgb(253, 98, 85)"
            },
            errorSuccessProperties: {
                color: "rgb(90, 226, 132)"
            }
        }, s.prototype.events = function () {
            this.options.signup.on("dataAdded", o.bind(this))
        }, s.prototype.dataEvents = function () {
            this.signupData.on("success", r.bind(this)), this.signupData.on("error", n.bind(this))
        }, s.prototype.initError = function () {
            this.error = new u({
                size: window.innerWidth > 1400 ? [.25 * window.innerWidth, 100] : [.75 * window.innerWidth, 100],
                classes: ["famous-signup-error"]
            }), this.errorMod = new p({
                transform: h.move(h.scale(1e-5, 1e-5), [0, 0, 3]),
                origin: [.5, 0],
                opacity: 0
            }), this.node.add(this.errorMod).link(this.error)
        }, s.prototype.showError = function () {
            var t = {
                curve: "outExpoNorm",
                duration: 500
            };
            this.errorMod.setOpacity(1, t), this.errorMod.setOrigin([.5, .25], t), this.errorMod.setTransform(h.translate(0, 0, 4), t), c.setTimeout(this.hideError.bind(this), 3e3)
        }, s.prototype.hideError = function () {
            var t = {
                curve: "inOutExpoNorm",
                duration: 500
            };
            this.errorMod.halt(), this.errorMod.setOrigin([.5, 0], t), this.errorMod.setOpacity(0, t), this.errorMod.setTransform(h.move(h.scale(1e-5, 1e-5), [0, 0, 4]), t)
        }, s.prototype.setErrorContent = function (t) {
            this.error.setContent(t)
        }, s.prototype.setErrorFailed = function () {
            this.error.setProperties(this.options.errorFailedProperties)
        }, s.prototype.setErrorSuccess = function () {
            this.error.setProperties(this.options.errorSuccessProperties)
        }, s.prototype.setVisible = function (t) {
            this._isVisible = t
        }, s.prototype.getSize = function () {
            return this.error.getSize()
        }, e.exports = s
    }
); 