# Sistema de Configuração - Mapa Interativo do Tocantins

```javascript
// Atualizar configurações
MapUtils.updateConfig({
  colors: { default: "#ff6b6b" },
  zoom: { max: 15 },
});

// Resetar para configurações padrão
MapUtils.resetConfig();

// Obter configuração atual
const currentConfig = MapUtils.getConfig();

// Validar configuração
const isValid = MapUtils.validateConfig(myConfig);

// Gerenciar seleção
MapUtils.selectMunicipio("Palmas"); // Selecionar município
MapUtils.clearSelection(); // Limpar seleção
const selected = MapUtils.getSelectedMunicipio(); // Obter selecionado
const isSelected = MapUtils.isMunicipioSelected("Palmas"); // Verificar se está selecionado
```

O mapa interativo do Tocantins agora possui um sistema de configuração abrangente que permite personalizar diversos aspectos visuais e funcionais do mapa.

## Estrutura de Configuração

### 1. Objeto `mapConfig`

```javascript
const mapConfig = {
  colors: {
    default: "#69b3a2", // Cor de preenchimento dos municípios
    hover: "#4a9b8e", // Cor ao passar o mouse
    selected: "#ff6b6b", // Cor do município selecionado
    stroke: "#ffffff", // Cor das bordas
    background: "#f5f5f5", // Cor de fundo
  },
  stroke: {
    width: 1, // Largura das bordas padrão (px)
    hoverWidth: 2, // Largura das bordas no hover
    selectedWidth: 2, // Largura das bordas do selecionado
  },
  zoom: {
    min: 0.5, // Zoom mínimo
    max: 10, // Zoom máximo
    duration: 750, // Duração das animações de zoom (ms)
  },
  tooltip: {
    enabled: true, // Habilitar/desabilitar tooltip
    offset: { x: 10, y: -10 }, // Offset do cursor
    customBuilder: null, // Função personalizada para construir tooltip
  },
  labels: {
    enabled: false, // Habilitar/desabilitar exibição de nomes
    fontSize: 10, // Tamanho da fonte
    fontFamily: "Arial, sans-serif", // Família da fonte
    color: "#333333", // Cor do texto
    fontWeight: "normal", // Peso da fonte (normal, bold)
    strokeColor: "#ffffff", // Cor do contorno do texto
    strokeWidth: 0.5, // Largura do contorno
    minZoomLevel: 2, // Nível mínimo de zoom para exibir labels
    maxLabelLength: 15, // Comprimento máximo do label (trunca se maior)
    offsetY: 0, // Offset vertical do centro do município
  },
  animations: {
    enabled: true, // Habilitar animações
    duration: 300, // Duração das animações de hover (ms)
  },
  selection: {
    enabled: true, // Habilitar/desabilitar seleção
    clearOnBackgroundClick: true, // Limpar seleção ao clicar no fundo
    clearOnEscKey: true, // Limpar seleção ao pressionar ESC
    clearOnDoubleClick: false, // Limpar seleção ao dar duplo clique no município
  },
  callbacks: {
    onMunicipioClick: null, // Callback ao clicar em município
    onMunicipioHover: null, // Callback ao passar mouse sobre município
    onMapLoad: null, // Callback quando mapa carrega
    onSelectionCleared: null, // Callback quando a seleção é limpa
  },
};
```

### 2. Utilitário `MapUtils`

O objeto `MapUtils` oferece métodos para gerenciar configurações:

```javascript
// Atualizar configurações
MapUtils.updateConfig({
  colors: { fill: "#ff6b6b" },
  zoom: { max: 15 },
});

// Resetar para configurações padrão
MapUtils.resetConfig();

// Obter configuração atual
const currentConfig = MapUtils.getConfig();

// Validar configuração
const isValid = MapUtils.validateConfig(myConfig);
```

## Exemplos de Uso

### 1. Personalizando Cores

```javascript
// Alterar cores do mapa
MapUtils.updateConfig({
  colors: {
    default: "#ff6b6b", // Vermelho claro
    hover: "#ff5252", // Vermelho mais escuro
    selected: "#e74c3c", // Vermelho escuro para selecionado
    stroke: "#000000", // Borda preta
  },
});
```

### 2. Configurando Seleção de Municípios

