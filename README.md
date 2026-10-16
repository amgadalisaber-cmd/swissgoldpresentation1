# Swiss Gold Family Workshop — presentation website

The workshop slides as a website, to present from any browser or share as a link.

## Files

| File | What it is |
|---|---|
| `index.html` | All 29 slides: text and layout |
| `style.css` | Colors, Poppins font, animations |
| `script.js` | Slide navigation, click-to-reveal, count-up numbers, coin confetti |
| `images/` | Product photos, illustrations, logo, QR code (keep next to index.html) |

No build step. The only external resource is the Poppins font from Google Fonts.

## Presenting

- **Next:** click, Space, → or Enter. Each click reveals the next item, then moves to the next slide.
- **Back:** ← 
- **Full screen:** F
- **Jump to a slide:** add `#s` and the number to the address, e.g. `index.html#s12`

To present offline, double-click `index.html`. Without internet the font falls back to the system font, so connect once beforehand or present online.

## Publish it (free)

**Vercel**

```
cd ~/Desktop/"Swissgold Workshop"/presentation-website
npx vercel --prod
```

Log in when the browser opens, accept the defaults, and copy the `.vercel.app` link it prints. Give it a different project name from the calculator (e.g. `swissgold-workshop`) so it doesn't replace it.

**Netlify (no terminal):** open https://app.netlify.com/drop and drag this whole folder onto the page.

## Sources

Price and inflation sources are in each slide's `data-notes` and in the speaker notes of `swissgold-workshop-en.pptx`.
