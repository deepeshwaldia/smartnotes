import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r?\n/g, "\n")
    .trim();

  // Ensure graph TD has newline
  if (clean.startsWith("graph TD")) {
    clean = clean.replace("graph TD", "graph TD\n");
  }

  // Add graph TD if missing
  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const autoFixNodes = (diagram) => {
  let index = 0;

const used= new Map();

return diagram.replace(/\[(.*?)\]/g, (match ,label) => {
  const key = label.trim();
  if (used.has(key)){
    return used.get(key);
  }
  index++;
  const id = `N${index}`;
  const node =`${id}[${key}]`;
  used.set(key,node);
  return node;
});
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        // Clean + Fix Diagram
        const cleanedChart = cleanMermaidChart(diagram);
        const safeChart = autoFixNodes(cleanedChart);

        console.log("Original Diagram:", diagram);
        console.log("Safe Mermaid Chart:", safeChart);

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);

        containerRef.current.innerHTML = `
          <div style="color:red; padding:10px;">
            Failed to render Mermaid diagram
          </div>
        `;
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
};

export default MermaidSetup;