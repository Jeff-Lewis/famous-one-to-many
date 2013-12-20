define(
    "core/Signup2", 
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
            p.apply(this, arguments), this.fade, this.close, this.closeModifier, this.signupBacking, this.signupBackingMod, this._signupSize, this.openForm, this.openFormMod, this.error, this.errorMod, this.signupData, this._initData = a.bind(this), this._isVisible = !0, this.initSignup(), this.initFade(), this.initError(), this.initClose(), this.initOpen(), this._sendSceneBack = h.bind(this), this.events(), this.options.animateScene ? (this._animateScene = function () {
                this.activate(), S.unbind("activate", this._animateScene)
            }.bind(this), S.on("activate", this._animateScene)) : this.activate()
        }

        function o() {
            this._originalSignupMessage = x.getSignupButton(), x.setSignupButton(x.getLoadingStart()), this.resetBackingContent()
        }

        function n() {
            x.setSignupButton(x.getLoadingEnd()), this.resetBackingContent()
        }

        function r(t) {
            this.setErrorContent(t), this.showError(), x.setSignupButton(this._originalSignupMessage), this.resetBackingContent()
        }

        function a() {
            this.signupData = new b({
                formId: "famous-signup-form",
                emailId: "famous-signup-email",
                githubId: "famous-signup-github",
                twitterId: "famous-signup-twitter"
            }), this.dataEvents(), u.unbind("postrender", this._initData)
        }

        function h() {
            if (this.options.animateScene) {
                if (g.isWebkit()) S.setActiveTransform(c.translate(0, 0, -500), {
                    curve: "outBounceNorm",
                    duration: 500
                });
                else {
                    var t = S.getActiveTransform();
                    t.setOpacity(0, {
                        curve: "outExpoNorm",
                        duration: 500
                    })
                }
                S.unbind("activate", this._sendSceneBack)
            }
        }

        var u = t("famous/Engine"),
            p = t("famous/View"),
            c = t("famous/Matrix"),
            l = t("famous/ImageSurface"),
            f = t("famous/Surface"),
            d = t("./ExpandingSurface"),
            m = t("famous/Modifier");
        t("famous/Utility");
        var y = t("./Fader");
        t("famous-animation/Easing");
        var g = t("famous-utils/Utils");
        t("famous-utils/KeyCodes"), t("app/ID");
        var v = t("famous-utils/Time");
        t("./Submit"), t("famous/RenderNode");
        var S = t("app/SceneController"),
            b = t("./SignupData"),
            x = t("./SignupContent"),
            w = t("famous/Transitionable"),
            z = t("famous-physics/utils/PhysicsTransition");
        w.registerMethod("physics", z), s.prototype = Object.create(p.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            animateScene: !0,
            closeSize: [50, 50]
        }, s.prototype.events = function () {
            u.on("resize", this.resize.bind(this)), u.on("postrender", this._initData), this.signupBacking.on("resize", function (t) {
                this._signupSize = t, this.signupData && this.signupData.reset()
            }.bind(this)), this.openForm.on("click", this.activate.bind(this)), this.close.on("click", this.deactivate.bind(this))
        }, s.prototype.dataEvents = function () {
            this.signupData.on("loadingStart", o.bind(this)), this.signupData.on("loadingEnd", n.bind(this)), this.signupData.on("error", r.bind(this))
        }, s.prototype.resize = function () {
            this._isVisible && (this._closePosition(), this.resizeSignup(), this.showBacking())
        }, s.prototype.activate = function () {
            this.setVisible(!0), this._sendSceneBack(), this.fade.show(), this.showBacking(), this.showClose(), this.hideOpenButton()
        }, s.prototype.deactivate = function () {
            this.hideBacking(), this.hideClose(this.setVisible.bind(this, !1)), this.fade.hide(), this.returnScene(), this.showOpenButton()
        }, s.prototype.resizeSignup = function () {
            this._signupSize = window.innerWidth > 800 ? [.5 * window.innerWidth, .5 * window.innerHeight] : [.9 * window.innerWidth, .9 * window.innerHeight], this.signupBacking.setSize(this._signupSize), this.signupBacking.setHeightDirty()
        }, s.prototype.resetBackingContent = function () {
            this.signupBacking.setContent(x.getContent()), this.signupBacking.setHeightDirty()
        }, s.prototype.initFade = function () {
            this.fade = new y, this.node.add(this.fade)
        }, s.prototype.initSignup = function () {
            var t = window.innerWidth,
                i = window.innerHeight;
            this.signupBacking = new d({
                content: x.getContent()
            }), this.resizeSignup(), this.signupBackingMod = new m({
                transform: c.translate(.5 * t - .5 * this._signupSize[0], .5 * i - .5 * this._signupSize[1], 1),
                opacity: 0
            }), this.node.add(this.signupBackingMod).link(this.signupBacking)
        }, s.prototype.initClose = function () {
            this.close = new l({
                content: "js/core/x.svg",
                classes: ["famous-signup-close"],
                size: [50, 50]
            }), this.closeMod = new m({
                transform: c.translate(.5 * window.innerWidth + .5 * this._signupSize[0] - .5 * this.options.closeSize[0], 0, 2),
                opacity: 0
            }), this._closePosition(), this.node.add(this.closeMod).link(this.close)
        }, s.prototype.initOpen = function () {
            this.openForm = new f({
                size: [120, 40],
                classes: ["famous-signup-open"],
                content: x.getOpenMessage()
            }), this.openMod = new m({
                origin: [1, .5],
                transform: c.move(c.rotateZ(.5 * -Math.PI), [-20, -20]),
                opacity: 0
            }), this.node.add(this.openMod).link(this.openForm)
        }, s.prototype.initError = function () {
            this.error = new f({
                size: [this._signupSize[0], 50]
            }), this.errorMod = new m({
                transform: c.translate(.5 * window.innerWidth - .5 * this._signupSize[0], .5 * window.innerHeight + .5 * this._signupSize[1] + 100, 2),
                opacity: 0
            }), this.node.add(this.errorMod).link(this.error)
        }, s.prototype._closePosition = function () {
            this.closeMod.halt();
            var t = {
                method: "physics",
                spring: {
                    period: 800,
                    dampingRatio: .35
                },
                wall: !0,
                v: 0
            };
            this.closeMod.setOrigin([0, 0], t), this.closeMod.setTransform(c.translate(.5 * (window.innerWidth - this._signupSize[0]) + this._signupSize[0] - .5 * this.options.closeSize[0], Math.max(.5 * (window.innerHeight - this._signupSize[1]) - .5 * this.options.closeSize[1], 20), 2), t)
        }, s.prototype.showOpenButton = function () {
            this.openMod.setOpacity(1, {
                curve: "outExpoNorm",
                duration: 800
            })
        }, s.prototype.hideOpenButton = function () {
            this.openMod.setOpacity(0, {
                curve: "outExpoNorm",
                duration: 500
            })
        }, s.prototype.showError = function () {
            this.errorMod.setOpacity(1, {
                curve: "outExpoNorm",
                duration: 500
            }), this.errorMod.setTransform(c.translate(.5 * window.innerWidth - .5 * this._signupSize[0], .5 * window.innerHeight + .5 * this._signupSize[1] + 10, 2), {
                curve: "outExpoNorm",
                duration: 500
            }), v.setTimeout(this.hideError.bind(this), 3e3)
        }, s.prototype.hideError = function () {
            var t = c.getTranslate(this.errorMod.getFinalTransform());
            this.errorMod.halt(), this.errorMod.setOpacity(0, {
                curve: "outExpoNorm",
                duration: 500
            }), this.errorMod.setTransform(c.translate(t[0], t[1] + 100, t[2]), {
                curve: "outExpoNorm",
                duration: 500
            })
        }, s.prototype.showBacking = function () {
            var t = {
                curve: "outBackNorm",
                duration: 800
            };
            this.signupBackingMod.halt(), this.signupBackingMod.setTransform(c.translate(.5 * window.innerWidth - .5 * this._signupSize[0], Math.max(.5 * window.innerHeight - .5 * this._signupSize[1], 20), 1), t), this.signupBackingMod.setOpacity(1, t)
        }, s.prototype.hideBacking = function () {
            var t = {
                curve: "outBackNorm",
                duration: 500
            };
            this.signupBackingMod.setTransform(c.move(c.scale(1e-4, 1), [window.innerWidth, .5 * window.innerHeight]), t), this.signupBackingMod.setOpacity(0, t)
        }, s.prototype.showClose = function () {
            this._closePosition(), this.closeMod.setOpacity(1, {
                curve: "outExpoNorm",
                duration: 500
            })
        }, s.prototype.hideClose = function (t) {
            var i = {
                curve: "inOutBackNorm",
                duration: 500
            };
            this.closeMod.setTransform(c.move(c.scale(1e-4, 1), [window.innerWidth, .5 * window.innerHeight]), i, t), this.closeMod.setOpacity(0, {
                curve: "outExpoNorm",
                duration: 500
            })
        }, s.prototype.setErrorContent = function (t) {
            this.error.setContent('<div class="famous-signup-error">' + t + "</div>")
        }, s.prototype.setVisible = function (t) {
            this._isVisible = t
        }, s.prototype.returnScene = function () {
            if (g.isWebkit()) S.setActiveTransform(c.identity, {
                curve: "outExpoNorm",
                duration: 500
            });
            else {
                var t = S.getActiveTransform();
                t.setOpacity(1, {
                    curve: "outExpoNorm",
                    duration: 500
                })
            }
        }, e.exports = s
    }
); 