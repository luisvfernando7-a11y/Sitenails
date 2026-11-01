import test from 'node:test';
import assert from 'node:assert/strict';

test('menu, telephone normalization and contact form handlers (without a browser)', async () => {
  const documentEvents = {};
  const opened = [];
  const doc = { activeElement: null, addEventListener: (name, handler) => { documentEvents[name] = handler; } };
  class Element {
    constructor(id) { this.id = id; this.value = ''; this.events = {}; this.attrs = {}; this.options = []; this.children = []; this.textContent = ''; this.classes = new Set(); this.classList = { toggle: (key, active) => active ? this.classes.add(key) : this.classes.delete(key), contains: key => this.classes.has(key) }; }
    addEventListener(name, handler) { this.events[name] = handler; }
    setAttribute(name, value) { this.attrs[name] = value; }
    getAttribute(name) { return this.attrs[name]; }
    focus() { doc.activeElement = this; }
    contains(target) { return target === this; }
    add(option) { this.options.push(option); }
    append(...nodes) { this.children.push(...nodes); }
  }
  const toggle = new Element('toggle'); toggle.setAttribute('aria-expanded', 'false');
  const nav = new Element('main-nav');
  const fields = Object.fromEntries(['name', 'phone', 'procedure', 'message'].map(name => [name, new Element(name)]));
  const form = new Element('contact-form'); form.elements = fields;
  const status = new Element('form-status');
  const genericLinks = [new Element('wa-header'), new Element('wa-contact')];
  const instagram = new Element('instagram'); const map = new Element('map');
  const errors = Object.fromEntries(['name', 'phone', 'procedure'].map(name => [name + '-error', new Element(name + '-error')]));
  const nodes = { '.nav-toggle': toggle, '#main-nav': nav, '#contact-form': form, '#form-status': status, '[data-instagram]': instagram, '#map': map };
  Object.assign(doc, { querySelector: key => { assert.ok(nodes[key], key); return nodes[key]; }, querySelectorAll: key => { assert.equal(key, '[data-wa]'); return genericLinks; }, getElementById: id => errors[id], createElement: tag => { assert.equal(tag, 'a'); return new Element('generated-link'); } });
  const globals = ['document', 'window', 'Option', 'matchMedia', 'requestAnimationFrame'];
  const previous = Object.fromEntries(globals.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  try {
    Object.assign(globalThis, { document: doc, window: { open: (...args) => opened.push(args) }, Option: class { constructor(text, value) { this.text = text; this.value = value; } }, matchMedia: query => { assert.equal(query, '(min-width:761px)'); return { addEventListener() {} }; }, requestAnimationFrame: callback => callback() });
    await import('../app.js?interaction-test');
    assert.equal(fields.procedure.options.length, 11);
    assert.equal(new URL(genericLinks[0].href).pathname, '/5514996238393');
    assert.equal(genericLinks[0].rel, 'noopener noreferrer');
    assert.equal(instagram.href, 'https://instagram.com/lash_helenamorelin');
    assert.ok(new URL(map.href).searchParams.get('query').includes('Rua Manoel Vieira Júnior'));

    toggle.events.click();
    assert.equal(toggle.getAttribute('aria-expanded'), 'true');
    assert.ok(nav.classList.contains('open'));
    documentEvents.keydown({ key: 'Escape' });
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(doc.activeElement, toggle);
    toggle.events.click();
    nav.events.click({ target: { closest: () => ({}) } });
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    toggle.events.click();
    documentEvents.click({ target: { closest: () => null } });
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');

    let prevented = false;
    form.events.submit({ preventDefault() { prevented = true; } });
    assert.ok(prevented);
    assert.equal(doc.activeElement, fields.name);
    assert.equal(fields.name.getAttribute('aria-invalid'), 'true');
    assert.ok(errors['phone-error'].textContent);
    assert.equal(opened.length, 0);

    fields.name.value = 'Ana & Júlia';
    fields.phone.value = '+5514996238393';
    fields.phone.events.input();
    assert.equal(fields.phone.value, '(14) 99623-8393');
    fields.procedure.value = 'Lash lifting';
    fields.message.value = 'Quero consultar os horários.';
    form.events.submit({ preventDefault() {} });
    assert.equal(opened.length, 1);
    const url = new URL(opened[0][0]);
    assert.equal(url.pathname, '/5514996238393');
    const message = url.searchParams.get('text');
    assert.ok(message.includes('Nome: Ana & Júlia'));
    assert.ok(message.includes('Meu WhatsApp: +55 14996238393'));
    assert.ok(message.includes('Procedimento: Lash lifting'));
    assert.ok(message.includes('Quero consultar os horários.'));
    assert.equal(opened[0][2], 'noopener,noreferrer');
    assert.equal(fields.name.getAttribute('aria-invalid'), 'false');
    assert.ok(status.children.some(node => typeof node === 'object' && node.href === url.href));

    fields.procedure.value = 'procedimento inexistente';
    form.events.submit({ preventDefault() {} });
    assert.equal(opened.length, 1);
    assert.equal(doc.activeElement, fields.procedure);
  } finally {
    for (const key of globals) { if (previous[key]) Object.defineProperty(globalThis, key, previous[key]); else delete globalThis[key]; }
  }
});
