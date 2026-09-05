import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const tools = JSON.parse(readFileSync(join(root, 'config', 'optional-tools.json'), 'utf8'));
const timeoutMs = Number(process.env.NOVEL_OS_CAPABILITY_TIMEOUT_MS || 2000);

function probe(executable) {
  const result = spawnSync(executable, ['--version'], {
    encoding: 'utf8',
    windowsHide: true,
    shell: false,
    timeout: timeoutMs
  });

  if (result.error || result.status !== 0) {
    return {
      ok: false,
      executable,
      reason: result.error?.code === 'ETIMEDOUT' ? `timeout>${timeoutMs}ms` : result.error?.code ?? `exit-${result.status}`
    };
  }

  const text = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  return {
    ok: true,
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
  const attempts = [];
  for (const executable of tool.executables ?? []) {
    const attempt = probe(executable);
    attempts.push(attempt);
    if (attempt.ok) {
      detected = attempt;
      break;
    }
  }

  capabilities[name] = {
    available: Boolean(detected),
    detection: detected ?? { attempts },
    kind: tool.kind,
    purpose: tool.purpose,
    trigger: tool.trigger
  };
}

console.log(JSON.stringify({
  note: 'Optional capabilities never determine core Novel OS readiness.',
  probeTimeoutMs: timeoutMs,
  capabilities
}, null, 2));
