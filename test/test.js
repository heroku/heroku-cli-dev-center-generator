let expect = require('chai').expect
const Setsumeisho = require('../src/setsumeisho')

describe('.buildCommand', () => {
  it('adds the topic to the output', () => {
    const cmd = {topic: 'addons'}
    const output = Setsumeisho.buildCommand(cmd)
    expect(output).to.contain(`heroku ${cmd.topic}`)
  })
  it('adds the command to the output', () => {
    const cmd = {topic: 'addons', command: 'list'}
    const output = Setsumeisho.buildCommand(cmd)
    expect(output).to.contain(`heroku ${cmd.topic}:${cmd.command}`)
  })
  // it('returns an informational message when there are no flags', () => {
  //   const cmd = {topic: 'addons'}
  //   const output = Setsumeisho.buildCommand(cmd)
  //   expect(output).to.contain('This command has no flags')
  // })
  it('italicizes the first line/description', () => {
    const desc = 'create an add-on resource'
    const cmd = {topic: 'addons', description: desc}
    const output = Setsumeisho.buildCommand(cmd)
    expect(output).to.contain(`*${desc}*`)
  })
  it('capitalizes arg names', () => {
    const cmd = {topic: 'addons', args: [{name: 'computer', optional: true}, {name: 'monitor', optional: false}]}
    const output = Setsumeisho.buildCommand(cmd)
    expect(output).to.contain('COMPUTER')
    expect(output).to.contain('MONITOR')
  })
  it('wraps the command in backticks', () => {
    const cmd = {topic: 'addons', args: [{name: 'computer', optional: true}, {name: 'monitor', optional: false}]}
    const output = Setsumeisho.buildCommand(cmd)
    const firstline = output.split('\n')[0]
    expect(firstline).to.match(/`$/)
    expect(firstline).to.match(/^### `heroku addons/)
  })
  it('adds an h4 title before the flags', () => {
    const cmd = {topic: 'addons', flags: [{name: 'computer', optional: true}, {name: 'monitor', optional: false}]}
    const output = Setsumeisho.buildCommand(cmd)
    expect(output).to.contain('#### Flags')
  })
  describe('when there are no flags', () => {
    it('does not add the h4 title for flags', () => {
      const cmd = {topic: 'addons', args: []}
      const output = Setsumeisho.buildCommand(cmd)
      expect(output).to.not.contain('#### Flags')
    })
    it('does not say \'there are no flags\'', () => {
      const cmd = {topic: 'addons', command: 'output'}
      const output = Setsumeisho.buildCommand(cmd)
      expect(output).to.not.contain('This command has no flags')
    })
  })
})

