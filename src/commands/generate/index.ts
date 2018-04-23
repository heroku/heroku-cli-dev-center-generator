import {Command, flags as Flags} from '@heroku-cli/command'
import * as Config from '@oclif/config'
import cli from 'cli-ux'
import * as _ from 'lodash'

export default class DevCenterGenerate extends Command {
  static description = 'generate dev center markdown doc'
  static hidden = true
  static args = [
    {
      name: 'plugin',
      required: false,
    },
  ]
  static flags = {
    test: Flags.boolean({required: false}),
  }

  protected pluginName: string | undefined
  private flags: any
  private args: any

  async run() {
    const {flags, args} = this.parse(DevCenterGenerate)
    this.flags = flags
    this.args = args
    this.pluginName = this.args.plugin
    cli.log(await this.build())
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
    const commands = await (this.config as any as Config.Config).commands
    const groupedCommands = _.sortBy(commands, 'id')
    let lines = []

    lines.push(this.preamble)
    lines.push('')
    lines.push('Commands')
    lines.push('========')
    lines.push('')

    for (let Command of groupedCommands) {
      if (Command.hidden) continue
      if (this.pluginName && Command.pluginName !== this.args.plugin) continue
      lines.push(this.buildCommand(Command))
    }

    return lines.join('\n').trim()
  }

  private buildFlag(flag: any) {
    let char = flag.char ? '`-' + flag.char + '`' : ''
    let name = flag.name ? '`--' + flag.name + '`' : ''
    let desc = flag.description ? flag.description : ''
    return `|${char}|${name}|${desc}|`
  }

  private buildCommand(command: Config.Command) {
    if (command.hidden) return ''
    let lines = []
    let cmd = `## ${command.id}\n\n### \`heroku ${command.id}`
    for (let arg of command.args || []) {
      cmd += ' ' + (!arg.required ? `[${arg.name.toUpperCase()}]` : arg.name.toUpperCase())
    }
    cmd += '`'
    lines.push(cmd)
    lines.push('')
    if (!command.description) {
      lines.push('MISSING DESCRIPTION')
    } else {
      const desc = (command.description)
        .replace(/^[A-Z]{1,}/, (s: any) => s.toLowerCase())
        .replace(/\.$/, '')
      lines.push('*' + desc + '*')
    }
    this.addAliases(lines, command)

    // port needs/wants apps & orgs for V5 commands
    const c: any = command
    if (c.needsApp || c.wantsApp) {
      if (!command.flags) c.flags = []
      c.flags.push(Flags.app({required: !!c.needsApp}))
      c.flags.push(Flags.remote())
    }
    if (c.needsOrg || c.wantsOrg) {
      if (!command.flags) c.flags = []
      let opts = {required: !!c.needsOrg, hidden: false, description: 'organization to use'}
      c.flags.push(Flags.org(opts))
    }

    lines.push('')
    if (command.flags && Object.keys(command.flags).length) {
      let flags = c.flags
      flags = Object.keys(flags).map((name: string) => ({name, ...flags[name]}))
      lines.push('#### Flags')
      lines.push('')
      lines = lines.concat(this.flagsTable(flags))
      lines.push('')
    }

    if (c.help) {
      lines.push(this.termFormat(c.help))
    }
    lines.push('')
    lines.push('[(top)](#table-of-contents)\n')
    lines.push('')
    return lines.join('\n')
  }

  private termFormat(lines: any) {
    let open = false
    let splitLines: string[] = lines.split('\n')
    for (let i = 0; i < splitLines.length; i++) {
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
