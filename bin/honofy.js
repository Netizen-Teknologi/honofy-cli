#!/usr/bin/env node

import { generateController } from '../lib/generateController.js'
import { generateService } from '../lib/generateService.js'
import { generateRepository } from '../lib/generateRepository.js'

const args = process.argv.slice(2)
const command = args[0]
const name = args[1]
const typeArg = args.find(arg => arg.startsWith('--type='))
const type = typeArg ? typeArg.split('=')[1] : 'api'

switch (command) {
  case 'make:controller':
    generateController(name, type)
    break
  case 'make:service':
    generateService(name)
    break
  case 'make:repository':
    generateRepository(name)
    break
  default:
    console.log(`Unknown command: ${command}`)
}
