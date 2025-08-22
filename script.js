// Arquivo local do GeoJSON dos municípios do Tocantins
const geojsonUrl = "geojson-tocantins.json";

// Configurações do mapa (personalizáveis)
const mapConfig = {
  // Cores
  colors: {
    default: "#69b3a2", // Cor padrão dos municípios
    hover: "#4a9b8e", // Cor ao passar o mouse
    selected: "#e2af05ff", // Cor do município selecionado
    stroke: "#ffffff", // Cor das bordas
    background: "#f5f5f5", // Cor de fundo
  },

  // Bordas
  stroke: {
    width: 1, // Largura das bordas padrão
    hoverWidth: 2, // Largura das bordas no hover
    selectedWidth: 2, // Largura das bordas do selecionado
  },

  // Zoom
  zoom: {
    min: 0.5, // Zoom mínimo
    max: 10, // Zoom máximo
    duration: 750, // Duração das animações (ms)
  },

  // Tooltip
  tooltip: {
    enabled: true, // Habilitar/desabilitar tooltip
    offset: { x: 10, y: -10 }, // Offset do cursor
    customBuilder: (d) => `
      <strong>🏛️ ${d.properties.name}</strong>
    `,
  },

  // Labels dos municípios
  labels: {
    enabled: true, // Habilitar/desabilitar exibição de nomes
    fontSize: 5, // Tamanho da fonte
    fontFamily: "Arial, sans-serif", // Família da fonte
    color: "#000000ff", // Cor do texto
    fontWeight: "normal", // Peso da fonte (normal, bold)
    strokeColor: "#000000ff", // Cor do contorno do texto
    strokeWidth: 0.2, // Largura do contorno
    minZoomLevel: 2, // Nível mínimo de zoom para exibir labels
    maxLabelLength: 15, // Comprimento máximo do label (trunca se maior)
    offsetY: 0, // Offset vertical do centro do município
  },

  // Animações
  animations: {
    enabled: true, // Habilitar/desabilitar animações
    duration: 300, // Duração das animações de hover (ms)
  },

  // Seleção
  selection: {
    enabled: true, // Habilitar/desabilitar seleção
    clearOnBackgroundClick: true, // Limpar seleção ao clicar no fundo
    clearOnEscKey: true, // Limpar seleção ao pressionar ESC
    clearOnDoubleClick: false, // Limpar seleção ao dar duplo clique no município
  },

  // Callbacks personalizados
  callbacks: {
    onMunicipioClick: (d, event, element, isSelected) => {
      alert(`Você clicou em ${d.properties.name}`);
    },
    onMunicipioHover: null, // Callback personalizado para hover
    onMapLoad: null, // Callback quando o mapa carrega
    onSelectionCleared: null, // Callback quando a seleção é limpa
  },
};

// Variáveis globais
let svg, g, path, municipios, tooltip, labelsGroup;

