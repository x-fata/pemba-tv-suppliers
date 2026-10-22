import { useMemo, useState } from 'react'
import './App.css'

const PHONE_PRIMARY = '255718936042'
const PHONE_SECONDARY = '255776113187'

const categories = [
  { name: 'All Products', icon: '▦', description: 'Explore our catalogue' },
  { name: 'Televisions', icon: '▣', description: 'Entertainment at home' },
  { name: 'Decoders', icon: '▤', description: 'Digital TV receivers' },
  { name: 'Remotes', icon: '⌘', description: 'Control your devices' },
  { name: 'Accessories', icon: '◈', description: 'Essential TV accessories' },
]

// Add product photos to src/assets/products/<category>/.
// Vite discovers supported image files automatically at build time.
const productImages = import.meta.glob(
  './assets/products/*/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true, query: '?url', import: 'default' },
)

const categoryNames = {
  televisions: 'Televisions',
  decoders: 'Decoders',
  remotes: 'Remotes',
  accessories: 'Accessories',
}

const products = Object.entries(productImages).map(([path, image], index) => {
  const parts = path.split('/')
  const folder = (parts.at(-2) || '').toLowerCase()
  const filename = (parts.at(-1) || 'Product').replace(/\.[^.]+$/, '')
  const name = filename
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

  return {
    id: index + 1,
    name,
    category: categoryNames[folder] || 'Accessories',
    description: `Ask us about ${name}, availability and price.`,
    image,
    badge: 'PRODUCT',
  }
})


const navigation = [
  { label: 'Overview', icon: '⌂', href: '#home' },
  { label: 'Our Products', icon: '▦', href: '#products' },
  { label: 'Categories', icon: '◫', href: '#categories' },
  { label: 'About Us', icon: '◉', href: '#about' },
  { label: 'Contact', icon: '✉', href: '#contact' },
]

function WhatsAppLink({ children, message, className = '' }) {
  const url = `https://wa.me/${PHONE_PRIMARY}?text=${encodeURIComponent(message)}`

  return (
    <a
      className={className}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="Pemba TV Suppliers">
      <img
        className="brand-mark-image"
        src="/images/brand-logo.jpeg"
        alt="Miki Investment logo"
      />
    </span>
  )
}

function Sidebar({ activeSection, onNavigate, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#home" onClick={onClose}>
          <BrandMark />

          <span className="brand-copy">
            <strong>PEMBA TV</strong>
            <span>SUPPLIERS</span>
          </span>
        </a>

        <div className="sidebar-label">MAIN MENU</div>

        <nav className="side-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                onNavigate(item.label)
                onClose()
              }}
              className={`side-link ${activeSection === item.label ? 'side-link-active' : ''
                }`}
            >
              <span className="side-link-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>

              {item.label === 'Our Products' && (
                <span className="side-link-arrow">↗</span>
              )}
            </a>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-help">
          <div className="help-icon">✦</div>
          <h3>Need assistance?</h3>
          <p>Talk to our team about our products and availability.</p>

          <WhatsAppLink
            className="help-button"
            message="Hello Pemba TV Suppliers. I would like to enquire about your products."
          >
            Chat with us <span>↗</span>
          </WhatsAppLink>
        </div>

        <div className="sidebar-bottom">
          <span className="status-dot" />
          Serving customers in Pemba
        </div>
      </aside>
    </>
  )
}

