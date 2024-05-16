export default (editor, opts = {}) => {
  const options = {
    ...{
      longPressKey: 'shift',
    }, ...opts
  }

  editor.on('load', () => {
  
  })
}