import { html, render } from 'lit-html'
import { PluginOptions } from 'grapesjs'
import { KeymapsDialogManager, titleCase } from './KeymapsDialogManager'

const defaultCSS = `
@keyframes keymaps-fade-in {
  from {
    transform: translate(-50%, 8px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@keyframes keymaps-fade-out {
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 10px);
    opacity: 0;
  }
}

#keymaps-dialog {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333333;
  border: #404040 solid 1px;
  border-radius: 10px;
  z-index: 1000;
  padding: 15px 18px 25px 28px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.33);
  animation: keymaps-fade-in 0.2s;
}

#keymaps-dialog.fade-out {
  animation: keymaps-fade-out 0.2s;
}

#keymaps-dialog header {
  margin-bottom: 12px;
}

#keymaps-dialog main {
  display: flex;
  position: relative;
  max-width: 80vw;
  overflow-x: auto;
  overflow-y: hidden;
}

#keymaps-dialog .mask {
  position: sticky;
  flex-shrink: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  right: 0;
  background-image: linear-gradient(to right, transparent, #333333 90%);
}

#keymaps-dialog .category {
  margin-right: 15px;
}

#keymaps-dialog .category:last-of-type {
  margin-right: 0;
}

#keymaps-dialog ul {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 2px;
  list-style: none;
}

#keymaps-dialog * {
  cursor: default;
  padding: 0;
  margin: 0;
  color: #ddd;
  font-family: Ubuntu, sans-serif;
}

#keymap-dialog *::selection, #keymap-dialog *::-moz-selection {
  background-color: transparent;
}

#keymaps-dialog h3 {
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.5;
}

#keymaps-dialog h4 {
  font-size: 0.85rem;
  margin-bottom: 12px;
}

#keymaps-dialog span {
  font-size: 0.75rem;
}

#keymaps-dialog .keymap {
  border-radius: 7px;
  padding: 5px 20px 6px 5px;
  white-space: nowrap;
}

#keymaps-dialog .keymap:nth-child(odd) {
  background-color: #404040;
}

#keymaps-dialog .keys {
  display: inline-block;
  margin-right: 5px;
}

#keymaps-dialog .key {
  display: inline-block;
  border: #ddd solid 1px;
  border-radius: 4px;
  box-shadow: 0 2px 0 #ddd;
  transform: translateY(-2px);
  padding: 1px 5px;
  margin-right: 2px;
}

#keymaps-dialog .name {
  white-space: nowrap;
}

`;

/**
 * The effective dialog that displays the keymaps.
 */
export class KeymapsDialog {
  manager: KeymapsDialogManager
  options: PluginOptions
  isOpen: boolean
  closing: boolean

  constructor(manager: KeymapsDialogManager, opts: PluginOptions) {
    this.manager = manager
    this.options = opts
    this.isOpen = false
    this.closing = false
  }

  /**
   * Opens the dialog.
   */
  open(): void {
    this.isOpen = true
    this.renderDialog()
  }

  /**
   * Closes the dialog.
   */
  close(): void {
    this.isOpen = false
    this.closing = true
    this.renderDialog()

    // Handle the fade-out animation
    const dialog = document.getElementById('keymaps-dialog')
    dialog?.addEventListener('animationend', () => {
      if (dialog.classList.contains('fade-out')) {
        dialog.style.display = 'none'
        this.closing = false
      }
    })
  }

  /**
   * Renders the CSS for the dialog.
   */
  renderCSS(): string {
    return this.options.css ?? defaultCSS;
  }

  /**
   * Renders the dialog.
   */
  renderDialog(): void {
    const reg = this.manager.keymapsRegistry

    render(html`
      <style>${this.renderCSS()}</style>
      <div id="keymaps-dialog" class="${this.closing ? 'fade-out' : ''}" style="${this.isOpen ? 'display: block' : ''}">
        <header>
          <h3>Keyboard Shortcuts (hold ${titleCase(this.options.longPressKey)} to show)</h3>
        </header>
        <main>
          ${Object.keys(reg).map(category => html`
            <section class="category">
              <h4>${category}</h4>
              <ul>
                ${reg[category].map(keymap => html`
                  <li class="keymap">
                    <div class="keys">
                      ${keymap.keys.map(key => html`
                        <span class="key">${key}</span>
                      `)}
                    </div>
                    <span class="name">${keymap.name}</span>
                  </li>
                `)}
              </ul>
            </section>
          `)}
          <div class="mask"></div>
        </main>
      </div>
    `, document.body)
  }
}