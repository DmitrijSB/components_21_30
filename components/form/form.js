(function () {
	'use strict';

	class Form {
		constructor(options) {
			this.el = options.el;

			this._initEvent();
			this.render();
		}

		_initEvent() {

		}

		template() {
			return `
				<form>
					<fieldset>
						<input type="text" name="url" placeholder="url"/>
						<input type="text" name="anchor" placeholder="!!!!!"/>
						<button type="submit">Добавить</button>
					</fieldset>
				</form>
			`;
		}

		render() {
			const template = this.template();

			this.el.innerHTML = template;
		}
	}

	window.Form = Form;
})();