'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FrostedPanel from '@/components/ui/FrostedPanel'

const engineeringCards = [
  {
    title: 'Native Networking',
    description:
      'Zero third-party dependencies. Pure URLSession + Codable for type-safe, auditable networking with full control.',
    code: `// Zero third-party dependencies
func fetch<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
    let (data, response) = try await URLSession.shared.data(
        for: endpoint.request
    )
    guard (response as? HTTPURLResponse)?.statusCode == 200
    else { throw APIError.invalidResponse }
    return try JSONDecoder().decode(T.self, from: data)
}`,
    color: '#007AFF',
  },
  {
    title: 'Core Bluetooth State Machine',
    description:
      'PT30/iOSX hardware pairing with background reconnection. Precise state machine management for reliable BLE in the field.',
    code: `enum BLEState {
    case scanning, connecting, connected, disconnected
}

// PT30/iOSX hardware pairing
// Background reconnection with state machine
// Handles connection drops during long drives
centralManager.scanForPeripherals(
    withServices: [eld_ServiceUUID],
    options: [CBCentralManagerScanOptionAllowDuplicatesKey: false]
)`,
    color: '#FF6B35',
  },
  {
    title: 'Offline-First Architecture',
    description:
      'Core Data + Realm sync with optimistic UI. Conflict resolution ensures data integrity when connectivity returns.',
    code: `// Core Data + Realm sync with optimistic UI
// Conflict resolution: server wins, local queue replay
func sync() async throws {
    let pending = store.pendingChanges()
    let remote = try await api.push(pending)
    try store.merge(remote, strategy: .lastWriterWins)
    store.clearPending()
}`,
    color: '#30D158',
  },
  {
    title: 'CI/CD Pipeline',
    description:
      'GitLab CI to TestFlight — automated linting, testing, and distribution. Release cycles cut from weeks to days.',
    code: `# GitLab CI Pipeline
stages:
  - lint      # SwiftLint
  - test      # xcodebuild test
  - build     # Fastlane gym
  - deploy    # Fastlane pilot → TestFlight

# Release cycles: 2 weeks → 3 days`,
    color: '#5AC8FA',
  },
  {
    title: 'Kotlin Multiplatform',
    description:
      'Shared business logic across iOS and Android using expect/actual pattern. Write once, verify everywhere.',
    code: `// Shared business logic: expect/actual
expect class PlatformLogger() {
    fun log(message: String)
}

// iOS actual implementation
actual class PlatformLogger {
    actual fun log(message: String) {
        NSLog(message)
    }
}`,
    color: '#BF5AF2',
  },
  {
    title: 'SwiftUI Performance',
    description:
      'Identity, Equality, Values — the three axes of SwiftUI rendering. Eliminating unnecessary body evaluations for buttery UIs.',
    code: `// Identity · Equality · Values axes
// Eliminating unnecessary body evaluations

struct OptimizedView: View, Equatable {
    let data: ViewData

    static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.data.id == rhs.data.id
    }

    var body: some View {
        // Only re-evaluated when truly needed
    }
}`,
    color: '#FF375F',
  },
]

function TypewriterCode({ code, color }: { code: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      if (i < code.length) {
        setDisplayed(code.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 12)
    return () => clearInterval(interval)
  }, [inView, code])

  return (
    <div ref={ref} className="font-mono text-[11px] leading-relaxed">
      <pre className="text-white/50 whitespace-pre-wrap">{displayed}</pre>
      {displayed.length < code.length && inView && (
        <span
          className="inline-block w-1.5 h-3.5 animate-pulse"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  )
}

export default function Engineering() {
  return (
    <section id="engineering" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Engineering <span className="text-gradient">Excellence</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {engineeringCards.map((card, i) => (
            <FrostedPanel key={card.title} delay={i * 0.08}>
              <div
                className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: card.color }}
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{card.title}</h3>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">
                {card.description}
              </p>
              <div className="glass p-3 rounded-lg">
                <TypewriterCode code={card.code} color={card.color} />
              </div>
            </FrostedPanel>
          ))}
        </div>
      </div>
    </section>
  )
}
