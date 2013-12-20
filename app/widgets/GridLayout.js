define(
	"app/widgets/GridLayout", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/Matrix", 
		"famous/EventHandler", 
		"famous-utils/Utils", 
		"famous/Engine", 
		"famous/View", 
		"famous/Modifier", 
		"famous-animation/Easing", 
		"famous/RenderNode", 
		"famous-utils/Time", 
		"famous-widgets/ScrollContainer", 
		"famous-views/Scrollview", 
		"famous/Utility", 
		"famous/Entity", 
		"famous/Group"
	], 
	function (t, i, e) 
	{
        function s() {
            if (x.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.options.containerWidthFn = function () {
                return window.innerWidth
            }, this.options.containerHeightFn = function () {
                return window.innerHeight
            }, this._entityId = P.register(this), this.group = new k, this._numItems = 0, this._containerWidth, this._containerHeight, this._numRows, this._numColumns, this._rowHeight, this._columnWidth, this._gridWidth, this._gridHeight, this._marginLeft, this._marginRight, this._marginTop, this._marginBottom, this._hasMarginNodes, this._lastGroupingLimit, this._getInternalSize = u.bind(this), this.renderables = [], this.modifiers = [], this.scrollNodes = [], this.options.updateOnResize && b.on("resize", S.debounce(c.bind(this), this.options.debounceDelay)), this.mainTransform = new w, l.call(this), this.options.useScrollview) {
                var t = this.options.containerProperties;
                this.options.overflowHidden && (t.overflow = "hidden"), this.options.useContainer ? (this.scroll = new _({
                    look: {
                        properties: t,
                        size: [this._containerWidth, this._containerHeight]
                    },
                    feel: {
                        direction: this.options.direction,
                        clipSize: 0
                    }
                }), this.scroll.surface.context.setPerspective(this.options.perspective)) : this.scroll = new M({
                    direction: this.options.direction,
                    paginated: this.options.paginated,
                    clipSize: 0,
                    margin: window.innerWidth,
                    itemSpacing: 0
                }), this.group.add(this.mainTransform).link(this.scroll), this.scroll.sequenceFrom(this.scrollNodes), this.pipe(this.scroll)
            } else this.mainNode = new T, this.group.add(this.mainTransform).link(this.mainNode)
        }

        function o(t) {
            this._numItems++;
            var i = new w;
            return this.options.useScrollview ? t.pipe(this.scroll) : this.mainNode.add(i).link(t), [i, t]
        }

        function n(t, i) {
            var e = o.call(this, t);
            this.modifiers.unshift(e[0]), this.renderables.unshift(e[1]), a.call(this, i)
        }

        function r(t, i) {
            var e = o.call(this, t);
            this.modifiers.push(e[0]), this.renderables.push(e[1]), a.call(this, i)
        }

        function a(t) {
            void 0 == t && c.call(this)
        }

        function h() {
            this._internalSize = this.options.direction == C.Direction.X ? [this._columnWidth + 2 * this.options.columnGutters, this._rowHeight * this._numRows + (this._numRows - 1) * this.options.rowGutters] : [this._numColumns * this._columnWidth + (this._numColumns - 1) * this.options.columnGutters, this._rowHeight + this.options.rowGutters]
        }

        function u() {
            return this._internalSize
        }

        function p(t) {
            this._dirty && l.call(this);
            for (var i = 0; i < this.modifiers.length; i++) {
                var e = g.call(this, i);
                this.modifiers[i].halt(), this.options.delayTransition ? O.setTimeout(this.modifiers[i].setTransform.bind(this.modifiers[i], e, this.options.transition, t), i * this.options.delayIncrement) : this.modifiers[i].setTransform(e, this.options.transition, t)
            }
            this.emit("reflow")
        }

        function c() {
            this._dirty = !0, p.call(this)
        }

        function l() {
            var t = this.options.useContainer ? this.scroll.scrollview : this.scroll;
            this._marginLeft = this.options.leftMargin, this._marginRight = this.options.rightMargin, this._marginTop = this.options.topMargin, this._marginBottom = this.options.bottomMargin, this._containerHeight = this.options.containerHeightFn ? this.options.containerHeightFn() : window.innerHeight, this._containerWidth = this.options.containerWidthFn ? this.options.containerWidthFn() : window.innerWidth, this.options.useContainer && this.scroll.setOptions({
                look: {
                    size: [this._containerWidth, this._containerHeight]
                }
            }), this._gridHeight = this._containerHeight - (this._marginTop + this._marginTop), this._gridWidth = this._containerWidth - (this._marginLeft + this._marginRight), this.options.numRows && (this._numRows = this.options.numRows, this._rowHeight = (this._gridHeight - this.options.rowGutters * (this._numRows - 1)) / this._numRows), this.options.numColumns && (this._numColumns = this.options.numColumns, this._columnWidth = (this._gridWidth - this.options.columnGutters * (this._numColumns - 1)) / this._numColumns), this.options.columnWidth && (this._columnWidth = this.options.columnWidth), this.options.rowHeight && (this._rowHeight = this.options.rowHeight), this.options.direction == C.Direction.Y ? (this._numColumns = Math.max(Math.floor(this._gridWidth / (this._columnWidth + this.options.columnGutters)), 1), this._numRows = Math.ceil(this._numItems / this._numColumns), this.options.autoMargin && (this._marginLeft = .5 * (this._containerWidth - (this._numColumns * this._columnWidth + (this._numColumns - 1) * this.options.columnGutters)), this._marginRight = this._marginLeft), this._gridHeight = this._numRows * this._rowHeight + this._marginTop + this._marginBottom + this.options.rowGutters * (this._numRows - 1)) : this.options.direction == C.Direction.X && (this._numRows = Math.floor(this._gridHeight / (this._rowHeight + this.options.rowGutters)), this._numColumns = Math.ceil(this._numItems / this._numRows), this.options.autoMargin && (this._marginTop = .5 * (this._containerHeight - (this._numRows * this._rowHeight + (this._numRows - 1) * this.options.rowGutters)), this._marginBottom = this._marginTop), this._gridWidth = this._numColumns * this._columnWidth + this._marginTop + this._marginRight + this.options.columnGutters * (this._numColumns - 1)), t && t.getPosition() > this._gridHeight && t.setPosition(0), this.options.useScrollview && (h.call(this), f.call(this)), this._dirty = !1
        }

        function f() {
            y.call(this);
            var t = this.options.direction == C.Direction.X ? this._numRows : this._numColumns;
            this._lastGroupingLimit !== t && void 0 !== this._lastGroupingLimit;
            for (var i = 0, e = 0; e < this.modifiers.length; e++) 0 == e % t && 0 !== e && i++, this.scrollNodes[i] || (this.scrollNodes[i] = new T, this.scrollNodes[i].getSize = this._getInternalSize), this.scrollNodes[i].getSize !== this._getInternalSize && (this.scrollNodes[i].getSize = this._getInternalSize), this.scrollNodes[i].add(this.modifiers[e]).link(this.renderables[e]);
            i++;
            var s = this.scrollNodes.length - i;
            s > 0 && this.scrollNodes.splice(this.scrollNodes.length - s, this.scrollNodes.length), d.call(this), this._lastGroupingLimit = t
        }

        function d() {
            this._hasMarginNodes = !0;
            var t = new T;
            t.getSize = function () {
                return this.options.direction == C.Direction.X ? [this._marginLeft, this._internalSize[1]] : [this._internalSize[0], this._marginTop]
            }.bind(this), this.scrollNodes.unshift(t);
            var i = new T;
            i.getSize = function () {
                return this.options.direction == C.Direction.X ? [this._marginLeft - this.options.columnGutters, this._internalSize[1]] : [this._internalSize[0], this._marginBottom - this.options.rowGutters]
            }.bind(this), this.scrollNodes.push(i)
        }

        function m() {
            this.scrollNodes.splice(0, 1), this.scrollNodes.splice(this.scrollNodes.length - 1, 1), this._hasMarginNodes = !1
        }

        function y() {
            this._hasMarginNodes && m.call(this);
            for (var t = 0; t < this.scrollNodes.length; t++) this.scrollNodes[t] && (this.scrollNodes[t].object = void 0)
        }

        function g(t) {
            var i, e, s = t % this._numColumns,
                o = Math.floor(t / this._numColumns);
            return this.options.useScrollview ? this.options.direction == C.Direction.X ? (e = o * this._rowHeight + o * this.options.rowGutters + this._marginTop, v.translate(0, e, 0)) : (i = s * this._columnWidth + s * this.options.columnGutters + this._marginLeft, v.translate(i, 0, 0)) : (i = s * this._columnWidth + s * this.options.columnGutters + this._marginLeft, e = o * this._rowHeight + o * this.options.rowGutters + this._marginTop, v.translate(i, e, 0))
        }

        t("famous/Surface");
        var v = t("famous/Matrix");
        t("famous/EventHandler");
        var S = t("famous-utils/Utils"),
            b = t("famous/Engine"),
            x = t("famous/View"),
            w = t("famous/Modifier"),
            z = t("famous-animation/Easing"),
            T = t("famous/RenderNode"),
            O = t("famous-utils/Time"),
            _ = t("famous-widgets/ScrollContainer"),
            M = t("famous-views/Scrollview"),
            C = t("famous/Utility"),
            P = t("famous/Entity"),
            k = t("famous/Group");
        s.prototype = Object.create(x.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            containerWidthFn: void 0,
            containerHeightFn: void 0,
            columnWidth: void 0,
            rowHeight: void 0,
            numColumns: void 0,
            numRows: void 0,
            direction: C.Direction.Y,
            paginated: !1,
            autoMargin: !0,
            leftMargin: 50,
            rightMargin: 50,
            topMargin: 50,
            bottomMargin: 50,
            columnGutters: 20,
            rowGutters: 20,
            updateOnResize: !0,
            debounceDelay: 150,
            transition: {
                curve: z.inOutBackNorm,
                duration: 600
            },
            delayTransition: !0,
            delayIncrement: 15,
            useScrollview: !0,
            useContainer: !1,
            containerProperties: {
                backgroundColor: "#ffffff"
            },
            overflowHidden: !1,
            perspective: 1e3
        }, s.prototype.append = function (t) {
            if (S.isArray(t)) {
                for (var i = 0; i < t.length; i++) r.call(this, t[i], !0);
                c.call(this)
            } else r.call(this, t)
        }, s.prototype.prepend = function (t) {
            if (S.isArray(t)) {
                for (var i = 0; i < t.length; i++) n.call(this, t[i], !0);
                c.call(this)
            } else n.call(this, t)
        }, s.prototype.remove = function () {
            this._numItems--
        }, s.prototype.reflow = function () {
            c.call(this)
        }, s.prototype.commit = function (t, i, e, s, o) {
            return {
                transform: v.moveThen([-s[0] * o[0], -s[1] * o[1], 0], i),
                opacity: e,
                origin: s,
                size: o,
                target: {
                    transform: i,
                    origin: s,
                    target: this.group.render()
                }
            }
        }, s.prototype.render = function () {
            return this._entityId
        }, s.prototype.getSize = function () {
            return [this._containerWidth, this._containerHeight]
        }, e.exports = s
    }
); 