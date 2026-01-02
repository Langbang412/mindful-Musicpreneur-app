import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4">
              The Mindful Musicpreneur<sup className="text-xs">®</sup>
            </h3>
            <p className="text-gray-300 text-sm">
              The 360° system for female musicians to build careers that don't burn their brains to the ground.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products/guide" className="text-gray-300 hover:text-brand-yellow transition">The Guide</Link></li>
              <li><Link href="/products/planner" className="text-gray-300 hover:text-brand-yellow transition">The Planner</Link></li>
              <li><Link href="/products/bogo" className="text-gray-300 hover:text-brand-yellow transition">BOGO</Link></li>
              <li><Link href="/freebie" className="text-gray-300 hover:text-brand-yellow transition">Free Resource</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/collective" className="text-gray-300 hover:text-brand-yellow transition">The Collective</Link></li>
              <li><a href="https://themindfulmusicpreneur.substack.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-yellow transition">Substack</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-gray-300 hover:text-brand-yellow transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-brand-yellow transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Mindful Musicpreneur®. All rights reserved.</p>
          <p className="mt-2">Created with ♥ for female+ musicians everywhere.</p>
        </div>
      </div>
    </footer>
  )
}
