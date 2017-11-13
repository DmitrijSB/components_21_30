(function () {
	'use strict';

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

			this.render();
			this._initEvents();
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
			return `
            <li class="pure-menu-item" data-index="${index}">
                <a 
                class="pure-menu-link"
                href="${item.href}"
                data-action="pick">
                    ${item.anchor}
                </a>
                <i class="close" data-action="remove"></i>
            </li>`;
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
			const generateItems = (itmes) => itmes.map(this.getItemHtml.bind(this)).join('');

			this.el.innerHTML = `
            <div class="menu pure-menu custom-restricted-width">
                <span class="menu__title pure-menu-heading">
                ${this.data.title}
                </span>
                <ul class="menu__list pure-menu-list">
                ${generateItems(this.data.items)}
                </ul>
            </div>
            `;

			this.list = this.el.querySelector('.menu__list');
			this.title = this.el.querySelector('.menu__title');
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
