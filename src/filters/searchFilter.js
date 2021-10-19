const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
	var index = elasticlunr(function () {
		this.addField("title");
		this.addField("altText");
		this.addField("image");
		this.addField("date");
		this.setRef("id");
	});

	collection.forEach((page) => {
		index.addDoc({
			id: page.url,
			title: page.template.frontMatter.data.title,
			altText: page.template.frontMatter.data.altText,
			image: page.template.frontMatter.data.image,
			date: page.date,
		});
	});

	return index.toJSON();
};
