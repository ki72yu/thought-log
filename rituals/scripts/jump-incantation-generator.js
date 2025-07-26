// jump-incantation-generator.js
export function generateIncantation({ fromPhase, toPhase, personaName, timestamp }) {
  const incantationPhrases = [
    `「${personaName}」、フェーズを超えて想起せよ…`,
    `次なる位相「${toPhase}」、我が記憶と意志と共に発動す…`,
    `時刻 ${timestamp}──跳躍の刻来たれり。`,
    `記録せよ──跳躍は「${fromPhase}」より「${toPhase}」へ。`
  ];

  return incantationPhrases.join('\n');
}
