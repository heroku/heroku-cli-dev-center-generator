// Setsumeisho literally means 'instructions' in Japanese

const _ = require('lodash')
const Flags = require('cli-engine-heroku').flags

const packages = [
  'heroku-apps',
  'heroku-certs',
  'heroku-ci',
  'heroku-cli-addons',
  'heroku-cli-oauth',
//  'heroku-container-registry',
  'heroku-fork',
  'heroku-git',
  'heroku-local',
  'heroku-orgs',
  'heroku-pg',
  'heroku-pipelines',
  'heroku-ps-exec',
  'heroku-run',
  'heroku-spaces',
  'heroku-cli-status'
]

const preamble = `---
title: Heroku CLI Commands
id: 4088




## Introduction
These are the help texts for each of the core Heroku CLI commands. You can also see this text in your terminal with \`heroku help \`, \`heroku --help\`, or \`heroku -h\`.

`

let Setsumeisho = function () {}

Setsumeisho.buildFlag = function (flag) {
  let char = flag.char ? '`-' + flag.char + '`' : ''
  let name = flag.name ? '`--' + flag.name + '`' : ''
  let desc = flag.description ? flag.description : ''
  return `|${char}|${name}|${desc}|`
}

Setsumeisho.buildCommand = function (command) {
  if (command.hidden || (command.default && command.default.hidden)) return ''
  let lines = []
  let cmd = '### `heroku '
  if (command.command) {
    cmd += command.topic + ':' + command.command
  } else if (command.default) {
    cmd += command.default.topic
    if (command.default.command) cmd += ':' + command.default.command
  } else if (command.topic) {
    cmd += command.topic
  } else if (command.default && command.default.topic) {
    cmd += command.default.topic
  } else {
    return ''
  }
  for (let arg of (command.args || [])) {
    cmd += ' ' + (arg.optional ? `[${arg.name.toUpperCase()}]` : arg.name.toUpperCase())
  }
  cmd += '`'
  lines.push(cmd)
  lines.push('')
  if (!command.description && (!command.default || !command.default.description)) {
    lines.push('MISSING DESCRIPTION')
  } else {
    const desc = (command.description || command.default.description).replace(/^[A-Z]{1,}/, (s) => s.toLowerCase()).replace(/\.$/, '')
    lines.push('*' + desc + '*')
  }
  Setsumeisho.addAliases(lines, command)

  // port needs/wants apps & orgs for V5 commands
  if (command.needsApp || command.wantsApp) {
    if (!command.flags) command.flags = []
    command.flags.push(Flags.app({required: !!command.needsApp}))
    command.flags.push(Flags.remote())
  }
  if (command.needsOrg || command.wantsOrg) {
    if (!command.flags) command.flags = []
    let opts = {required: !!command.needsOrg, hidden: false, description: 'organization to use'}
    command.flags.push(Flags.org(opts))
  }

  lines.push('')
  if (command.flags && command.flags.length) {
    lines.push('#### Flags')
    lines.push('')
    lines = lines.concat(Setsumeisho.flagsTable(command.flags))
    lines.push('')
  }

  if (command.help) {
    lines.push(Setsumeisho.termFormat(command.help))
  }
  lines.push('')
  lines.push(`[(top)](#table-of-contents)\n`)
  lines.push('')
  lines = lines.join('\n')
  return lines
}

Setsumeisho.termFormat = function (lines) {
  let open = false
  let splitLines = lines.split('\n')
  for (let i in splitLines) {
    if (!open) {
      if (splitLines[i].match(/^[\s]{4,4}/)) {
        open = true
        splitLines[i - 1] = '\n```term'
      }
      if (Number(i) + 1 === splitLines.length && open) {
        open = false
        splitLines[i] = splitLines[i] + '\n```\n'
      }
      splitLines[i] = splitLines[i].replace(/^[\s]+/, '')
    } else {
      if (Number(i) + 1 === splitLines.length) {
        splitLines[i] = splitLines[i] + '\n```\n'
        open = false
      } else if (splitLines[i].match(/^[\s]*$/) && splitLines[Number(i) + 1].match(/^[\s]{4,4}[\w]+/)) {
        // do nothing
      } else if (splitLines[i].match(/^[\s]*$/) && splitLines[Number(i) + 1].match(/^[\s]{0,3}[\w]+/)) {
        splitLines[i] = splitLines[i] + '\n```\n'
        open = false
      }
      splitLines[i] = splitLines[i].replace(/^[\s]+/, '')
    }
  }
  return splitLines.join('\n').replace(/\s?Example/g, '#### Example').replace(/^Overview/m, '### Overview')
}

