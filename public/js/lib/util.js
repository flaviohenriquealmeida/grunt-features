(function($, doc) {
	var proxima = $(".proxima").attr("href");
	var anterior = $(".anterior").attr("href");

	$(doc.body).on("keydown", function (event) {
		if (event.keyCode == 39 && proxima) {
			doc.location.href = proxima;	
		}
		if (event.keyCode == 37 && anterior) {
			doc.location.href = anterior;	
		}
	});

	if(proxima) {
		$(doc.body).on("swipeleft", function() {
			doc.location.href = proxima;
		});
	}

	if(anterior) {
		$(doc.body).on("swiperight", function() {
			doc.location.href = anterior;
		});
	}



})(jQuery, document);
