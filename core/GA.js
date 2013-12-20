define(
	"core/GA", 
	[
		"require", 
		"exports", 
		"module"
	], 
	function (t, i, e) 
	{
        var s = s || [];
        s.push(["_setAccount", "UA-34653957-1"]), s.push(["_setCampSourceKey", "utm_source"]), s.push(["_setCampMediumKey", "utm_medium"]), s.push(["_setCampContentKey", "utm_keyword"]), s.push(["_setCampTermKey", "utm_keyword"]), s.push(["_setCampNameKey", "utm_campaign"]), s.push(["_trackPageview"]),
        function () {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
            var i = document.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(t, i)
        }(), e.exports = s
    }
); 