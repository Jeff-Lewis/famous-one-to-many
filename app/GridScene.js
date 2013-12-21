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
        function GridScene()
        {
            Scene.apply(this, arguments);

            this.eventInput.pipe(this.eventOutput);

            this.grid = new Grid(
                {
                    numColumns: 5,
                    numRows: 5,
                    numDepth: 1,
                    surfaceSize: [125, 125],
                    colWidth: window.innerWidth / 5,
                    rowHeight: 200,
                    gutters: 20,
                    initialPos: [40, 40]
                }
            );

            this.padding = 20;

            this.leftPanel = new PanelScrollView(
                {
                    scrollviewOptions: {
                        direction: "y",
                        itemSpacing: 20,
                        clipSize: window.innerHeight - 2 * this.padding
                    }
                }
            );

            this.rightPanel = new PanelScrollView(
                {
                    scrollviewOptions: {
                        direction: "y",
                        itemSpacing: 20,
                        clipSize: window.innerHeight - 2 * this.padding
                    }
                }
            );

            this.leftDescription = new DescriptionPanel(
                {
                    padding: this.padding,
                    size: 300
                },
                this.leftPanel
            );

            this.rightDescription = new DescriptionPanel(
                {
                    size: 300,
                    position: "r",
                    padding: this.padding
                },
                this.rightPanel
            );

            this.UI = new UI(
                {
                    title: "Discrete Animation",
                    description: "One to many. Many to one."
                },
                this.grid,
                this.leftPanel,
                this.rightPanel
            );

            this.coreUI = new Interface(
                {
                    useUI: false,
                    nextPosition: "tc"
                }
            );

            this.node.add(this.coreUI);

            this.node.add(this.UI);

            this.node.add(
                new Modifier(
                    {
                        origin: [.5, .5]
                    }
                )
            ).link(this.grid);

            this.node.add(this.leftDescription);
            this.node.add(this.rightDescription);
            this.events();
        }

        t("famous/Matrix");

        var Modifier = t("famous/Modifier");
        var Engine = t("famous/Engine");

        t("famous/Utility");
        t("famous/ImageSurface");
        t("famous/Surface");
        t("famous-animation/RegisterEasing");

        var EventArbiter = t("famous/EventArbiter");
        var Scene = t("famous-scene/Scene");
        var Utils = t("famous-utils/Utils");

        t("famous-utils/Time");
        t("famous-color/ColorPalette");
        t("famous-color/Color");
        t("famous-ui/Text/Label");
        t("famous-ui/AutoUI");

        var PanelScrollView = t("famous-ui/PanelScrollview");

        t("app/SceneController");
        t("app/SceneTransitions");

        var Grid = t("app/Grid");
        var DescriptionPanel = t("app/DescriptionPanel");
        var UI = t("app/UI");
        var Interface = t("core/Interface");
        var d = 0;
        var m = 1;

        GridScene.prototype = Object.create(Scene.prototype);

        GridScene.prototype.constructor = GridScene;

        GridScene.DEFAULT_OPTIONS = {};
        GridScene.prototype.events = function ()
        {
            Engine.pipe(this.coreUI);
            Engine.on(
                "resize",
                Utils.debounce(
                    this.adjustScrollviews.bind(this), 333
                )
            );

            this.eventArbiter = new EventArbiter;
            Engine.pipe(this.eventArbiter);

            this.eventArbiter.forMode(m).pipe(this.rightPanel);

            this.eventArbiter.forMode(d).pipe(this.leftPanel);

            this.rightDescription.on("opening",
                this.eventArbiter.setMode.bind(this.eventArbiter, m)
            );

            this.leftDescription.on("opening",
                this.eventArbiter.setMode.bind(this.eventArbiter, d)
            );
        };

        GridScene.prototype.adjustScrollviews = function ()
        {
            var t = {
                clipSize: window.innerHeight - 2 * this.padding
            };

            this.rightPanel.setOptions(t);

            this.leftPanel.setOptions(t);
        };

        e.exports = GridScene;
    }
); 