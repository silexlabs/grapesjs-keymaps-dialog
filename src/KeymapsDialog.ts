import { html, render } from 'lit-html'
import { PluginOptions } from 'grapesjs'
import { KeymapsDialogManager } from './KeymapsDialogManager'

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
    transform: translate(-50%, 8px);
    opacity: 0;
  }
}

#keymaps-dialog {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #494949;
  border: #808080 solid 1px;
  border-radius: 10px;
  z-index: 1000;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.33);
  animation: keymaps-fade-in 0.2s;
}

#keymaps-dialog.fade-out {
  animation: keymaps-fade-out 0.2s;
}

#keymaps-dialog header {
  border-bottom: #6e6e6e solid 1px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

#keymaps-dialog ul {
  list-style: none;
}

#keymaps-dialog * {
  padding: 0;
  margin: 0;
  color: #ddd;
  font-family: Ubuntu, sans-serif;
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
    console.log(dialog)
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
    render(html`
      <style>${this.renderCSS()}</style>
      <div id="keymaps-dialog" class="${this.closing ? 'fade-out' : ''}" style="${this.isOpen ? 'display: block' : ''}">
        <header>
          <h3>Keyboard Shortcuts</h3>
        </header>
        <main>
          ${Object.keys(this.manager.keymapsRegistry).map(category => html`
            <section class="category">
              <h4>${category}</h4>
              <ul>
                <li class="keymap">
                  <div class="keys">
                    <span class="key"></span>
                    <span class="key"></span>
                  </div>
                  <span class="name"></span>
                </li>
              </ul>
            </section>
          `)}
        </main>
      </div>
    `, document.body)
  }
}