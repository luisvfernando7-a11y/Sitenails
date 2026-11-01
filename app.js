import { L1, L2 } from './catalog.js';
import { CONTACT, whatsapp, mapUrl } from './config.js';
const services = [...L1, ...L2];
document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = whatsapp(); link.target = '_blank'; link.rel = 'noopener noreferrer';
});
document.querySelector('[data-instagram]').href = CONTACT.instagram;
document.querySelector('#map').href = mapUrl;
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#main-nav');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('open', open);
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('header')) setMenu(false); });
nav.addEventListener('focusout', () => {
  requestAnimationFrame(() => { if (!nav.contains(document.activeElement) && document.activeElement !== toggle) setMenu(false); });
});
matchMedia('(min-width:900px)').addEventListener('change', () => setMenu(false));
const form = document.querySelector('#contact-form');
const procedure = form.elements.procedure;
services.forEach(service => procedure.add(new Option(service.n, service.n)));
const phone = form.elements.phone;
function nationalPhone(value) { let digits = value.replace(/\D/g, ''); if (digits.length > 11 && digits.startsWith('55')) digits = digits.slice(2); return digits.slice(0, 11); }
phone.addEventListener('input', () => {
  const digits = nationalPhone(phone.value);
  phone.value = digits.length <= 2 ? digits : '(' + digits.slice(0, 2) + ') ' + (digits.length > 10 ? digits.slice(2, 7) + '-' + digits.slice(7) : digits.length > 6 ? digits.slice(2, 6) + '-' + digits.slice(6) : digits.slice(2));
});
function error(field, message) {
  field.setAttribute('aria-invalid', String(Boolean(message)));
  field.classList.toggle('invalid', Boolean(message));
  document.getElementById(field.id + '-error').textContent = message;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name;
  const digits = nationalPhone(phone.value);
  const checks = [[name, name.value.trim().length < 2 ? 'Informe seu nome (ao menos 2 caracteres).' : ''], [phone, !/^[1-9]{2}(?:9\d{8}|[2-5]\d{7})$/.test(digits) ? 'Informe um telefone brasileiro com DDD e 10 ou 11 dígitos.' : ''], [procedure, !services.some(service => service.n === procedure.value) ? 'Selecione um procedimento.' : '']];
  checks.forEach(([field, message]) => error(field, message));
  const invalid = checks.find(([, message]) => message);
  const status = document.querySelector('#form-status');
  status.textContent = '';
  if (invalid) { invalid[0].focus(); return; }
  const message = `Olá, Helena! Quero consultar um agendamento.\n\nNome: ${name.value.trim()}\nMeu WhatsApp: +55 ${digits}\nProcedimento: ${procedure.value}` + (form.elements.message.value.trim() ? `\nMensagem: ${form.elements.message.value.trim()}` : '') + '\n\nPodemos combinar um dia e horário?';
  const link = document.createElement('a');
  link.href = whatsapp(message); link.target = '_blank'; link.rel = 'noopener noreferrer';
  link.textContent = 'Abrir a mensagem no WhatsApp';
  status.append('Mensagem preparada. Revise e envie no WhatsApp. Nenhum horário foi confirmado. ', link);
  window.open(link.href, '_blank', 'noopener,noreferrer');
});