// Funções utilitárias para personalização
const MapUtils = {
  // Atualizar configurações do mapa
  updateConfig: function (newConfig) {
    Object.assign(mapConfig, this.deepMerge(mapConfig, newConfig));
    this.applyConfigToMap();
  },

  // Merge profundo de objetos
  deepMerge: function (target, source) {
    const result = { ...target };
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  },

  // Aplicar configurações ao mapa existente
  applyConfigToMap: function () {
    if (!municipios) return;

    // Atualizar cores e bordas
    municipios
      .style("fill", mapConfig.colors.default)
      .style("stroke", mapConfig.colors.stroke)
      .style("stroke-width", mapConfig.stroke.width);

    // Atualizar cor de fundo
    document.body.style.backgroundColor = mapConfig.colors.background;

    // Atualizar labels se existirem
    this.updateLabels();
  },

  // Definir cores personalizadas
  setColors: function (colors) {
    this.updateConfig({ colors });
  },

  // Definir configurações de borda
  setStroke: function (stroke) {
    this.updateConfig({ stroke });
  },

  // Definir configurações de zoom
  setZoom: function (zoom) {
    this.updateConfig({ zoom });
    if (svg) {
      setupZoom(); // Reconfigurar zoom
    }
  },

  // Definir tooltip personalizado
  setTooltip: function (tooltipConfig) {
    this.updateConfig({ tooltip: tooltipConfig });
  },

  // Definir callback personalizado para clique
  onMunicipioClick: function (callback) {
    mapConfig.callbacks.onMunicipioClick = callback;
  },

  // Definir callback personalizado para hover
  onMunicipioHover: function (callback) {
    mapConfig.callbacks.onMunicipioHover = callback;
  },

  // Definir callback para quando o mapa carregar
  onMapLoad: function (callback) {
    mapConfig.callbacks.onMapLoad = callback;
  },

  // Resetar configurações para o padrão
  resetConfig: function () {
    Object.assign(mapConfig, getDefaultConfig());
    this.applyConfigToMap();
  },

  // Obter município por nome
  getMunicipioByName: function (name) {
    if (!municipios) return null;
    return municipios.filter((d) =>
      d.properties.name.toLowerCase().includes(name.toLowerCase())
    );
  },

  // Selecionar município programaticamente
  selectMunicipio: function (name) {
    if (!mapConfig.selection.enabled) return null;

    const municipio = this.getMunicipioByName(name);
    if (!municipio.empty()) {
      this.clearSelection();
      municipio
        .classed("selected", true)
        .style("fill", mapConfig.colors.selected)
        .style("stroke-width", mapConfig.stroke.selectedWidth);
      return municipio.datum();
    }
    return null;
  },

  // Limpar seleção de todos os municípios
  clearSelection: function () {
    if (!municipios) return;

    municipios
      .classed("selected", false)
      .style("fill", mapConfig.colors.default)
      .style("stroke-width", mapConfig.stroke.width);

    // Chamar callback se definido
    if (mapConfig.callbacks.onSelectionCleared) {
      mapConfig.callbacks.onSelectionCleared();
    }
  },

  // Obter município selecionado
  getSelectedMunicipio: function () {
    if (!municipios) return null;
    const selected = municipios.filter(".selected");
    return selected.empty() ? null : selected.datum();
  },

  // Verificar se um município está selecionado
  isMunicipioSelected: function (name) {
    if (!municipios) return false;
    const municipio = this.getMunicipioByName(name);
    return !municipio.empty() && municipio.classed("selected");
  },

  // Atualizar labels dos municípios
  updateLabels: function () {
    if (!labelsGroup || !municipios) return;

    // Remover labels existentes
    labelsGroup.selectAll("text").remove();

    // Se labels não estão habilitados, retornar
    if (!mapConfig.labels.enabled) return;

    // Criar labels para cada município
    const labels = labelsGroup
      .selectAll("text")
      .data(municipios.data())
      .enter()
      .append("text")
      .attr("class", "municipio-label")
      .style("font-size", mapConfig.labels.fontSize + "px")
      .style("font-family", mapConfig.labels.fontFamily)
      .style("font-weight", mapConfig.labels.fontWeight)
      .style("fill", mapConfig.labels.color)
      .style("stroke", mapConfig.labels.strokeColor)
      .style("stroke-width", mapConfig.labels.strokeWidth + "px")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "central")
      .style("pointer-events", "none")
      .style("user-select", "none")
      .text((d) => {
        let name = d.properties.name || "";
        if (name.length > mapConfig.labels.maxLabelLength) {
          name = name.substring(0, mapConfig.labels.maxLabelLength - 3) + "...";
        }
        return name;
      })
      .attr("x", (d) => {
        if (path) {
          const centroid = path.centroid(d);
          return centroid[0];
        }
        return 0;
      })
      .attr("y", (d) => {
        if (path) {
          const centroid = path.centroid(d);
          return centroid[1] + mapConfig.labels.offsetY;
        }
        return 0;
      });

    // Configurar visibilidade baseada no zoom
    this.updateLabelsVisibility();
  },

  // Atualizar visibilidade dos labels baseada no zoom
  updateLabelsVisibility: function () {
    if (!labelsGroup || !mapConfig.labels.enabled) return;

    const currentZoom = d3.zoomTransform(svg.node()).k;
    const shouldShow = currentZoom >= mapConfig.labels.minZoomLevel;

    labelsGroup
      .selectAll("text")
      .style("opacity", shouldShow ? 1 : 0)
      .style("display", shouldShow ? "block" : "none");
  },

  // Definir configurações de labels
  setLabels: function (labelsConfig) {
    this.updateConfig({ labels: labelsConfig });
    this.updateLabels();
  },
};

