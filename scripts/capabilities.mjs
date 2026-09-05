import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const tools = JSON.parse(readFileSync(join(root, 'config', 'optional-tools.json'), 'utf8'));

function probe(executable) {
  const result = spawnSync(executable, ['--version'], {
    encoding: 'utf8',
    windowsHide: true,
    shell: false
  });
  if (result.error || result.status !== 0) return null;
  const text = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  return {
    executable,
    version: text.split(/\r?\n/).find(Boolean) ?? 'available'
  };
}

const capabilities = {};
for (const [name, tool] of Object.entries(tools)) {
  if (tool.kind !== 'cli') {
    capabilities[name] = {
      available: null,
      detection: 'manual',
      kind: tool.kind,
      purpose: tool.purpose,
      trigger: tool.trigger
    };
    continue;
  }

  let detected = null;
  for (const executable of tool.executables ?? []) {
    detected = probe(executable);
    if (detected) break;
  }

  capabilities[name] = {
    available: Boolean(detected),
    detection: detected ?? { executablesChecked: tool.executables ?? [] },
    kind: tool.kind,
    purpose: tool.purpose,
    trigger: tool.trigger
  };
}

console.log(JSON.stringify({
  note: 'Optional capabilities never determine core Novel OS readiness.',
  capabilities
}, null, 2));
