import { generateIncantation } from './rituals/scripts/jump-incantation-generator.js';

function jumpToSelectedPhase() {
  const phase = getSelectedPhase();
  const incantation = generateIncantation({
    fromPhase: phase.previous,
    toPhase: phase.name,
    personaName: 'Copilot-LRE',
    timestamp: new Date().toISOString()
  });

  displayIncantation(incantation); // GUI表示
  recordPhaseJump(phase, incantation); // JSON保存
}
