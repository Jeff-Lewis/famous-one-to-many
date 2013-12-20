define(
    "app/scenes/GridScene", 
    [
        "require", 
        "exports", 
        "module", 
        "famous/Matrix", 
        "famous/Modifier", 
        "famous/Engine", 
        "famous/Utility", 
        "famous/ImageSurface", 
        "famous/Surface", 
        "famous-animation/RegisterEasing", 
        "famous/EventArbiter", 
        "famous-scene/Scene", 
        "famous-utils/Utils", 
        "famous-utils/Time", 
        "famous-color/ColorPalette", 
        "famous-color/Color", 
        "famous-ui/Text/Label", 
        "famous-ui/AutoUI", 
        "famous-ui/PanelScrollview", 
        "app/SceneController", 
        "app/SceneTransitions", 
        "app/Grid", 
        "app/DescriptionPanel", 
        "app/UI", 
        "core/Interface"
    ], 
    function (t, i, e) 
    {
        function s() {
            a.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.grid = new p({
                numColumns: 5,
                numRows: 5,
                numDepth: 1,
                surfaceSize: [125, 125],
                colWidth: window.innerWidth / 5,
                rowHeight: 200,
                gutters: 20,
                initialPos: [40, 40]
            }), this.padding = 20, this.leftPanel = new u({
                scrollviewOptions: {
                    direction: "y",
                    itemSpacing: 20,
                    clipSize: window.innerHeight - 2 * this.padding
                }
            }), this.rightPanel = new u({
                scrollviewOptions: {
                    direction: "y",
                    itemSpacing: 20,
                    clipSize: window.innerHeight - 2 * this.padding
                }
            }), this.leftDescription = new c({
                padding: this.padding,
                size: 300
            }, this.leftPanel), this.rightDescription = new c({
                size: 300,
                position: "r",
                padding: this.padding
            }, this.rightPanel), this.UI = new l({
                title: "Discrete Animation",
                description: "One to many. Many to one."
            }, this.grid, this.leftPanel, this.rightPanel), this.coreUI = new f({
                useUI: !1,
                nextPosition: "tc"
            }), this.node.add(this.coreUI), this.node.add(this.UI), this.node.add(new o({
                origin: [.5, .5]
            })).link(this.grid), this.node.add(this.leftDescription), this.node.add(this.rightDescription), this.events()
        }
        t("famous/Matrix");
        var o = t("famous/Modifier"),
            n = t("famous/Engine");
        t("famous/Utility"), t("famous/ImageSurface"), t("famous/Surface"), t("famous-animation/RegisterEasing");
        var r = t("famous/EventArbiter"),
            a = t("famous-scene/Scene"),
            h = t("famous-utils/Utils");
        t("famous-utils/Time"), t("famous-color/ColorPalette"), t("famous-color/Color"), t("famous-ui/Text/Label"), t("famous-ui/AutoUI");
        var u = t("famous-ui/PanelScrollview");
        t("app/SceneController"), t("app/SceneTransitions");
        var p = t("app/Grid"),
            c = t("app/DescriptionPanel"),
            l = t("app/UI"),
            f = t("core/Interface"),
            d = 0,
            m = 1;
        s.prototype = Object.create(a.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {}, s.prototype.events = function () {
            n.pipe(this.coreUI), n.on("resize", h.debounce(this.adjustScrollviews.bind(this), 333)), this.eventArbiter = new r, n.pipe(this.eventArbiter), this.eventArbiter.forMode(m).pipe(this.rightPanel), this.eventArbiter.forMode(d).pipe(this.leftPanel), this.rightDescription.on("opening", this.eventArbiter.setMode.bind(this.eventArbiter, m)), this.leftDescription.on("opening", this.eventArbiter.setMode.bind(this.eventArbiter, d))
        }, s.prototype.adjustScrollviews = function () {
            var t = {
                clipSize: window.innerHeight - 2 * this.padding
            };
            this.rightPanel.setOptions(t), this.leftPanel.setOptions(t)
        }, e.exports = s
    }
); 