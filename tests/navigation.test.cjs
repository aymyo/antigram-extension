const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { runInNewContext } = require("node:vm");

for (const root of ["source", "source-firefox"]) {
  for (const enabled of [true, false]) {
    test(`${root}: direct profile load and navigation with Only Stories mode ${enabled}`, async () => {
      const lib = await import(
        `data:text/javascript;base64,${Buffer.from(
          readFileSync(`${root}/modules/lib.js`, "utf8")
        ).toString("base64")}`
      );
      const calls = [];
      let onMutation;
      let hidden = 0;
      let popupChecks = 0;
      const location = { pathname: "/some_profile/", search: "" };
      const body = { querySelector: () => null, querySelectorAll: () => [] };
      const source = readFileSync(`${root}/modules/main.js`, "utf8")
        .replace(/import\s*\{[\s\S]*?\}\s*from\s*"[^"]+";/, "")
        .replace("export { main };", "main();");
      await runInNewContext(source, {
        ...lib,
        chrome: {
          storage: {
            sync: {
              get: (_, resolve) =>
                resolve({ distractionFree: enabled, blockForYouFeed: false, blockStories: true })
            }
          }
        },
        document: { body },
        window: { location },
        MutationObserver: class {
          constructor(callback) {
            onMutation = callback;
          }
          observe() {}
        },
        hide: () => {
          hidden++;
        },
        hideMessagesPopup: () => {
          popupChecks++;
        },
        hideTitleNotificationCount: () => {},
        hideSidebar: () => calls.push("sidebar"),
        hideHomeDistractions: () => calls.push("home")
      });
      assert.deepEqual(calls, enabled ? ["sidebar"] : []);
      calls.length = 0;
      location.pathname = "/";
      onMutation();
      assert.deepEqual(calls, enabled ? ["sidebar", "home"] : []);
      calls.length = 0;
      location.pathname = "/another_profile/";
      onMutation();
      assert.deepEqual(calls, enabled ? ["sidebar"] : []);
      for (const path of ["/stories/friend/1/", "/stories/friend/2/", "/stories/another/3/"]) {
        calls.length = 0;
        hidden = 0;
        popupChecks = 0;
        location.pathname = path;
        onMutation();
        assert.deepEqual(calls, [], "story navigation must not run sidebar or home rules");
        assert.equal(popupChecks, 0, "story controls must not be detected as popups");
        assert.equal(hidden, enabled ? 0 : 1, "Only Stories overrides the explicit story block");
      }
    });
  }
}
