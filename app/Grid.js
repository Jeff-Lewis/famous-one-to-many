define(
	"app/Grid", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous/EventHandler", 
		"famous/Surface", 
		"famous/RenderNode", 
		"app/Styles", 
		"famous-animation/Easing", 
		"./Highlight", 
		"famous/View", 
		"famous-utils/Utils", 
		"famous/Engine"
	], 
	function (t, i, e) 
	{
        function s() {
            l.apply(this, arguments), this.transition = {
                curve: c.inOutBackNorm,
                duration: 400
            }, this.opacityTransition = {
                curve: c.linearNorm,
                duration: 400
            }, this.surfaces = [], this.transforms = [], this.selected = !1, this.numSurfaces = this.options.numColumns * this.options.numRows * this.options.numDepth, this.window = [window.innerWidth, window.innerHeight], this.totalWidth = this.findTotalWidth(), this.totalHeight = this.findTotalHeight(), this.highlights = [], this.transformPositions = {
                front: r.identity,
                right: r.move(r.rotateY(.5 * Math.PI), [0, 0, -400]),
                left: r.move(r.rotateY(.5 * -Math.PI), [0, 0, -400]),
                halfLeft: r.move(r.rotateY(.25 * -Math.PI), [0, 0, -400]),
                halfRight: r.move(r.rotateY(.25 * Math.PI), [0, 0, -400])
            }, this.mainNode = new u, this.mainTransform = new a({
                transform: this.transformPositions[this.options.defaultPosition]
            }), this.node.add(this.mainTransform).link(this.mainNode), d.on("resize", f.debounce(this.reflow.bind(this, void 0), 200)), this.initSurfaces(), this.collapse()
        }

        function o(t) {
            var i = this.options.rotateByIndex ? t / this.numSurfaces : 1,
                e = r.rotate(i * this.options.rotateX, i * this.options.rotateY, i * this.options.rotateZ),
                s = 0;
            return y = 0, z = -t * this.options.collapseZDepth, r.move(e, [s, y, z])
        }

        function n(t) {
            var i = t % this.options.numColumns,
                e = Math.floor(t / this.options.numColumns),
                s = .5 * -this.totalWidth,
                o = .5 * -this.totalHeight;
            return x = i * this.options.surfaceSize[0] + i * this.options.gutters + s, y = e * this.options.surfaceSize[1] + e * this.options.gutters + o, r.translate(x, y)
        }
        var r = t("famous/Matrix"),
            a = t("famous/Modifier");
        t("famous/EventHandler");
        var h = t("famous/Surface"),
            u = t("famous/RenderNode"),
            p = t("app/Styles"),
            c = t("famous-animation/Easing");
        t("./Highlight");
        var l = t("famous/View"),
            f = t("famous-utils/Utils"),
            d = t("famous/Engine");
        s.prototype = Object.create(l.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            active: !0,
            selectedStyle: "selected",
            numColumns: 5,
            collapseZDepth: 0,
            cameraEvents: !1,
            numRows: 5,
            offsetTop: -window.innerHeight / 2.5,
            surfaceSize: [125, 125],
            numDepth: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            rotateByIndex: !1,
            opacityFade: !1,
            opactiyFadeAmount: 1,
            opacityInvert: !1,
            highlightX: !1,
            highlightY: !1,
            highlightSized: !1,
            highlightDuration: 1e3,
            highlightScaleX: 10,
            highlightScaleY: 10,
            fadeOpacity: 1,
            colWidth: window.innerWidth / 5,
            rowHeight: 200,
            style: "design",
            gutters: 20,
            sceneGridVisible: !0,
            initialPos: [40, 40],
            defaultCamPosition: "left",
            cameraTransition: {
                curve: c.inOutBackNorm,
                duration: 500
            }
        }, s.prototype.initSurfaces = function () {
            for (var t = 0; t < this.options.numColumns; t++)
                for (var i = 0; i < this.options.numRows; i++)
                    for (var e = 0; e < this.options.numDepth; e++) {
                        var s = new h({
                            size: this.options.surfaceSize
                        });
                        this.surfaces.push(s);
                        var o = new a({
                            transform: r.identity
                        });
                        this.transforms.push(o), this.mainNode.add(o).link(s), s.on("click", this.touchHandler.bind(this))
                    }
            this.applyStyles()
        }, s.prototype.touchHandler = function (t) {
            t.stopPropagation(), this.options.active ? "collapse" == this.position ? this.expand() : this.collapse() : (this.emit("selection", t), this.setSelected(!0))
        }, s.prototype.setActive = function (t) {
            this.options.active = t
        }, s.prototype.setSelected = function (t) {
            1 == t && 0 == this.selected ? this.applyStyles(this.options.selectedStyle) : 1 == this.selected && this.applyStyles(this.options.style), this.selected = t
        }, s.prototype.setCameraTransform = function (t) {
            this.mainTransform.halt(), this.mainTransform.setTransform(this.transformPositions[t], this.options.cameraTransition)
        }, s.prototype.applyStyles = function (t) {
            t || (t = this.options.style);
            for (var i = 0; i < this.surfaces.length; i++) p.applyStyle(this.surfaces[i], t)
        }, s.prototype.setCSSProp = function (t) {
            for (var i = 0; i < this.surfaces.length; i++) this.surfaces[i].setProperties(t)
        }, s.prototype.setCollapseZDepth = function (t) {
            this.options.collapseZDepth = t, this.transformPositions.right = r.move(r.rotateY(.5 * -Math.PI), [.5 * -this.surfaces.length * t, 0, -400]), this.transformPositions.left = r.move(r.rotateY(.5 * Math.PI), [.5 * this.surfaces.length * t, 0, -400])
        }, s.prototype.findTotalWidth = function () {
            return this.totalWidth = (this.options.numColumns - 1) * this.options.surfaceSize[0] + (this.options.numColumns - 1) * this.options.gutters, this.totalWidth
        }, s.prototype.findTotalHeight = function () {
            return this.totalHeight = (this.options.numRows - 1) * this.options.surfaceSize[1] + (this.options.numRows - 1) * this.options.gutters, this.totalHeight
        }, s.prototype.collapse = function (t) {
            this.position = "collapse", this.reflow(t)
        }, s.prototype.expand = function (t) {
            this.position = "expand", this.reflow(t)
        }, s.prototype.reflow = function (t) {
            this.halfWindow = [.5 * window.innerWidth, .5 * window.innerHeight], this.findTotalWidth(), this.findTotalHeight();
            for (var i = 0; i < this.transforms.length; i++) {
                var e, s;
                "collapse" == this.position ? (e = o.call(this, i), s = this.options.opactiyFadeAmount) : "expand" == this.position && (e = n.call(this, i), s = 1), this.transforms[i].halt(), this.transforms[i].setTransform(e, this.transition, t), this.transforms[i].setOpacity(s, this.opacityTransition)
            }
        }, e.exports = s
    }
); 