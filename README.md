notable-cli
===========

A Notable command line client

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/notable-cli.svg)](https://npmjs.org/package/notable-cli)
[![Downloads/week](https://img.shields.io/npm/dw/notable-cli.svg)](https://npmjs.org/package/notable-cli)
[![License](https://img.shields.io/npm/l/notable-cli.svg)](https://github.com/madeindjs/notable-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g notable-cli
$ notable-cli COMMAND
running command...
$ notable-cli (-v|--version|version)
notable-cli/0.0.0 linux-x64 node-v12.18.2
$ notable-cli --help [COMMAND]
USAGE
  $ notable-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`notable-cli hello [FILE]`](#notable-cli-hello-file)
* [`notable-cli help [COMMAND]`](#notable-cli-help-command)

## `notable-cli hello [FILE]`

describe the command here

```
USAGE
  $ notable-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ notable-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/madeindjs/notable-cli/blob/v0.0.0/src/commands/hello.ts)_

## `notable-cli help [COMMAND]`

display help for notable-cli

```
USAGE
  $ notable-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
<!-- commandsstop -->
