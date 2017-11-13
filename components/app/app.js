(function () {
	'use strict';

	// import
	const Menu = window.Menu;
	const Form = window.Form;

	/**
	 * Компонента "Форма"
	 */
	class App {
		/**
		 * @param {Object} param0
		 * @param {HTMLElement} param0.el
		 */
		constructor({el}) {
			const menu = new Menu({
				el: document.querySelector('.js-menu'),

				onRemove() {

				},

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

			const form = new Form({ // eslint-disable-line no-unused-vars
				el: el.querySelector('.js-form'),
			});

			form.on('add', ({details}) => {
				menu.addItem(details);
			});

			window.menu = menu;
		}
	}

	// export
	window.App = App;
})();
