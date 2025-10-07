import { useState, useEffect, useRef } from 'react';
import SignIn from './pages/signIn/signin.tsx';
import ProductListing from './pages/productListing/productListing.tsx';
import './App.css';

// Categories for filters
const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home & Garden', icon: '🏡' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' },
    { name: 'Vehicles', icon: '🚗' },
];

// Locations for filters
const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Boston', 'Seattle', 'Austin', 'Denver', 'Portland'];

// Generate 100 dummy listings with images, categories, ratings, actions
const dummyListings = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: [
        'Vintage Sneakers', 'Gaming Laptop', 'Apartment Rental', 'Smartphone',
        'Designer Handbag', 'Mountain Bike', 'Coffee Table', 'Headphones',
        'Office Chair', 'Camera Lens'
    ][index % 10],
    image: `https://picsum.photos/300/200?random=${index + 1}`,
    price: `$${Math.floor(50 + Math.random() * 2000)}`,
    location: locations[index % 10],
    category: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Vehicles'][Math.floor(index % 6)],
    rating: Math.random() * 5,
    isNew: index < 10,
    action: ['buy', 'sell', 'rent'][index % 3],
}));

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isProductListingOpen, setIsProductListingOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [action, setAction] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [sortBy, setSortBy] = useState('');
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

    const applyFilters = (listing) => {
        if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (location && listing.location !== location) return false;
        if (action && listing.action !== action) return false;
        if (selectedCategory && listing.category !== selectedCategory) return false;
        const priceNum = parseInt(listing.price.slice(1));
        if (minPrice && priceNum < parseInt(minPrice)) return false;
        if (maxPrice && priceNum > parseInt(maxPrice)) return false;
        if (minRating && listing.rating < parseInt(minRating)) return false;
        return true;
    };

    const applySort = (listings) => {
        let sorted = [...listings];
        if (sortBy === 'price_asc') {
            sorted.sort((a, b) => parseInt(a.price.slice(1)) - parseInt(b.price.slice(1)));
        } else if (sortBy === 'price_desc') {
            sorted.sort((a, b) => parseInt(b.price.slice(1)) - parseInt(a.price.slice(1)));
        } else if (sortBy === 'rating_desc') {
            sorted.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'newest') {
            sorted.sort((a, b) => b.id - a.id);
        }
        return sorted;
    };

    const isFiltered = !!searchQuery || !!location || !!action || !!selectedCategory || !!minPrice || !!maxPrice || !!minRating || !!sortBy;

    let filteredListings = [];
    if (isFiltered) {
        filteredListings = applySort(dummyListings.filter(applyFilters));
    }

    // Featured sections when no filters applied
    const newListings = dummyListings.filter(listing => listing.isNew).slice(0, 4);
    const highRatedListings = dummyListings.sort((a, b) => b.rating - a.rating).slice(0, 4);
    const popularCategories = ['Electronics', 'Fashion', 'Sports'];
    const popularListings = dummyListings
        .filter(listing => popularCategories.includes(listing.category))
        .slice(0, 4);

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
                            <div className="search-bar-inner">
                                <input
                                    type="text"
                                    placeholder="Search for items to buy, sell, or rent..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                <button className="search-button">🔍</button>
                                <button className="filter-button" onClick={() => setIsFilterOpen(true)}>⚙️</button>
                            </div>
                        </div>
                    </div>
                    <div className="cta-buttons">
                        <button
                            className="cta-button post-listing"
                            onClick={() => setIsProductListingOpen(true)}
                        >
                            Post
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

            {/* Filter Modal */}
            {isFilterOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Advanced Filters</h2>
                        <label>Location</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option value="">All</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                        <label>Action</label>
                        <select value={action} onChange={(e) => setAction(e.target.value)}>
                            <option value="">All</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                            <option value="rent">Rent</option>
                        </select>
                        <label>Category</label>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">All</option>
                            {categories.map((cat) => (
                                <option key={cat.name} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <label>Min Price</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="$ Min"
                        />
                        <label>Max Price</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="$ Max"
                        />
                        <label>Min Rating</label>
                        <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                            <option value="">Any</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5</option>
                        </select>
                        <label>Sort By</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Default</option>
                            <option value="price_asc">Price Low to High</option>
                            <option value="price_desc">Price High to Low</option>
                            <option value="rating_desc">Highest Rated</option>
                            <option value="newest">Newest</option>
                        </select>
                        <div className="modal-buttons">
                            <button onClick={() => setIsFilterOpen(false)}>Apply</button>
                            <button onClick={() => {
                                setLocation('');
                                setAction('');
                                setSelectedCategory('');
                                setMinPrice('');
                                setMaxPrice('');
                                setMinRating('');
                                setSortBy('');
                                setIsFilterOpen(false);
                            }}>Reset</button>
                            <button onClick={() => setIsFilterOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
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
                <div className="search-bar-inner">
                    <input
                        type="text"
                        placeholder="Search for items to buy, sell, or rent..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button">🔍</button>
                    <button className="filter-button" onClick={() => setIsFilterOpen(true)}>⚙️</button>
                </div>
            </div>

            {isFiltered ? (
                <div className="listings-section">
                    <h2 className="section-title">Filtered Listings</h2>
                    <div className="listings-grid">
                        {filteredListings.map((listing) => (
                            <div key={listing.id} className="listing-card">
                                <div className="card-image">
                                    <img src={listing.image} alt={listing.title} />
                                    <div className="card-overlay">
                                        <h2 className="card-title">{listing.title}</h2>
                                        <p className="card-price">{listing.price}</p>
                                        <p className="card-location">{listing.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredListings.length === 0 && <p>No listings match your filters.</p>}
                </div>
            ) : (
                <>
                    {/* New Listings Section */}
                    <div className="listings-section">
                        <h2 className="section-title">New Listings</h2>
                        <div className="listings-grid">
                            {newListings.map((listing) => (
                                <div key={listing.id} className="listing-card new-listing">
                                    <div className="card-image">
                                        <img src={listing.image} alt={listing.title} />
                                        <div className="card-overlay">
                                            <h2 className="card-title">{listing.title}</h2>
                                            <p className="card-price">{listing.price}</p>
                                            <p className="card-location">{listing.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="view-more">View More</button>
                    </div>

                    {/* Highest Rated Listings Section */}
                    <div className="listings-section">
                        <h2 className="section-title">Highest Rated Listings</h2>
                        <div className="listings-grid">
                            {highRatedListings.map((listing) => (
                                <div key={listing.id} className="listing-card high-rated">
                                    <div className="card-image">
                                        <img src={listing.image} alt={listing.title} />
                                        <div className="card-overlay">
                                            <h2 className="card-title">{listing.title}</h2>
                                            <p className="card-price">{listing.price}</p>
                                            <p className="card-location">{listing.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="view-more">View More</button>
                    </div>

                    {/* Popular Categories This Week */}
                    <div className="listings-section">
                        <h2 className="section-title">Popular This Week</h2>
                        <div className="listings-grid">
                            {popularListings.map((listing) => (
                                <div key={listing.id} className="listing-card popular">
                                    <div className="card-image">
                                        <img src={listing.image} alt={listing.title} />
                                        <div className="card-overlay">
                                            <h2 className="card-title">{listing.title}</h2>
                                            <p className="card-price">{listing.price}</p>
                                            <p className="card-location">{listing.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="view-more">View More</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;