// Função para obter configuração padrão
function getDefaultConfig() {
  return {
    colors: {
      default: "#69b3a2",
      hover: "#4a9b8e",
      selected: "#ff6b6b",
      stroke: "#ffffff",
      background: "#f5f5f5",
    },
    stroke: {
      width: 1,
      hoverWidth: 2,
      selectedWidth: 2,
    },
    zoom: {
      min: 0.5,
      max: 10,
      duration: 750,
    },
    tooltip: {
      enabled: true,
      offset: { x: 10, y: -10 },
      customBuilder: null,
    },
    labels: {
      enabled: false,
      fontSize: 10,
      fontFamily: "Arial, sans-serif",
      color: "#333333",
      fontWeight: "normal",
      strokeColor: "#ffffff",
      strokeWidth: 0.5,
      minZoomLevel: 2,
      maxLabelLength: 15,
      offsetY: 0,
    },
    animations: {
      enabled: true,
      duration: 300,
    },
    selection: {
      enabled: true,
      clearOnBackgroundClick: true,
      clearOnEscKey: true,
      clearOnDoubleClick: false,
    },
    callbacks: {
      onMunicipioClick: null,
      onMunicipioHover: null,
      onMapLoad: null,
      onSelectionCleared: null,
    },
  };
}

// Inicializar o mapa
function initMap() {
  // Aplicar cor de fundo
  document.body.style.backgroundColor = mapConfig.colors.background;

  // Obter dimensões da tela
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Criar SVG
  svg = d3.select("#map").attr("width", width).attr("height", height);

  // Grupo para zoom
  g = svg.append("g");

  // Grupo para labels (deve vir depois do grupo dos municípios)
  labelsGroup = svg.append("g").attr("class", "labels-group");

  // Tooltip
  tooltip = d3.select("#tooltip");

  // Carregar dados
  loadData(width, height);

  // Configurar zoom
  setupZoom();

  // Configurar eventos de limpeza de seleção
  setupSelectionEvents();

  // Redimensionar quando a janela mudar de tamanho
  window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    svg.attr("width", newWidth).attr("height", newHeight);

    // Reajustar projeção se os dados já foram carregados
    if (path && municipios) {
      const data = { type: "FeatureCollection", features: municipios.data() };
      const projection = d3.geoMercator().fitSize([newWidth, newHeight], data);
      path.projection(projection);
      municipios.attr("d", path);

      // Reposicionar labels
      MapUtils.updateLabels();
    }
  });
}

// Carregar dados GeoJSON
async function loadData(width, height) {
  try {
    const data = await d3.json(geojsonUrl);
    console.log("Dados carregados:", data);

    // Criar projeção
    const projection = d3.geoMercator().fitSize([width, height], data);

    // Criar gerador de path
    path = d3.geoPath().projection(projection);

    // Desenhar municípios
    municipios = g
      .selectAll(".municipio")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "municipio")
      .attr("d", path)
      .attr("data-name", (d) => d.properties.name)
      .attr("data-id", (d) => d.properties.id)
      .style("fill", mapConfig.colors.default)
      .style("stroke", mapConfig.colors.stroke)
      .style("stroke-width", mapConfig.stroke.width)
      .style("cursor", "pointer")
      .style(
        "transition",
        mapConfig.animations.enabled
          ? `all ${mapConfig.animations.duration}ms ease`
          : "none"
      )
      .on("click", onMunicipioClick)
      .on("mouseover", onMunicipioMouseOver)
      .on("mouseout", onMunicipioMouseOut)
      .on("mousemove", onMunicipioMouseMove);

    console.log("Mapa renderizado com sucesso!");

    // Criar labels dos municípios
    MapUtils.updateLabels();

    // Chamar callback personalizado se definido
    if (mapConfig.callbacks.onMapLoad) {
      mapConfig.callbacks.onMapLoad(data, municipios);
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    showError(
      "Erro ao carregar os dados do mapa. Verifique se o arquivo geojson-tocantins.json está presente."
    );
  }
}

// Evento de clique no município
function onMunicipioClick(event, d) {
  if (!mapConfig.selection.enabled) return;

  const isCurrentlySelected = d3.select(this).classed("selected");

  // Se o município já está selecionado e duplo clique está habilitado
  if (isCurrentlySelected && mapConfig.selection.clearOnDoubleClick) {
    // Verifica se é um duplo clique (usando um timer simples)
    const now = new Date().getTime();
    const lastClick = d3.select(this).property("lastClick") || 0;

    if (now - lastClick < 300) {
      // 300ms para duplo clique
      MapUtils.clearSelection();
      d3.select(this).property("lastClick", 0);
      return;
    }
    d3.select(this).property("lastClick", now);
  }

  // Remove seleção anterior
  municipios
    .classed("selected", false)
    .style("fill", mapConfig.colors.default)
    .style("stroke-width", mapConfig.stroke.width);

  // Se não estava selecionado, seleciona
  if (!isCurrentlySelected) {
    d3.select(this)
      .classed("selected", true)
      .style("fill", mapConfig.colors.selected)
      .style("stroke-width", mapConfig.stroke.selectedWidth);
  }

  // Chamar callback personalizado se definido
  if (mapConfig.callbacks.onMunicipioClick) {
    mapConfig.callbacks.onMunicipioClick(d, event, this, !isCurrentlySelected);
  }
}

