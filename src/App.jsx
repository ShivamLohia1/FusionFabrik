import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, Search, Menu, X, Heart, User, ChevronLeft, ChevronRight, Sun, Moon, Trash2, Minus, Plus } from 'lucide-react';

export default function FusionFabrik() {
    // === STATE ===
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [theme, setTheme] = useState('light');
    
    const [favorites, setFavorites] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState('featured');

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // === NEW === Checkout State
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    // === THEME TOGGLE ===
    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // === DATA ARRAYS ===
    const heroSlides = [
        {
            title: "Summer Collection 2025",
            subtitle: "Beat the heat in style",
            bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            title: "Urban Streetwear",
            subtitle: "Fresh drops every week",
            bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            title: "Fusion Classics",
            subtitle: "Timeless pieces, modern twist",
            bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        }
    ];

    const categories = [
        { name: "T-Shirts", img: "image.png", color: "#dbeafe", page: "tshirts" },
        { name: "Hoodies", img: "image copy 3.png", color: "#fce7f3", page: "hoodies" },
        { name: "Jeans", img: "image copy 2.png", color: "#e0e7ff", page: "jeans" },
        { name: "Sneakers", img: "image copy.png", color: "#fbcfe8", page: "sneakers" },
        { name: "Accessories", img: "image copy 4.png", color: "#fef3c7", page: "accessories" },
        { name: "Women", img: "image copy 5.png", color: "#fdf2f8", page: "women" }
    ];

    const fandoms = [
        { name: "Marvel", img: "image copy 6.png", page: "marvel" },
        { name: "DC", img: "image copy 7.png", page: "dc" },
        { name: "Harry Potter", img: "image copy 8.png", page: "harrypotter" }
    ];

    const allProducts = [
        { id: 1, name: "Graphic Tee - Trident", price: 1399, category: "Oversized T-Shirts", color: "Blue", size: ["S", "M", "L", "XL"], type: "tshirts", img: "image copy 14.png", fit: "OVERSIZED" },
        { id: 2, name: "Nomad Compass", price: 2399, category: "Super Oversized T-Shirts", color: "Black", size: ["M", "L", "XL", "XXL"], type: "tshirts", img: "image copy 15.png", fit: "SUPER OVERSIZED" },
        { id: 3, name: "Kaal Chakra", price: 1599, category: "Premium Heavy Gauge", color: "Black", size: ["S", "M", "L", "XL"], type: "tshirts", img: "image copy 16.png", fit: "SUPER OVERSIZED" },
        { id: 4, name: "FCB Numero 10", price: 1399, category: "Oversized T-Shirts", color: "Maroon", size: ["M", "L", "XL"], type: "tshirts", img: "image copy 17.png", fit: "OVERSIZED" },
        { id: 5, name: "Vintage Band Tee", price: 1299, category: "Oversized T-Shirts", color: "Black", size: ["S", "M", "L"], type: "tshirts", img: "image copy 18.png", fit: "OVERSIZED" },
        { id: 6, name: "Mandala Print", price: 1499, category: "Drop Cut T-Shirts", color: "White", size: ["M", "L", "XL"], type: "tshirts", img: "image copy 19.png", fit: "OVERSIZED" },
        { id: 7, name: "Street Culture", price: 1799, category: "Premium Heavy Gauge", color: "Grey", size: ["S", "M", "L", "XL"], type: "tshirts", img: "image copy 20.png", fit: "OVERSIZED" },
        { id: 8, name: "Retro Vibes", price: 1599, category: "Oversized T-Shirts", color: "Navy", size: ["M", "L", "XL"], type: "tshirts", img: "image copy 21.png", fit: "OVERSIZED" },
        { id: 9, name: "Zip Hoodie", price: 2299, category: "Hoodies", color: "Black", size: ["M", "L", "XL"], type: "hoodies", img: "image copy 13.png" },
        { id: 10, name: "Oversized Hoodie", price: 2499, category: "Hoodies", color: "Grey", size: ["L", "XL", "XXL"], type: "hoodies", img: "image copy 12.png" },
        { id: 11, name: "Slim Fit Denim", price: 2899, category: "Jeans", color: "Blue", size: ["M", "L", "XL"], type: "jeans", img: "image copy 11.png" },
        { id: 12, name: "Ripped Baggy Jeans", price: 3499, category: "Jeans", color: "Black", size: ["S", "M", "L"], type: "jeans", img: "image copy 10.png" },
        { id: 13, name: "Classic Straight Jeans", price: 2599, category: "Jeans", color: "Indigo", size: ["S", "M", "L", "XL"], type: "jeans", img: "image copy 9.png" }
    ];

    const tshirtCategories = [
        "Oversized T-Shirts",
        "Super Oversized T-Shirts",
        "Drop Cut T-Shirts",
        "Premium Heavy Gauge",
    ];

    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    // === CART LOGIC ===
    const { totalItems, cartTotal } = useMemo(() => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { totalItems, cartTotal };
    }, [cartItems]);

    const handleAddToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevItems, { 
                    id: product.id, 
                    name: product.name, 
                    price: product.price, 
                    quantity: quantity,
                    image: product.img,
                }];
            }
        });

        showNotification(`${quantity}x ${product.name} added!`);
    };

    const showNotification = (message) => {
        const notif = document.getElementById('notification-message');
        if (notif) {
            notif.innerText = message;
            notif.style.display = 'block';
            notif.style.opacity = '1';
            
            setTimeout(() => {
                notif.style.opacity = '0';
                setTimeout(() => {
                    notif.style.display = 'none';
                }, 300);
            }, 2500);
        }
    };

    const handleUpdateQuantity = (id, change) => {
        setCartItems(prevItems => {
            return prevItems
                .map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + change };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0);
        });
    };
    
    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // === HERO SLIDER EFFECT ===
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // === MISC HANDLERS ===
    const toggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleSize = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    // === PRODUCT FILTERING LOGIC ===
    const getFilteredProducts = () => {
        let pageTypes = ['tshirts', 'hoodies', 'jeans', 'sneakers', 'accessories', 'women'];
        let filtered;

        if (pageTypes.includes(currentPage)) {
            filtered = allProducts.filter(p => p.type === currentPage);
        } else if (currentPage === 'home') {
            // Show a mix for home page
            filtered = allProducts.slice(0, 8);
        } else {
            // Fallback for fandom pages, etc. (can be expanded)
            filtered = allProducts.filter(p => p.type === 'tshirts');
        }
        
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }
        
        if (selectedSizes.length > 0) {
            filtered = filtered.filter(p => p.size.some(s => selectedSizes.includes(s)));
        }

        if (sortBy === 'priceLow') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHigh') {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    };

    const getSearchedProducts = () => {
        if (!searchQuery) return [];
        return allProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // === STYLES ===
    const containerStyle = {
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
        color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    };

    const navButtonStyle = {
        background: 'transparent',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        borderRadius: '8px',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const buttonPrimaryStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    };

    const cardStyle = {
        background: theme === 'dark' ? '#1e293b' : '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: theme === 'dark' ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        fontSize: '14px',
        marginBottom: '16px',
        borderRadius: '8px',
        border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
        background: theme === 'dark' ? '#0f172a' : '#f8fafc',
        color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        boxSizing: 'border-box'
    };

    // === COMPONENTS ===

    // Header Component
    const Header = () => (
        <header style={headerStyle}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button style={navButtonStyle} onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu size={24} />
                </button>

                <h1 
                    style={{ fontSize: '24px', fontWeight: '800', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}
                    onClick={() => { setCurrentPage('home'); setSelectedProduct(null); }}
                >
                    FusionFabrik
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button style={navButtonStyle} onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button style={navButtonStyle} onClick={() => setSearchOpen(true)}>
                        <Search size={20} />
                    </button>
                    <button style={navButtonStyle} onClick={() => { setCurrentPage('login'); setSelectedProduct(null); }}>
                        <User size={20} />
                    </button>
                    <button style={{...navButtonStyle, position: 'relative'}} onClick={() => setIsCartOpen(true)}>
                        <ShoppingCart size={20} />
                        {totalItems > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: '#dc2626',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: '700',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );

    // Side Menu Component
    const SideMenu = () => (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: menuOpen ? 'block' : 'none'
        }}>
            <div 
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
                onClick={() => setMenuOpen(false)}
            />
            <div style={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100%',
                width: '280px',
                background: theme === 'dark' ? '#1e293b' : '#ffffff',
                boxShadow: '4px 0 20px rgba(0,0,0,0.2)',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s',
                overflowY: 'auto'
            }}>
                <div style={{ padding: '20px', borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Menu</h2>
                        <button style={navButtonStyle} onClick={() => setMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                </div>
                <nav style={{ padding: '20px' }}>
                    {['home', 'tshirts', 'hoodies', 'jeans', 'sneakers', 'accessories', 'women'].map(page => (
                        <button
                            key={page}
                            onClick={() => { setCurrentPage(page); setMenuOpen(false); setSelectedProduct(null); }}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '12px 16px',
                                marginBottom: '8px',
                                background: currentPage === page ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                                color: currentPage === page ? 'white' : (theme === 'dark' ? '#f1f5f9' : '#1e293b'),
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                transition: 'all 0.2s'
                            }}
                        >
                            {page}
                        </button>
                    ))}
                    <div style={{height: '1px', background: theme === 'dark' ? '#334155' : '#e2e8f0', margin: '16px 0'}} />
                    {['login', 'signup'].map(page => (
                        <button
                            key={page}
                            onClick={() => { setCurrentPage(page); setMenuOpen(false); setSelectedProduct(null); }}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '12px 16px',
                                marginBottom: '8px',
                                background: currentPage === page ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                                color: currentPage === page ? 'white' : (theme === 'dark' ? '#f1f5f9' : '#1e293b'),
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                transition: 'all 0.2s'
                            }}
                        >
                            {page === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );

    // Hero Section Component
    const HeroSection = () => (
        <div style={{ position: 'relative', height: '400px', overflow: 'hidden', borderRadius: '0 0 20px 20px' }}>
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: slide.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        opacity: currentSlide === index ? 1 : 0,
                        transition: 'opacity 0.5s',
                        padding: '20px'
                    }}
                >
                    <h2 style={{ fontSize: '48px', fontWeight: '900', color: 'white', marginBottom: '16px', textAlign: 'center' }}>
                        {slide.title}
                    </h2>
                    <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
                        {slide.subtitle}
                    </p>
                    <button style={buttonPrimaryStyle}>
                        Shop Now
                    </button>
                </div>
            ))}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                }}
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                }}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );

    // Categories Section Component
    const CategoriesSection = () => (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '32px', textAlign: 'center' }}>
                Shop by Category
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px' }}>
                {categories.map(cat => (
                    <div
                        key={cat.name}
                        onClick={() => { setCurrentPage(cat.page); setSelectedProduct(null); }}
                        style={{
                            ...cardStyle,
                            textAlign: 'center',
                            padding: '24px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme === 'dark' ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: cat.color,
                            borderRadius: '50%',
                            margin: '0 auto 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img src={cat.img} alt={cat.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );

    // Fandom Section Component
    const FandomSection = () => (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '32px', textAlign: 'center' }}>
                Shop by Fandom
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {fandoms.map(fandom => (
                    <div
                        key={fandom.name}
                        onClick={() => { setCurrentPage(fandom.page); setSelectedProduct(null); }}
                        style={{
                            ...cardStyle,
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme === 'dark' ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)';
                        }}
                    >
                        <img src={fandom.img} alt={fandom.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <h3 style={{ fontSize: '24px', fontWeight: '700', padding: '20px' }}>{fandom.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );

    // Product Grid Component
    const ProductGrid = ({ products }) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
                {products.length > 0 ? products.map(product => (
                    <div
                        key={product.id}
                        style={cardStyle}
                        onClick={() => setSelectedProduct(product)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = theme === 'dark' ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{ position: 'relative' }}>
                            <img src={product.img} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                            <button
                                onClick={(e) => toggleFavorite(e, product.id)}
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'rgba(255,255,255,0.9)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                }}
                            >
                                <Heart size={18} fill={favorites.includes(product.id) ? '#dc2626' : 'none'} color={favorites.includes(product.id) ? '#dc2626' : '#1e293b'} />
                            </button>
                            {product.fit && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    left: '12px',
                                    background: 'rgba(0,0,0,0.6)',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    letterSpacing: '0.5px'
                                }}>
                                    {product.fit}
                                </span>
                            )}
                        </div>
                        <div style={{ padding: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', minHeight: '40px' }}>{product.name}</h3>
                            <p style={{ fontSize: '14px', color: theme === 'dark' ? '#94a3b8' : '#64748b', marginBottom: '8px' }}>{product.category}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '20px', fontWeight: '800', color: '#9333ea' }}>₹{product.price}</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                                    style={{
                                        ...buttonPrimaryStyle,
                                        padding: '8px 16px',
                                        fontSize: '12px'
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p>No products found matching your criteria.</p>
                )}
            </div>
        );
    };

    // Product List Page (with filters)
    const ProductListPage = () => {
        const products = getFilteredProducts();
        
        return (
            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', textTransform: 'capitalize' }}>
                        {currentPage}
                    </h2>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                            background: theme === 'dark' ? '#1e293b' : '#ffffff',
                            color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="featured">Featured</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                    </select>
                </div>

                {currentPage === 'tshirts' && (
                    <div style={{ marginBottom: '32px', padding: '20px', background: theme === 'dark' ? '#1e293b' : '#f8fafc', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Filters</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Categories</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {tshirtCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            border: 'none',
                                            background: selectedCategories.includes(cat) ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : (theme === 'dark' ? '#334155' : '#e2e8f0'),
                                            color: selectedCategories.includes(cat) ? 'white' : (theme === 'dark' ? '#f1f5f9' : '#1e293b'),
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Sizes</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            border: 'none',
                                            background: selectedSizes.includes(size) ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : (theme === 'dark' ? '#334155' : '#e2e8f0'),
                                            color: selectedSizes.includes(size) ? 'white' : (theme === 'dark' ? '#f1f5f9' : '#1e293b'),
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                <ProductGrid products={products} />
            </div>
        );
    };

    // Home Page Component
    const HomePage = () => {
        const featuredProducts = allProducts.slice(0, 8); // Get first 8 products as "featured"
        return (
            <>
                <HeroSection />
                <CategoriesSection />
                <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '32px', textAlign: 'center' }}>
                        Featured Products
                    </h2>
                    <ProductGrid products={featuredProducts} />
                </div>
                <FandomSection />
            </>
        );
    };

    // Product Detail Modal Component
    const ProductDetailModal = () => {
        if (!selectedProduct) return null;
        
        const [selectedSize, setSelectedSize] = useState(selectedProduct.size[0]);
        const [quantity, setQuantity] = useState(1);

        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div 
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }}
                    onClick={() => setSelectedProduct(null)}
                />
                <div style={{
                    position: 'relative',
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderRadius: '20px',
                    maxWidth: '900px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '32px'
                }}>
                    <button
                        onClick={() => setSelectedProduct(null)}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'rgba(0,0,0,0.5)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            zIndex: 10
                        }}
                    >
                        <X size={24} />
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                        <div style={{ padding: '40px' }}>
                            <img 
                                src={selectedProduct.img} 
                                alt={selectedProduct.name} 
                                style={{ width: '100%', borderRadius: '12px' }}
                            />
                        </div>

                        <div style={{ padding: '40px' }}>
                            {selectedProduct.fit && (
                                <span style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    letterSpacing: '0.5px',
                                    display: 'inline-block',
                                    marginBottom: '16px'
                                }}>
                                    {selectedProduct.fit} FIT
                                </span>
                            )}
                            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
                                {selectedProduct.name}
                            </h2>
                            <p style={{ fontSize: '16px', color: theme === 'dark' ? '#94a3b8' : '#64748b', marginBottom: '16px' }}>{selectedProduct.category}</p>
                            <p style={{ fontSize: '36px', fontWeight: '900', color: '#9333ea', marginBottom: '24px' }}>₹{selectedProduct.price}</p>
                            
                            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Select Size:</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                                {selectedProduct.size.map(s => (
                                    <button 
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: `2px solid ${selectedSize === s ? '#764ba2' : (theme === 'dark' ? '#334155' : '#e2e8f0')}`,
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            background: selectedSize === s ? (theme === 'dark' ? '#334155' : '#f1f5f9') : 'transparent',
                                            color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Quantity:</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    style={{ ...navButtonStyle, border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}
                                >
                                    <Minus size={16} />
                                </button>
                                <span style={{ fontSize: '18px', fontWeight: '700', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    style={{ ...navButtonStyle, border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                style={{ ...buttonPrimaryStyle, width: '100%', padding: '16px', fontSize: '16px' }}
                                onClick={() => { 
                                    handleAddToCart(selectedProduct, quantity); 
                                    setSelectedProduct(null); 
                                }}
                            >
                                Add {quantity} to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Cart Modal Component
    const CartModal = () => {
        if (!isCartOpen) return null;

        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 60
            }}>
                <div 
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setIsCartOpen(false)}
                />
                <div style={{
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    height: '100%',
                    width: '400px',
                    maxWidth: '100%',
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    boxShadow: '-4px 0 20px rgba(0,0,0,0.2)',
                    transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: '20px', borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Your Cart ({totalItems})</h2>
                        <button style={navButtonStyle} onClick={() => setIsCartOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                        {cartItems.length === 0 ? (
                            <p style={{ textAlign: 'center', marginTop: '40px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Your cart is empty.</p>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{item.name}</h3>
                                        <p style={{ fontSize: '16px', fontWeight: '700', color: '#9333ea', marginBottom: '12px' }}>₹{item.price}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button onClick={() => handleUpdateQuantity(item.id, -1)} style={{ ...navButtonStyle, padding: '4px', border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}><Minus size={14} /></button>
                                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.quantity}</span>
                                            <button onClick={() => handleUpdateQuantity(item.id, 1)} style={{ ...navButtonStyle, padding: '4px', border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}` }}><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRemoveItem(item.id)} style={{ ...navButtonStyle, alignSelf: 'flex-start' }}>
                                        <Trash2 size={18} color="#dc2626" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div style={{ padding: '20px', borderTop: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`, background: theme === 'dark' ? '#0f172a' : '#f8fafc' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{ fontSize: '18px', fontWeight: '600' }}>Subtotal:</span>
                                <span style={{ fontSize: '22px', fontWeight: '800' }}>₹{cartTotal.toLocaleString()}</span>
                            </div>
                            {/* === MODIFIED === Added onClick handler */}
                            <button 
                                style={{ ...buttonPrimaryStyle, width: '100%', padding: '16px', fontSize: '16px' }}
                                onClick={() => {
                                    setIsCartOpen(false);
                                    setCurrentPage('checkout');
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Search Modal Component
    const SearchModal = () => {
        if (!searchOpen) return null;
        const results = getSearchedProducts();

        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 70,
                padding: '20px'
            }}>
                <div 
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                />
                <div style={{
                    position: 'relative',
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderRadius: '20px',
                    maxWidth: '700px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    margin: '40px auto 0',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: '16px', borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Search size={20} color={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            style={{
                                ...inputStyle,
                                width: '100%',
                                marginBottom: '0',
                                border: 'none',
                                background: 'transparent',
                                padding: '8px 0',
                                fontSize: '16px'
                            }}
                        />
                        <button style={navButtonStyle} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                            <X size={24} />
                        </button>
                    </div>
                    <div style={{ overflowY: 'auto', padding: '16px' }}>
                        {searchQuery && results.length === 0 && (
                            <p style={{ textAlign: 'center', padding: '20px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>No results found for "{searchQuery}".</p>
                        )}
                        {results.map(product => (
                            <div 
                                key={product.id}
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setSearchOpen(false);
                                    setSearchQuery("");
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = theme === 'dark' ? '#334155' : '#f1f5f9'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <img src={product.img} alt={product.name} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div>
                                    <h4 style={{ fontWeight: '600' }}>{product.name}</h4>
                                    <p style={{ fontSize: '14px', color: '#9333ea', fontWeight: '700' }}>₹{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Form Page Wrapper (for Login/Sign Up)
    const FormPageWrapper = ({ title, children }) => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 20px',
            minHeight: 'calc(100vh - 200px)'
        }}>
            <div style={{
                ...cardStyle,
                padding: '32px 40px',
                width: '100%',
                maxWidth: '400px',
            }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '32px' }}>
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );

    // Login Page Component
    const LoginPage = () => (
        <FormPageWrapper title="Login">
            <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Email</label>
                    <input style={inputStyle} type="email" placeholder="you@example.com" />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Password</label>
                    <input style={inputStyle} type="password" placeholder="••••••••" />
                </div>
                <button type="submit" style={{ ...buttonPrimaryStyle, width: '100%', padding: '14px', fontSize: '16px' }}>
                    Sign In
                </button>
            </form>
            <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '24px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                Don't have an account?{' '}
                <span 
                    onClick={() => setCurrentPage('signup')}
                    style={{ color: '#764ba2', fontWeight: '600', cursor: 'pointer' }}
                >
                    Sign Up
                </span>
            </p>
        </FormPageWrapper>
    );

    // Sign Up Page Component
    const SignUpPage = () => (
        <FormPageWrapper title="Create Account">
            <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Full Name</label>
                    <input style={inputStyle} type="text" placeholder="John Doe" />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Email</label>
                    <input style={inputStyle} type="email" placeholder="you@example.com" />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Password</label>
                    <input style={inputStyle} type="password" placeholder="••••••••" />
                </div>
                <button type="submit" style={{ ...buttonPrimaryStyle, width: '100%', padding: '14px', fontSize: '16px' }}>
                    Create Account
                </button>
            </form>
            <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '24px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                Already have an account?{' '}
                <span 
                    onClick={() => setCurrentPage('login')}
                    style={{ color: '#764ba2', fontWeight: '600', cursor: 'pointer' }}
                >
                    Login
                </span>
            </p>
        </FormPageWrapper>
    );

    // === NEW === Checkout Page Component
    const CheckoutPage = () => {
        const handlePayment = (e) => {
            e.preventDefault();
            // This is where a real payment API would be called
            showNotification('Payment Successful! Thank you for your order.');
            setCartItems([]);
            setCurrentPage('home');
            setPaymentMethod('creditCard'); // Reset for next time
        };

        if (cartItems.length === 0) {
            return (
                <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: 'calc(100vh - 200px)' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>Your cart is empty!</h2>
                    <p style={{ marginBottom: '32px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                        There's nothing to check out.
                    </p>
                    <button 
                        style={buttonPrimaryStyle} 
                        onClick={() => setCurrentPage('home')}
                    >
                        Continue Shopping
                    </button>
                </div>
            )
        }

        return (
            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                
                {/* Left Side: Payment Details */}
                <div style={{ ...cardStyle, padding: '32px 40px', cursor: 'default' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px' }}>Payment Details</h2>
                    <form onSubmit={handlePayment}>
                        {/* Payment Method Radio Buttons */}
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Select Payment Method</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {/* Credit Card Option */}
                                <label style={{ ...inputStyle, padding: '16px', cursor: 'pointer', borderColor: paymentMethod === 'creditCard' ? '#764ba2' : (theme === 'dark' ? '#334155' : '#e2e8f0'), borderWidth: '2px', display: 'flex', alignItems: 'center', marginBottom: '0' }}>
                                    <input type="radio" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={() => setPaymentMethod('creditCard')} style={{ marginRight: '12px' }} />
                                    Credit/Debit Card
                                </label>
                                {/* UPI Option */}
                                <label style={{ ...inputStyle, padding: '16px', cursor: 'pointer', borderColor: paymentMethod === 'upi' ? '#764ba2' : (theme === 'dark' ? '#334155' : '#e2e8f0'), borderWidth: '2px', display: 'flex', alignItems: 'center', marginBottom: '0' }}>
                                    <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} style={{ marginRight: '12px' }} />
                                    UPI
                                </label>
                                {/* COD Option */}
                                <label style={{ ...inputStyle, padding: '16px', cursor: 'pointer', borderColor: paymentMethod === 'cod' ? '#764ba2' : (theme === 'dark' ? '#334155' : '#e2e8f0'), borderWidth: '2px', display: 'flex', alignItems: 'center', marginBottom: '0' }}>
                                    <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ marginRight: '12px' }} />
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>

                        {/* Conditional Form Fields */}
                        {paymentMethod === 'creditCard' && (
                            <div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Card Number</label>
                                    <input style={inputStyle} type="text" placeholder="0000 0000 0000 0000" required />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Expiry (MM/YY)</label>
                                        <input style={inputStyle} type="text" placeholder="MM/YY" required />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>CVV</label>
                                        <input style={inputStyle} type="text" placeholder="123" required />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Name on Card</label>
                                    <input style={inputStyle} type="text" placeholder="John Doe" required />
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'upi' && (
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>UPI ID</label>
                                <input style={inputStyle} type="text" placeholder="yourname@bank" required />
                                <p style={{ fontSize: '12px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>A payment request will be sent to this UPI ID.</p>
                            </div>
                        )}

                        {paymentMethod === 'cod' && (
                            <div style={{ marginBottom: '24px', padding: '16px', background: theme === 'dark' ? '#0f172a' : '#f8fafc', borderRadius: '8px' }}>
                                <p style={{ fontSize: '14px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>You will pay in cash upon delivery of your order.</p>
                            </div>
                        )}
                        
                        <button type="submit" style={{ ...buttonPrimaryStyle, width: '100%', padding: '14px', fontSize: '16px' }}>
                            {paymentMethod === 'cod' ? 'Confirm Order' : `Pay ₹${cartTotal.toLocaleString()} Now`}
                        </button>
                    </form>
                </div>

                {/* Right Side: Order Summary */}
                <div style={{ ...cardStyle, padding: '32px 40px', alignSelf: 'start', cursor: 'default' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px' }}>Order Summary</h2>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div style={{ flex: 1, fontSize: '14px' }}>
                                    <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>{item.name}</h3>
                                    <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Qty: {item.quantity}</p>
                                </div>
                                <p style={{ fontSize: '14px', fontWeight: '600' }}>₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ height: '1px', background: theme === 'dark' ? '#334155' : '#e2e8f0', margin: '24px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>Subtotal:</span>
                        <span style={{ fontSize: '18px', fontWeight: '700' }}>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>Shipping:</span>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#16a34a' }}>FREE</span>
                    </div>
                    <div style={{ height: '1x', background: theme === 'dark' ? '#334155' : '#e2e8f0', margin: '24px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '22px', fontWeight: '800' }}>Total:</span>
                        <span style={{ fontSize: '24px', fontWeight: '900', color: '#9333ea' }}>₹{cartTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    };

    // Notification Component
    const Notification = () => (
        <div 
            id="notification-message"
            style={{
                display: 'none',
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                zIndex: 100,
                opacity: 0,
                transition: 'opacity 0.3s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                fontSize: '14px',
                fontWeight: '600'
            }}
        >
            {/* Message will be set by showNotification */}
        </div>
    );

    // Footer Component
    const Footer = () => (
        <footer style={{
            padding: '40px 20px',
            textAlign: 'center',
            borderTop: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
            background: theme === 'dark' ? '#1e293b' : '#f8fafc',
            color: theme === 'dark' ? '#94a3b8' : '#64748b'
        }}>
            <p style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>FusionFabrik</p>
            <p style={{ fontSize: '14px' }}>© 2025 FusionFabrik. All rights reserved.</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Created with React & Inline Styles</p>
        </footer>
    );

    // === MAIN RENDER ===
    const renderPage = () => {
        if (currentPage === 'home') {
            return <HomePage />;
        }
        if (['tshirts', 'hoodies', 'jeans', 'sneakers', 'accessories', 'women'].includes(currentPage)) {
            return <ProductListPage />;
        }
        if (currentPage === 'login') {
            return <LoginPage />;
        }
        if (currentPage === 'signup') {
            return <SignUpPage />;
        }
        // === NEW === Added checkout page routing
        if (currentPage === 'checkout') {
            return <CheckoutPage />;
        }
        // Fallback for fandom pages, etc.
        return <ProductListPage />;
    };

    return (
        <div style={containerStyle}>
            <Header />
            <SideMenu />
            <SearchModal />
            <CartModal />
            <ProductDetailModal />
            <Notification />
            
            <main>
                {renderPage()}
            </main>
            
            <Footer />
        </div>
    );
}