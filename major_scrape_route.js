var nodeio = require('node.io');
exports.job = new nodeio.Job({

	input: false,
	run: function () {

		var url = this.options.args[0];
		this.getHtml(url, function (err, $) {
			if (err) { this.exit(err); }

			var majorStopRefs = [];

			var $table = $('div#centreblock table');
			$table.children.each(function (data) {
				var row = data.children[1];
				if(row.children[0].type === 'tag') {
					majorStopRefs.push (row.children[0].children[0].data);
				}
			});

			var newUrl = url + '&expand=';

			var i = 0;
			for(i; i < majorStopRefs.length; i++) {
				newUrl = newUrl + majorStopRefs[i] + '~|';
			}

			this.emit(newUrl.split('?')[1]);
		});
	}

});
