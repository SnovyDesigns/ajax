(function ($) {

	$(function() {
		var url = 'https://restcountries.eu/rest/v2/name/',
			countriesList = $('#countries');	

		$('#search').click(searchCountries);

		function searchCountries () {
			var countryName = $('#country-name').val();
			if (!countryName.length) countryName = 'Poland';
			$.ajax({
				url: url + countryName,
				type: 'GET',
				success: showCountriesList
			});
		}

		function countryConstructor (item) {
			var mainItem = $('<li>'),
				country = $('<div>').addClass('country'),
				itemFlag = $('<div>').addClass('flag'),
				img = $('<img>').attr('alt', 'flag'),
				countryTitle = $('<h2>'),
				addInfo = $('<h3>Background Information:</h3>'),
				info = $('<ul>').addClass('info'),
				infoItems =[
				{
					head: 'Capitol',
					value: item.capital
				},
				{
					head: 'Land area',
					value: item.area + ' sq. km'
				},
				{
					head: 'Population',
					value: item.population
				},
				{
					head: 'Language(s)',
					value: (item.languages[0].name)
				},
				{
					head: 'Currency',
					value: (item.currencies[0].name)
				}
				];

			itemFlag.append(img).append(countryTitle);
			country.append(itemFlag).append(addInfo).append(info);
			mainItem.append(country);

			countryTitle.text(item.name);
			img.attr('src', item.flag);

			infoItems.forEach( function(element, index) {
				var li = $('<li>'),
					span = $('<span>'),
					paragraph = $('<p>');

				span.text(element.head);
				paragraph.text(element.value);

				(li.append(span).append(paragraph)).appendTo(info);

			});

			return mainItem;
		}

		function showCountriesList (resp) {
			countriesList.empty();
			resp.forEach(function(item) {
				countryConstructor(item).appendTo(countriesList);
				// console.log(item.languages[0].name);
			});
					}
	});	
	
})(jQuery);