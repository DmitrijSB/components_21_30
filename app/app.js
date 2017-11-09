(function () {
	'use strict';

	let data = {
		title: 'Рабочие',
		items: [
			{
				anchor: 'mail.ru'
			},
			{
				anchor: 'yandex.ru'
			},
			{
				anchor: 'google.com'
			},
		]
	};

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		data,
	});

	let form = new Form({
		el: document.querySelector('.js-form'),
	});
})();