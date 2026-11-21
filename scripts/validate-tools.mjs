// Every tool must pass dsh's real Tools.register validator (a tool that fails
// it stops sessions from opening). Needs a built deepseek-harness checkout:
//   DSH_REPO=/path/to/deepseek-harness node scripts/validate-tools.mjs
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { buildTools } from '../lib/index.js'

const repo = process.env.DSH_REPO
if (!repo) {
  console.error('Set DSH_REPO to a built deepseek-harness checkout.')
  process.exit(2)
}
const { ToolsService } = await import(pathToFileURL(join(repo, 'packages/core/tools/lib/index.js')).href)

const fakeCtx = { layers: { effect: () => () => {} }, ctx: {} }
const tools = buildTools('/tmp/deep-projects-validate')
let failed = 0
for (const tool of tools) {
  try {
    ToolsService.prototype.register.call(fakeCtx, tool)
    console.log(`OK   ${tool.name}`)
  } catch (error) {
    failed++
    console.log(`FAIL ${tool.name}: ${error.message}`)
  }
}
if (failed > 0) {
  console.error(`${failed} tool(s) failed the validator — NOT ready for restart`)
  process.exit(1)
}
console.log(`ALL ${tools.length} TOOLS PASSED VALIDATION`)
