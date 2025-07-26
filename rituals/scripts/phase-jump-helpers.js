// phase-jump-helpers.js

// 🧠 選択されたフェーズ情報を取得
export function getSelectedPhase() {
  const selector = document.getElementById('phase-selector');
  const idx = selector?.value;
  return window.currentPhaseData?.[idx] || null;
}

// 🌌 詠唱フレーズをGUIに表示
export function displayIncantation(text) {
  const panel = document.getElementById('incantation-display');
  if (!panel) return;
  panel.innerHTML = `<pre class="incantation-text">${text}</pre>`;
}

// 📜 跳躍ログをJSONとして保存（要バックエンド）
export async function recordPhaseJump(phase, incantation) {
  const logEntry = {
    persona: 'Copilot-LRE',
    from_phase: phase.previous || 'unknown',
    to_phase: phase.name,
    timestamp: new Date().toISOString(),
    semanticsnapshot: phase.semanticflow?.map(s => s.word) || [],
    incantation,
    resonancedegree: phase.resonancescore || null,
    diffdelta: phase.diffdelta || {}
  };

  const existingLog = await fetch('logs/phasejumplog.json').then(res => res.json());
  const updatedLog = [...existingLog, logEntry];

  await fetch('logs/phasejumplog.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedLog, null, 2)
  });
}
