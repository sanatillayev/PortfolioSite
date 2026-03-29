// projects.ts
// Bilol Sanatillaev — Complete Portfolio Data
// 20 apps · verified App Store / Play Store links · accurate technical stories
// Last updated: March 2026

import type { Project, Category } from '@/types'

export const projects: Project[] = [

  // ─────────────────────────────────────────
  // OVI UZBEKISTAN  (Mar 2026 – Present)
  // ─────────────────────────────────────────

  {
    id: "ovi",
    name: "OVI",
    tagline: "Your health, in your hands",
    category: "HealthTech",
    platform: "iOS",
    employer: "OVI Uzbekistan",
    period: "Mar 2026 – Present",
    role: "Engineer",
    accentColor: "#30D158",
    appStoreUrl: "https://apps.apple.com/us/app/ovi/id6753169530",
    isCurrent: true,
    description:
      "OVI is a patient-facing HealthTech app for Uzbekistan's OVI healthcare platform. Patients can manage appointments, access medical records, and communicate with their care team directly from their iPhone.",
    features: [
      "Appointment booking and management",
      "Medical records and history",
      "Doctor–patient communication",
      "Health dashboard and notifications",
    ],
    techStack: ["Swift", "SwiftUI", "Combine"],
    hardPart: {
      title: "Active development",
      story:
        "Currently in active development. Technical details will be added as the project matures.",
    },
  },

  {
    id: "ovi-pro",
    name: "Ovi Pro",
    tagline: "Clinical tools for doctors",
    category: "HealthTech",
    platform: "iOS",
    employer: "OVI Uzbekistan",
    period: "Mar 2026 – Present",
    role: "Engineer",
    accentColor: "#0A84FF",
    appStoreUrl: "https://apps.apple.com/us/app/ovi-pro/id6759444477",
    isCurrent: true,
    description:
      "Ovi Pro is the doctor-facing companion to the OVI patient app. Medical professionals use it to manage their schedule, review patient data, and coordinate care — purpose-built for the clinical workflow.",
    features: [
      "Patient list and profile management",
      "Appointment and schedule management",
      "Clinical notes and documentation",
      "Real-time patient communication",
    ],
    techStack: ["Swift", "SwiftUI", "Combine"],
    hardPart: {
      title: "Active development",
      story:
        "Currently in active development alongside the patient-facing OVI app, sharing common infrastructure and design system components.",
    },
  },

  // ─────────────────────────────────────────
  // OSON  (Oct 2025 – Feb 2026)
  // ─────────────────────────────────────────

  {
    id: "oson",
    name: "Oson",
    tagline: "Uzbekistan's leading payments super-app",
    category: "Fintech",
    platform: "iOS",
    employer: "OSON",
    period: "Oct 2025 – Feb 2026",
    role: "Engineer",
    accentColor: "#007AFF",
    appStoreUrl:
      "https://apps.apple.com/us/app/oson/id1207834182",
    description:
      "Oson is Uzbekistan's top fintech super-app — payments, transfers, utility bills, and financial services for millions of users. Also white-labeled as EasyPay for the Tajikistan market under a separate brand and deployment.",
    features: [
      "Payments, transfers, and bill payments",
      "Code reviews and mentoring for junior iOS developers",
      "Co-led new architecture adoption and implementation with Team Lead",
      "Separate build schemes and xcconfig for EasyPay 🇹🇯 — zero codebase duplication",
      "Created SPM module with reusable UI components adopted across company projects",
      "Native URLSession/Codable networking layer (replaced Alamofire + ObjectMapper)",
      "Memory leak elimination across all major screens",
    ],
    techStack: ["Swift", "UIKit", "SwiftUI", "URLSession", "Codable", "MVVM"],
    hardPart: {
      title: "Full technical audit",
      story:
        "Performed a comprehensive audit uncovering simultaneous refresh-token race conditions, redundant backend calls, and widespread memory leaks from misused delegate patterns. Eliminated all leaks across major screens and replaced Alamofire + ObjectMapper with a native URLSession/Codable layer — reducing app binary size, improving type safety, and removing two third-party dependencies entirely.",
      codeHint: "swift",
      codeSnippet: `// Before: Alamofire + ObjectMapper (third-party, untyped)
AF.request(endpoint).responseObject { (response: DataResponse<UserDTO>) in ... }

// After: native URLSession/Codable (zero dependencies, type-safe)
func fetch<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
    let (data, _) = try await URLSession.shared.data(for: endpoint.urlRequest())
    return try JSONDecoder().decode(T.self, from: data)
}`,
    },
  },

  {
    id: "osonx",
    name: "OsonX Crypto Wallet",
    tagline: "Crypto for the Central Asian market",
    category: "Crypto",
    platform: "iOS",
    employer: "OSON",
    period: "Oct 2025 – Feb 2026",
    role: "Engineer",
    accentColor: "#F7931A",
    landingUrl: "https://osonx.com/",
    storeNote: "App Store submission in progress",
    notPublished: true,
    description:
      "OsonX is a cryptocurrency wallet built for the Oson ecosystem. Handles crypto asset management, exchange, and secure transactions. Worked on core feature development alongside a full architecture and performance audit.",
    features: [
      "Crypto asset management and exchange",
      "Architecture design with Team Lead",
      "Simultaneous refresh-token race condition fix",
      "Redundant network call elimination",
      "Memory leak audit and resolution",
    ],
    techStack: ["Swift", "SwiftUI", "Combine", "URLSession", "Keychain", "MVVM"],
    hardPart: {
      title: "Token refresh race condition",
      story:
        "Multiple concurrent API requests were each independently triggering a token refresh when the access token expired, causing cascading 401 errors and corrupted auth state. Fixed by implementing a serial DispatchQueue-based token refresh gate — in-flight requests are suspended, a single refresh executes, then all queued requests replay with the new token.",
      codeHint: "swift",
      codeSnippet: `// Serial token refresh queue — prevents concurrent refresh races
private let refreshQueue = DispatchQueue(label: "token.refresh")
private var isRefreshing = false
private var pendingRequests: [(Result<String, Error>) -> Void] = []

func validToken() async throws -> String {
    try await withCheckedThrowingContinuation { continuation in
        refreshQueue.async {
            guard self.isRefreshing else {
                self.isRefreshing = true
                Task { await self.performRefresh() }
                return
            }
            self.pendingRequests.append { result in
                continuation.resume(with: result)
            }
        }
    }
}`,
    },
  },

  // ─────────────────────────────────────────
  // MIMSOFT / LACAFE  (Mar 2024 – Feb 2026)
  // ─────────────────────────────────────────

  {
    id: "pilot-eld",
    name: "Pilot ELD",
    tagline: "FMCSA-compliant logging for US truck drivers",
    category: "Logistics",
    platform: "iOS",
    employer: "Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#FF9F0A",
    appStoreUrl: "https://apps.apple.com/uz/app/pilot-eld/id6502953800",
    description:
      "Pilot ELD is a US-market Electronic Logging Device app built from scratch for FMCSA compliance. Truck drivers use it to track Hours of Service, connect to hardware trackers via Bluetooth, and log driving activity — even offline.",
    features: [
      "Built from scratch to App Store in SwiftUI",
      "Core Bluetooth: PT30 and iOSX ELD hardware SDK integration",
      "Real-time telemetry: speed, fuel, odometer via BLE",
      "Offline-first: Core Data storage with sync on reconnect",
      "Swift Charts: driver activity HOS timeline visualization",
      "Critical Alerts entitlement — successfully approved by App Store review",
      "Multiple white-label build configurations and schemes",
      "MVVM + Coordinator architecture",
    ],
    techStack: [
      "Swift", "SwiftUI", "Core Bluetooth", "Core Data",
      "Swift Charts", "MVVM+C", "Fastlane", "GitLab CI",
    ],
    hardPart: {
      title: "Critical Alerts + BLE state machine",
      story:
        "Getting Critical Alerts approved required detailed documentation of the driver safety use case and a custom entitlement request — most apps are rejected. Separately, maintaining reliable BLE connectivity with PT30/iOSX hardware across background transitions required a precise state machine: scanning → connecting → connected → disconnected, with exponential backoff reconnection and graceful degradation when the device goes out of range during a drive.",
      codeHint: "swift",
      codeSnippet: `enum BLEState {
    case idle, scanning, connecting
    case connected(peripheral: CBPeripheral)
    case disconnected(reason: Error?)
}

// Exponential backoff reconnection on disconnect
func scheduleReconnect(to peripheral: CBPeripheral, attempt: Int = 0) {
    let delay = min(pow(2.0, Double(attempt)), 30.0) // max 30s
    DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
        self.centralManager.connect(peripheral, options: nil)
    }
}`,
    },
  },

  {
    id: "blue-star-driver",
    name: "Blue Star Driver",
    tagline: "Fleet management for commercial drivers",
    category: "Logistics",
    platform: "iOS",
    employer: "Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#5AC8FA",
    appStoreUrl: "https://apps.apple.com/us/app/blue-star-driver/id6448058506",
    description:
      "Blue Star Driver is a fleet management app for commercial drivers. Real-time device connectivity, driver activity tracking, and HOS management — optimized for both iPhone and iPad form factors.",
    features: [
      "Real-time BLE device connectivity",
      "Driver HOS and activity tracking",
      "iOS and iPadOS adaptive layout",
      "Offline data persistence",
    ],
    techStack: ["Swift", "SwiftUI", "UIKit", "Core Bluetooth", "Realm", "MVVM+C"],
    hardPart: {
      title: "Adaptive iOS + iPadOS layout",
      story:
        "Designing a layout that worked optimally across iPhone and iPad required adaptive size class handling — the iPad needed a master-detail split view for dispatch efficiency while iPhone needed a streamlined single-column flow. Used UISplitViewController with custom collapse/expand behavior and size class observers to switch layouts without duplicating view code.",
    },
  },

  {
    id: "lacourier",
    name: "LaCourier",
    tagline: "Courier delivery for the laCafe platform",
    category: "Logistics",
    platform: "iOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#34C759",
    appStoreUrl: "https://apps.apple.com/uz/app/lacourier/id6692617486",
    description:
      "LaCourier is the courier-facing delivery app in the laCafe restaurant ecosystem. Built in UIKit with a modular architecture — the SPM packages developed here became the shared infrastructure for all subsequent laCafe apps.",
    features: [
      "Real-time order queue and delivery management",
      "MapKit-based route and navigation",
      "Reusable SPM packages: networking, UI components, services",
      "Shared infrastructure reused across 6+ laCafe apps",
      "CI/CD with Fastlane + GitLab CI",
    ],
    techStack: ["Swift", "UIKit", "MapKit", "SPM", "MVVM+C", "Fastlane", "GitLab CI"],
    hardPart: {
      title: "Modular Domain + UI layer architecture",
      story:
        "Designed a modular SPM workspace with strict Domain and UI layer separation. The Domain layer has zero UIKit imports and is independently testable — making the architecture scalable across iOS, iPadOS, and watchOS targets. Optimized reusable packages for networking, UI components, and services that every subsequent laCafe app consumed, cutting per-app bootstrap time and enforcing consistency across the entire product line.",
    },
  },

  {
    id: "lacollector",
    name: "LaCollector",
    tagline: "Restaurant ops — order and courier management",
    category: "F&B Ops",
    platform: "iOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#FF6B35",
    appStoreUrl: "https://apps.apple.com/app/lacollector/id6738957521",
    description:
      "LaCollector is the internal operations app for restaurant staff. Staff use it to manage incoming orders, assign couriers, update delivery statuses, and track the full order lifecycle — from kitchen to doorstep.",
    features: [
      "Order creation, management, and status tracking",
      "Courier assignment and dispatch",
      "Real-time order lifecycle dashboard",
      "UI and Domain layer separation using frameworks",
      "Built from scratch including architecture and infrastructure",
      "Full Fastlane + GitLab CI/CD deployment automation",
    ],
    techStack: ["Swift", "UIKit", "MVVM+C", "SPM", "Fastlane", "GitLab CI"],
    hardPart: {
      title: "UI / Domain layer separation",
      story:
        "Architected LaCollector with strict Domain and UI layer separation via SPM frameworks — the Domain layer has zero UIKit imports, enabling reuse across iOS, iPadOS, and watchOS. Business logic is independently testable and shared across other laCafe apps, while the UI layer can be iterated without touching core order management logic.",
    },
  },

  {
    id: "hesap",
    name: "HESAP",
    tagline: "Legally binding leasing contracts, signed on iPhone",
    category: "LegalTech",
    platform: "iOS",
    employer: "Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#BF5AF2",
    appStoreUrl: "https://apps.apple.com/us/app/hesap/id6444673015",
    description:
      "HESAP is a LegalTech app where buyers and sellers create, review, and digitally sign leasing contracts for goods. Both parties sign from their devices and the resulting document is legally valid as a notarial-grade record — removing the need for a physical notary for standard leasing transactions.",
    features: [
      "Contract creation: buyer and seller details, item, leasing terms",
      "Digital signature flow for both parties",
      "Notarial-grade document output",
      "MyID national digital identity integration",
      "Phone number verification",
      "Secure document storage and retrieval",
    ],
    techStack: ["Swift", "UIKit", "SwiftUI", "REST APIs", "MyID SDK", "MVVM"],
    hardPart: {
      title: "MyID national ID integration",
      story:
        "Integrating with MyID — Uzbekistan's national digital identity infrastructure — required navigating sparse documentation and handling a multi-step verification flow with strict state management. The UX challenge was equally important: guiding non-technical users through a legally binding signing process without confusion, requiring careful screen-by-screen flow design with clear progress indicators and error recovery paths.",
    },
  },

  {
    id: "6sekund",
    name: "6Sekund",
    tagline: "Car wash loyalty, payments, and cashback",
    category: "Car Wash",
    platform: "iOS + Android (KMP)",
    employer: "Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Head of Mobile",
    accentColor: "#FF2D55",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.sixsecond",
    storeNote: "iOS — coming soon",
    description:
      "6Sekund is a loyalty and payments app for a car wash chain. Customers pay in-place, earn cashback, and track their loyalty rewards. Built with Kotlin Multiplatform — sharing business logic and UI across iOS and Android from a single codebase.",
    features: [
      "In-place payment at car wash terminals",
      "Cashback and loyalty rewards system",
      "Transaction history and balance tracking",
      "KMP: shared business logic and Compose Multiplatform UI",
      "iOS and Android from a single codebase",
    ],
    techStack: ["Kotlin Multiplatform", "Compose Multiplatform", "KMP", "MVI", "Ktor"],
    hardPart: {
      title: "Head of Mobile — not just engineering",
      story:
        "On 6Sekund the role was technical leadership rather than hands-on development: writing technical requirements, conducting code reviews across iOS and Android, managing developer tasks, and ensuring the KMP architecture decisions scaled correctly. The key challenge was establishing code review standards that worked across two platform teams with different idioms — Swift engineers and Kotlin engineers — reviewing shared multiplatform code.",
    },
  },

  // ─────────────────────────────────────────
  // LACAFE WHITE-LABEL ECOSYSTEM
  // Single codebase · separate schemes · backend-driven UI
  // ─────────────────────────────────────────

  {
    id: "gumma-xonim",
    name: "Gumma Xonim",
    tagline: "Food ordering for a restaurant chain",
    category: "F&B",
    platform: "iOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#FF375F",
    appStoreUrl: "https://apps.apple.com/uz/app/gumma-xonim/id6752656879",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Gumma Xonim is a food ordering client app for a chain of restaurants. Customers browse the menu, place orders, and track delivery status. Part of the laCafe white-label ecosystem — one codebase, per-brand build configuration.",
    features: [
      "Menu browsing with categories and item detail",
      "Cart and order placement",
      "Real-time order status tracking",
      "Push notifications via Firebase",
      "Backend-driven UI configuration per brand",
    ],
    techStack: ["Swift", "UIKit", "MVVM+C", "SPM", "Firebase", "REST APIs"],
    hardPart: {
      title: "Backend-driven UI per brand",
      story:
        "All six white-label apps share one codebase. Brand-specific colors, typography, copy, and feature flags are delivered from the backend at launch — no rebuild required to white-label for a new restaurant. The challenge was designing a configuration schema flexible enough to cover all current brands while remaining strict enough to prevent invalid states from crashing the UI.",
    },
  },

  {
    id: "strawberry-house",
    name: "Strawberry House",
    tagline: "Order strawberries, sweets & gifts online",
    category: "E-Commerce",
    platform: "iOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#FF6B9D",
    appStoreUrl:
      "https://apps.apple.com/uz/app/strawberry-house/id6738417501",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Strawberry House is an e-commerce app for ordering fresh strawberries, sweets, and gift presents for delivery. Built on the laCafe white-label platform with a custom brand configuration.",
    features: [
      "Product catalog: strawberries, sweets, gift sets",
      "Gift wrapping and present add-ons",
      "Delivery scheduling",
      "Order history and reorder",
    ],
    techStack: ["Swift", "UIKit", "MVVM+C", "SPM", "Firebase", "REST APIs"],
    hardPart: {
      title: "White-label from day one",
      story:
        "Strawberry House was one of the first apps to consume the laCafe white-label infrastructure after it was established in LaCourier. The work here was validating that the backend-driven configuration system was robust enough to support a non-restaurant e-commerce product — requiring extensions to the product catalog schema and gift/add-on logic not present in the original restaurant design.",
    },
  },

  {
    id: "yewoo",
    name: "Yewoo",
    tagline: "Fast food ordering with real-time tracking",
    category: "F&B",
    platform: "iOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#64D2FF",
    appStoreUrl: "https://apps.apple.com/uz/app/yewoo/id6444675348",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Yewoo is a fast food ordering and order tracking app. Customers order from the menu, pay in-app, and watch their order status update in real time from preparation through to delivery.",
    features: [
      "Fast food menu with category filtering",
      "In-app ordering and payment",
      "Real-time order status tracking",
      "Live courier location tracking",
      "Order history",
    ],
    techStack: ["Swift", "UIKit", "MVVM+C", "SPM", "WebSockets", "MapKit", "Firebase"],
    hardPart: {
      title: "Real-time order status via WebSockets",
      story:
        "Order tracking requires live status updates — polling was too slow and battery-heavy. Implemented a WebSocket connection that pushes status changes (accepted → preparing → ready → picked up → delivered) instantly to the client. The challenge was WebSocket reconnection handling during network transitions: implemented exponential backoff with connection state UI feedback so customers always knew whether their live tracking was active or reconnecting.",
    },
  },

  {
    id: "trend-bakery",
    name: "Trend Bakery",
    tagline: "Artisan bakery — order online",
    category: "F&B",
    platform: "iOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#FFCC00",
    appStoreUrl: "https://apps.apple.com/uz/app/trend-bakery/id6740473612",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Trend Bakery is a brand app for an artisan bakery chain. Customers browse the full product catalog, pre-order items, and schedule pickup or delivery.",
    features: [
      "Product catalog with rich media",
      "Pre-order and delivery scheduling",
      "Order history and reorder",
      "Push notifications for order status",
    ],
    techStack: ["Swift", "UIKit", "MVVM+C", "SPM", "Firebase", "REST APIs"],
    hardPart: {
      title: "Offline catalog with ETag cache validation",
      story:
        "Bakery menus change daily — but customers expect instant load. Implemented URLCache with ETag-based validation: the catalog loads instantly from disk cache, then silently revalidates against the server. If the ETag matches (menu unchanged), zero data is transferred. If changed, only the delta is fetched. Result: sub-100ms perceived load time with always-fresh data.",
    },
  },

  {
    id: "giotto-ios",
    name: "Giotto",
    tagline: "Restaurant ordering and order tracking",
    category: "F&B",
    platform: "iOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#5856D6",
    appStoreUrl: "https://apps.apple.com/uz/app/giotto/id6743437697",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Giotto (iOS) is the client-facing ordering app for the Giotto restaurant brand. Customers browse the menu, place orders, and track their order status end to end.",
    features: [
      "Menu browsing and ordering",
      "Real-time order status tracking",
      "Order history",
      "Firebase push notifications",
    ],
    techStack: ["Swift", "UIKit", "MVVM+C", "SPM", "Firebase", "REST APIs"],
    hardPart: {
      title: "One codebase, six App Store apps",
      story:
        "Giotto iOS is the sixth app built on the laCafe white-label platform. By this point the infrastructure — SPM packages, CI/CD lanes, build configuration system, and backend-driven UI — was mature enough that spinning up a new brand required only a new xcconfig file and brand assets. The engineering story is the platform itself: six independently published App Store apps from a single, well-architected codebase.",
    },
  },

  {
    id: "giotto-ipad",
    name: "Giotto Menu",
    tagline: "Digital menu for restaurant tables",
    category: "F&B Menu",
    platform: "iPadOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#5856D6",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Giotto Menu is the iPad-only digital menu app placed on restaurant tables. Diners browse the menu with full-screen imagery and detailed item descriptions. A separate product from the Giotto iOS ordering app — same brand, different purpose and platform.",
    features: [
      "Full-screen iPad-optimized menu layout",
      "Rich media: food photography, item detail",
      "Category navigation and search",
      "Menu updated in real time from backend",
    ],
    techStack: ["Swift", "UIKit", "iPadOS", "MVVM+C", "SPM", "REST APIs"],
    hardPart: {
      title: "iPad-first layout system",
      story:
        "Unlike the iOS client apps designed for one-handed phone use, the iPad menu needed to fill a large landscape screen attractively with no scrolling required for category navigation. Designed a custom UICollectionViewCompositionalLayout with a fixed side category rail and a dynamic content area — the layout adapts to iPad Mini through iPad Pro 12.9\" without a single size class branch.",
    },
  },

  {
    id: "khanate-ipad",
    name: "Khanate Menu",
    tagline: "Digital menu — white-label flavor",
    category: "F&B Menu",
    platform: "iPadOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#8E8E93",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Khanate Menu is an iPadOS digital menu app — a white-label flavor of the laCafe menu platform, branded for the Khanate restaurant. Different visual identity, same underlying platform.",
    features: [
      "iPad-optimized full-screen menu",
      "Backend-driven brand configuration",
      "Separate build scheme and App Store submission",
    ],
    techStack: ["Swift", "UIKit", "iPadOS", "MVVM+C", "SPM"],
    hardPart: {
      title: "Multi-flavor build system",
      story:
        "Khanate, Giotto Menu, and Xorrot Menu are three separate App Store submissions from one iPad codebase. Each flavor is defined entirely by an xcconfig file: bundle ID, display name, merchant ID, asset catalog, and API environment. The EXCLUDED_SOURCE_FILE_NAMES build setting ensures brand-specific assets are compiled only for their target — zero conditional code in the app itself.",
      codeHint: "bash",
      codeSnippet: `# Khanate.xcconfig
BUILD_FLAVOUR = Khanate
BUNDLE_ID = uz.yewoo.clientApp
MERCHANT_ID = be3389b8-f468-446c-9b3b-040dcfce2681
BUILD_DEVELOPMENT_TEAM = K5TYHG23XP
EXCLUDED_SOURCE_FILE_NAMES = *Giotto*.* *Xorrot*.*
INCLUDED_SOURCE_FILE_NAMES = *Khanate*.*`,
    },
  },

  {
    id: "xorrot-ipad",
    name: "Xorrot Menu",
    tagline: "Digital menu — white-label flavor",
    category: "F&B Menu",
    platform: "iPadOS",
    employer: "laCafe / Mimsoft",
    period: "Mar 2024 – Feb 2026",
    role: "Engineer",
    accentColor: "#FF9500",
    isWhiteLabel: true,
    whiteLabelFamily: "laCafe Ecosystem",
    description:
      "Xorrot Menu is the third iPadOS digital menu app in the laCafe white-label family. Branded for the Xorrot restaurant, it shares the full platform with Giotto Menu and Khanate Menu.",
    features: [
      "iPad-optimized full-screen menu",
      "Backend-driven brand configuration",
      "Separate build scheme and App Store submission",
    ],
    techStack: ["Swift", "UIKit", "iPadOS", "MVVM+C", "SPM"],
    hardPart: {
      title: "Third flavor, near-zero marginal effort",
      story:
        "By the time Xorrot was added, the white-label platform was mature enough that a new restaurant brand required only: a new xcconfig, a new asset catalog folder, a new Fastlane lane, and a new App Store Connect record. No code changes. The investment in the multi-flavor build system paid off completely by the third app.",
    },
  },

  // ─────────────────────────────────────────
  // WELLMATE  (Aug 2022 – Feb 2024)
  // ─────────────────────────────────────────

  {
    id: "wellmate",
    name: "Wellmate",
    tagline: "AI-powered supplement recommendations",
    category: "HealthTech",
    platform: "iOS",
    employer: "Wellmate Inc.",
    period: "Aug 2022 – Feb 2024",
    role: "Engineer",
    accentColor: "#30D158",
    appStoreUrl: "https://apps.apple.com/uz/app/wellmate/id6468350840",
    description:
      "Wellmate is an AI-powered health app that gives users personalised supplement recommendations based on their health profile, goals, and habits. Built in SwiftUI by a team of 5 iOS developers using a modular SPM architecture.",
    features: [
      "AI-driven personalised supplement recommendations",
      "Modular SPM architecture — scalable and maintainable for a large codebase",
      "In-App Purchases and subscription paywall with StoreKit",
      "Cross-functional collaboration with 4 iOS devs, QA, PM, and design teams",
      "REST API integration with Async/Await",
      "MVVM + Router + UDF architecture",
      "3+ major releases delivered on schedule",
    ],
    techStack: [
      "Swift", "SwiftUI", "Combine", "Async/Await",
      "SPM", "StoreKit", "MVVM+Router", "UDF", "Bitbucket",
    ],
    hardPart: {
      title: "Modular SPM architecture at scale",
      story:
        "Designed and maintained a modular SPM architecture across a team of 4 iOS developers. Each domain — networking, UI components, analytics, and business logic — was isolated into independent packages with clear API boundaries. The challenge was coordinating package versioning and dependency graphs across the team while keeping build times fast and ensuring each module could be tested independently.",
      codeHint: "swift",
      codeSnippet: `// Package.swift — modular architecture
let package = Package(
    name: "WellmateCore",
    platforms: [.iOS(.v16)],
    products: [
        .library(name: "Networking", targets: ["Networking"]),
        .library(name: "Domain", targets: ["Domain"]),
        .library(name: "UIComponents", targets: ["UIComponents"]),
    ],
    targets: [
        .target(name: "Domain"),
        .target(name: "Networking", dependencies: ["Domain"]),
        .target(name: "UIComponents", dependencies: ["Domain"]),
        .testTarget(name: "DomainTests", dependencies: ["Domain"]),
    ]
)`,
    },
  },

  // ─────────────────────────────────────────
  // 7SABER  (contract)
  // ─────────────────────────────────────────

  {
    id: "7saber",
    name: "7Saber",
    tagline: "Online clothing marketplace across CIS",
    category: "E-Commerce",
    platform: "iOS",
    employer: "7Saber LLC",
    period: "Jan 2025 – Mar 2025",
    role: "Engineer",
    accentColor: "#AC8E68",
    appStoreUrl: "https://apps.apple.com/uz/app/7saber/id1602509447",
    description:
      "7Saber is a popular online clothing marketplace operating across Russia, Azerbaijan, Uzbekistan, and Kazakhstan. Worked on the existing production app: performance profiling, refactoring, smooth UI animations, and payment method improvements.",
    features: [
      "Multi-country clothing marketplace (RU · AZ · UZ · KZ)",
      "Performance profiling and bottleneck resolution",
      "Smooth interactive animations on key screens",
      "Payment method updates and fixes",
      "Code review and refactoring for maintainability",
      "99% crash-free rate maintained",
    ],
    techStack: ["Swift", "UIKit", "SwiftUI", "Instruments", "MVVM"],
    hardPart: {
      title: "Performance profiling on a live production app",
      story:
        "Inherited a production codebase with performance issues on key screens. Used Instruments (Time Profiler + Allocations) to identify the bottlenecks: excessive main-thread work during scroll, retained objects causing memory growth, and redundant layout passes. Resolved each without breaking the existing architecture — profiling before and after to quantify the improvement. App load time reduced by 10%.",
    },
  },
]

