import { useState, useEffect, useRef } from 'react';
import SignIn from './pages/signIn/signin.tsx';
import ProductListing from './pages/productListing/productListing.tsx';
import './App.css';

// Generate 100 dummy listings
const dummyListings = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: [
        'Vintage Sneakers', 'Gaming Laptop', 'Apartment Rental', 'Smartphone',
        'Designer Handbag', 'Mountain Bike', 'Coffee Table', 'Headphones',
        'Office Chair', 'Camera Lens'
    ][index % 10],
    image : ['/assests/react.svg'],
    price: `$${Math.floor(50 + Math.random() * 2000)}`,
    location: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco',
        'Boston', 'Seattle', 'Austin', 'Denver', 'Portland'][index % 10],
}));

// Categories for "All Categories" section
const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home & Garden', icon: '🏡' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' },
    { name: 'Vehicles', icon: '🚗' },
];

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isProductListingOpen, setIsProductListingOpen] = useState(false);
    const searchBarRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (searchBarRef.current && headerRef.current) {
                const { top } = searchBarRef.current.getBoundingClientRect();
                const headerHeight = headerRef.current.offsetHeight;
                const scrollPosition = window.scrollY;
                if (scrollPosition <= 50) {
                    setIsSticky(false);
                } else {
                    setIsSticky(top <= headerHeight);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="container">
            {/* Fixed Header */}
            <div className="fixed-header" ref={headerRef}>
                <div className="header-content">
                    <div className="logo">
                        <span>Logo</span>
                    </div>
                    <div className="header-center">
                        <div className={`search-bar ${isSticky ? 'sticky' : 'hidden'}`}>
                            <input
                                type="text"
                                placeholder="I want to ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="search-select"
                            >
                                <option value="">Category ▼</option>
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                                <option value="rent">Rent</option>
                            </select>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="search-select"
                            >
                                <option value="">Location ▼</option>
                                <option value="new-york">New York</option>
                                <option value="los-angeles">Los Angeles</option>
                                <option value="chicago">Chicago</option>
                            </select>
                            <button className="search-button">🔍</button>
                        </div>
                        <div className={`categories-section sticky ${isSticky ? '' : 'hidden'}`}>
                            <div className="categories-grid">
                                {categories.map((cat) => (
                                    <div key={cat.name} className="category-item">
                                        <span className="category-label">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="cta-buttons">
                        <button
                            className="cta-button post-listing"
                            onClick={() => setIsProductListingOpen(true)}
                        >
                            Post a Listing
                        </button>
                        <button
                            className="cta-button sign-in"
                            onClick={() => setIsSignInOpen(true)}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>

            {/* Sign In Modal */}
            {isSignInOpen && <SignIn onClose={() => setIsSignInOpen(false)} />}

            {/* Product Listing Modal */}
            {isProductListingOpen && (
                <ProductListing onClose={() => setIsProductListingOpen(false)} />
            )}

            {/* Tagline */}
            <p className="tagline">
                Buy. Sell. Rent. Seamlessly.
            </p>

            {/* Headline */}
            <h1 className="headline">
                Everything You Need, Just a Click Away
            </h1>

            {/* Search Bar (below headline when not sticky) */}
            <div className={`search-bar ${isSticky ? 'hidden' : ''}`} ref={searchBarRef}>
                <input
                    type="text"
                    placeholder="I want to ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="search-select"
                >
                    <option value="">Category ▼</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                    <option value="rent">Rent</option>
                </select>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="search-select"
                >
                    <option value="">Location ▼</option>
                    <option value="new-york">New York</option>
                    <option value="los-angeles">Los Angeles</option>
                    <option value="chicago">Chicago</option>
                </select>
                <button className="search-button">🔍</button>
            </div>

            {/* All Categories Section */}
            <div className={`categories-section ${isSticky ? 'hidden' : ''}`}>
                <h2 className="categories-title">All Categories</h2>
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <div key={cat.name} className="category-item">
                            <span className="category-icon">{cat.icon}</span>
                            <span className="category-label">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Listings Grid */}
            <div className="listings-grid">
                {dummyListings.map((listing) => (
                    <div key={listing.id} className="listing-card">
                        <h2 className="card-title">{listing.title}</h2>
                        <p className="card-price">{listing.price}</p>
                        <p className="card-location">{listing.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;