```javascript
// Configurar comportamento da seleção
MapUtils.updateConfig({
  selection: {
    enabled: true, // Habilitar seleção
    clearOnBackgroundClick: true, // Limpar ao clicar no fundo
    clearOnEscKey: true, // Limpar com tecla ESC
    clearOnDoubleClick: false, // Limpar com duplo clique no município
  },
});

// Gerenciar seleção programaticamente
MapUtils.selectMunicipio("Palmas"); // Selecionar município
MapUtils.clearSelection(); // Limpar seleção
const municipioSelecionado = MapUtils.getSelectedMunicipio(); // Obter selecionado
const estaSelecionado = MapUtils.isMunicipioSelected("Palmas"); // Verificar se está selecionado
```

### 3. Configurando Labels dos Municípios

```javascript
// Habilitar exibição dos nomes dos municípios
MapUtils.updateConfig({
  labels: {
    enabled: true, // Habilitar labels
    fontSize: 12, // Tamanho da fonte
    color: "#333333", // Cor do texto
    fontFamily: "Arial, sans-serif", // Família da fonte
    fontWeight: "bold", // Peso da fonte
    strokeColor: "#ffffff", // Cor do contorno
    strokeWidth: 1, // Largura do contorno
    minZoomLevel: 1.5, // Zoom mínimo para exibir
    maxLabelLength: 12, // Máximo de caracteres
    offsetY: 0, // Deslocamento vertical
  },
});

// Métodos específicos para labels
MapUtils.setLabels({
  enabled: true,
  fontSize: 14,
  color: "#000000",
});
```

### 4. Configurando Tooltip Personalizado

```javascript
MapUtils.updateConfig({
  tooltip: {
    customBuilder: (d) => `
      <div style="text-align: center;">
        <h3>${d.properties.name}</h3>
        <p>Estado: Tocantins</p>
        <p>Região: Norte</p>
      </div>
    `,
  },
});
```

### 5. Definindo Callbacks

```javascript
MapUtils.updateConfig({
  callbacks: {
    onMunicipioClick: (d, event, element, isSelected) => {
      console.log("Município clicado:", d.properties.name);
      console.log("Está selecionado:", isSelected);
      alert(`Você clicou em ${d.properties.name}`);
    },
    onMunicipioHover: (d, event) => {
      console.log("Mouse sobre:", d.properties.name);
    },
    onMapLoad: () => {
      console.log("Mapa carregado com sucesso!");
    },
    onSelectionCleared: () => {
      console.log("Seleção foi limpa!");
    },
  },
});
```

### 5. Configuração Completa

```javascript
const minhaConfiguracao = {
  colors: {
    default: "#2E8B57", // Verde mar
    hover: "#3CB371", // Verde claro
    selected: "#228B22", // Verde escuro para selecionado
    stroke: "#FFFFFF", // Branco
  },
  stroke: {
    width: 1.5,
    hoverWidth: 2,
    selectedWidth: 3,
  },
  zoom: {
    min: 0.8,
    max: 15,
    duration: 500,
  },
  selection: {
    enabled: true,
    clearOnBackgroundClick: true,
    clearOnEscKey: true,
    clearOnDoubleClick: true, // Permite desselecionar com duplo clique
  },
  labels: {
    enabled: true, // Exibir nomes dos municípios
    fontSize: 11,
    fontFamily: "Arial, sans-serif",
    color: "#2C3E50",
    fontWeight: "bold",
    strokeColor: "#FFFFFF",
    strokeWidth: 1,
    minZoomLevel: 1.5,
    maxLabelLength: 12,
    offsetY: 0,
  },
  tooltip: {
    enabled: true,
    customBuilder: (d) => `
      <strong>🏛️ ${d.properties.name}</strong><br>
      <small>📍 Tocantins, Brasil</small>
    `,
  },
  animations: {
    enabled: true,
    duration: 300,
  },
  callbacks: {
    onMunicipioClick: (d, event, element, isSelected) => {
      if (isSelected) {
        console.log(`${d.properties.name} foi selecionado!`);
        // Abrir Wikipedia do município
        window.open(`https://pt.wikipedia.org/wiki/${d.properties.name}`, '_blank');
      }
    },
    onSelectionCleared: () => {
      console.log('Seleção foi limpa pelo usuário');
    },
  },
};
        "_blank"
      );
    },
  },
};

