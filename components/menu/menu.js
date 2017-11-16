(function () {
	'use strict';

	const template = window.menuTemplate;
	const templateItem = window.menuItemTemplate;


	/**
	 * @typedef {Item} Тип элемента меню
	 * @prop {string} href URL
	 * @prop {string} anchor текст
	 */

	/**
	 * Компонента "Меню"
	 */
	class Menu {
		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor(opts) {
			this.el = opts.el;
			this.data = opts.data;

			this.onPick = opts.onPick;
			this.onRemove = opts.onRemove;

			// this.render();
			this._initEvents();
		}

		getData() {
			return this.data;
		}

		setData(data) {
			this.data = data;
			this.render();
		}

		/**
		 * Добавляем элемент меню
		 * @param {Object} item
		 */
		addItem(item) {
			let el = document.createElement('div');
			el.innerHTML = this.getItemHtml(item, this.data.items.length);
			el = el.firstElementChild;

			this.list.append(el);
			el.addEventListener('animationend', () => el.classList.remove('bounce-in-left'));
			el.classList.add('bounce-in-left');

			this.data.items.push(item);
		}

		/**
		 * Удаляем пункт меню из данных
		 * @param  {Object} removedItem
		 */
		removeItem(removedItem) {
			this.data.items = this.data.items.filter((item, index) => index !== removedItem.index);
			this.render();

			this.onRemove && this.onRemove(removedItem);
		}

		/**
		 * HTML одного объекта меню
		 * @param {Item} item
		 * @param {number} index
		 * @return {string}
		 */
		getItemHtml(item, index) {
			return templateItem({
				item,
				index,
			});
		}

		/**
		 * Возвращает HTML элемент списка меню
		 * @return {HTMLUListElement}
		 */
		get list() {
			return this.el.querySelector('.menu__list');
		}

		/**
		 * Возвращает HTML элемент заголовка меню
		 * @return {HTMLUListElement}
		 */
		get title() {
			return this.el.querySelector('.menu__title');
		}

		/**
		 * Создаем HTML
		 */
		render() {
			/**
			 * Создаем HTML элементов меню
			 * @param {Array<Item>} itmes
			 * @return {string}
			 */

			this.el.innerHTML = template({
				title: this.data.title,
				items: this.data.items,
			});
		}

		/**
		 * Удаления элемента меню
		 * @param  {Element} item
		 * @private
		 */
		_onRemoveClick(item) {
			const el = /** @type {Element} */ item.parentNode;

			const index = parseInt(item.parentNode.dataset.index, 10);
			el.addEventListener('animationend', this.removeItem.bind(this, {index}));
			el.classList.add('bounce-out-right');
		}

		/**
		 * Выбор элемента меню
		 * @param  {HTMLElement} item
		 */
		_onPickClick(item) {
			this.onPick && this.onPick(item);
		}

		/**
		 * Развешиваем события
		 */
		_initEvents() {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		/**
		 * Клик в любую область меню
		 * @param {Event} event
		 * @private
		 */
		_onClick(event) {
			event.preventDefault();
			const item = event.target;

			switch (item.dataset.action) {
				case 'remove':
					this._onRemoveClick(item);
					break;

				case 'pick':
					this._onPickClick(item);
					break;
			}
		}
	}

	// Export
	window.Menu = Menu;
})(window);