describe('.termFormat', () => {
  const sample = `Example:

    echo "hello world, world"
    sudo /sbin/telinit 0

`
  it('wraps 4-space-indented code in the terminal markdown, and strips leading spaces', () => {
    const sample = `Example:

    echo "hello world, world"
    sudo /sbin/telinit 0

`
    const expectedResult = `
\`\`\`term
echo "hello world, world"
sudo /sbin/telinit 0

\`\`\``
    const result = Setsumeisho.termFormat(sample)
    expect(result).to.contain(expectedResult)
  })
  it('pads Example/s headings with markdown h4', () => {
    const result = Setsumeisho.termFormat(sample)
    expect(result).to.match(/^#### Example/)

    const anotherSample = `Example:

    echo "hello world, world"
    sudo /sbin/telinit 0

Example:

		echo "goodbye, friend"

`
    const anotherResult = Setsumeisho.termFormat(anotherSample)
    expect(anotherResult).to.contain('\n#### Example')
  })
})
describe('.buildFlag', () => {
  it('returns a markdown table row', () => {
    const flag = {char: 'h', name: 'help', description: 'prints this help message'}
    const result = Setsumeisho.buildFlag(flag)
    expect(result).to.equal(`|\`-${flag.char}\`|\`--${flag.name}\`|${flag.description}|`)
  })
})
describe('flagsTable', () => {
  const flag = {char: 'h', name: 'help', description: 'prints this help message'}
  it('has a header row', () => {
    const result = Setsumeisho.flagsTable([flag])
    expect(result[0]).to.equal(`|Short|Long|Description|`)
  })
  it('sorts the flags alphabetically, first by short flag then by long flag', () => {
    const flags = [
      {char: 'b', name: 'bananas', description: 'bananas starts with the letter b'},
      {char: 'h', name: 'help', description: 'prints this help message'},
      {char: 'a', name: 'ardvarks', description: 'ardvarks are animals'},
      {char: 'a', name: 'apples', description: 'apples starts with the letter a'}
    ]
    const result = Setsumeisho.flagsTable(flags)
    expect(result[1]).to.contain('apples')
    expect(result[2]).to.contain('ardvarks')
    expect(result[3]).to.contain('bananas')
    expect(result[4]).to.contain('help')
  })
})

describe('.skipTopic', () => {
  describe('working with v5 commands', () => {
    it('returns true when there are no commands for that topic', () => {
      const result = Setsumeisho.skipTopic('commands', {'commands': []})
      expect(result).to.equal(true)
    })
    it('returns true when there are commands, but they are all hidden', () => {
      const commands = {
        'commands': [
          {command: 'foo', hidden: true},
          {command: 'bar', hidden: true}
        ]
      }
      const result = Setsumeisho.skipTopic('commands', commands)
      expect(result).to.equal(true)
    })
    it('returns false when even one command is visible', () => {
      const commands = {
        'commands': [
          {command: 'foo', hidden: true},
          {command: 'bar', hidden: true},
          {command: 'baa', hidden: true},
          {command: 'bab', hidden: true},
          {command: 'biz', hidden: true},
          {command: 'bop', hidden: false}
        ]
      }
      const result = Setsumeisho.skipTopic('commands', commands)
      expect(result).to.equal(false)
    })
  })
  describe('working with v6 commands', () => {
    it('returns true when there are no commands for that topic', () => {
      const result = Setsumeisho.skipTopic('commands', {'commands': []})
      expect(result).to.equal(true)
    })
    it('returns true when there are commands, but they are all hidden', () => {
      const commands = {
        'commands': [
          {default: {command: 'foo', hidden: true}},
          {default: {command: 'bar', hidden: true}}
        ]
      }
      const result = Setsumeisho.skipTopic('commands', commands)
      expect(result).to.equal(true)
    })
    it('returns false when even one command is visible', () => {
      const commands = {
        'commands': [
          {default: {command: 'foo', hidden: true}},
          {default: {command: 'bar', hidden: true}},
          {default: {command: 'baa', hidden: true}},
          {default: {command: 'bab', hidden: true}},
          {default: {command: 'biz', hidden: true}},
          {default: {command: 'bop', hidden: false}}
        ]
      }
      const result = Setsumeisho.skipTopic('commands', commands)
      expect(result).to.equal(false)
    })
  })
})
describe('.cmdSort', () => {
  describe('given v5 commands', () => {
    it('puts the plain topic command before the sub-commands', () => {
      const fiveCommands = [
        {topic: 'apples', command: 'eat'},
        {topic: 'apples', command: 'peel'},
        {topic: 'apples'},
        {topic: 'apples', command: 'blend'}
      ]
      const result = Setsumeisho.cmdSort(fiveCommands)
      expect(result[0]).to.not.have.property('command')
    })
  })
  describe('given v6 commands', () => {
    it('puts the plain topic command before the sub-commands', () => {
      const sixCommands = [
        {default: {topic: 'apples', command: 'eat'}},
        {default: {topic: 'apples', command: 'peel'}},
        {default: {topic: 'apples'}},
        {default: {topic: 'apples', command: 'blend'}}
      ]
      const result = Setsumeisho.cmdSort(sixCommands)
      expect(result[0].default).to.not.have.property('command')
    })
  })
})

