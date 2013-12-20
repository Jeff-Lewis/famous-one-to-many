define(
	"app/widgets/SceneMenu", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Surface", 
		"famous/Modifier", 
		"app/SceneController", 
		"famous-views/Scrollview", 
		"famous/ViewSequence", 
		"famous/RenderNode", 
		"famous/TweenTransition"
	], 
	function (t, i, e) 
	{
        function s() {
            o.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.label, this.labelMod, this._currentLabelHtml, this.scrollMod, this.scrollview, this.scrollNode, this.fadeMod, this.fade, this.scenes, this.order, this.index, this.menuItems, this._isVisible = !1
        }

        var o = t("famous/View"),
            n = t("famous/Matrix"),
            r = t("famous/Surface"),
            a = t("famous/Modifier"),
            h = t("app/SceneController"),
            u = t("famous-views/Scrollview"),
            p = t("famous/ViewSequence"),
            c = t("famous/RenderNode");
        t("famous/TweenTransition"), s.prototype = Object.create(o.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            padding: 14,
            itemSize: [300, 50],
            contentFn: function (t) {
                var i = this.options.padding,
                    e = .5 * i;
                return '<img src="' + t.image + '" width="' + (this.options.itemSize[1] - i) + 'px" style="position: absolute; left: ' + e + "px; top: " + e + 'px;"></img>' + '<h3 class="no-user-select" style="position:absolute; left:' + (this.options.itemSize[1] + i) + "px;top:" + (e + 5) + 'px;">' + t.name + "</h5>"
            },
            labelFn: function (t) {
                var i = this.options.padding,
                    e = .5 * i;
                return '<img src="' + t.image + '" width="' + (this.options.itemSize[1] - i) + 'px" style="position: absolute; left: ' + e + "px; top: " + e + 'px;"></img>' + '<h3 class="no-user-select" style="position:absolute; left:' + (this.options.itemSize[1] + i) + "px;top:" + (e + 5) + 'px;">' + t.name + "</h5>"
            },
            scrollOptions: {
                itemSpacing: 10
            },
            labelCurve: {
                curve: "",
                duration: 500
            },
            scrollCurve: {
                curve: "outExpoNorm",
                duration: 500
            },
            sceneOutCurve: {
                curve: "outBounceNorm",
                duration: 500
            },
            sceneInCurve: {
                curve: "outExpoNorm",
                duration: 500
            },
            fadeTransition: {
                curve: "outExpoNorm",
                duration: 500
            },
            sceneMenuMatrix: n.translate(0, 0, -500),
            fadeColor: "#3b3a3e",
            closeMenuImage: "img/buttons/x_square.svg"
        }, s.prototype.events = function () {
            h.on("set", this.set.bind(this)), h.on("add", this.add.bind(this)), h.on("remove", this.remove.bind(this)), h.on("reorder", this.reset.bind(this)), this.label.on("mousedown", this._labelClick.bind(this)), this.fade.on("click", this.hideMenu.bind(this, void 0))
        }, s.prototype.init = function () {
            this.initScrollview(), this.initFade(), this.initData(), this.initLabel(), this.initArrows(), this.events()
        }, s.prototype.initScrollview = function () {
            this.menuItems = [], this.scrollview = new u(this.options.scrollOptions), this.sequence = new p(this.menuItems, 0, !1), this.scrollNode = new c, this.scrollMod = new a({
                opacity: 0,
                origin: [.5, .25]
            }), this.scrollview.sequenceFrom(this.sequence), this.scrollNode.add(this.scrollMod).link(this.scrollview)
        }, s.prototype.initFade = function () {
            this.fadeMod = new a({
                opacity: 0,
                transform: n.translate(0, 0, -1)
            }), this.fade = new r({
                properties: {
                    backgroundColor: this.options.fadeColor
                },
                classes: ["fadeMenu"]
            }), this.scrollNode.add(this.fadeMod).link(this.fade)
        }, s.prototype.initData = function () {
            this.getData();
            for (var t = 0; t < this.data.length; t++) this.add(this.data[t])
        }, s.prototype.initLabel = function () {
            this._currentLabelHtml = this.options.labelFn.call(this, this.data[this.index]), this.label = new r({
                size: this.options.itemSize,
                content: this._currentLabelHtml,
                properties: {},
                classes: ["scene-menu-label"]
            }), this.labelMod = new a({
                opacity: 1,
                size: this.options.itemSize,
                origin: [.5, 0],
                transform: n.translate(0, 20)
            }), this.node.add(this.labelMod).link(this.label)
        }, s.prototype.initArrows = function () {
            var t = new Image;
            t.src = "img/buttons/arrow_left_square.svg", t.width = this.options.itemSize[1];
            var i = new Image;
            i.src = "img/buttons/arrow_right_square.svg", i.width = this.options.itemSize[1], this.prevArrow = new r({
                size: [this.options.itemSize[1], this.options.itemSize[1]],
                content: t,
                classes: ["scene-arrow"]
            }), this.nextArrow = new r({
                size: [this.options.itemSize[1], this.options.itemSize[1]],
                content: i,
                classes: ["scene-arrow"]
            }), this.nextArrowMod = new a({
                origin: [.5, 0],
                transform: n.translate(.5 * this.options.itemSize[0] + 40, 20)
            }), this.prevArrowMod = new a({
                origin: [.5, 0],
                transform: n.translate(.5 * -this.options.itemSize[0] - 40, 20)
            }), this.nextArrow.on("click", function () {
                h.next(), this.nextArrowMod.halt(), this.nextArrowMod.setOpacity(.05), this.nextArrowMod.setOpacity(1, this.options.fadeTransition), this.hideMenu()
            }.bind(this)), this.prevArrow.on("click", function () {
                h.prev(), this.prevArrowMod.halt(), this.prevArrowMod.setOpacity(.05), this.prevArrowMod.setOpacity(1, this.options.fadeTransition), this.hideMenu()
            }.bind(this)), this.node.add(this.nextArrowMod).link(this.nextArrow), this.node.add(this.prevArrowMod).link(this.prevArrow)
        }, s.prototype.add = function (t) {
            var i = new r({
                content: this.options.contentFn.call(this, t),
                size: this.options.itemSize,
                classes: ["scene-menu-item"]
            });
            i.pipe(this.scrollview), i.on("click", function (t) {
                this._isVisible && (this.hideMenu(), h.setScene(t))
            }.bind(this, t.value)), this.menuItems.push(i)
        }, s.prototype.set = function (t) {
            this.index = t.index, this.updateLabel()
        }, s.prototype.remove = function (t) {
            var i = this.order.indexOf(t),
                e = this.menuItems[i];
            e.unpipe(this.scrollview), this.data.splice(i, 1), this.menuItems.splice(i, 1)
        }, s.prototype.reset = function () {
            this.menuItems = [], this.initData()
        }, s.prototype.updateLabel = function () {
            this._currentLabelHtml = this.options.labelFn.call(this, this.data[this.index]), this.hideLabel(function () {
                this.updateLabelContent(this._currentLabelHtml), this.showLabel()
            }.bind(this))
        }, s.prototype.updateLabelContent = function (t, i) {
            this.label.setContent(t), i && i()
        }, s.prototype.showLabel = function (t) {
            this.labelMod.setOpacity(1, this.options.labelCurve, t)
        }, s.prototype.hideLabel = function (t) {
            this.labelMod.halt(), this.labelMod.setOpacity(0, this.options.labelCurve, t)
        }, s.prototype.showCloseLabel = function () {
            this._closeHtml || (this._closeHtml = this.options.labelFn.call(this, {
                image: this.options.closeMenuImage,
                name: "Close",
                value: "close"
            })), this.updateLabelContent(this._closeHtml)
        }, s.prototype._labelClick = function () {
            this._isVisible ? (this.hideMenu(), this.updateLabelContent(this._currentLabelHtml)) : (this.showMenu(), this.showCloseLabel())
        }, s.prototype.getData = function () {
            this.scenes = h.getOrderedScenes(), this.order = h.getSceneOrder(), this.index = h.getCurrentIndex(), this.data = [];
            for (var t = 0; t < this.scenes.length; t++) this.data.push({
                value: this.order[t],
                name: this.scenes[t].NAME,
                image: this.scenes[t].IMAGE
            })
        }, s.prototype.showMenu = function (t) {
            this._isVisible = !0, this.scrollMod.halt(), this.scrollMod.setOpacity(1, this.options.scrollCurve, t), this.fadeMod.halt(), this.fadeMod.setOpacity(.9, this.options.scrollCurve), h.setActiveTransform(this.options.sceneMenuMatrix, this.options.sceneOutCurve)
        }, s.prototype.hideMenu = function (t) {
            this._isVisible = !1, this.scrollMod.halt(), this.scrollMod.setOpacity(0, this.options.scrollCurve, t), this.fadeMod.halt(), this.fadeMod.setOpacity(0, this.options.scrollCurve), h.setActiveTransform(n.identity, this.options.sceneInCurve)
        }, s.prototype.render = function () {
            return this._isVisible ? [this.node.render(), this.scrollNode.render()] : this.node.render()
        }, s.prototype.setLabelTransform = function (t, i, e) {
            this.labelMod.halt(), this.labelMod.setTransform(t, i, e)
        }, s.prototype.setLabelOrigin = function (t, i, e) {
            this.labelMod.halt(), this.labelMod.setOrigin(t, i, e)
        }, s.prototype.setScrollTransform = function (t, i, e) {
            this.scrollMod.halt(), this.scrollMod.setTransform(t, i, e)
        }, s.prototype.setScrollOrigin = function (t, i, e) {
            this.scrollMod.halt(), this.scrollMod.setOrigin(t, i, e)
        }, s.prototype.setCtx = function (t) {
            t.add(this), this.init()
        };
        var l = new s;
        e.exports = l
    }
);