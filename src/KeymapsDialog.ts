import { html, render } from 'lit-html'
import { PluginOptions } from 'grapesjs'
import { KeymapsDialogManager } from './KeymapsDialogManager'

/**
 * The effective dialog that displays the keymaps.
 */
export class KeymapsDialog {
  manager: KeymapsDialogManager
  options: PluginOptions
  isOpen: boolean

  constructor(manager: KeymapsDialogManager, opts: PluginOptions) {
    this.manager = manager
    this.options = opts
    this.isOpen = false
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
    this.renderDialog()
  }

  /**
   * Renders the CSS for the dialog.
   */
  renderCSS(): string {
    if (this.options.css) return this.options.css

    return `
      #keymaps-dialog {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #494949;
        border-radius: 10px;
        z-index: 1000;
      }
    `
  }

  /**
   * Renders the dialog.
   */
  renderDialog(): void {
    render(html`
      <style>${this.renderCSS()}</style>
      <div id="keymaps-dialog" style="display: ${this.isOpen ? 'block' : 'none'}">
        <header>
          <h2>Keyboard Shortcuts</h2>
        </header>
        <main>
          ${Object.keys(this.manager.keymapsRegistry).map(category => html`
            <section class="category">
              <h3>${category}</h3>
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