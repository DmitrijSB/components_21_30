(function () {
	'use strict';


	/**
	 * @class Form
	 * Компонента "Форма"
	 */
	class Form {
		/**
		 * @constructor
		 * @param  {Object} opts
		 */
		constructor({el, data, onSubmit}) {
			this.el = el;
			this.data = data;
			this.onSubmit = onSubmit;

			this.render();
			this._initEvents();
		}

		/**
		 * Создаем HTML
		 */
		render() {
			this.el.innerHTML = `
			<form class="form pure-form">
				<fieldset>
					<input class="form__input"
						type="url" name="href"
						required="required"
						placeholder="url"/>
					
					<input class="form__input"
						type="text" name="anchor"
						required="required"
						placeholder="anchor"/>
					<button class="form__btn pure-button" type="submit">
						Save
					</button>
					
				</fieldset>
			</form>`;
		}


		/**
		 * Получение элемента формы по имени
		 * @param  {string} name
		 * @return {HTMLElement}
		 */
		getField(name) {
			return this.el.querySelector(`[name="${name}"]`);
		}


		/**
		 * Развешиваем события
		 */
		_initEvents() {
			this.el.addEventListener('submit', this._onSubmit.bind(this));
		}


		/**
		 * Отправка данных формы
		 * @param {Event} event
		 * @private
		 */
		_onSubmit(event) {
			event.preventDefault();

			this.onSubmit(this);
			event.target.reset();
		}
	}


	//export
	window.Form = Form;
})();
