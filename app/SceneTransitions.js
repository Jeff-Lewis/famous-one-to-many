define(
	"app/SceneTransitions", 
	[
		"require", 
		"exports", 
		"module", 
		"famous-scene/SceneTransitions", 
		"app/SceneController"
	], 
	function (t, i, e) 
	{
        var s = t("famous-scene/SceneTransitions"),
            o = t("app/SceneController"),
            n = new s;
        n.setController(o), e.exports = n
    }
); 