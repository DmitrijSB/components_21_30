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
			this.menu = new Menu({
				el: document.querySelector('.js-menu'),

				onRemove() {

				},

				onPick(item) {
					console.log(item);
				},

				data: {},
			});

			this.form = new Form({ // eslint-disable-line no-unused-vars
				el: el.querySelector('.js-form'),
			});

			this.form.on('add', ({detail}) => {
				this.menu.addItem(detail);
			});

			const promise = this.fetchData();

			promise.then((result) => {
				this.menu.setData(result);
			});
		}

		fetchData() {
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();

				xhr.addEventListener('readystatechange', (evt) => {
					console.log(evt);
				});

				xhr.addEventListener('load', (evt) => {
					if (xhr.status === 200) {
						const result = JSON.parse(xhr.responseText);

						resolve(result);
					} else {
						console.error('Что-то пошло не так!');

						reject(xhr);
					}
				});

				xhr.open('GET', '/mocks/menu.mock.json', true);

				xhr.send();
			});
		}
	}

	// export
	window.App = App;
})();
