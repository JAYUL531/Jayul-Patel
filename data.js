const products = [
    {
        id: 1,
        name: "Classic White Shirt",
        price: 49.99,
        category: "shirts",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=500",
        description: "Premium cotton dress shirt with a modern fit. Perfect for formal occasions or business wear.",
        rating: 4.5,
        reviews: [
            { user: "John D.", rating: 5, comment: "Excellent quality and fit!", date: "2024-03-15" },
            { user: "Mike R.", rating: 4, comment: "Good shirt, but slightly tight in shoulders", date: "2024-03-10" }
        ],
        stock: 15,
        sale: false
    },
    {
        id: 2,
        name: "Navy Blue Suit",
        price: 299.99,
        category: "suits",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=500",
        description: "Tailored navy suit in Italian wool. Features a modern cut with subtle pinstripes.",
        rating: 4.8,
        reviews: [
            { user: "Robert K.", rating: 5, comment: "Perfect fit and excellent material!", date: "2024-03-12" },
            { user: "David M.", rating: 4.5, comment: "Great suit for business meetings", date: "2024-03-08" }
        ],
        stock: 8,
        sale: true,
        salePrice: 249.99
    },
    {
        id: 3,
        name: "Leather Watch",
        price: 199.99,
        category: "watches",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=500",
        description: "Classic leather strap watch with chronograph features. Water-resistant up to 50m.",
        rating: 4.7,
        reviews: [
            { user: "Tom H.", rating: 5, comment: "Beautiful timepiece, very elegant", date: "2024-03-14" },
            { user: "James L.", rating: 4.5, comment: "Great quality for the price", date: "2024-03-09" }
        ],
        stock: 12,
        sale: false
    },
    {
        id: 4,
        name: "Denim Shirt",
        price: 59.99,
        category: "shirts",
        image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=80&w=500",
        description: "Casual denim shirt made from premium Japanese denim. Perfect for a relaxed weekend look.",
        rating: 4.3,
        reviews: [
            { user: "Chris P.", rating: 4, comment: "Good casual shirt, runs slightly large", date: "2024-03-13" },
            { user: "Alex W.", rating: 4.5, comment: "Great quality denim", date: "2024-03-07" }
        ],
        stock: 20,
        sale: true,
        salePrice: 44.99
    },
    {
        id: 5,
        name: "Gray Suit",
        price: 279.99,
        category: "suits",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&q=80&w=500",
        description: "Modern slim-fit gray suit in all-season wool blend. Perfect for any formal occasion.",
        rating: 4.6,
        reviews: [
            { user: "William B.", rating: 5, comment: "Perfect fit and great style", date: "2024-03-11" },
            { user: "George R.", rating: 4, comment: "Good quality but needed alterations", date: "2024-03-06" }
        ],
        stock: 10,
        sale: false
    },
    {
        id: 6,
        name: "Smart Watch",
        price: 299.99,
        category: "watches",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=500",
        description: "Modern smartwatch with fitness tracking, heart rate monitoring, and smartphone notifications.",
        rating: 4.4,
        reviews: [
            { user: "Peter M.", rating: 4, comment: "Great features but battery life could be better", date: "2024-03-15" },
            { user: "Sam K.", rating: 5, comment: "Perfect fitness companion!", date: "2024-03-08" }
        ],
        stock: 15,
        sale: false
    }
]; 