MapUtils.updateConfig(minhaConfiguracao);
```

## Métodos Disponíveis

### MapUtils.updateConfig(newConfig)

- **Descrição**: Atualiza configurações do mapa
- **Parâmetros**: `newConfig` - Objeto com novas configurações
- **Retorno**: Objeto de configuração atualizado

### MapUtils.resetConfig()

- **Descrição**: Reseta configurações para valores padrão
- **Retorno**: Objeto de configuração padrão

### MapUtils.getConfig()

- **Descrição**: Retorna configuração atual
- **Retorno**: Objeto de configuração atual

### MapUtils.validateConfig(config)

- **Descrição**: Valida se um objeto de configuração é válido
- **Parâmetros**: `config` - Objeto de configuração para validar
- **Retorno**: `true` se válido, `false` caso contrário

### MapUtils.selectMunicipio(name)

- **Descrição**: Seleciona um município programaticamente
- **Parâmetros**: `name` - Nome do município para selecionar
- **Retorno**: Dados do município selecionado ou `null` se não encontrado

### MapUtils.clearSelection()

- **Descrição**: Remove a seleção de todos os municípios
- **Retorno**: Nenhum

### MapUtils.getSelectedMunicipio()

- **Descrição**: Retorna o município atualmente selecionado
- **Retorno**: Dados do município selecionado ou `null` se nenhum estiver selecionado

### MapUtils.isMunicipioSelected(name)

- **Descrição**: Verifica se um município específico está selecionado
- **Parâmetros**: `name` - Nome do município para verificar
- **Retorno**: `true` se o município estiver selecionado, `false` caso contrário

### MapUtils.getMunicipioByName(name)

- **Descrição**: Encontra um município pelo nome
- **Parâmetros**: `name` - Nome do município para buscar
- **Retorno**: Elemento D3 do município ou seleção vazia se não encontrado

### MapUtils.setLabels(labelsConfig)

- **Descrição**: Define configurações específicas para labels dos municípios
- **Parâmetros**: `labelsConfig` - Objeto com configurações de labels
- **Retorno**: Nenhum

### MapUtils.updateLabels()

- **Descrição**: Atualiza/recria os labels dos municípios com as configurações atuais
- **Retorno**: Nenhum

### MapUtils.updateLabelsVisibility()

- **Descrição**: Atualiza a visibilidade dos labels baseada no nível de zoom atual
- **Retorno**: Nenhum

## Propriedades dos Dados GeoJSON

Cada município no mapa possui as seguintes propriedades disponíveis nos callbacks e tooltips:

```javascript
{
  properties: {
    name: "Nome do Município",
    // Outras propriedades específicas do dataset
  },
  geometry: {
    type: "Polygon",
    coordinates: [/* coordenadas */]
  }
}
```

## Recarregando o Mapa

Após alterar configurações que afetam a renderização, você pode precisar recarregar o mapa:

```javascript
// Limpar mapa atual
d3.select("#map").selectAll("*").remove();

// Reinicializar com novas configurações
initMap();
```

## Exemplo Prático

Veja o arquivo `exemplo-configuracao.html` para um exemplo interativo completo com interface de controles para testar todas as configurações disponíveis.

## Notas Importantes

1. **Performance**: Recarregar o mapa frequentemente pode impactar a performance
2. **Validação**: Sempre valide configurações antes de aplicar
3. **Callbacks**: Use callbacks para integrar o mapa com outras funcionalidades
4. **Responsividade**: O mapa se adapta automaticamente ao redimensionamento da janela
5. **Persistência**: Use localStorage para salvar configurações do usuário

## Troubleshooting

### O mapa não aparece

- Verifique se o arquivo `geojson-tocantins.json` está no mesmo diretório
- Abra o console do navegador para verificar erros

### Configurações não aplicam

- Certifique-se de que `MapUtils` está disponível globalmente
- Recarregue o mapa após aplicar configurações que afetam a renderização

### Tooltip não funciona

- Verifique se `tooltip.enabled` está como `true`
- Certifique-se de que existe um elemento com id `tooltip` no HTML
