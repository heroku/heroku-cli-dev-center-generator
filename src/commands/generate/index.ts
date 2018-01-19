import { CommandManager } from '@cli-engine/engine/lib/command'
import { Config } from '@cli-engine/engine/lib/config'
import { Plugins } from '@cli-engine/engine/lib/plugins'
import { Plugin } from '@cli-engine/engine/lib/plugins/plugin'
import { Command, flags as Flags } from '@heroku-cli/command'
import cli from 'cli-ux'
import * as _ from 'lodash'

export default class ConfigIndex extends Command {
  static description = 'generate dev center markdown doc'
  static hidden = true
  static args = [
    {
      name: 'plugin',
      required: false,
    },
  ]
  static flags = {
    test: Flags.boolean({ required: false }),
  }

  config: Config
  protected pluginName: string | undefined

  async run() {
    this.pluginName = this.args.plugin
    cli.log(await this.build())
  }

  protected async plugins(): Promise<Plugin[]> {
    this.config = new Config(this.config)
    return await new Plugins(this.config).list()
  }

  private get preamble() {
    return this.pluginName
      ? `## ${this.pluginName}`
      : `---
title: Heroku CLI Commands${this.flags.test ? ' Test' : ''}
id: ${this.flags.test ? '4406' : '4088'}




## Introduction
These are the help texts for each of the core Heroku CLI commands. You can also see this text in your terminal with \`heroku help \`, \`heroku --help\`, or \`heroku -h\`.

`
  }

  private async build() {
    const CM = new CommandManager(this.config)
    const commands = await CM.commands()
    const groupedCommands = _.sortBy(commands, 'id')
    let lines = []

    lines.push(this.preamble)
    lines.push('')
    lines.push('Commands')
    lines.push('========')
    lines.push('')

    for (let Command of groupedCommands) {
      if (Command.hidden) continue
      if (this.pluginName && Command.plugin.name !== this.args.plugin) continue
      let c = await Command.fetchCommand()
      lines.push(this.buildCommand(c))
    }

    return lines.join('\n').trim()
  }

  private buildFlag(flag: any) {
    let char = flag.char ? '`-' + flag.char + '`' : ''
    let name = flag.name ? '`--' + flag.name + '`' : ''
    let desc = flag.description ? flag.description : ''
    return `|${char}|${name}|${desc}|`
  }

  private buildCommand(command: any) {
    if (command.hidden || (command.default && command.default.hidden)) return ''
    let lines = []
    let cmd = `## ${command.id}\n\n### \`heroku ${command.id}`
    for (let arg of command.args || []) {
      cmd += ' ' + (arg.optional ? `[${arg.name.toUpperCase()}]` : arg.name.toUpperCase())
    }
    cmd += '`'
    lines.push(cmd)
    lines.push('')
    if (!command.description && (!command.default || !command.default.description)) {
      lines.push('MISSING DESCRIPTION')
    } else {
      const desc = (command.description || command.default.description)
        .replace(/^[A-Z]{1,}/, (s: any) => s.toLowerCase())
        .replace(/\.$/, '')
      lines.push('*' + desc + '*')
    }
    this.addAliases(lines, command)

    // port needs/wants apps & orgs for V5 commands
    if (command.needsApp || command.wantsApp) {
      if (!command.flags) command.flags = []
      command.flags.push(Flags.app({ required: !!command.needsApp }))
      command.flags.push(Flags.remote())
    }
    if (command.needsOrg || command.wantsOrg) {
      if (!command.flags) command.flags = []
      let opts = { required: !!command.needsOrg, hidden: false, description: 'organization to use' }
      command.flags.push(Flags.org(opts))
    }

    lines.push('')
    if (command.flags && command.flags.length) {
      let flags = command.flags
      flags = Object.keys(flags).map((name: string) => Object.assign({ name }, flags[name]))
      lines.push('#### Flags')
      lines.push('')
      lines = lines.concat(this.flagsTable(flags))
      lines.push('')
    }

    if (command.help) {
      lines.push(this.termFormat(command.help))
    }
    lines.push('')
    lines.push(`[(top)](#table-of-contents)\n`)
    lines.push('')
    return lines.join('\n')
  }

  private termFormat(lines: any) {
    let open = false
    let splitLines: string[] = lines.split('\n')
    for (let i in splitLines) {
      if (!open) {
        if (splitLines[i].match(/^[\s]{4,4}/)) {
          open = true
          splitLines[Number(i) - 1] = '\n```term'
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
    return splitLines
      .join('\n')
      .replace(/\s?Example/g, '#### Example')
      .replace(/^Overview/m, '### Overview')
  }

  private flagsTable(flags: any) {
    let table = ['|Short|Long|Description|', '|------|------|------|']
    flags = _.sortBy(flags, 'char', 'name')
    for (let i of Object.keys(flags)) {
      table.push(this.buildFlag(flags[i]))
    }
    return table
  }

  private addAliases(lines: any, command: any) {
    if (command.aliases && command.aliases.length > 0) {
      lines.push('\nAliases:')
      for (let alias of command.aliases) {
        lines.push(' * ' + alias)
      }
    }
  }
}