// Evento de mouse over
function onMunicipioMouseOver(event, d) {
  if (!d3.select(this).classed("selected")) {
    d3.select(this)
      .style("fill", mapConfig.colors.hover)
      .style("stroke-width", mapConfig.stroke.hoverWidth);
  }

  // Mostrar tooltip se habilitado
  if (mapConfig.tooltip.enabled) {
    showTooltip(d, event);
  }

  // Chamar callback personalizado se definido
  if (mapConfig.callbacks.onMunicipioHover) {
    mapConfig.callbacks.onMunicipioHover(d, event, this);
  }
}

// Evento de mouse out
function onMunicipioMouseOut(event, d) {
  if (!d3.select(this).classed("selected")) {
    d3.select(this)
      .style("fill", mapConfig.colors.default)
      .style("stroke-width", mapConfig.stroke.width);
  }

  // Esconder tooltip
  if (mapConfig.tooltip.enabled) {
    hideTooltip();
  }
}

// Evento de movimento do mouse
function onMunicipioMouseMove(event, d) {
  if (mapConfig.tooltip.enabled) {
    updateTooltipPosition(event);
  }
}

// Mostrar tooltip
function showTooltip(d, event) {
  let tooltipContent;

  // Usar construtor personalizado se definido
  if (
    mapConfig.tooltip.customBuilder &&
    typeof mapConfig.tooltip.customBuilder === "function"
  ) {
    tooltipContent = mapConfig.tooltip.customBuilder(d);
  } else {
    // Construtor padrão
    const municipioName = d.properties.name || "Nome não disponível";
    const municipioId = d.properties.id || "N/A";

    tooltipContent = `
      <div style="font-weight: bold; margin-bottom: 4px;">${municipioName}</div>
      <div style="font-size: 12px; opacity: 0.8;">ID: ${municipioId}</div>
    `;
  }

  tooltip.style("opacity", 1).html(tooltipContent);
  updateTooltipPosition(event);
}

// Esconder tooltip
function hideTooltip() {
  tooltip.style("opacity", 0);
}

// Atualizar posição do tooltip
function updateTooltipPosition(event) {
  const [x, y] = d3.pointer(event, document.body);
  const offsetX = mapConfig.tooltip.offset.x;
  const offsetY = mapConfig.tooltip.offset.y;

  tooltip.style("left", x + offsetX + "px").style("top", y + offsetY + "px");
}

// Configurar zoom
let zoom;
function setupZoom() {
  zoom = d3
    .zoom()
    .scaleExtent([mapConfig.zoom.min, mapConfig.zoom.max])
    .on("zoom", function (event) {
      g.attr("transform", event.transform);
      labelsGroup.attr("transform", event.transform);

      // Atualizar visibilidade dos labels baseada no zoom
      MapUtils.updateLabelsVisibility();
    });

  svg.call(zoom);
}

// Configurar eventos de seleção
function setupSelectionEvents() {
  // Limpar seleção ao clicar no fundo do mapa
  if (mapConfig.selection.clearOnBackgroundClick) {
    svg.on("click", function (event) {
      // Verifica se o clique foi no SVG (fundo) e não em um município
      if (event.target === this) {
        MapUtils.clearSelection();
      }
    });
  }

  // Limpar seleção com a tecla ESC
  if (mapConfig.selection.clearOnEscKey) {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        MapUtils.clearSelection();
      }
    });
  }
}

// Mostrar erro
function showError(message) {
  const container = document.querySelector(".map-container");
  container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px;">
            <div>
                <h3 style="color: #e74c3c; margin-bottom: 10px;">Erro ao carregar o mapa</h3>
                <p style="color: #666;">${message}</p>
                <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Tentar novamente
                </button>
            </div>
        </div>
    `;
}

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  console.log("Inicializando mapa do Tocantins...");

  // Tornar MapUtils e mapConfig globalmente acessíveis
  window.MapUtils = MapUtils;
  window.mapConfig = mapConfig;

  initMap();
});
