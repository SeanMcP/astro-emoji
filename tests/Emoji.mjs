import { test } from "uvu";
import * as assert from "uvu/assert";
import { getComponentOutput } from "astro-component-tester";

async function getHTML(props) {
  const output = await getComponentOutput("./src/Emoji.astro", props);
  return output.html;
}

/**
 * Normally it would be a good idea to break these assertions into individual
 * test cases. However, the process of generating the component HTML is very
 * slow, so we're batching tests into rendering conditions to reduce the number
 * of times we need generate the HTML.
 */

test("When no props are provided, renders span[role=img]", async () => {
  const html = await getHTML();

  assert.match(html, "<span ");
  assert.match(html, "</span>");
  assert.match(html, `role="img"`);
});

test("When symbol is provided, renders hidden emoji", async () => {
  const symbol = "👋";
  const html = await getHTML({ symbol });

  assert.match(html, symbol);
  assert.match(html, 'aria-hidden="true"');
  assert.not.match(html, "aria-label");
});

test("When label and symbol are provided, renders labelled emoji", async () => {
  const label = "Test tube";
  const symbol = "🧪";
  const html = await getHTML({ label, symbol });

  assert.match(html, `aria-label=\"${label}\"`);
  assert.match(html, symbol);
  assert.not.match(html, "aria-hidden");
});

test("Forwards props to attributes", async () => {
  const label = "Test tube";
  const symbol = "🧪";
  const html = await getHTML({
    label,
    symbol,
    class: "test",
    id: "test",
    "data-test": "test",
  });

  assert.match(html, 'class="test"');
  assert.match(html, 'id="test"');
  assert.match(html, 'data-test="test"');
});

test("Ignores forbidden attributes", async () => {
  const label = "Test tube";
  const symbol = "🧪";
  const html = await getHTML({
    label,
    symbol,
    "aria-hidden": "test",
    "aria-label": "test",
    role: "test",
  });

  assert.not.match(html, 'aria-hidden="test"');
  assert.not.match(html, 'aria-label="test"');
  assert.not.match(html, 'role="test"');
});

test.run();
