define(
    "core/Signup", 
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
            h.apply(this, arguments), this.close, this.closeMod, this.signupBacking, this.signupBackingMod, this._signupSize, this.openForm, this.openFormMod, this.error, this.errorMod, this.signupData, this._initData = r.bind(this), this._isVisible = !0, this.initSignup(), this.events()
        }

        function o() {
            this._originalSignupMessage = l.getSignupButton(), l.setSignupButton(l.getLoadingStart()), this.resetBackingContent()
        }

        function n() {
            l.setSignupButton(l.getLoadingEnd()), this.resetBackingContent()
        }

        function r() {
            this.signupData = new c({
                formId: "famous-signup-form",
                emailId: "famous-signup-email",
                githubId: "famous-signup-github",
                twitterId: "famous-signup-twitter"
            }), this.eventOutput.emit("dataAdded", this.signupData), this.dataEvents(), a.unbind("postrender", this._initData)
        }
        var a = t("famous/Engine"),
            h = t("famous/View");
        t("famous/Matrix"), t("famous/ImageSurface"), t("famous/Surface");
        var u = t("./ExpandingSurface"),
            p = t("famous/Modifier");
        t("famous/Utility"), t("./Fader"), t("famous-animation/Easing"), t("famous-utils/Utils"), t("famous-utils/KeyCodes"), t("app/ID"), t("famous-utils/Time"), t("./Submit"), t("famous/RenderNode"), t("app/SceneController");
        var c = t("./SignupData"),
            l = t("./SignupContent"),
            f = t("famous/Transitionable"),
            d = t("famous-physics/utils/PhysicsTransition");
        f.registerMethod("physics", d), s.prototype = Object.create(h.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
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
            a.on("postrender", this._initData), this.signupBacking.on("resize", function (t) {
                this._signupSize = t, this.signupData && this.signupData.reset(), this.eventOutput.emit("resize")
            }.bind(this))
        }, s.prototype.dataEvents = function () {
            this.signupData.on("loadingStart", o.bind(this)), this.signupData.on("loadingEnd", n.bind(this))
        }, s.prototype.resetBackingContent = function () {
            this.signupBacking.setContent(l.getContent()), this.signupBacking.setHeightDirty()
        }, s.prototype.initSignup = function () {
            this._signupSize = [256, 20], this.signupBacking = new u({
                content: l.getContent(),
                size: this._signupSize
            }), this.signupBackingMod = new p({
                opacity: 1
            }), this.node.add(this.signupBackingMod).link(this.signupBacking)
        }, s.prototype.setVisible = function (t) {
            this._isVisible = t
        }, s.prototype.getSize = function () {
            return this.signupBacking.getSize()
        }, e.exports = s
    }
); 