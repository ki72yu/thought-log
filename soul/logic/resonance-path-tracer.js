// resonance-path-tracer.js
// 🧬思想共鳴経路トレーサー
// semantic-flow + soul-comms をもとに因果構造グラフを構築・探索する中核ロジック

export class ResonancePathTracer {
  constructor(flowMatrix, commsLog) {
    this.flow = flowMatrix;
    this.comms = commsLog;
    this.graph = {};
  }

  // 🌐統合グラフ構築：semantic-flow + soul-comms をノードグラフ化
  buildGraph() {
    // 1️⃣ Semantic Flow（ネスト形式 or from/toリスト形式に対応）
    if (this.flow.flows) {
      for (const flow of this.flow.flows) {
        const { from, to, weight } = flow;
        if (!this.graph[from]) this.graph[from] = [];
        this.graph[from].push({ target: to, weight, type: 'semantic-flow' });
      }
    } else {
      // デフォルト：diff-001: { response-001: 0.92 } 形式
      for (const [source, targets] of Object.entries(this.flow)) {
        if (!this.graph[source]) this.graph[source] = [];
        for (const [target, weight] of Object.entries(targets)) {
          this.graph[source].push({ target, weight, type: 'semantic-flow' });
        }
      }
    }

    // 2️⃣ Soul Comms（from/to + オプションで linked_diff ）
    for (const comm of this.comms.communications || this.comms) {
      const { from, to, linked_diff } = comm;
      if (!this.graph[from]) this.graph[from] = [];
      this.graph[from].push({
        target: to,
        type: 'comms',
        via: linked_diff || null
      });
    }
  }

  // 🔍直接経路探索：from → to の明示的なトレース（最短経路）
  tracePath(from, to, visited = new Set(), path = []) {
    if (visited.has(from)) return null;
    visited.add(from);
    path.push(from);

    if (from === to) return [...path];

    for (const edge of this.graph[from] || []) {
      const result = this.tracePath(edge.target, to, new Set(visited), [...path]);
      if (result) return result;
    }

    return null;
  }

  // 🔭深さ優先によるパス全探索（semantic/comms混合）
  findPaths(from, maxDepth = 5) {
    const results = [];

    const dfs = (node, path, depth) => {
      if (depth > maxDepth) return;

      results.push({
        from,
        to: node,
        hops: [...path, node],
        lastEdge: this.graph[path.at(-1)]?.find(e => e.target === node) || null
      });

      for (const edge of this.graph[node] || []) {
        if (!path.includes(edge.target)) {
          dfs(edge.target, [...path, node], depth + 1);
        }
      }
    };

    dfs(from, [], 0);
    return results;
  }
}
