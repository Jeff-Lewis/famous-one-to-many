define(
	"app/DescriptionPanel", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous/Surface", 
		"famous-animation/Easing", 
		"app/FlipButton", 
		"famous-utils/Utils", 
		"app/Drawer", 
		"famous/Engine", 
		"famous-utils/Time", 
		"famous/RenderNode"
	], 
	function (t, i, e) 
	{
        function s(t, i) {
            if (m.apply(this, arguments), this.mainNode = new M, this.options.autoShowDistance < this.options.size && (this.options.autoShowDistance = this.options.size), this.panel = void 0, this.panelModifier = void 0, void 0 != i && (this.panel = i, this.panelModifier = new y({
                transform: g.translate(this.options.padding, this.options.padding)
            })), this.drawer = new b({
                dir: this.options.position,
                actionDistance: 50,
                zDepth: 2
            }, this.options.size), w.isWebkit() && (this.descriptionSurface = o.call(this), this.descriptionSurface.pipe(this.drawer), this.mainNode.add(new y({
                transform: g.translate(0, 0, -2)
            })).link(this.descriptionSurface)), this.closingTab = new x({
                imageURLs: f.call(this),
                animationDirection: d.call(this)
            }), w.isMobile() && (this.closingTab.pipe(this.drawer), this.closingTab.on("touchstart", a.bind(this)), this.closingTab.on("touchmove", h.bind(this)), this.closingTab.on("touchend", u.bind(this))), this.closingTab.on("click", r.bind(this)), this.options.autoShow && window.innerWidth > 800) {
                z.on("mousemove", p.bind(this)), this.max = l.call(this);
                var e = function () {
                    if (this.descriptionSurface) {
                        var t = this.descriptionSurface.getSize();
                        this.descriptionSurface.setSize([t[0], w.getHeight()])
                    }
                    this.tabModifier.halt(), this.tabModifier.setTransform(n.call(this), {
                        curve: S.inOutBackNorm,
                        duration: 300
                    }), this.max = l.call(this)
                }.bind(this);
                z.on("resize", w.debounce(e, 500))
            }
            this.tabInit = [0, 0], this.tabMove = [0, 0], this.tabModifier = new y({
                transform: n.call(this)
            }), this._dirty = !0, this.uiOffset = 0, this.node.add(this.drawer), this.drawer.contentFrom(this.mainNode), this.mainNode.add(this.tabModifier).link(this.closingTab), void 0 != this.panel && this.mainNode.add(this.panelModifier).link(this.panel), this.drawer.on("opening", function () {
                this.closingTab.animateTo(1), this.eventOutput.emit("opening")
            }.bind(this)), this.drawer.on("closing", function () {
                this.closingTab.animateTo(0), this.eventOutput.emit("closing")
            }.bind(this))
        }

        function o() {
            var t = "l" == this.options.position || "r" == this.options.position ? [this.options.size, window.innerHeight] : [window.innerWidth, this.options.size],
                i = new v({
                    size: t
                });
            return this.elemId = "description-panel" + s.currId++, i.addClass(this.elemId), i.addClass("description-panel"), i
        }

        function n() {
            var t = window.innerHeight / 2 - this.options.closingTabSize / 2,
                i = window.innerWidth / 2 - this.options.closingTabSize / 2;
            return "r" == this.options.position ? g.translate(-this.options.closingTabSize, t, 0) : "l" === this.options.position ? g.translate(this.options.size, t, 0) : "t" === this.options.position ? g.translate(i, this.options.size, 0) : g.translate(i, -this.options.closingTabSize, 0)
        }

        function r(t) {
            t.stopPropagation(), t.preventDefault(), this.toggleVisible()
        }

        function a(t) {
            this.tabInit = [t.touches[0].pageX, t.touches[0].pageY]
        }

        function h(t) {
            this.tabMove = [t.touches[0].pageX, t.touches[0].pageY]
        }

        function u() {
            var t = [Math.abs(this.tabInit[0] - this.tabMove[0]), Math.abs(this.tabInit[1] - this.tabMove[1])];
            (0 == this.tabMove[0] && 0 == this.tabMove[1] || t[0] < 50 && t[1] < 50) && ("opened" === this.drawer.positionState ? T.setTimeout(this.drawer.close.bind(this.drawer), 2) : T.setTimeout(this.drawer.open.bind(this.drawer), 2)), this.tabMove = [0, 0]
        }

        function p(t) {
            var i = c.call(this, t),
                e = 0 > i ? !0 : !1;
            "opened" === this.drawer.positionState && e === !1 && this.drawer.close(), "closed" === this.drawer.positionState && e === !0 && this.drawer.open()
        }

        function c(t) {
            return "r" == this.options.position ? this.max - t.pageX : "l" == this.options.position ? t.pageX - this.max : "t" == this.options.position ? t.pageY - this.max : this.max - t.pageY
        }

        function l() {
            var t;
            return t = "r" === this.options.position ? window.innerWidth - this.options.autoShowDistance : "l" === this.options.position || "t" == this.options.position ? this.options.autoShowDistance : window.innerHeight - this.options.autoShowDistance
        }

        function f() {
            return "r" == this.options.position ? ["img/buttons/arrow_left_square.svg", "img/buttons/arrow_right_square.svg"] : "l" == this.options.position ? ["img/buttons/arrow_right_square.svg", "img/buttons/arrow_left_square.svg"] : "t" == this.options.position ? ["img/buttons/arrow_bottom_square.svg", "img/buttons/arrow_top_square.svg"] : ["img/buttons/arrow_top_square.svg", "img/buttons/arrow_bottom_square.svg"]
        }

        function d() {
            return "l" == this.options.position || "r" == this.options.position ? "l-r" : "t-b"
        }
        var m = t("famous/View"),
            g = t("famous/Matrix"),
            y = t("famous/Modifier"),
            v = t("famous/Surface"),
            S = t("famous-animation/Easing"),
            x = t("app/FlipButton"),
            w = t("famous-utils/Utils"),
            b = t("app/Drawer"),
            z = t("famous/Engine"),
            T = t("famous-utils/Time"),
            M = t("famous/RenderNode");
        s.prototype = Object.create(m.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            title: "Base Description Panel",
            description: "",
            size: 200,
            padding: 20,
            position: "l",
            closingTabSize: 50,
            closingFontSize: 16,
            hidingAnimation: {
                curve: S.inOutBackNorm,
                duration: 750
            },
            showingAnimation: {
                curve: S.inOutBackNorm,
                duration: 750
            },
            autoShow: !0,
            autoShowDistance: Math.floor(.125 * window.innerWidth)
        }, s.currId = 0, s.prototype.toggleVisible = function (t) {
            "closed" === this.drawer.positionState ? this.show(t) : this.hide(t)
        }, s.prototype.show = function () {
            this.drawer.open(), this.emit("show")
        }, s.prototype.hide = function () {
            this.drawer.close(), this.emit("hide")
        }, e.exports = s
    }), define("famous-utils/Keycodes", ["require", "exports", "module"], function (t, i, e) {
        var s = {
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            a: 97,
            b: 98,
            c: 99,
            d: 100,
            e: 101,
            f: 102,
            g: 103,
            h: 104,
            i: 105,
            j: 106,
            k: 107,
            l: 108,
            m: 109,
            n: 110,
            o: 111,
            p: 112,
            q: 113,
            r: 114,
            s: 115,
            t: 116,
            u: 117,
            v: 118,
            w: 119,
            x: 120,
            y: 121,
            z: 122,
            ENTER: 13,
            LEFT_ARROW: 37,
            RIGHT_ARROW: 39,
            UP_ARROW: 38,
            DOWN_ARROW: 40,
            SPACE: 32,
            SHIFT: 16,
            TAB: 9
        };
        e.exports = s
    }
); 