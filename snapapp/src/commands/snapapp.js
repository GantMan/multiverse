module.exports = {
  name: 'snapapp',
  run: async toolbox => {
    const { prompt } = toolbox

    const moveForward = await prompt.confirm(
      'Would you like to generate a snapshot of the current React app?'
    )
    if (!moveForward) return

    // text input
    const askAge = {
      type: 'input',
      name: 'snapName',
      message: `The previous snapshot was named '', what would you like to name this one?`
    }

    // ask a series of questions
    const questions = [askAge]
    const { snapName } = await toolbox.prompt.ask(questions)
    console.log('The new name is ' + snapName)
  }
}
