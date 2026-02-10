import { Calculator } from 'lucide-react'
import type { Metadata } from 'next'
import { BlockMath, InlineMath } from 'react-katex'
import { FormCompoundInterestSimulator } from '@/components/form-compound-interest-simulator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Simulador de Juros Compostos | Entenda juros e como calcular',
  description:
    'Aprenda o que são juros, como calcular juros simples e juros compostos, e por que a taxa e o tempo mudam o resultado. Use o simulador para ver o efeito dos juros compostos no seu investimento.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que são juros?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Juros são o “preço do dinheiro no tempo”. Na prática, é o valor pago por quem toma dinheiro emprestado ou o rendimento recebido por quem investe.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual a diferença entre juros simples e juros compostos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nos juros simples, a taxa incide apenas sobre o capital inicial. Nos juros compostos, a taxa incide sobre o capital inicial e também sobre os juros acumulados, gerando crescimento acelerado ao longo do tempo.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como calcular juros compostos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Uma forma comum é usar a fórmula M = C(1 + i)^t, em que C é o capital inicial, i é a taxa no período e t é o tempo (número de períodos). Em investimentos com aportes, o valor final também depende do valor e da frequência das contribuições.',
        },
      },
      {
        '@type': 'Question',
        name: 'Por que o tempo é tão importante no juros composto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Porque o crescimento é exponencial: quanto maior o número de períodos, maior o efeito “bola de neve” dos juros sobre os próprios juros.',
        },
      },
    ],
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is intended to be injected as raw string for SEO.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="size-6 text-primary" />
          <h1 className="font-semibold text-lg md:text-xl">
            Simulador de Juros Compostos
          </h1>
        </div>
        <p className="ml-8 text-muted-foreground text-sm">
          Calcule o crescimento do seu investimento com juros compostos
        </p>
      </div>
      <FormCompoundInterestSimulator />
      <section
        className="mt-10 max-w-[80ch] space-y-8"
        aria-labelledby="guia-juros"
      >
        <header className="space-y-2">
          <h2 id="guia-juros" className="font-semibold text-base md:text-lg">
            O que são juros, como calcular e por que isso importa
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Juros são o “preço do dinheiro no tempo”. Eles aparecem quando
            alguém toma dinheiro emprestado (pagando juros) ou quando alguém
            investe (recebendo juros). Entender como eles são calculados ajuda a
            comparar oportunidades, prever resultados e evitar decisões caras no
            longo prazo.
          </p>
        </header>
        <nav
          aria-label="Conteúdo"
          className="rounded-lg border-muted/50 bg-muted/20 p-4 text-sm"
        >
          <p className="mb-2 font-medium">Nesta página:</p>
          <ul className="grid list-inside list-disc gap-2 md:grid-cols-2">
            <li>
              <a
                className="underline underline-offset-4"
                href="#como-juros-sao-calculados"
              >
                Como os juros são calculados
              </a>
            </li>
            <li>
              <a className="underline underline-offset-4" href="#juros-simples">
                Juros simples: conceito e exemplo
              </a>
            </li>
            <li>
              <a
                className="underline underline-offset-4"
                href="#juros-compostos"
              >
                Juros compostos: conceito e efeito bola de neve
              </a>
            </li>
            <li>
              <a
                className="underline underline-offset-4"
                href="#fatores-que-mudam-o-resultado"
              >
                O que mais muda o resultado
              </a>
            </li>
            <li>
              <a className="underline underline-offset-4" href="#faq">
                Perguntas frequentes
              </a>
            </li>
          </ul>
        </nav>

        <article className="space-y-8">
          <section
            className="space-y-3"
            aria-labelledby="como-juros-sao-calculados"
          >
            <h3 id="como-juros-sao-calculados" className="font-semibold">
              Como os juros são calculados (em termos simples)
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Em qualquer cálculo de juros, você costuma ver estes elementos:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground text-sm">
              <li>
                <span className="font-medium text-foreground">
                  Capital (<InlineMath math="C" />)
                </span>
                : o valor inicial (principal).
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Taxa (<InlineMath math="i" />)
                </span>
                : a taxa por período (ao mês, ao ano etc.).
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Tempo (<InlineMath math="t" />)
                </span>
                : o número de períodos.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Montante (<InlineMath math="M" />)
                </span>
                : o resultado final (capital + juros).
              </li>
            </ul>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O detalhe mais importante é alinhar o período da taxa com o
              período do tempo. Por exemplo: se a taxa é mensal, o tempo deve
              estar em meses.
            </p>
          </section>

          <section className="space-y-3" aria-labelledby="juros-simples">
            <h3 id="juros-simples" className="font-semibold">
              Juros simples: quando a taxa incide só no capital inicial
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nos{' '}
              <span className="font-medium text-foreground">juros simples</span>
              , os juros são proporcionais ao tempo e calculados sempre sobre o
              capital inicial. Uma forma comum de representar é:
            </p>
            <div className="rounded-lg border bg-card p-4 text-sm">
              <p className="font-medium">Fórmulas (juros simples)</p>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">Juros:</p>
                  <BlockMath math="J = C \cdot i \cdot t" />
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Montante:
                  </p>
                  <BlockMath math="M = C \cdot (1 + i \cdot t)" />
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Em termos práticos, juros simples são mais comuns em exemplos
              didáticos e alguns contextos específicos. Em investimentos, o
              padrão costuma ser juros compostos.
            </p>
          </section>

          <section className="space-y-3" aria-labelledby="juros-compostos">
            <h3 id="juros-compostos" className="font-semibold">
              Juros compostos: juros sobre juros (o efeito bola de neve)
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nos{' '}
              <span className="font-medium text-foreground">
                juros compostos
              </span>
              , a taxa incide sobre o capital inicial e também sobre os juros
              que já foram acumulados. Isso cria um crescimento que tende a
              acelerar com o tempo.
            </p>
            <div className="rounded-lg border bg-card p-4 text-sm">
              <p className="font-medium">Fórmula (juros compostos)</p>
              <div className="mt-3">
                <p className="mb-1 text-muted-foreground text-xs">Montante:</p>
                <BlockMath math="M = C \cdot (1 + i)^t" />
              </div>
              <p className="mt-4 text-muted-foreground text-xs">
                Onde <InlineMath math="C" /> é o capital,{' '}
                <InlineMath math="i" /> é a taxa por período e{' '}
                <InlineMath math="t" /> é o número de períodos.
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              É por isso que pequenas diferenças de taxa e, principalmente, de
              tempo podem causar grandes diferenças no resultado final. Use o
              simulador acima para ver esse efeito na prática.
            </p>
          </section>

          <section
            className="space-y-3"
            aria-labelledby="fatores-que-mudam-o-resultado"
          >
            <h3 id="fatores-que-mudam-o-resultado" className="font-semibold">
              O que mais muda o resultado (além da taxa)
            </h3>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground text-sm">
              <li>
                <span className="font-medium text-foreground">Tempo</span>:
                quanto maior o prazo, mais forte tende a ser o efeito dos juros
                compostos.
              </li>
              <li>
                <span className="font-medium text-foreground">Aportes</span>:
                investir um valor mensal pode acelerar muito o crescimento do
                montante.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Frequência de capitalização
                </span>
                : juros mensais, anuais e diários podem gerar resultados
                diferentes, mesmo com “taxas equivalentes”.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Inflação e impostos
                </span>
                : o que importa é o ganho real (acima da inflação) e o retorno
                líquido.
              </li>
            </ul>
          </section>

          <section className="space-y-3" aria-labelledby="faq">
            <h3 id="faq" className="font-semibold">
              Perguntas frequentes sobre juros
            </h3>
            <Accordion type="single" collapsible className="text-sm">
              <AccordionItem value="faq-rendimento">
                <AccordionTrigger>
                  Juros e rendimento são a mesma coisa?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Em investimentos, “rendimento” é o retorno total. Em muitos
                  casos, ele é composto principalmente por juros, mas pode
                  incluir outros componentes (como correção monetária ou
                  variações de preço).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-comparar-taxas">
                <AccordionTrigger>
                  Como comparar taxas ao mês e ao ano?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Compare sempre no mesmo período (mensal com mensal, anual com
                  anual) e, quando necessário, use taxas equivalentes. O
                  simulador ajuda a visualizar o impacto quando a capitalização
                  muda.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-importancia">
                <AccordionTrigger>
                  Por que juros compostos são tão importantes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Porque permitem que os juros acumulados também passem a
                  render. No longo prazo, isso pode transformar consistência
                  (prazo + aportes) em crescimento expressivo.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </section>
    </div>
  )
}
