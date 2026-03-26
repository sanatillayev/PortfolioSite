'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const layers = [
  {
    id: 'view',
    label: 'View (SwiftUI)',
    annotation: '@State, @Binding, ViewModifiers',
    color: '#007AFF',
    detail:
      'The presentation layer. Pure SwiftUI views that react to state changes. No business logic — only layout, styling, and gesture handling.',
    code: `struct ContentView: View {
    @StateObject var vm = ViewModel()

    var body: some View {
        List(vm.items) { item in
            ItemRow(item: item)
        }
        .task { await vm.load() }
    }
}`,
  },
  {
    id: 'viewmodel',
    label: 'ViewModel (MVVM / UDF)',
    annotation: '@StateObject, Combine Publishers',
    color: '#5E5CE6',
    detail:
      'Transforms domain data into view-ready state. Handles user intents, manages async flows, and publishes changes via Combine or @Published properties.',
    code: `class ViewModel: ObservableObject {
    @Published var state: ViewState = .loading
    private let useCase: FetchItemsUseCase

    func load() async {
        state = .loaded(try await useCase.execute())
    }
}`,
  },
  {
    id: 'repository',
    label: 'Repository / Use Case',
    annotation: 'Protocol abstractions',
    color: '#BF5AF2',
    detail:
      'Protocol-based abstraction layer. Use cases encapsulate single business operations. Repositories abstract data source details — the ViewModel never knows if data comes from network, cache, or Core Data.',
    code: `protocol ItemRepository {
    func fetchItems() async throws -> [Item]
}

struct FetchItemsUseCase {
    let repository: ItemRepository
    func execute() async throws -> [Item] {
        try await repository.fetchItems()
    }
}`,
  },
  {
    id: 'service',
    label: 'Service Layer',
    annotation: 'Networking · Bluetooth · Database',
    color: '#FF6B35',
    detail:
      'Concrete implementations: URLSession networking, Core Bluetooth hardware communication, Core Data / Realm persistence. Each service conforms to a protocol defined in the layer above.',
    code: `struct APIService: ItemRepository {
    func fetchItems() async throws -> [Item] {
        let (data, _) = try await URLSession.shared
            .data(for: Endpoint.items.request)
        return try JSONDecoder().decode([Item].self, from: data)
    }
}`,
  },
  {
    id: 'di',
    label: 'DI Container (Resolver)',
    annotation: 'Protocol → Concrete mapping',
    color: '#30D158',
    detail:
      'Dependency injection container that maps protocols to concrete implementations. Enables testing with mocks, swapping environments, and modular feature composition.',
    code: `extension Resolver: ResolverRegistering {
    static func registerAllServices() {
        register { APIService() as ItemRepository }
        register { ViewModel(useCase: resolve()) }
    }
}`,
  },
]

function DataParticle({
  delay,
  direction,
}: {
  delay: number
  direction: 'up' | 'down'
}) {
  return (
    <motion.div
      className="absolute left-1/2 w-1.5 h-1.5 rounded-full bg-ios-blue/60"
      initial={{ y: direction === 'down' ? -10 : 10, opacity: 0 }}
      animate={{
        y: direction === 'down' ? [0, 400] : [400, 0],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export default function Architecture() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="architecture" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Clean <span className="text-gradient">Architecture</span>
        </motion.h2>
        <motion.p
          className="text-white/40 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          How every app is structured — tap a layer to explore
        </motion.p>

        {/* Diagram */}
        <div className="relative">
          {/* Flowing data particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[0, 0.6, 1.2, 1.8, 2.4].map((d, i) => (
              <DataParticle
                key={`d-${i}`}
                delay={d}
                direction={i % 2 === 0 ? 'down' : 'up'}
              />
            ))}
          </div>

          <div className="space-y-2 relative z-10">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() =>
                    setExpanded(expanded === layer.id ? null : layer.id)
                  }
                  className="w-full text-left glass p-4 hover:bg-white/[0.08] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-8 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                      <div>
                        <h3 className="text-sm md:text-base font-bold text-white">
                          {layer.label}
                        </h3>
                        <p className="text-white/30 text-xs font-mono">
                          {layer.annotation}
                        </p>
                      </div>
                    </div>
                    <motion.span
                      className="text-white/20 text-sm"
                      animate={{ rotate: expanded === layer.id ? 180 : 0 }}
                    >
                      &#9662;
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence>
                  {expanded === layer.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="glass p-4 mt-1 ml-5 border-l-2" style={{ borderColor: layer.color }}>
                        <p className="text-white/60 text-sm mb-4 leading-relaxed">
                          {layer.detail}
                        </p>
                        <pre className="font-mono text-[11px] text-white/40 bg-black/30 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                          {layer.code}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Connector arrow */}
                {i < layers.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-px h-2 bg-white/10" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
