import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  fontSize: '1.6rem',
  success: {
    background: '#fd9222',
    textColor: '#000000',
  },
});

(() => {
  const refs = {
    openModalBtn2: document.querySelector('[data-hero-open]'),
    openModalBtn: document.querySelector('[data-modal-order-open]'),
    closeModalBtn: document.querySelector('[data-modal-order-close]'),
    modal: document.querySelector('[data-modal-order]'),
    form: document.querySelector('.modal-form.buy-js'),
  };

  if (!refs.form) return;

  const nameInput = refs.form.querySelector('#buyform-name');
  const surnameInput = refs.form.querySelector('#buyform-surname');
  const emailInput = refs.form.querySelector('#buyform-email');
  const phoneInput = refs.form.querySelector('#buyform-phone');
  const cardInput = refs.form.querySelector('#buyform-card');

  hideAllErrors();

  refs.openModalBtn2.addEventListener('click', toggleModal);
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    if (refs.modal.classList.contains('is-hidden')) {
      resetForm();
    } else {
      nameInput?.focus();
    }
  }

  nameInput.addEventListener('blur', () => validateName(nameInput));
  surnameInput.addEventListener('blur', () => validateName(surnameInput));
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  cardInput.addEventListener('blur', validateCard);

  refs.form.addEventListener('submit', e => {
    e.preventDefault();

    const ok =
      validateName(nameInput) &&
      validateName(surnameInput) &&
      validateEmail() &&
      validatePhone() &&
      validateCard();

    if (ok) {
      e.preventDefault();
      Notify.success('Success');
      toggleModal();
    }
  });

  function getFormItem(input) {
    return input.closest('.form-item') || input.parentElement;
  }

  function showError(input, className) {
    const item = getFormItem(input);
    input.classList.add('is-invalid');
    const err = item?.querySelector(`.error-message.${className}`);
    if (err) err.style.display = 'block';
  }

  function clearErrorsFor(input) {
    const item = getFormItem(input);
    input.classList.remove('is-invalid', 'is-valid');
    item
      ?.querySelectorAll('.error-message')
      .forEach(el => (el.style.display = 'none'));
  }

  function hideAllErrors() {
    refs.form
      .querySelectorAll('.error-message')
      .forEach(el => (el.style.display = 'none'));
    refs.form
      .querySelectorAll('input, textarea')
      .forEach(el => el.classList.remove('is-invalid', 'is-valid'));
  }

  function resetForm() {
    refs.form.reset();
    hideAllErrors();
  }

  const nameRegex = /^[A-Za-z' -]+$/;

  function validateName(input) {
    const value = input.value.trim();
    clearErrorsFor(input);

    if (value === '') {
      showError(input, 'required');
      return false;
    }
    if (!nameRegex.test(value)) {
      showError(input, 'required-pattern');
      return false;
    }
    input.classList.add('is-valid');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    clearErrorsFor(emailInput);

    if (value === '') {
      showError(emailInput, 'required');
      return false;
    }
    if (!emailInput.checkValidity()) {
      showError(emailInput, 'required-email');
      return false;
    }
    emailInput.classList.add('is-valid');
    return true;
  }

  const phoneRegex = /^[0-9]{14,23}$/;

  function validatePhone() {
    const value = phoneInput.value.trim();
    clearErrorsFor(phoneInput);

    if (value === '') {
      showError(phoneInput, 'required');
      return false;
    }
    if (!phoneRegex.test(value)) {
      showError(phoneInput, 'required-pattern');
      return false;
    }
    phoneInput.classList.add('is-valid');
    return true;
  }

  const cardRegex = /^[0-9\s]{13,19}$/;

  function validateCard() {
    const value = cardInput.value.trim();
    clearErrorsFor(cardInput);

    if (value === '') {
      showError(cardInput, 'required');
      return false;
    }
    if (!cardRegex.test(value)) {
      showError(cardInput, 'required-pattern');
      return false;
    }
    cardInput.classList.add('is-valid');
    return true;
  }
})();
