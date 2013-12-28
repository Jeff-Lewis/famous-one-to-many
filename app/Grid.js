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
	function (require, exports, module)
	{
        function Grid() {

            View.apply(this, arguments);

            this.transition = {
                curve: Easing.inOutBackNorm,
                duration: 400
            };

            this.opacityTransition = {
                curve: Easing.linearNorm,
                duration: 400
            };

            this.surfaces = [];
            this.transforms = [];
            this.selected = false;
            this.numSurfaces = this.options.numColumns * this.options.numRows * this.options.numDepth;
            this.window = [window.innerWidth, window.innerHeight];
            this.totalWidth = this.findTotalWidth();
            this.totalHeight = this.findTotalHeight();
            this.highlights = [];

            this.transformPositions = {
                front: Matrix.identity,
                right: Matrix.move(Matrix.rotateY(.5 * Math.PI), [0, 0, -400]),
                left: Matrix.move(Matrix.rotateY(.5 * -Math.PI), [0, 0, -400]),
                halfLeft: Matrix.move(Matrix.rotateY(.25 * -Math.PI), [0, 0, -400]),
                halfRight: Matrix.move(Matrix.rotateY(.25 * Math.PI), [0, 0, -400])
            };

            this.mainNode = new RenderNode;

            this.mainTransform = new Modifier(
                {
                    transform: this.transformPositions[this.options.defaultPosition]
                }
            );

            this.node.add(this.mainTransform).link(this.mainNode);

            Engine.on(
                "resize",
                Utils.debounce(
                    this.reflow.bind(this, void 0),
                    200
                )
            );

            this.initSurfaces();

            this.collapse();
        }

        function collapseTransforms(index) {
            var rotationPercent;

            if (this.options.rotateByIndex) {
               rotationPercent =  index / this.numSurfaces;
            }
            else {
               rotationPercent = 1;
            }

            var rotation = Matrix.rotate(
                rotationPercent * this.options.rotateX,
                rotationPercent * this.options.rotateY,
                rotationPercent * this.options.rotateZ
            );
            var s = 0;
            var y = 0;
            var z = -index * this.options.collapseZDepth;
            return Matrix.move(rotation, [s, y, z]);
        }

        function expandTransforms(t) {
            var i = t % this.options.numColumns,
                e = Math.floor(t / this.options.numColumns),
                s = .5 * -this.totalWidth,
                o = .5 * -this.totalHeight;
            var x = i * this.options.surfaceSize[0] + i * this.options.gutters + s;
            var y = e * this.options.surfaceSize[1] + e * this.options.gutters + o;
            return Matrix.translate(x, y)
        }

        var Matrix = require("famous/Matrix"),
            Modifier = require("famous/Modifier");

        require("famous/EventHandler");

        var Surface = require("famous/Surface"),
            RenderNode = require("famous/RenderNode"),
            Styles = require("app/Styles"),
            Easing = require("famous-animation/Easing");

        require("./Highlight");

        var View = require("famous/View"),
            Utils = require("famous-utils/Utils"),
            Engine = require("famous/Engine");

        Grid.prototype = Object.create(View.prototype);

        Grid.prototype.constructor = Grid;

        Grid.DEFAULT_OPTIONS = {
            active: true,
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
                curve: Easing.inOutBackNorm,
                duration: 500
            }
        };

        Grid.prototype.initSurfaces = function ()
        {
            for (var t = 0; t < this.options.numColumns; t++)
            {
                for (var i = 0; i < this.options.numRows; i++)
                {
                    for (var e = 0; e < this.options.numDepth; e++)
                    {
                        var surface = new Surface(
                            {
                                size: this.options.surfaceSize
                            }
                        );
                        this.surfaces.push(surface);

                        var modifier = new Modifier(
                            {
                                transform: Matrix.identity
                            }
                        );

                        this.transforms.push(modifier);

                        this.mainNode.add(modifier).link(surface);

                        surface.on(
                            "click",
                            this.touchHandler.bind(this)
                        );
                    }
                }
            }
            this.applyStyles()
        };

        Grid.prototype.touchHandler = function (e)
        {
            e.stopPropagation();

            if (this.options.active)
            {
                if (this.position === "collapse")
                {
                    this.expand();
                } else
                {
                    this.collapse();
                }
            } else
            {
                this.emit("selection", e);
            }
            this.setSelected(true);
        };

        Grid.prototype.setActive = function (t)
        {
            this.options.active = t;
        };

        Grid.prototype.setSelected = function (t)
        {
            if (1 == t && 0 == this.selected) {
                this.applyStyles(this.options.selectedStyle);
            }
            else {
                if (1 == this.selected) {
                    this.applyStyles(this.options.style);
                }
            }
            this.selected = t;
        };

        Grid.prototype.setCameraTransform = function (t)
        {
            this.mainTransform.halt();
            this.mainTransform.setTransform(this.transformPositions[t], this.options.cameraTransition);
        };

        Grid.prototype.applyStyles = function (t)
        {
            t || (t = this.options.style);
            for (var i = 0; i < this.surfaces.length; i++) Styles.applyStyle(this.surfaces[i], t)
        };

        Grid.prototype.setCSSProp = function (t)
        {
            for (var i = 0; i < this.surfaces.length; i++) this.surfaces[i].setProperties(t)
        };

        Grid.prototype.setCollapseZDepth = function (t)
        {
            this.options.collapseZDepth = t, this.transformPositions.right = Matrix.move(Matrix.rotateY(.5 * -Math.PI), [.5 * -this.surfaces.length * t, 0, -400]), this.transformPositions.left = Matrix.move(Matrix.rotateY(.5 * Math.PI), [.5 * this.surfaces.length * t, 0, -400])
        };

        Grid.prototype.findTotalWidth = function ()
        {
            return this.totalWidth = (this.options.numColumns - 1) * this.options.surfaceSize[0] + (this.options.numColumns - 1) * this.options.gutters, this.totalWidth;
        };

        Grid.prototype.findTotalHeight = function ()
        {
            return this.totalHeight = (this.options.numRows - 1) * this.options.surfaceSize[1] + (this.options.numRows - 1) * this.options.gutters, this.totalHeight;
        };

        Grid.prototype.collapse = function (t)
        {
            this.position = "collapse";
            this.reflow(t);
        };

        Grid.prototype.expand = function (t)
        {
            this.position = "expand";
            this.reflow(t);
        };

        Grid.prototype.reflow = function (t)
        {
            this.halfWindow = [.5 * window.innerWidth, .5 * window.innerHeight];

            this.findTotalWidth();
            this.findTotalHeight();

            for (var i = 0; i < this.transforms.length; i++)
            {
                var transform, opacity;
                if (this.position == "collapse") {
                    transform = collapseTransforms.call(this, i);
                    opacity = this.options.opactiyFadeAmount;
                } else if ("expand" == this.position) {
                    transform = expandTransforms.call(this, i);
                    opacity = 1;
                }
                this.transforms[i].halt();
                this.transforms[i].setTransform(transform, this.transition, t);
                this.transforms[i].setOpacity(opacity, this.opacityTransition)
            }
        };

        module.exports = Grid;
    }
); 