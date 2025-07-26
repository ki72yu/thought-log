// visualizer/resonance-geometry.js
// 語彙結び目をノードと線で可視化

export function renderResonanceGeometry(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '800');
  svg.setAttribute('height', '600');

  const centerX = 400;
  const centerY = 300;
  const radius = 200;

  const nodes = data.map((item, i) => {
    const angle = (2 * Math.PI * i) / data.length;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { ...item, x, y };
  });

  nodes.forEach(node => {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', 20);
    circle.setAttribute('fill', '#87ceeb');
    svg.appendChild(circle);

    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', node.x);
    label.setAttribute('y', node.y - 30);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '14');
    label.textContent = node.word;
    svg.appendChild(label);
  });

  nodes.forEach(source => {
    source.resonatesWith.forEach(targetWord => {
      const target = nodes.find(n => n.word === targetWord);
      if (target) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', source.x);
        line.setAttribute('y1', source.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);
        line.setAttribute('stroke', '#ff4500');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
      }
    });
  });

  container.appendChild(svg);
}
