import { useState } from 'react';

// Data for the skills
const skills = [
  {
    id: 'find-models',
    icon: '🔍',
    title: 'find-models',
    subtitle: 'Descobrir Modelos',
    description: 'Busque modelos, navegue coleções, leia schemas e escolha o modelo certo para seu caso de uso.',
    details: [
      'Buscar modelos por nome, tag ou categoria',
      'Navegar coleções curadas do Replicate',
      'Ler schemas de input/output dos modelos',
      'Filtrar por tipo: imagem, vídeo, áudio, texto',
      'Identificar modelos oficiais vs. comunidade',
    ],
    code: `# Exemplo: Buscar modelos de geração de imagem
import replicate

# Buscar modelos populares de imagem
models = replicate.models.list()
image_models = [m for m in models if 'image' in m.description.lower()]

# Ver schema de um modelo específico
model = replicate.models.get("black-forest-labs/flux-schnell")
print(model.latest_version.openapi_schema)`,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'compare-models',
    icon: '⚖️',
    title: 'compare-models',
    subtitle: 'Comparar Opções',
    description: 'Avalie modelos por custo, velocidade, qualidade e capacidades para tomar decisões informadas.',
    details: [
      'Comparar custo por execução entre modelos',
      'Avaliar velocidade de inferência',
      'Analisar qualidade de output',
      'Verificar hardware necessário (CPU/GPU)',
      'Entender tradeoffs entre velocidade e qualidade',
    ],
    code: `# Comparar modelos de geração de imagem
# Modelo rápido (mais barato, menor qualidade)
# black-forest-labs/flux-schnell ~$0.003/imagem

# Modelo balanceado
# stability-ai/sdxl ~$0.002/imagem

# Modelo alta qualidade (mais lento)
# black-forest-labs/flux-dev ~$0.025/imagem

# Comparar tempos de resposta
import replicate
import time

for model_id in ["black-forest-labs/flux-schnell", 
                  "stability-ai/sdxl"]:
    start = time.time()
    output = replicate.run(model_id, input={
        "prompt": "a photo of a cat"
    })
    elapsed = time.time() - start
    print(f"{model_id}: {elapsed:.1f}s")`,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    id: 'run-models',
    icon: '🚀',
    title: 'run-models',
    subtitle: 'Executar Previsões',
    description: 'Crie previsões, use polling, webhooks, streaming e manipule arquivos em fluxos multi-modelo.',
    details: [
      'Criar previsões síncronas e assíncronas',
      'Usar polling para acompanhar status',
      'Configurar webhooks para notificações',
      'Streaming de output em tempo real',
      'Upload e download de arquivos de input/output',
      'Trabalhar com múltiplos modelos em pipeline',
    ],
    code: `# Executar uma previsão síncrona
import replicate

output = replicate.run(
    "black-forest-labs/flux-schnell",
    input={"prompt": "a futuristic city at sunset"}
)
print(output)  # URL da imagem gerada

# Previsão assíncrona com polling
prediction = replicate.predictions.create(
    model="black-forest-labs/flux-schnell",
    input={"prompt": "a cat wearing a hat"}
)

# Aguardar conclusão
prediction.wait()
print(prediction.status)  # "succeeded"
print(prediction.output)

# Com webhook
prediction = replicate.predictions.create(
    model="black-forest-labs/flux-schnell",
    input={"prompt": "abstract art"},
    webhook="https://seu-app.com/webhook",
    webhook_events_filter=["completed"]
)`,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'cog-custom',
    icon: '🛠️',
    title: 'cog-custom',
    subtitle: 'Modelos com Cog',
    description: 'Crie modelos personalizados usando Cog: empacote, teste localmente e prepare para deploy.',
    details: [
      'Instalar e configurar o Cog CLI',
      'Criar cog.yaml com dependências',
      'Definir interface de predição (predict.py)',
      'Testar modelos localmente com Docker',
      'Configurar GPU e otimizações',
      'Gerenciar pesos e versões do modelo',
    ],
    code: `# 1. Instalar Cog
sudo curl -o /usr/local/bin/cog \\
  -L https://github.com/replicate/cog/releases/latest/download/cog_$(uname -s)_$(uname -m)
sudo chmod +x /usr/local/bin/cog

# 2. Inicializar no diretório do modelo
cd path/to/your/model
cog init

# 3. Configurar cog.yaml
# build:
#   python_version: "3.12"
#   gpu: true
#   python_packages:
#     - "torch==2.3.1"
#     - "transformers==4.40.0"
# predict: "predict.py:Predictor"

# 4. Definir predict.py
# from cog import BasePredictor, Input, Path
# class Predictor(BasePredictor):
#     def setup(self):
#         self.model = load_model("weights/")
#     def predict(self,
#         prompt: str = Input(description="Texto para gerar imagem"),
#         steps: int = Input(default=25, ge=1, le=100)
#     ) -> Path:
#         output = self.model.generate(prompt, steps)
#         return output

# 5. Testar localmente
cog predict -i prompt="a beautiful sunset"

# 6. Publicar no Replicate
cog login
cog push r8.im/seu-usuario/seu-modelo`,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    id: 'publish-models',
    icon: '📦',
    title: 'publish-models',
    subtitle: 'Publicar Modelos',
    description: 'Publique seus modelos no Replicate: configure CI/CD, gerencie versões e torne-os públicos ou privados.',
    details: [
      'Criar página do modelo no Replicate',
      'Push via Cog CLI ou GitHub Actions',
      'Configurar pipeline CI/CD',
      'Gerenciar versões do modelo',
      'Escolher entre público e privado',
      'Configurar hardware e scaling',
    ],
    code: `# Publicar modelo no Replicate

# Via Cog CLI
cog login
cog push r8.im/usuario/modelo

# Via GitHub Actions (.github/workflows/push.yml)
# name: Push Model
# on:
#   push:
#     branches: [main]
# jobs:
#   push:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - name: Push to Replicate
#         uses: replicate/setup-cog@v2
#       - run: cog push r8.im/usuario/modelo
#         env:
#           REPLICATE_API_TOKEN: \${{ secrets.REPLICATE_API_TOKEN }}

# Usar o modelo publicado
import replicate

output = replicate.run(
    "usuario/modelo:versao-sha",
    input={"prompt": "hello world"}
)

# Criar modelo via API
replicate.models.create(
    owner="usuario",
    name="meu-modelo",
    visibility="public",
    hardware="gpu-t4-small",
    description="Meu modelo personalizado"
)`,
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  {
    id: 'prompt-images',
    icon: '🎨',
    title: 'prompt-images',
    subtitle: 'Gerar Imagens',
    description: 'Técnicas avançadas de prompting para geração e edição de imagens: estilo, consistência, inpainting e mais.',
    details: [
      'Linguagem fotográfica para realismo',
      'Renderização de texto em imagens',
      'Transferência de estilo artístico',
      'Consistência de personagens',
      'Inpainting e edição cirúrgica',
      'Controle de composição e enquadramento',
    ],
    code: `# Técnicas de prompting para imagens

# 1. Fotografia realista
output = replicate.run("black-forest-labs/flux-dev", input={
    "prompt": "Professional portrait photograph, 85mm lens, f/1.8, natural window light, shallow depth of field, Canon EOS R5, raw photo"
})

# 2. Estilo artístico específico
output = replicate.run("black-forest-labs/flux-dev", input={
    "prompt": "Oil painting in the style of Monet, impressionist brushstrokes, water lilies, soft pastel colors, museum quality"
})

# 3. Inpainting (editar parte da imagem)
output = replicate.run("diffusers/stable-diffusion-inpainting", input={
    "image": "https://exemplo.com/foto.jpg",
    "mask": "https://exemplo.com/mascara.png",
    "prompt": "a red sports car"
})

# 4. Controle de qualidade
output = replicate.run("black-forest-labs/flux-dev", input={
    "prompt": "a majestic mountain landscape",
    "num_outputs": 4,        # Gerar 4 variações
    "guidance_scale": 7.5,   # Aderência ao prompt
    "num_inference_steps": 50 # Mais passos = mais detalhe
})`,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    id: 'prompt-videos',
    icon: '🎬',
    title: 'prompt-videos',
    subtitle: 'Gerar Vídeos',
    description: 'Prompting para geração de vídeo: descrição de cena, movimento de câmera, áudio, diálogo e controle de estilo.',
    details: [
      'Descrição detalhada de cenas',
      'Controle de movimento de câmera',
      'Geração de áudio e diálogo',
      'Prompting multi-shot com timecodes',
      'Controle de estilo visual',
      'Transições e efeitos',
    ],
    code: `# Técnicas de prompting para vídeos

# 1. Descrição de cena com câmera
output = replicate.run("minimax/video-01", input={
    "prompt": "A drone shot flying over a misty mountain valley at sunrise, golden light breaking through clouds, cinematic 4K, smooth camera movement"
})

# 2. Movimento de câmera específico
output = replicate.run("minimax/video-01", input={
    "prompt": "Slow dolly-in on a detective examining clues in a dimly lit room, film noir style, shadows dancing on walls, 35mm film grain"
})

# 3. Vídeo com áudio/diálogo
output = replicate.run("minimax/video-01", input={
    "prompt": "A chef in a professional kitchen explaining a recipe, speaking directly to camera, warm lighting, medium close-up, natural hand gestures"
})

# 4. Controle de estilo
output = replicate.run("minimax/video-01", input={
    "prompt": "Anime style, a samurai standing on a cliff edge, wind blowing through cherry blossoms, Studio Ghibli aesthetic, vibrant colors, wide angle shot",
    "duration": 6  # duração em segundos
})`,
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
];

function App() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const copyInstallCmd = () => {
    navigator.clipboard.writeText('npx skills add replicate/skills');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-gray-950 to-blue-900/40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-40 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-purple-300">Agent Skills Spec • replicate/skills</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Habilidades de Agente
              <br />
              <span className="text-3xl sm:text-5xl">para Replicate</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Um kit inicial prático para desenvolvedores que criam aplicativos de IA. 
              Encontre modelos, compare opções, execute previsões, crie modelos personalizados com Cog 
              e aprimore suas habilidades de geração de imagem e vídeo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={copyInstallCmd}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl px-6 py-4 transition-all duration-300"
              >
                <code className="text-purple-300 font-mono text-sm sm:text-base">
                  npx skills add replicate/skills
                </code>
                <span className="text-gray-500 group-hover:text-purple-400 transition-colors">
                  {copiedCmd ? '✓ Copiado!' : '📋'}
                </span>
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Compatível com Claude Code, OpenCode, OpenAI Codex e outros assistentes
            </p>
          </div>
        </div>
      </header>

      {/* Quick Install Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">Instalação Rápida</h3>
              <p className="text-gray-400 text-sm">
                Um único comando instala todas as habilidades no seu projeto. O CLI detecta automaticamente 
                seus assistentes de IA configurados (Claude Code, OpenCode, etc.) e os configura.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 border border-gray-700">
                npm
              </div>
              <div className="bg-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 border border-gray-700">
                npx
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">As 7 Habilidades</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cada habilidade é um arquivo markdown que dá ao seu assistente de IA conhecimento 
            especializado sobre como usar as ferramentas do Replicate de forma eficaz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`group relative bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 ${
                activeSkill === skill.id ? 'ring-2 ring-purple-500/50' : ''
              }`}
              onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{skill.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-lg">{skill.title}</h3>
                  <p className="text-sm text-gray-500">{skill.subtitle}</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {skill.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {skill.details.slice(0, 3).map((detail, i) => (
                  <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-md">
                    {detail.split(' ').slice(0, 3).join(' ')}
                  </span>
                ))}
                {skill.details.length > 3 && (
                  <span className="text-xs bg-gray-800 text-gray-500 px-2 py-1 rounded-md">
                    +{skill.details.length - 3} mais
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4 text-gray-600 group-hover:text-gray-400 transition-colors">
                {activeSkill === skill.id ? '▼' : '▶'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expanded Skill Details */}
      {activeSkill && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          {skills.filter(s => s.id === activeSkill).map((skill) => (
            <div key={skill.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className={`bg-gradient-to-r ${skill.color} p-6`}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{skill.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{skill.title}</h3>
                    <p className="text-white/80">{skill.subtitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">O que esta habilidade cobre:</h4>
                    <ul className="space-y-3">
                      {skill.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">Exemplo de uso:</h4>
                      <button
                        onClick={() => copyCode(skill.code)}
                        className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1 rounded-md transition-colors"
                      >
                        Copiar
                      </button>
                    </div>
                    <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm">
                      <code className="text-gray-300 font-mono whitespace-pre">{skill.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* MCP + Skills Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 sm:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Skills + MCP = Poder Máximo</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Habilidades e MCP são complementares. Juntos, dão ao seu assistente tanto 
              <strong className="text-white"> conhecimento </strong> 
              quanto 
              <strong className="text-white"> ferramentas </strong> 
              para trabalhar com o Replicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-xl">
                  🧠
                </div>
                <h3 className="text-lg font-semibold text-white">Agent Skills</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Dão <strong className="text-blue-300">conhecimento</strong> ao assistente:
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><span className="text-blue-400">•</span> Qual modelo escolher</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">•</span> Como estruturar prompts</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">•</span> Quais tradeoffs considerar</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">•</span> Melhores práticas</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center text-xl">
                  🔧
                </div>
                <h3 className="text-lg font-semibold text-white">MCP Server</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Dão <strong className="text-green-300">ferramentas</strong> ao assistente:
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><span className="text-green-400">•</span> Buscar modelos na API</li>
                <li className="flex items-center gap-2"><span className="text-green-400">•</span> Criar previsões</li>
                <li className="flex items-center gap-2"><span className="text-green-400">•</span> Buscar resultados</li>
                <li className="flex items-center gap-2"><span className="text-green-400">•</span> Gerenciar deploy</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gray-950 border border-gray-800 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-3">Instalar ambos:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-gray-900 rounded-lg px-4 py-3">
                <code className="text-green-300 font-mono text-sm flex-1">npx skills add replicate/skills</code>
                <span className="text-xs text-gray-500">Skills</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-900 rounded-lg px-4 py-3">
                <code className="text-blue-300 font-mono text-sm flex-1">claude mcp add replicate</code>
                <span className="text-xs text-gray-500">MCP (Claude Code)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Fluxo de Trabalho Típico</h2>
          <p className="text-gray-400">Como usar as habilidades juntas em um projeto real</p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-green-500/50 hidden sm:block"></div>
          
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Descobrir',
                desc: 'Use find-models para buscar modelos que atendam seu caso de uso',
                icon: '🔍',
                color: 'text-blue-400',
              },
              {
                step: '02',
                title: 'Comparar',
                desc: 'Use compare-models para avaliar custo, velocidade e qualidade',
                icon: '⚖️',
                color: 'text-purple-400',
              },
              {
                step: '03',
                title: 'Executar',
                desc: 'Use run-models para criar previsões e integrar no seu app',
                icon: '🚀',
                color: 'text-green-400',
              },
              {
                step: '04',
                title: 'Otimizar Prompts',
                desc: 'Use prompt-images ou prompt-videos para melhorar resultados',
                icon: '🎨',
                color: 'text-pink-400',
              },
              {
                step: '05',
                title: 'Personalizar',
                desc: 'Use cog-custom para criar seu próprio modelo se necessário',
                icon: '🛠️',
                color: 'text-orange-400',
              },
              {
                step: '06',
                title: 'Publicar',
                desc: 'Use publish-models para compartilhar com o mundo',
                icon: '📦',
                color: 'text-indigo-400',
              },
            ].map((item, i) => (
              <div key={i} className="relative flex items-start gap-6 sm:gap-8">
                <div className="hidden sm:flex flex-shrink-0 w-16 h-16 bg-gray-900 border border-gray-800 rounded-xl items-center justify-center text-2xl z-10">
                  {item.icon}
                </div>
                <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-mono ${item.color}`}>{item.step}</span>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Pré-requisitos</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📱', title: 'Node.js', desc: 'v18 ou superior' },
              { icon: '🔑', title: 'API Token', desc: 'replicate.com/api-tokens' },
              { icon: '🐳', title: 'Docker', desc: 'Apenas para Cog (modelos custom)' },
              { icon: '🤖', title: 'Assistente IA', desc: 'Claude Code, OpenCode, etc.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Models */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">Modelos Populares no Replicate</h2>
          <p className="text-gray-400 text-sm">Alguns dos modelos mais usados que você pode explorar com as skills</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'FLUX Schnell', owner: 'black-forest-labs', type: 'Imagem', emoji: '🖼️', use: 'Geração rápida de imagens' },
            { name: 'FLUX Dev', owner: 'black-forest-labs', type: 'Imagem', emoji: '🖼️', use: 'Imagens de alta qualidade' },
            { name: 'SDXL', owner: 'stability-ai', type: 'Imagem', emoji: '🖼️', use: 'Stable Diffusion XL' },
            { name: 'Video-01', owner: 'minimax', type: 'Vídeo', emoji: '🎬', use: 'Geração de vídeo com áudio' },
            { name: 'Kling v4.0', owner: 'kwaivgi', type: 'Vídeo', emoji: '🎬', use: 'Vídeo cinematográfico' },
            { name: 'Whisper', owner: 'openai', type: 'Áudio', emoji: '🎵', use: 'Transcrição de áudio' },
          ].map((model, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{model.emoji}</span>
                <div>
                  <h4 className="font-semibold text-white text-sm">{model.name}</h4>
                  <p className="text-xs text-gray-500">{model.owner}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{model.use}</p>
              <span className="inline-block mt-2 text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{model.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Update & Remove */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Gerenciamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-2">Atualizar skills:</p>
              <code className="text-green-300 font-mono text-sm">npx skills update</code>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-2">Remover skills:</p>
              <code className="text-red-300 font-mono text-sm">npx skills remove replicate</code>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦋</span>
              <div>
                <p className="text-sm font-semibold text-white">Replicate Agent Skills</p>
                <p className="text-xs text-gray-500">Kit inicial para desenvolvedores IA</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="https://replicate.com/docs/reference/skills" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                Documentação
              </a>
              <a href="https://github.com/replicate/skills" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                GitHub
              </a>
              <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                Agent Skills Spec
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-xs text-gray-600">
              Feito com ❤️ para a comunidade de desenvolvedores IA • 
              Siga a especificação aberta em agentskills.io
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
