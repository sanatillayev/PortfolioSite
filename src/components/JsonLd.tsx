export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bilol Sanatillaev',
    url: 'https://sanatillayev.com',
    email: 'sanatillayevbilol@gmail.com',
    jobTitle: 'iOS Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'OVI Uzbekistan',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Turin Polytechnic University in Tashkent',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Politecnico di Torino',
      },
    ],
    knowsAbout: [
      'iOS Development',
      'Swift',
      'SwiftUI',
      'UIKit',
      'Clean Architecture',
      'Core Bluetooth',
      'Mobile App Development',
      'Kotlin Multiplatform',
    ],
    sameAs: [
      'https://www.linkedin.com/in/sanatillayev/',
      'https://github.com/sanatillayev',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bilol Sanatillaev — iOS Engineer',
    url: 'https://sanatillayev.com',
    description:
      'Portfolio of Bilol Sanatillaev, iOS Engineer with 10+ shipped apps across fintech, crypto, healthtech, logistics, and F&B.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
