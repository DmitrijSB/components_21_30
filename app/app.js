(function () {
	'use strict';

	//import
	const Menu = window.Menu;
	const Form = window.Form;

	const menu = new Menu({
		el: document.querySelector('.js-menu'),
		onPick(item) {
			console.log(item);
		},
		data: {
			title: 'SINGLE PAGE APPLICATION',
			items: [
				{
					href: 'https://vk.com',
					anchor: 'vk.com',
				},
				{
					href: 'https://ok.ru',
					anchor: 'ok.ru',
				},
				{
					href: 'https://yahoo.com',
					anchor: 'yahoo.com',
				},
				{
					href: 'https://yandex.ru',
					anchor: 'yandex.ru',
				},
			],
		},
	});

	const form = new Form({
		el: document.querySelector('.js-form'),
		onSubmit(component) {
			menu.addItem({
				href: component.getField('href').value,
				anchor: component.getField('anchor').value,
			});
		},
	});

	window.menu = menu;
})();
