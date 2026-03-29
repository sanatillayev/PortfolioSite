'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const layers = [
  {
    id: 'view',
    label: 'View (SwiftUI)',
    annotation: '@State, @Binding, ViewModifiers',
    color: '#2997ff',
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
    annotation: 'Networking, Bluetooth, Database',
    color: '#ff6b35',
    detail:
      'Concrete implementations: URLSession networking, Core Bluetooth hardware communication, Core Data / Realm persistence. Each service conforms to a protocol defined in the layer above.',
    code: `struct APIService: ItemRepository {
    func fetchItems() async throws -> [Item] {
        let (data, _) = try await URLSession.shared
            .data(for: Endpoint.items.request)
        return try JSONDecoder()
            .decode([Item].self, from: data)
    }
}`,
  },
  {
    id: 'di',
    label: 'DI Container (Resolver)',
    annotation: 'Protocol to Concrete mapping',
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

export default function Architecture() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="architecture" className="bg-black py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="headline-lg headline-gradient mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Clean by design.
        </motion.h2>
        <motion.p
          className="text-apple-gray mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          How every app is structured — tap a layer to explore
        </motion.p>

        <div className="relative">
          <div className="space-y-0">
            {layers.map((layer, i) => (
              <div key={layer.id}>
                {/* Layer box */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <button
                    onClick={() =>
                      setExpanded(expanded === layer.id ? null : layer.id)
                    }
                    className="w-full text-left bg-apple-dark/60 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors group flex items-center gap-4"
                  >
                    {/* Color bar */}
                    <div
                      className="w-1.5 h-12 rounded-full shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-bold text-apple-light">
                        {layer.label}
                      </h3>
                      <p className="text-white/30 text-xs font-mono truncate">
                        {layer.annotation}
                      </p>
                    </div>
                    <motion.span
                      className="text-white/20 text-sm shrink-0"
                      animate={{ rotate: expanded === layer.id ? 180 : 0 }}
                    >
                      &#9662;
                    </motion.span>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expanded === layer.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="ml-6 mt-1 p-5 bg-black/40 rounded-xl border-l-2"
                          style={{ borderColor: layer.color }}
                        >
                          <p className="text-white/60 text-sm mb-4 leading-relaxed">
                            {layer.detail}
                          </p>
                          <pre className="bg-black rounded-xl p-4 font-mono text-xs text-apple-gray/80 whitespace-pre-wrap overflow-x-auto">
                            {layer.code}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Connector line */}
                {i < layers.length - 1 && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                  >
                    <div
                      className="w-px h-6"
                      style={{ backgroundColor: `${layer.color}40` }}
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
