(function() {
	'use strict';

	/**
	 * @class Menu
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

			this.render();

			this.list = this.el.querySelector('.menu__list');
			this.title = this.el.querySelector('.menu__title');

			this._initEvents();
		}

		/**
		 * Добавляем элемент меню
		 * @param {Object} item
		 */
		addItem (item) {
			this.data.items.push(item);
			this.render();
		}

		/**
		 * Удаляем пункт меню из данных
		 * @param  {Object} removedItem
		 */
		removeItem (removedItem) {
			this.data.items = this.data.items.filter((item, index) => {
				return index !== removedItem.index;
			});
			this.render();
		}

		/**
		 * Создаем HTML
		 */
		render () {
			function generateItems (itmes) {
				return itmes.map( (item, index) => {
					return `
						<li class="pure-menu-item" data-index="${index}">
							<a class="pure-menu-link" href="${item.href}" data-action="pick">
								${item.anchor}
							</a>
							<i class="close" data-action="remove"></i>	
						</li>`;
				}).join('');
			}

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
		}

		/**
		* Удаления элемента меню
		* @param  {HTMLElement} item
		* @private
		*/
		_onRemoveClick(item) {
			let index = parseInt(item.parentNode.dataset.index, 10);

			this.removeItem({
				index
			});
		}

		/**
		* Выбор элемента меню
		* @param  {HTMLElement} item
		*/
		_onPickClick(item) {
			this.onPick(item);
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
			let item = event.target;

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