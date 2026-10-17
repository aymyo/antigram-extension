const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

const library = import(`data:text/javascript;base64,${Buffer.from(
  readFileSync('source/modules/lib.js', 'utf8')
).toString('base64')}`);

test('existing settings gain opt-in defaults without losing preferences', async () => {
  const { getEffectiveSettings } = await library;
  const settings = getEffectiveSettings({ blockPosts: true, blockExplore: false });
  assert.equal(settings.blockPosts, true);
  assert.equal(settings.blockExplore, false);
  assert.equal(settings.blockMessagesPopup, false);
  assert.equal(settings.distractionFree, false);
});

test('Only Stories mode keeps stories and restores individual preferences when disabled', async () => {
  const { getEffectiveSettings } = await library;
  const saved = { distractionFree: true, blockStories: true, blockPosts: false, blockForYouFeed: true };
  const settings = getEffectiveSettings(saved);
  for (const key of ['blockPosts', 'blockReels', 'blockExplore', 'blockThreads', 'blockSuggestedFollowers', 'blockMessagesPopup']) {
    assert.equal(settings[key], true, key);
  }
  assert.equal(settings.blockStories, false);
  assert.equal(settings.blockForYouFeed, false);
  assert.equal(saved.blockPosts, false);
  const restored = getEffectiveSettings({ ...saved, distractionFree: false });
  assert.equal(restored.blockPosts, false);
  assert.equal(restored.blockStories, true);
  assert.equal(restored.blockForYouFeed, true);
});

test('floating Messages detection preserves sidebar links, full inbox, and unrelated buttons', async () => {
  const { hideMessagesPopup } = await library;
  class Element {
    constructor(label, position, rect, parent, tag = '') {
      Object.assign(this, { textContent: label, position, rect, parentElement: parent, tag, style: {} });
    }
    getAttribute() { return null; }
    matches(selector) { return this.tag === 'main' && selector.includes('main'); }
    querySelector() { return null; }
    getBoundingClientRect() { return this.rect; }
  }
  global.Node = Element;
  global.NodeList = Array;
  global.window = { innerWidth: 1200, innerHeight: 900 };
  global.getComputedStyle = (node) => ({ position: node.position });
  const body = new Element('', 'static', {});
  const floating = new Element('', 'fixed', { left: 900, bottom: 880, width: 280 }, body);
  const message = new Element('Messages', 'static', {}, floating);
  const sidebar = new Element('Messages', 'fixed', { left: 0, bottom: 900, width: 80 }, body);
  const inbox = new Element('', 'fixed', { left: 700, bottom: 900, width: 400 }, body, 'main');
  const inboxMessage = new Element('Messages', 'static', {}, inbox);
  const unrelated = new Element('Help', 'fixed', { left: 900, bottom: 880, width: 280 }, body);
  body.querySelectorAll = () => [message, sidebar, inboxMessage, unrelated];
  hideMessagesPopup(body);
  assert.equal(floating.style.display, 'none');
  for (const node of [sidebar, inbox, unrelated, body]) assert.equal(node.style.display, undefined);
});

test('both browser packages expose and save every setting', async () => {
  const { labelsArray } = await library;
  for (const root of ['source', 'source-firefox']) {
    const html = readFileSync(`${root}/popup/popup.html`, 'utf8');
    for (const key of labelsArray) assert.ok(html.includes(`id="${key}"`), `${root}: ${key}`);
  }
  for (const file of ['modules/lib.js', 'modules/main.js', 'popup/popup.js', 'popup/popup.html', 'popup/popup.css']) {
    assert.equal(readFileSync(`source/${file}`, 'utf8'), readFileSync(`source-firefox/${file}`, 'utf8'));
  }
});

test('tab notification count is removed on repeated updates without rewriting clean titles', async () => {
  const { hideTitleNotificationCount } = await library;
  let title = '(1) Instagram';
  let writes = 0;
  const page = {
    get title() { return title; },
    set title(value) { title = value; writes++; }
  };
  hideTitleNotificationCount(page);
  assert.equal(title, 'Instagram');
  assert.equal(writes, 1);
  hideTitleNotificationCount(page);
  assert.equal(writes, 1);
  title = '(99+) Inbox • Instagram';
  hideTitleNotificationCount(page);
  assert.equal(title, 'Inbox • Instagram');
  title = 'Profile (2026) • Instagram';
  hideTitleNotificationCount(page);
  assert.equal(title, 'Profile (2026) • Instagram');
  assert.equal(writes, 2);
});
