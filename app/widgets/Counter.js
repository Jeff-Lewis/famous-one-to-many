define(
	"app/widgets/Counter", 
	[
        "require",
        "exports",
        "module",
        "famous/View",
        "famous/Matrix",
        "famous/Surface",
        "famous/Modifier",
        "famous-animation/Easing",
        "famous/Transitionable",
        "famous-physics/utils/PhysicsTransition"
    ], 
    function (t, i, e) 
    {
        function s() {
            if (d.apply(this, arguments),
                this.eventInput.pipe(this.eventOutput),
                this.surfaces = [],
                this.mods = [],
                this._positions = {
                    prev: 0,
                    curr: 1,
                    next: 2
                },
                this._currSelected = 1,
                this.value = this.options.defaultValue,
                localStorage
            ) {
                var t = localStorage.getItem(this.options.localStorageId);
                t && (this.value = parseInt(t))
            }
            n.call(this), o.call(this)
        }

        function o() {
            for (var t = [this.rotations.prev, this.rotations.curr, this.rotations.next], i = 0; 3 > i; i++) {
                var e = new y({
                    size: this.options.size,
                    properties: this.options.numberProperties,
                    content: this.value + "",
                    classes: this.options.numberClasses
                }),
                    s = new g({
                        transform: t[i],
                        opacity: 0
                    });
                this.node.add(s).link(e), this.surfaces.push(e), this.mods.push(s)
            }
            this.mods[this._currSelected].setOpacity(1, this.options.curve)
        }

        function n() {
            var t = this.options.rotation;
            this.rotations = {
                prev: m.aboutOrigin([0, 0, -this.options.radius], m.rotateX(t)),
                curr: m.aboutOrigin([0, 0, -this.options.radius], m.rotateX(0)),
                next: m.aboutOrigin([0, 0, -this.options.radius], m.rotateX(-t))
            }
        }

        function r() {
            var t = (this._currSelected - 1) % 3;
            return -1 == t ? 2 : t
        }

        function a() {
            return (this._currSelected + 1) % 3
        }

        function h(t) {
            var i = this.mods[this._currSelected];
            return i.halt(), i.setTransform(this.rotations.next, this.options.curve, t), i.setOpacity(0, this.options.curve), this._currSelected
        }

        function u(t) {
            var i = r.call(this),
                e = this.mods[i];
            return e.halt(), e.setTransform(this.rotations.curr, this.options.curve, t), e.setOpacity(1, this.options.curve), i
        }

        function p() {
            var t = a.call(this),
                i = this.mods[t];
            return i.halt(), i.setTransform(this.rotations.prev), i.setOpacity(0), t
        }

        function c() {
            var t = this.mods[this._currSelected];
            t.halt(), t.setTransform(this.rotations.prev, this.options.curve, callback), t.setOpacity(0, this.options.curve)
        }

        function l() {
            var t = a.call(this),
                i = this.mods[t];
            return i.halt(), i.setTransform(this.rotations.curr, this.options.curve, callback), i.setOpacity(1, this.options.curve), t
        }

        function f() {
            var t = r.call(this),
                i = this.mods[t];
            return i.halt(), i.setTransform(this.rotations.next), i.setOpacity(0), t
        }

        var d = t("famous/View"),
            m = t("famous/Matrix"),
            y = t("famous/Surface"),
            g = t("famous/Modifier");
        t("famous-animation/Easing");
        var v = t("famous/Transitionable"),
            S = t("famous-physics/utils/PhysicsTransition");
        v.registerMethod("physics", S), s.prototype = Object.create(d.prototype), s.prototype.constructor = s, s.prototype.getSize = function () {
            return this.currNumber.getSize()
        }, s.DEFAULT_OPTIONS = {
            size: [200, 60],
            numberClasses: ["counter-number"],
            numberProperties: {
                textAlign: "left"
            },
            radius: 75,
            curve: {
                method: "physics",
                spring: {
                    period: 700,
                    dampingRatio: .25
                },
                wall: !1,
                v: -.001
            },
            rotation: .25 * Math.PI,
            defaultValue: 0,
            localStorageId: "famous-counter",
            useLocalStorage: !0
        }, s.prototype.subtract = function (t) {
            this.value -= t, this._setNextToValue(), c.call(this);
            var i = l.call(this);
            f.call(this), this._currSelected = i, this._storage()
        }, s.prototype.add = function (t) {
            this.value += t, this._setPrevToValue(), p.call(this);
            var i = u.call(this);
            h.call(this), this._currSelected = i, this._storage()
        }, s.prototype._storage = function () {
            localStorage && localStorage.setItem(this.options.localStorageId, this.value)
        }, s.prototype.addOne = function () {
            this.add(1)
        }, s.prototype.subOne = function () {
            this.subtract(1)
        }, s.prototype.get = function () {
            return this._value
        }, s.prototype._setToValue = function (t) {
            t.setContent(this.value + "")
        }, s.prototype._setPrevToValue = function () {
            var t = this.surfaces[r.call(this)];
            this._setToValue(t)
        }, s.prototype._setNextToValue = function () {
            var t = this.surfaces[a.call(this)];
            this._setToValue(t)
        }, e.exports = s
    }
);