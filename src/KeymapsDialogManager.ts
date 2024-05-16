import { Editor, PluginOptions } from 'grapesjs'
import { KeymapsDialog } from './KeymapsDialog'

interface KeymapsInfo {
    name: string,
    keys: string[]
}

interface KeymapsRegistry {
    [key: string]: KeymapsInfo[]
}

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 * @param str The string to capitalize.
 */
function titleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Manages the state of the keymaps help dialog.
 */
export class KeymapsDialogManager {
    /**
     * Whether the keymaps registry is dirty and needs to be updated.
     */
    isDirty: boolean
    editor: Editor
    dialog: KeymapsDialog
    keymapsRegistry: KeymapsRegistry

    constructor(editor: Editor, opts: PluginOptions) {
        this.isDirty = true
        this.editor = editor
        this.dialog = new KeymapsDialog(this, opts)
        this.keymapsRegistry = {}

        // Asks for a registry update next time the keymaps are modified
        editor.on('keymap:add keymap:remove', () => {
            this.isDirty = true
        })
    }

    /**
     * Creates/updates the keymaps registry
     * (categorized keymaps depending on their namespaces).
     */
    updateRegistry(): void {
        const keymaps = this.editor.Keymaps.getAll()
        console.log(keymaps)
        this.keymapsRegistry = {}

        for (const keymapId in keymaps) {
            const splitKeymapId = keymapId.split(':')

            const category = titleCase(splitKeymapId[0])
            const name = splitKeymapId[1].split('-').map(titleCase).join(' ')
            // TODO: For now, it only displays the first keymap
            const keys = keymaps[keymapId].keys.split(',')[0]
              .replace(/\b/, '').split('+').map(titleCase)

            if (!this.keymapsRegistry[category]) {
                this.keymapsRegistry[category] = []
            }

            this.keymapsRegistry[category].push({name, keys})
        }
    }

    /**
     * Opens the keymaps help dialog.
     */
    openDialog(): void {
        if (this.isDirty) {
            this.updateRegistry()
            this.isDirty = false
        }
        this.dialog.open()
    }

    /**
     * Closes the keymaps help dialog.
     */
    closeDialog(): void {
        this.dialog.close()
    }
}