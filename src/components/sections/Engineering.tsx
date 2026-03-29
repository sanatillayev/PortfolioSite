'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const engineeringCards = [
  {
    id: 'networking',
    title: 'Native Networking',
    oneLiner: 'URLSession + Codable. Zero Alamofire.',
    description:
      'Every networking layer is built on pure URLSession with Codable for type-safe encoding/decoding. No Alamofire, no ObjectMapper, no third-party abstraction layers. Full control over request construction, response handling, retry logic, and token refresh — auditable top to bottom.',
    code: `// Zero third-party dependencies
func fetch<T: Decodable>(
    _ endpoint: Endpoint
) async throws -> T {
    let (data, response) = try await URLSession
        .shared.data(for: endpoint.urlRequest())
    guard let http = response as? HTTPURLResponse,
          (200...299).contains(http.statusCode)
    else { throw APIError.invalidResponse }
    return try JSONDecoder().decode(T.self, from: data)
}`,
  },
  {
    id: 'bluetooth',
    title: 'Core Bluetooth',
    oneLiner: 'BLE state machine for PT30/iOSX hardware.',
    description:
      'Reliable Bluetooth Low Energy connectivity with ELD hardware. A strict state machine manages scanning, connecting, connected, and disconnected states. Exponential backoff reconnection handles signal drops during long-haul drives. Background BLE restoration ensures the app reconnects after being suspended by iOS.',
    code: `enum BLEState {
    case idle
    case scanning
    case connecting(CBPeripheral)
    case connected(CBPeripheral)
    case disconnected(Error?)
}

// Exponential backoff reconnection
func scheduleReconnect(
    to peripheral: CBPeripheral,
    attempt: Int = 0
) {
    let delay = min(pow(2.0, Double(attempt)), 30.0)
    DispatchQueue.main.asyncAfter(
        deadline: .now() + delay
    ) {
        self.centralManager.connect(peripheral)
    }
}`,
  },
  {
    id: 'whitelabel',
    title: 'White-Label Platform',
    oneLiner: '1 codebase, 8 apps, xcconfig-driven.',
    description:
      'The laCafe ecosystem ships 8 independently branded App Store apps from a single codebase. Each brand is defined entirely by an xcconfig file: bundle ID, display name, API environment, asset catalog, and merchant credentials. Backend-driven UI handles brand-specific colors and feature flags at runtime. New brand = new xcconfig + assets, zero code changes.',
    code: `# GummaXonim.xcconfig
BUILD_FLAVOUR = GummaXonim
BUNDLE_ID = uz.lacafe.gummaxonim
MERCHANT_ID = $(GUMMA_MERCHANT_ID)
ASSET_CATALOG = GummaXonim
API_BASE_URL = https://api.gumma.uz/v1
EXCLUDED_SOURCE_FILE_NAMES = \\
    *Yewoo*.* *Giotto*.* *Strawberry*.*`,
  },
  {
    id: 'cicd',
    title: 'CI/CD Pipelines',
    oneLiner: 'Fastlane + GitLab CI to TestFlight.',
    description:
      'Fully automated build-test-deploy pipelines with GitLab CI and Fastlane. Each push triggers SwiftLint, unit tests, and Snapshot tests. Merges to develop build and upload to TestFlight automatically. Release candidates are tagged and promoted to App Store Connect with a single lane. Release cycles compressed from weeks to days.',
    code: `lane :beta do
  scan(scheme: "PilotELD-Dev")
  match(type: "appstore")
  gym(
    scheme: "PilotELD-Release",
    export_method: "app-store"
  )
  pilot(
    skip_waiting_for_build_processing: true
  )
  slack(message: "Build uploaded to TestFlight")
end`,
  },
  {
    id: 'spm',
    title: 'SPM Modular Architecture',
    oneLiner: 'Networking, UI, Services as Swift packages.',
    description:
      'Feature code is organized into Swift Package Manager modules: Networking, UIComponents, Services, and Domain. Each package has zero knowledge of the app target and can be tested independently. The app target composes packages — adding a new feature means creating a new package, not modifying existing code.',
    code: `// Package.swift
let package = Package(
    name: "LaCafeCore",
    platforms: [.iOS(.v16)],
    products: [
        .library(name: "Networking", targets: ["Networking"]),
        .library(name: "UIComponents", targets: ["UIComponents"]),
        .library(name: "Services", targets: ["Services"]),
        .library(name: "Domain", targets: ["Domain"]),
    ],
    targets: [
        .target(name: "Networking", dependencies: []),
        .target(name: "Domain", dependencies: []),
        .target(name: "Services", dependencies: ["Networking", "Domain"]),
        .target(name: "UIComponents", dependencies: ["Domain"]),
    ]
)`,
  },
  {
    id: 'swiftui',
    title: 'SwiftUI Performance',
    oneLiner: 'Identity, Equality, Values — zero wasted renders.',
    description:
      'SwiftUI performance comes down to three axes: Identity (structural vs explicit), Equality (when to skip body re-evaluation), and Values (minimizing @State mutations). Using Equatable conformance on views with stable identifiers prevents unnecessary body evaluations. The result: buttery 60fps scrolling even with complex view hierarchies.',
    code: `struct OptimizedView: View, Equatable {
    let data: ViewData

    // Only re-evaluate body when data.id changes
    static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.data.id == rhs.data.id &&
        lhs.data.version == rhs.data.version
    }

    var body: some View {
        VStack {
            Text(data.title)
            ForEach(data.items) { item in
                ItemRow(item: item)
            }
        }
    }
}`,
  },
]

function ExpandedCard({
  card,
  onClose,
}: {
  card: (typeof engineeringCards)[0]
  onClose: () => void
}) {
  return (
    <motion.div
      layoutId={`card-${card.id}`}
      className="col-span-full bg-black/50 border border-white/5 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-apple-light">{card.title}</h3>
        <button
          onClick={onClose}
          className="text-white/30 hover:text-white/60 transition-colors text-xl leading-none"
        >
          &times;
        </button>
      </div>
      <p className="text-sm text-apple-gray leading-relaxed mb-5">
        {card.description}
      </p>
      <pre className="bg-black rounded-xl p-4 font-mono text-xs text-apple-gray/80 whitespace-pre-wrap overflow-x-auto">
        {card.code}
      </pre>
    </motion.div>
  )
}

export default function Engineering() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="engineering" className="bg-apple-dark py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="headline-lg headline-gradient mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Craft
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {expandedId && (
              <ExpandedCard
                key={`expanded-${expandedId}`}
                card={engineeringCards.find((c) => c.id === expandedId)!}
                onClose={() => setExpandedId(null)}
              />
            )}
          </AnimatePresence>

          {engineeringCards.map((card, i) => {
            if (card.id === expandedId) return null
            return (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-black/50 border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-white/10 transition-colors"
                onClick={() => setExpandedId(card.id)}
              >
                <h3 className="text-lg font-bold text-apple-light mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-apple-gray">{card.oneLiner}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
