# CSS Var Autocomplete

> **Smarter CSS. Faster workflow.**  
> Auto-complete your CSS custom properties — straight from your `:root`.

---

## ✨ Features

- 🔍 **Auto-detects** all `--variable` from the active CSS file
- ⚡ **Instant suggestion** `var(--variable-name)` as you type
- 🔄 **Re-parses automatically** on every file change *(debounced — no lag)*
- 🪶 **Lightweight** — zero performance impact

---

## 🚀 How to Use

1. Open a `.css` file that has a `:root {}` block
2. Write a CSS property, then **start typing** the variable name
3. Suggestion appears → **tap or press Enter** to insert

> No setup needed. Works out of the box.

---

## 📦 Example

If your `:root` looks like this:

```css
:root {
  --hue: 255;
  --first-color: hsl(var(--hue), 60%, 64%);
  --body-color: hsl(240, 100%, 2%);
  --text-color: hsl(240, 8%, 70%);
}
```

Then:

| You type | You get |
|----------|---------|
| `body` | `var(--body-color)` |
| `first` | `var(--first-color)` |
| `text` | `var(--text-color)` |

---

## 🎨 Learn More About HSL

Want to explore and pick HSL colors?

- [hslpicker.com](https://hslpicker.com)
- [htmlcolorcodes.com](https://htmlcolorcodes.com)

---

## ⚠️ Notes

- Only reads the **currently active** file
- Variables from **other files** won't be detected
- Requires Acode **language tools** to be enabled

---

## 🐛 Bug Report & Feature Request

Found a bug or have an idea?  
**Open an issue here →** [Click Me](https://github.com/Panggil-aja-Kaka/css-var-autocomplete-acode-plugin)
---
## 👤 Author

**Bayanaka**