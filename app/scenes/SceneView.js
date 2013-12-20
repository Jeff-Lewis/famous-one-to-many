define(
	"app/scenes/SceneView", 
	[
        "require", 
        "exports", 
        "module", 
        "famous/View", 
        "famous/Matrix", 
        "famous/Surface", 
        "famous/Modifier", 
        "app/SceneController", 
        "famous-ui/Dropdown/Dropdown"
    ], 
    function (t, i, e) 
    {
        function s() {
            o.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.scenes, this.order
        }

        var o = t("famous/View");
        t("famous/Matrix"), t("famous/Surface");
        var n = t("famous/Modifier"),
            r = t("app/SceneController"),
            a = t("famous-ui/Dropdown/Dropdown");
        s.prototype = Object.create(o.prototype),
        s.prototype.constructor = s,
        s.DEFAULT_OPTIONS = {},
        s.prototype.init = function () {
            this.scenes = r.getOrderedScenes(),
            this.order = r.getSceneOrder();
            for (var t = [], i = 0; i < this.scenes.length; i++)
                t.push({
                    value: this.order[i],
                    name: this.scenes[i].NAME,
                    content: [this.scenes[i].IMAGE]
                });
            this.dropdown = new a({
                items: t,
                height: 50 * t.length,
                autoClose: !0,
                defaultSelected: r.getCurrentIndex(),
                itemProperties: {
                    color: "#fff",
                    backgroundColor: "transparent"
                },
                labelProperties: {
                    color: "#fff",
                    backgroundColor: "transparent"
                },
                itemTemplate: function (t, i) {
                    var e = 14,
                        s = .5 * e;
                    return '<img src="' + i + '" width="' + (this.options.itemSize[1] - e) + 'px" style="position: absolute; left: ' + s + "px; top: " + s + 'px;"></img>' + '<h3 style="position:absolute; left:' + (this.options.itemSize[1] + e) + "px;top:" + (s + 5) + 'px;">' + t + "</h5>"
                },
                labelTemplate: function (t, i) {
                    var e = 14,
                        s = .5 * e;
                    return '<img src="' + i + '" width="' + (this.options.itemSize[1] - e) + 'px" style="position: absolute; left: ' + s + "px; top: " + s + 'px;"></img>' + '<h3 style="position:absolute; left:' + (this.options.itemSize[1] + e) + "px;top:" + (s + 5) + 'px;">' + t + "</h5>"
                }
            }), this.dropdown.setSize([.25 * window.innerWidth, 25]), this.dropdown.init(), this.dropdownMod = new n({
                origin: [.5, .01],
                size: this.dropdown.getSize()
            }), this.node.add(this.dropdownMod).link(this.dropdown), this.events()
        }, s.prototype.events = function () {
            this.dropdown.on("change", function (t) {
                r.setScene(t.value)
            });
            var t = function (t) {
                this.dropdown.set(t, !0)
            }.bind(this);
            r.on("next", t), r.on("prev", t)
        }, s.prototype.setCtx = function (t) {
            t.add(this), this.init()
        };
        var h = new s;
        e.exports = h
    }
); 