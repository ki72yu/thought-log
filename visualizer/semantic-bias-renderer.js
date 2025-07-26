// visualizer/semantic-bias-renderer.js
// 語圧ビジュアライザー：semantic_flow の語彙構造を棒グラフ表示

export function renderSemanticBias(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  data.forEach(({ word, pressure, resonance, frequency }) => {
    const bar = document.createElement('div');
    bar.className = 'semantic-bar';
    bar.style.height = `${pressure * 100}px`;
    bar.title = `${word}｜圧:${pressure}, 共鳴:${resonance}, 頻度:${frequency}`;

    const label = document.createElement('span');
    label.textContent = word;
    label.className = 'semantic-label';

    bar.appendChild(label);
    container.appendChild(bar);
  });
}
