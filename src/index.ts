import { Editor } from 'grapesjs'
import { KeymapsDialogManager } from './KeymapsDialogManager'

const cmdKeymapsDialog = 'open-keymaps-dialog'

export default (editor: Editor, opts = {}): void => {
  const options = {
    ...{
      longPressKey: 'shift',
      longPressDuration: 800,
      shortcut: 'shift+k',
      css: null
    }, ...opts
  }

  const manager = new KeymapsDialogManager(editor, options)

  // Command
  editor.Commands.add(cmdKeymapsDialog, {
    run(editor: Editor) {
      console.log('Opening keymaps dialog')
      manager.openDialog()
    },
    stop(editor: Editor) {
      console.log('Closing keymaps dialog')
      manager.closeDialog()
    }
  })

  // Shortcut triggering the command
  if (options.shortcut) {
    editor.Keymaps.add('general:show-shortcuts', options.shortcut, () => {
      if (editor.Commands.isActive(cmdKeymapsDialog)) {
        editor.stopCommand(cmdKeymapsDialog)
      } else {
        editor.runCommand(cmdKeymapsDialog)
      }
    })
  }

  let longPressTimeout: NodeJS.Timeout | undefined = undefined

  document.addEventListener('keydown', event => {
    // Handle long press of the longPressKey
    if (event.key.toLowerCase() === options.longPressKey) {
      if (!longPressTimeout) {
        longPressTimeout = setTimeout(() => {
          editor.runCommand(cmdKeymapsDialog)
        }, options.longPressDuration)
      }
    }
  })

  // TODO: Make the longPressKey not close the dialog if the shortcut opened the dialog
  document.addEventListener('keyup', event => {
    // Clear the long press timeout if the key is released (and close the dialog)
    if (event.key.toLowerCase() === options.longPressKey) {
      if (longPressTimeout) {
        clearTimeout(longPressTimeout)
        longPressTimeout = undefined
      }
      editor.stopCommand(cmdKeymapsDialog)
    }
  })

  // TODO: Remove this after testing
  editor.on('load', () => {
    editor.runCommand(cmdKeymapsDialog)
  })
}