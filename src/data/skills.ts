import { Skill } from '@/types'

export const skills: Skill[] = [
  // Languages — center cluster
  { id: 'swift', name: 'Swift', category: 'language', level: 1.0, x: 50, y: 30, connections: ['swiftui', 'uikit', 'combine', 'concurrency'] },
  { id: 'objc', name: 'Objective-C', category: 'language', level: 0.5, x: 20, y: 35, connections: ['swift', 'uikit'] },
  { id: 'kotlin', name: 'Kotlin (KMP)', category: 'language', level: 0.6, x: 82, y: 28, connections: ['swift'] },

  // Frameworks — mid layer
  { id: 'swiftui', name: 'SwiftUI', category: 'framework', level: 0.95, x: 38, y: 48, connections: ['swift', 'combine', 'widgetkit'] },
  { id: 'uikit', name: 'UIKit', category: 'framework', level: 1.0, x: 62, y: 48, connections: ['swift', 'coreanimation'] },
  { id: 'combine', name: 'Combine', category: 'framework', level: 0.9, x: 30, y: 62, connections: ['swift', 'swiftui'] },
  { id: 'concurrency', name: 'Async/Await', category: 'framework', level: 0.85, x: 68, y: 35, connections: ['swift'] },
  { id: 'coredata', name: 'Core Data', category: 'framework', level: 0.9, x: 22, y: 52, connections: ['swift'] },
  { id: 'realm', name: 'Realm', category: 'framework', level: 0.7, x: 15, y: 65, connections: ['swift'] },
  { id: 'coreanimation', name: 'Core Animation', category: 'framework', level: 0.8, x: 75, y: 55, connections: ['uikit'] },
  { id: 'widgetkit', name: 'WidgetKit', category: 'framework', level: 0.7, x: 28, y: 78, connections: ['swiftui'] },
  { id: 'healthkit', name: 'HealthKit', category: 'framework', level: 0.7, x: 72, y: 72, connections: ['swift'] },
  { id: 'corebluetooth', name: 'Core Bluetooth', category: 'framework', level: 0.85, x: 85, y: 50, connections: ['swift'] },
  { id: 'mapkit', name: 'MapKit', category: 'framework', level: 0.75, x: 88, y: 68, connections: ['swift'] },
  { id: 'avkit', name: 'AVKit', category: 'framework', level: 0.7, x: 10, y: 48, connections: ['swift'] },

  // Architecture — top layer
  { id: 'mvvm', name: 'MVVM', category: 'architecture', level: 0.95, x: 40, y: 14, connections: ['mvvmc', 'udf'] },
  { id: 'mvvmc', name: 'MVVM+C', category: 'architecture', level: 0.9, x: 52, y: 8, connections: ['mvvm', 'clean'] },
  { id: 'clean', name: 'Clean Architecture', category: 'architecture', level: 0.9, x: 64, y: 14, connections: ['mvvmc', 'di'] },
  { id: 'udf', name: 'UDF', category: 'architecture', level: 0.8, x: 30, y: 8, connections: ['mvvm'] },
  { id: 'di', name: 'Resolver (DI)', category: 'architecture', level: 0.85, x: 76, y: 18, connections: ['clean'] },

  // Tools — bottom layer
  { id: 'xcode', name: 'Xcode', category: 'tool', level: 1.0, x: 50, y: 88, connections: ['instruments', 'xctest'] },
  { id: 'instruments', name: 'Instruments', category: 'tool', level: 0.85, x: 38, y: 94, connections: ['xcode'] },
  { id: 'xctest', name: 'XCTest', category: 'tool', level: 0.8, x: 62, y: 94, connections: ['xcode'] },
  { id: 'fastlane', name: 'Fastlane', category: 'tool', level: 0.8, x: 14, y: 82, connections: ['cicd'] },
  { id: 'cicd', name: 'GitLab CI', category: 'tool', level: 0.8, x: 8, y: 72, connections: ['fastlane'] },
  { id: 'git', name: 'Git', category: 'tool', level: 0.9, x: 90, y: 82, connections: [] },

  // Platforms
  { id: 'ios', name: 'iOS', category: 'platform', level: 1.0, x: 50, y: 70, connections: ['swift', 'swiftui', 'uikit', 'xcode'] },
  { id: 'ipados', name: 'iPadOS', category: 'platform', level: 0.8, x: 10, y: 35, connections: ['swiftui'] },
]
