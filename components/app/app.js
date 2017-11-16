(function () {
	'use strict';

	// import
	const Menu = window.Menu;
	const Form = window.Form;

	const URL = 'https://components-21-30.firebaseio.com/menu/-Kz5NeJk9exl8TnG0ZZf.json';

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
				this.addItem();
			});

			this.fetchData()
				.then((result) => {
					this.menu.setData(result);
				})
				.catch((err) => {
					console.log('ОШИБКА В ПРОМИСЕ');
				});
		}

		addItem() {
			return this.request('PUT', URL, this.menu.getData());
		}

		fetchData() {
			return this.request('GET', URL);
		}

		saveData() {
			return this.request('POST', URL, this.menu.getData());
		}

		request(method, url, data) {
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();

				xhr.addEventListener('readystatechange', (evt) => {
					console.log(evt);
				});

				xhr.addEventListener('load', () => {
					if (xhr.status === 200) {
						const result = JSON.parse(xhr.responseText);

						resolve(result);
					} else {
						console.error('Что-то пошло не так!');

						reject(xhr);
					}
				});

				xhr.open(method, url, true);


				const dataJSON = data ? JSON.stringify(data) : null;

				xhr.send(dataJSON);
			});
		}
	}

	// export
	window.App = App;
})();