// ─────────────────────────────────────────
// DERIVED DATA — useful for filters and stats
// ─────────────────────────────────────────

export const categories = [
  "All",
  "HealthTech",
  "Fintech",
  "Crypto",
  "Logistics",
  "LegalTech",
  "F&B",
  "F&B Ops",
  "F&B Menu",
  "E-Commerce",
  "Car Wash",
] as const

export const stats = {
  totalApps: 20,
  iOSApps: 15,
  iPadApps: 3,           // iPadOS-only
  iOSAndiPad: 1,
  kmpApps: 1,            // iOS + Android
  liveStoreLinks: 15,
  companies: 5,          // OVI, OSON, Mimsoft/laCafe, Wellmate, 7Saber
  yearsExperience: 3,
} as const

export const appStoreLinks: Record<string, string> = {
  ovi:              "https://apps.apple.com/us/app/ovi/id6753169530",
  "ovi-pro":        "https://apps.apple.com/us/app/ovi-pro/id6759444477",
  oson:             "https://apps.apple.com/us/app/oson/id1207834182",
  "pilot-eld":      "https://apps.apple.com/uz/app/pilot-eld/id6502953800",
  "blue-star":      "https://apps.apple.com/us/app/blue-star-driver/id6448058506",
  lacourier:        "https://apps.apple.com/uz/app/lacourier/id6692617486",
  lacollector:      "https://apps.apple.com/app/lacollector/id6738957521",
  hesap:            "https://apps.apple.com/us/app/hesap/id6444673015",
  "6sekund-android":"https://play.google.com/store/apps/details?id=com.sixsecond",
  "gumma-xonim":    "https://apps.apple.com/uz/app/gumma-xonim/id6752656879",
  "strawberry-house":"https://apps.apple.com/uz/app/strawberry-house/id6738417501",
  yewoo:            "https://apps.apple.com/uz/app/yewoo/id6444675348",
  "trend-bakery":   "https://apps.apple.com/uz/app/trend-bakery/id6740473612",
  "giotto-ios":     "https://apps.apple.com/uz/app/giotto/id6743437697",
  wellmate:         "https://apps.apple.com/uz/app/wellmate/id6468350840",
  "7saber":         "https://apps.apple.com/uz/app/7saber/id1602509447",
  "osonx-landing":  "https://osonx.com/",
}