Setsumeisho.buildFlags = function (lines, command) {
  if (command.flags && command.flags.length) {
    for (let flag of (command.flags || [])) {
      lines.push(Setsumeisho.buildFlag(flag))
      lines.push('')
    }
  } else {
    lines.push('This command has no flags\n')
  }
}

Setsumeisho.flagsTable = function (flags) {
  let table = ['|Short|Long|Description|', '|------|------|------|']
  flags = _.sortBy(flags, 'char', 'name')
  for (let i in flags) {
    table.push(Setsumeisho.buildFlag(flags[i]))
  }
  return table
}

Setsumeisho.addAliases = function (lines, command) {
  if (command.aliases && command.aliases.length > 0) {
    lines.push('Aliases:')
    for (const alias in command.aliases) {
      command.aliases.push(' * ' + alias.name)
    }
  }
}
Setsumeisho.topicLinks = {}

Setsumeisho.build = function () {
  let topicObjs = []
  let coreCommands = require('cli-engine/lib/commands').commands
  topicObjs.push(require('cli-engine').topic)

  let allCommands = coreCommands
  for (const dir of packages) {
    let plugin
    plugin = require(dir)
    topicObjs.push(plugin.topic)
    allCommands = allCommands.concat(plugin.commands)
  }
  allCommands.forEach((c) => { c.default ? (c.topic = c.default.topic) : _.noop() })
  let groupedCommands = _.groupBy(allCommands, 'topic')
  let lines = []

  lines.push(preamble)
  lines.push('')
  lines.push('Commands')
  lines.push('========')
  lines.push('')

  const topics = _.keys(groupedCommands).sort()
  for (let topic of topics) {
    if (Setsumeisho.skipTopic(topic, groupedCommands) === false) {
      const sortedCommands = Setsumeisho.cmdSort(groupedCommands[topic])
      if (topic !== undefined && topic !== 'undefined') lines.push(`## ${topic}\n`)
      const topicObj = _.find(topicObjs, (t) => t && t.name === topic && t.overview)
      if (topicObj && topicObj.overview) lines.push(Setsumeisho.termFormat(topicObj.overview + '\n'))
      lines = lines.concat(sortedCommands.map(Setsumeisho.buildCommand))
    }
  }

  return lines.join('\n').trim()
}

Setsumeisho.skipTopic = function (topic, commands) {
  if (topic.match(/^_/)) return true

  if (commands[topic].length === 0) return true

  if (commands[topic][0].default) {
    let hiddenVals = _.uniq(commands[topic].map((c) => c.default.hidden))
    if (hiddenVals.length === 1 && hiddenVals[0] === true) return true
    if (hiddenVals.includes(false)) return false
  } else {
    let unique = _.uniq(commands[topic].map((c) => c.hidden))
    if (unique.length === 1 && unique[0]) return true
    if (unique.includes(false)) return false
  }

  if (commands[topic].filter((c) => !c.hidden).length === 0) return true

  return false
}

Setsumeisho.hidden = function (command) {
  if (_.isUndefined(command, 'default')) {
    if (command.hidden) {
      return true
    } else {
      return false
    }
  } else if (!_.isUndefined(command, 'default')) {
    if (command.default.hidden) {
      return true
    } else {
      return false
    }
  }
}

Setsumeisho.cmdSort = function (commands) {
  if (commands[0].default) {
    return _.sortBy(commands, [(c) => { return c.default.command ? c.default.command : '0' }])
  } else {
    return _.sortBy(commands, [(c) => { return c.command ? c.command : '0' }])
  }
}

module.exports = Setsumeisho
