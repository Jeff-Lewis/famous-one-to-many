define(
	"core/NextButton", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Surface", 
		"famous/Modifier", 
		"famous/Utility", 
		"famous-utils/Utils", 
		"famous-animation/Easing", 
		"famous-ui/Buttons/RotateButton", 
		"app/ID", 
		"famous-utils/Time"
	], 
	function (t, i, e) 
	{
        function s() {
            o.apply(this, arguments), this.nextButton, this.nextButtonModifier, this.nextButtonX, this.nextButtonY, this.descriptionVisible = !1, this.descriptionInit = !1, this.nextDescriptionMod, this.nextDescription, this.sceneWidth, this.sceneHeight, this.positions(), this.initButton(), this._ajaxNext(), this.show()
        }

        var o = t("famous/View"),
            n = t("famous/Matrix"),
            r = t("famous/Surface"),
            a = t("famous/Modifier"),
            h = t("famous/Utility"),
            u = t("famous-utils/Utils");
        t("famous-animation/Easing"), t("famous-ui/Buttons/RotateButton");
        var p = t("app/ID"),
            c = t("famous-utils/Time");
        s.prototype = Object.create(o.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            offset: [0, 0],
            buttonSize: [0, 0],
            showTransition: {
                curve: "inOutBackNorm",
                duration: 400
            },
            hideTransition: {
                curve: "inOutBackNorm",
                duration: 400
            },
            hoverTransition: {
                curve: "inOutSineNorm",
                duration: 800
            },
            nextDescriptionSize: [200, 60],
            descriptionInTransition: {
                method: "physics",
                spring: {
                    period: 800,
                    dampingRatio: .41
                },
                wall: !0,
                v: 0
            },
            descriptionOutTransition: {
                method: "physics",
                spring: {
                    period: 400,
                    dampingRatio: .5
                },
                wall: !1,
                v: 0
            },
            position: "tr"
        }, s.prototype.resize = function () {
            this.positions(), this.descriptionVisible ? (this.descriptionVisible = !this.descriptionVisible, this.showNextDescription()) : (this.descriptionVisible = !this.descriptionVisible, this.hideNextDescription())
        }, s.prototype.positions = function () {
            var t = window.innerWidth;
            window.innerHeight, "tr" == this.options.position ? (this.hiddenPositions = {
                next: n.translate(t - this.options.offset[0] - this.options.buttonSize[0], -this.options.buttonSize[1], 0),
                nextDescription: n.translate(t, this.options.offset[1], 0)
            }, this.shownPositions = {
                next: n.translate(t - this.options.offset[0] - this.options.buttonSize[0], this.options.offset[1], 0),
                nextDescription: n.translate(t - this.options.nextDescriptionSize[0], this.options.offset[1], 0)
            }) : "tc" == this.options.position && (this.hiddenPositions = {
                next: n.translate(.5 * t - .5 * this.options.buttonSize[0], -this.options.buttonSize[1], 0),
                nextDescription: n.translate(.5 * t + .5 * this.options.buttonSize[0], -this.options.nextDescriptionSize[1], 0)
            }, this.shownPositions = {
                next: n.translate(.5 * t - .5 * this.options.buttonSize[0], this.options.offset[1], 0),
                nextDescription: n.translate(.5 * t + .5 * this.options.buttonSize[0], 0, 0)
            })
        }, s.prototype.show = function () {
            var t = this.shownPositions.next,
                i = this.nextButton.getSize();
            this.nextButtonX = t[12] + .5 * i[0], this.nextButtonY = t[13] + .5 * i[1], this.nextButtonModifier.halt(), this.nextButtonModifier.setTransform(t, this.options.showTransition)
        }, s.prototype.showAll = function () {
            this.show()
        }, s.prototype.hideAll = function () {
            this.hideNextDescription(), this.hide()
        }, s.prototype.hide = function () {
            this.nextButtonModifier.halt(), this.nextButtonModifier.setTransform(this.hiddenPositions.next, this.options.hideTransition)
        }, s.prototype.hideNextDescription = function () {
            this.descriptionInit && this.descriptionVisible && (this.show(), this.nextDescriptionMod.halt(), this.nextDescriptionMod.setTransform(this.hiddenPositions.nextDescription, this.options.descriptionOutTransition), this.descriptionVisible = !1)
        }, s.prototype.showNextDescription = function () {
            this.descriptionInit && (this.descriptionVisible || (this.hide(), this.nextDescriptionMod.halt(), c.setTimeout(function () {
                1 == this.descriptionVisible && this.nextDescriptionMod.setTransform(this.shownPositions.nextDescription, this.options.descriptionInTransition)
            }.bind(this), 110), this.descriptionVisible = !0))
        }, s.prototype.mousemove = function (t, i) {
            var e = u.distance(t.pageX, t.pageY, this.nextButtonX, this.nextButtonY);
            i > e ? this.showNextDescription() : this.hideNextDescription()
        }, s.prototype._ajaxNext = function () {
            h.loadURL("http://fsrv.us/?f=getNextDemo&currentID=" + p + "&source=" + window.location.host, function (t) {
                if (t) {
                    var i = JSON.parse(t);
                    this.demoData = i.demoData, this.nextDemo = i.nextDemoData, this.initNextDescription()
                }
            }.bind(this))
        }, s.prototype.initButton = function () {
            this.nextButton = new r({
                properties: {
                    backgroundColor: "rgba( 0, 0, 0, 0.0)"
                },
                content: '<img draggable="false" class="no-user-select" src="js/core/next.svg" height="' + this.options.buttonSize[1] + '"></img>',
                size: this.options.buttonSize
            }), this.nextButtonModifier = new a({
                size: this.nextButton.getSize(),
                transform: this.shownPositions.next,
                opacity: this.nextButtonOpacity
            }), this.node.add(this.nextButtonModifier).link(this.nextButton)
        }, s.prototype.initNextDescription = function () {
            this.descriptionInit = !0;
            var t = "s.codepen.io" == window.location.host ? this.nextDemo.codepenURL : this.nextDemo.staticURL;
            this.nextButton.setContent('<a href="' + t + '">' + this.nextButton.getContent() + "</a>");
            var i = this.nextDemo.name,
                e = "http://notAvailableYet" !== this.nextDemo.thumbSRC ? this.nextDemo.thumbSRC : "https://s3-us-west-1.amazonaws.com/disrupt.famo.us/widgets-lightbox/thumb.jpg";
            this.nextDescription = new r({
                content: '<a target="_blank" style=" text-decoration: none; float: left;" href="' + t + '">' + '<img style="float: left; width: 50px;" src="' + e + '" width="50"></img>' + '<div style="float: left; padding-left: 5px;">' + '<span class="core-next-demo">NEXT DEMO:</span><br><span class="core-next-name">' + i + "</span>" + "</div>" + "</a>",
                size: this.options.nextDescriptionSize,
                classes: ["core-nextDescription"],
                properties: {
                    padding: "5px",
                    backgroundColor: "#000"
                }
            }), this.nextDescription.on("click", function (t, i) {
                i.preventDefault(), window.location.href = t
            }.bind(this, t)), this.nextDescriptionMod = new a({
                transform: this.hiddenPositions.nextDescription
            }), this.node.add(this.nextDescriptionMod).link(this.nextDescription), this.descriptionVisible = !1
        }, e.exports = s
    }
); 