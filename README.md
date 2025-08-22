# Mapa Interativo do Tocantins

Um mapa interativo dos municípios do estado do Tocantins, criado com HTML, CSS e JavaScript usando D3.js. Agora com sistema de configuração avançado para personalização completa!

## ✨ Funcionalidades

- 🗺️ Visualização interativa de todos os municípios do Tocantins
- 🖱️ Zoom e pan para explorar diferentes regiões
- 📱 Design responsivo que se adapta a diferentes tamanhos de tela
- 💡 Tooltip informativo ao passar o mouse sobre os municípios
- 🎨 Interface limpa e minimalista
- ⚙️ **NOVO!** Sistema de configuração abrangente
- 🎨 **NOVO!** Personalização completa de cores, bordas e comportamentos
- 🔧 **NOVO!** Callbacks customizáveis para integração
- 💾 **NOVO!** Persistência de configurações

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização e layout responsivo
- **JavaScript (ES6+)**: Lógica de interação e configuração
- **D3.js v7**: Manipulação e visualização de dados geográficos
- **GeoJSON**: Formato de dados geográficos dos municípios

## � Como Usar

### Uso Básico

1. Abra o arquivo `index.html` em um navegador web moderno
2. O mapa será carregado automaticamente
3. Use o mouse para:
   - **Zoom**: Role a roda do mouse ou use gestos de pinça (mobile)
   - **Pan**: Clique e arraste para mover o mapa
   - **Tooltip**: Passe o mouse sobre um município para ver informações

### Uso Avançado com Configurações

1. Abra `exemplo-configuracao.html` para ver um exemplo completo
2. Use os controles laterais para personalizar:
   - Cores do mapa (preenchimento, hover, bordas)
   - Largura das bordas
   - Limites de zoom
   - Estilo do tooltip
3. Salve e carregue suas configurações preferidas

## 📁 Estrutura dos Arquivos

```
mapa-tocantins-interativo/
├── index.html                    # Página principal (versão simples)
├── exemplo-configuracao.html     # Exemplo com controles de configuração
├── styles.css                    # Estilos do mapa
├── script.js                     # Lógica JavaScript com sistema de configuração
├── geojson-tocantins.json        # Dados geográficos dos municípios
├── CONFIGURACAO.md               # Documentação do sistema de configuração
└── README.md                     # Este arquivo
```

## ⚙️ Sistema de Configuração

O mapa agora possui um sistema de configuração poderoso que permite personalizar:

### Configurações Visuais

- **Cores**: Preenchimento, hover, bordas
- **Bordas**: Largura e estilo
- **Zoom**: Limites mínimo e máximo
- **Animações**: Duração e habilitação

### Configurações Funcionais

- **Tooltip**: Personalização completa ou desabilitação
- **Callbacks**: Eventos de clique, hover, zoom e carregamento
- **Responsividade**: Adaptação automática

### Exemplo Rápido

```javascript
// Personalizar cores
MapUtils.updateConfig({
  colors: {
    fill: "#ff6b6b",
    hover: "#ff5252",
    stroke: "#000000",
  },
});

// Adicionar callback de clique
MapUtils.updateConfig({
  callbacks: {
    onMunicipalityClick: (d) => {
      alert(`Você clicou em ${d.properties.name}!`);
    },
  },
});
```

Para documentação completa, veja [CONFIGURACAO.md](CONFIGURACAO.md).

## 📋 Requisitos

- Navegador web moderno com suporte a ES6+
- Conexão com internet (para carregar D3.js via CDN)
- Servidor web local (recomendado para evitar problemas de CORS)

## 🔧 Instalação e Execução

### Opção 1: Servidor Local Simples

```bash
# Se você tem Python instalado
python -m http.server 8000

# Ou se você tem Node.js instalado
npx serve .
```

### Opção 2: Extensão Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 3: Abrir Diretamente

Para teste rápido, você pode abrir diretamente no navegador, mas alguns recursos podem não funcionar devido a restrições de CORS.

## � Personalização

### Personalização Básica (CSS)

```css
/* Alterar cores padrão */
:root {
  --cor-municipio: #69b3a2;
  --cor-hover: #a8e6cf;
  --cor-borda: #ffffff;
}
```

### Personalização Avançada (JavaScript)

```javascript
// Configuração completa
const minhaConfig = {
  colors: {
    fill: "#2E8B57",
    hover: "#3CB371",
    stroke: "#FFFFFF",
  },
  stroke: { width: 2 },
  zoom: { min: 0.5, max: 20 },
  tooltip: {
    customBuilder: (d) => `<strong>${d.properties.name}</strong>`,
  },
  callbacks: {
    onMunicipalityClick: (d) => console.log(d.properties.name),
  },
};

MapUtils.updateConfig(minhaConfig);
```

## 📱 Suporte a Navegadores

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📖 Documentação

- [Guia de Configuração Completo](CONFIGURACAO.md) - Documentação detalhada do sistema de configuração
- [Exemplo Interativo](exemplo-configuracao.html) - Interface para testar configurações

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

### Ideias para Contribuições

- Novos estilos de tooltip
- Temas de cores predefinidos
- Integração com APIs de dados
- Funcionalidades de exportação
- Melhorias de acessibilidade

## � Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).

## 👨‍💻 Autor

Criado com ❤️ para visualização de dados geográficos do Brasil.

---

**🔥 Novidade!** Agora com sistema de configuração completo para personalização total do seu mapa!