function Header({ onMenuClick, search, setSearch }) {
  return (
    <header className="topbar">
      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        ☰
      </button>

      <div className="breadcrumb">
        <span>Home</span>
        <span className="breadcrumb-divider">/</span>
        <strong>Overview</strong>
      </div>

      <div className="topbar-actions">
        <label className="header-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>

        <a
          className="header-contact"
          href={`https://wa.me/${PHONE_PRIMARY}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>↗</span>
          <span>Get in touch</span>
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-grid-pattern" />

      <div className="hero-content">
        <div className="eyebrow hero-eyebrow">
          <span className="eyebrow-line" />
          YOUR LOCAL ELECTRONICS SUPPLIER
        </div>

        <h1 className="hero-title-business">
          Pemba TV
          <br />
          <span>Suppliers</span>
        </h1>
        <p className="hero-owner-line">Kwa Fundi Miki — Wete</p>

        <p className="hero-description">
          Tunapatikana Wete, Pemba. Wasiliana nasi kuulizia televisheni,
          decoder, rimoti na vifaa vingine vya TV.
        </p>

        <div className="hero-actions">
          <a href="#products" className="button button-primary">
            Explore products <span>↗</span>
          </a>

          <a href="#contact" className="button button-outline">
            Contact our team
          </a>
        </div>

        <div className="hero-trust">
          <div className="trust-icon">✓</div>
          <span>
            Your local supplier
            <strong>Kipangani, Wete, Pemba</strong>
          </span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-glow" />

        <div className="hero-image-frame">
          <img
            src="/images/pemba-tv-suppliers-hero.jpeg"
            alt="Pemba TV Suppliers team member presenting a Hisense television in Pemba"
          />

          <div className="image-corner image-corner-top" />
          <div className="image-corner image-corner-bottom" />
        </div>

        <div className="hero-floating-card">
          <span className="floating-card-icon">▣</span>
          <span>
            <strong>Entertainment essentials</strong>
            <small>Explore our product range</small>
          </span>
          <span className="floating-arrow">↗</span>
        </div>

        <div className="hero-index">01 <span>/</span> 04</div>
        <div className="hero-vertical-text">PEMBA · WETE · TANZANIA</div>
      </div>

      <div className="hero-bottom-line">
        <span>QUALITY PRODUCTS</span>
        <span className="hero-bottom-dash" />
        <span>PERSONAL SERVICE</span>
        <span className="hero-bottom-dash" />
        <span>LOCAL SUPPORT</span>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span className="eyebrow-line" />
          {eyebrow}
        </div>

        <h2>{title}</h2>

        {description && <p>{description}</p>}
      </div>

      {action}
    </div>
  )
}

function CategorySection({ selectedCategory, setSelectedCategory }) {
  return (
    <section className="content-section category-section" id="categories">
      <SectionHeading
        eyebrow="BROWSE OUR RANGE"
        title="Shop by category"
        description="Find the products and accessories you need."
      />

      <div className="category-grid">
        {categories.slice(1).map((category, index) => (
          <button
            className={`category-card ${selectedCategory === category.name ? 'category-card-active' : ''
              }`}
            key={category.name}
            onClick={() => {
              setSelectedCategory(category.name)

              document
                .getElementById('products')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className={`category-icon category-icon-${index + 1}`}>
              {category.icon}
            </span>

            <span className="category-copy">
              <strong>{category.name}</strong>
              <small>{category.description}</small>
            </span>

            <span className="category-arrow">↗</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <span className="product-badge">{product.badge}</span>

        <span className="product-image-number">
          #{String(product.id).padStart(2, '0')}
        </span>
      </div>

      <div className="product-card-body">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <WhatsAppLink
          className="product-enquire"
          message={`Hello Pemba TV Suppliers. I would like to enquire about ${product.name}. Please share availability and price information.`}
        >
          Enquire about product <span>↗</span>
        </WhatsAppLink>
      </div>
    </article>
  )
}

function ProductsSection({
  products: visibleProducts,
  searchTerm = '',
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <section className="content-section products-section" id="products">
      <SectionHeading
        eyebrow="OUR PRODUCT COLLECTION"
        title="Find your next essential"
        description="Explore our range of electronics and accessories."
        action={
          <a className="text-link" href="#contact">
            Ask about availability <span>↗</span>
          </a>
        }
      />

      <div className="product-filters" aria-label="Filter products">
        <button
          className={selectedCategory === 'All Products' ? 'filter-active' : ''}
          onClick={() => setSelectedCategory('All Products')}
        >
          All products
        </button>

        {categories.slice(1).map((category) => (
          <button
            key={category.name}
            className={
              selectedCategory === category.name ? 'filter-active' : ''
            }
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>⌕</span>
          <h3>{visibleProducts.length === 0 && !searchTerm.trim() && selectedCategory === 'All Products' ? 'Product photos coming soon' : 'No matching products found'}</h3>
          <p>{visibleProducts.length === 0 && !searchTerm.trim() && selectedCategory === 'All Products' ? 'Add your real product photos to src/assets/products/televisions, decoders, remotes or accessories.' : 'Try another search or select a different category.'}</p>

          <button
            className="button button-primary"
            onClick={() => setSelectedCategory('All Products')}
          >
            View all products
          </button>
        </div>
      )}

      <p className="catalogue-note">
        Contact us to confirm product specifications, availability and prices.
      </p>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-decoration" />

      <div className="about-main">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          GET TO KNOW US
        </div>

        <h2>
          Your local connection
          <br />
          to <span>entertainment.</span>
        </h2>

        <p>
          Pemba TV Suppliers is an electronics supplier based in Kipangani,
          Wete, Pemba. We provide a point of contact for customers looking
          for televisions, decoders, remote controls and related accessories.
        </p>

        <p>
          Contact our team to enquire about products, availability and
          pricing.
        </p>

        <a href="#contact" className="button button-light">
          Learn more about us <span>↗</span>
        </a>
      </div>

      <div className="about-facts">
        <div className="about-fact">
          <span className="fact-number">01</span>
          <div>
            <strong>Local presence</strong>
            <p>Based in Kipangani, Wete, Pemba.</p>
          </div>
        </div>

        <div className="about-fact">
          <span className="fact-number">02</span>
          <div>
            <strong>Product enquiries</strong>
            <p>Ask our team about available products.</p>
          </div>
        </div>

        <div className="about-fact">
          <span className="fact-number">03</span>
          <div>
            <strong>Direct communication</strong>
            <p>Reach us by telephone or WhatsApp.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="content-section contact-section" id="contact">
      <div className="contact-panel">
        <div className="contact-main">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            WE ARE HERE TO HELP
          </div>

          <h2>
            Have a product
            <br />
            <span>in mind?</span>
          </h2>

          <p>
            Contact Pemba TV Suppliers to ask about our products,
            specifications, availability and prices.
          </p>

          <WhatsAppLink
            className="button button-primary"
            message="Hello Pemba TV Suppliers. I would like to enquire about your products."
          >
            Start a WhatsApp enquiry <span>↗</span>
          </WhatsAppLink>
        </div>

        <div className="contact-details">
          <div className="contact-detail">
            <span className="contact-detail-icon">⌖</span>
            <div>
              <small>VISIT OUR LOCATION</small>
              <strong>Kipangani, Wete, Pemba</strong>
              <p>Opposite White House</p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">☎</span>
            <div>
              <small>CALL US</small>
              <a href="tel:+255718936042">+255 718 936 042</a>
              <a href={`tel:+${PHONE_SECONDARY}`}>+255 776 113 187</a>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">◷</span>
            <div>
              <small>BUSINESS ESTABLISHED</small>
              <strong>2025</strong>
              <p>Serving customers in Pemba</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-brand" href="#home">
        <BrandMark />

        <span>
          <strong>PEMBA TV SUPPLIERS</strong>
          <small>Electronics &amp; accessories</small>
        </span>
      </a>

      <p>
        © {new Date().getFullYear()} Pemba TV Suppliers.
        All rights reserved.
      </p>

      <a className="back-to-top" href="#home">
        Back to top ↑
      </a>
    </footer>
  )
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Overview')

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All Products' ||
        product.category === selectedCategory

      const matchesSearch =
        !normalizedSearch ||
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, search])

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="main-content">
        <Header
          onMenuClick={() => setMobileOpen(true)}
          search={search}
          setSearch={setSearch}
        />

        <Hero />

        <div className="main-inner">
          <CategorySection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <ProductsSection
            products={visibleProducts}
            searchTerm={search}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <AboutSection />

          <ContactSection />
        </div>

        <Footer />
      </main>

      <WhatsAppLink
        className="floating-whatsapp"
        message="Hello Pemba TV Suppliers. I would like to enquire about your products."
      >
        <span className="floating-whatsapp-icon" aria-hidden="true">◉</span>
        <span className="floating-whatsapp-label">Chat on WhatsApp</span>
      </WhatsAppLink>
    </div>
  )
}

export default App
