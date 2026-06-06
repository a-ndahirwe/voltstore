const Product = require('../models/Product');

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'A premium flagship with advanced camera systems, dynamic island display, and exceptional performance for mobile photography and gaming.',
    price: 2500000,
    category: 'Phones',
    brand: 'Apple',
    stock: 12,
    rating: 4.9,
    numReviews: 540,
    image: 'https://images.unsplash.com/photo-1697401407589-f3c6c0e4c78d?w=500'
  },
  {
    name: 'iPhone 14',
    description: 'Apple A15 Bionic chip with a 6.1" Super Retina XDR display, excellent battery life, and reliable camera performance.',
    price: 1950000,
    category: 'Phones',
    brand: 'Apple',
    stock: 10,
    rating: 4.8,
    numReviews: 420,
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500'
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Top-tier flagship with a 200MP camera, 6.8" Dynamic AMOLED display, and lightning-fast Snapdragon performance.',
    price: 2200000,
    category: 'Phones',
    brand: 'Samsung',
    stock: 9,
    rating: 4.9,
    numReviews: 380,
    image: 'https://images.unsplash.com/photo-1676356574545-5e3f1b5b4e5b?w=500'
  },
  {
    name: 'Samsung Galaxy A54',
    description: 'Reliable mid-range smartphone with a vibrant AMOLED screen, long-lasting battery, and strong camera setup.',
    price: 380000,
    category: 'Phones',
    brand: 'Samsung',
    stock: 22,
    rating: 4.4,
    numReviews: 240,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500'
  },
  {
    name: 'Xiaomi Redmi Note 12',
    description: 'A value-packed phone offering a bright AMOLED display, solid camera performance, and strong battery life.',
    price: 220000,
    category: 'Phones',
    brand: 'Xiaomi',
    stock: 26,
    rating: 4.2,
    numReviews: 150,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500'
  },
  {
    name: 'Tecno Spark 20',
    description: 'Affordable smartphone with a large display, powerful battery, and sleek design for everyday use.',
    price: 145000,
    category: 'Phones',
    brand: 'Tecno',
    stock: 30,
    rating: 4.0,
    numReviews: 180,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
  },
  {
    name: 'Infinix Hot 30',
    description: 'Affordable handset with a bold display, fast charging support, and balanced specs for multimedia and browsing.',
    price: 160000,
    category: 'Phones',
    brand: 'Infinix',
    stock: 28,
    rating: 4.1,
    numReviews: 125,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10e588e31c?w=500'
  },
  {
    name: 'Samsung Galaxy Z Fold 5',
    description: 'Premium foldable smartphone with a flexible display, multitasking mode, and powerful flagship internals.',
    price: 3200000,
    category: 'Phones',
    brand: 'Samsung',
    stock: 6,
    rating: 4.7,
    numReviews: 210,
    image: 'https://images.unsplash.com/photo-1691286152035-d2ee79b0bb08?w=500'
  },
  {
    name: 'iPhone 13',
    description: 'Classic Apple phone with dependable performance, long battery life, and a bright OLED display.',
    price: 1700000,
    category: 'Phones',
    brand: 'Apple',
    stock: 14,
    rating: 4.7,
    numReviews: 315,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500'
  },
  {
    name: 'Xiaomi 13T Pro',
    description: 'High-performance phone with a flagship-grade processor, premium camera system, and fast charging.',
    price: 950000,
    category: 'Phones',
    brand: 'Xiaomi',
    stock: 18,
    rating: 4.5,
    numReviews: 205,
    image: 'https://images.unsplash.com/photo-1695048132966-f87f48df0f40?w=500'
  },
  {
    name: 'Samsung Galaxy A34',
    description: 'Strong mid-range option with a smooth AMOLED display, reliable battery, and modern design.',
    price: 340000,
    category: 'Phones',
    brand: 'Samsung',
    stock: 24,
    rating: 4.3,
    numReviews: 190,
    image: 'https://images.unsplash.com/photo-1610945264803-c22b62831b5b?w=500'
  },
  {
    name: 'Huawei Nova 11',
    description: 'Stylish smartphone with a vivid display, strong camera features, and fast charging support.',
    price: 295000,
    category: 'Phones',
    brand: 'Huawei',
    stock: 20,
    rating: 4.0,
    numReviews: 145,
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500'
  },
  {
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with Apple M2 chip, impressive battery life, and a stunning Liquid Retina display.',
    price: 1850000,
    category: 'Laptops',
    brand: 'Apple',
    stock: 8,
    rating: 4.9,
    numReviews: 420,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'
  },
  {
    name: 'MacBook Pro 14 M3',
    description: 'Performance-focused laptop with the Apple M3 chip, superior graphics, and pro-level multimedia capabilities.',
    price: 2800000,
    category: 'Laptops',
    brand: 'Apple',
    stock: 6,
    rating: 4.9,
    numReviews: 260,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
  },
  {
    name: 'HP Pavilion 15',
    description: 'Balanced 15-inch laptop with Intel Core i5, 8GB RAM, and 512GB SSD for everyday productivity and study.',
    price: 760000,
    category: 'Laptops',
    brand: 'HP',
    stock: 12,
    rating: 4.3,
    numReviews: 135,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
  },
  {
    name: 'Dell Inspiron 15',
    description: 'Reliable 15-inch laptop with AMD Ryzen processing, solid storage, and a crisp display for work and entertainment.',
    price: 690000,
    category: 'Laptops',
    brand: 'Dell',
    stock: 15,
    rating: 4.2,
    numReviews: 110,
    image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=500'
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon',
    description: 'Premium business laptop with lightweight carbon fiber construction, excellent keyboard, and long battery life.',
    price: 2150000,
    category: 'Laptops',
    brand: 'Lenovo',
    stock: 9,
    rating: 4.8,
    numReviews: 190,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'
  },
  {
    name: 'Asus ROG Strix G15',
    description: 'Gaming laptop with powerful CPU/GPU combo, fast refresh display, and advanced cooling for intense play.',
    price: 1750000,
    category: 'Laptops',
    brand: 'Asus',
    stock: 11,
    rating: 4.7,
    numReviews: 210,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'
  },
  {
    name: 'Acer Aspire 5',
    description: 'Affordable laptop with a Full HD display, decent performance, and lightweight design for students and home users.',
    price: 520000,
    category: 'Laptops',
    brand: 'Acer',
    stock: 20,
    rating: 4.1,
    numReviews: 95,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500'
  },
  {
    name: 'HP Spectre x360',
    description: 'Convertible 2-in-1 laptop with premium build quality, touchscreen display, and long battery life.',
    price: 1850000,
    category: 'Laptops',
    brand: 'HP',
    stock: 7,
    rating: 4.7,
    numReviews: 170,
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500'
  },
  {
    name: 'Dell XPS 15',
    description: 'High-end laptop with stunning display, powerful specs, and sleek design for creators and professionals.',
    price: 2400000,
    category: 'Laptops',
    brand: 'Dell',
    stock: 6,
    rating: 4.8,
    numReviews: 210,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500'
  },
  {
    name: 'Lenovo IdeaPad 3',
    description: 'Budget-friendly laptop with adequate performance, comfortable keyboard, and a reliable build for everyday tasks.',
    price: 420000,
    category: 'Laptops',
    brand: 'Lenovo',
    stock: 24,
    rating: 4.0,
    numReviews: 95,
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=500'
  },
  {
    name: 'Samsung 55" 4K QLED TV',
    description: '55-inch QLED TV with brilliant colors, Quantum HDR, and smart streaming built-in for immersive viewing.',
    price: 1200000,
    category: 'TVs',
    brand: 'Samsung',
    stock: 5,
    rating: 4.7,
    numReviews: 180,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'
  },
  {
    name: 'LG 55" OLED C3 TV',
    description: '55-inch OLED display with perfect blacks, Dolby Vision, and smart TV features for cinematic home entertainment.',
    price: 1950000,
    category: 'TVs',
    brand: 'LG',
    stock: 4,
    rating: 4.8,
    numReviews: 160,
    image: 'https://images.unsplash.com/photo-1601944177325-f8867652837f?w=500'
  },
  {
    name: 'Sony Bravia 50" 4K TV',
    description: '50-inch 4K LED TV with Sony’s advanced picture processing, crisp colors, and built-in smart apps.',
    price: 1100000,
    category: 'TVs',
    brand: 'Sony',
    stock: 8,
    rating: 4.6,
    numReviews: 130,
    image: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=500'
  },
  {
    name: 'Samsung 43" Crystal UHD TV',
    description: '43-inch crystal display 4K TV with vivid colors, voice control, and easy smart platform navigation.',
    price: 520000,
    category: 'TVs',
    brand: 'Samsung',
    stock: 12,
    rating: 4.4,
    numReviews: 140,
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500'
  },
  {
    name: 'Hisense 50" 4K Smart TV',
    description: '50-inch Smart TV with 4K resolution, built-in streaming apps, and a sleek bezel-free display.',
    price: 590000,
    category: 'TVs',
    brand: 'Hisense',
    stock: 14,
    rating: 4.3,
    numReviews: 100,
    image: 'https://images.unsplash.com/photo-1615986201152-7686a4867f30?w=500'
  },
  {
    name: 'TCL 43" Android TV',
    description: 'Smart Android TV with Google Assistant, Chromecast built-in, and a crisp 43-inch display.',
    price: 480000,
    category: 'TVs',
    brand: 'TCL',
    stock: 16,
    rating: 4.2,
    numReviews: 90,
    image: 'https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=500'
  },
  {
    name: 'LG 65" NanoCell TV',
    description: '65-inch NanoCell display with rich colors, AI upscaling, and premium audio for a cinema-like experience.',
    price: 2100000,
    category: 'TVs',
    brand: 'LG',
    stock: 5,
    rating: 4.7,
    numReviews: 115,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500'
  },
  {
    name: 'Sony 65" Bravia XR TV',
    description: '65-inch Bravia XR with outstanding contrast, fast motion handling, and advanced smart features.',
    price: 2450000,
    category: 'TVs',
    brand: 'Sony',
    stock: 4,
    rating: 4.8,
    numReviews: 130,
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500'
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium over-ear noise cancelling headphones with exceptional sound quality and up to 30 hours battery life.',
    price: 210000,
    category: 'Audio',
    brand: 'Sony',
    stock: 20,
    rating: 4.9,
    numReviews: 520,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    name: 'Apple AirPods Pro 2',
    description: 'Active noise cancellation earbuds with adaptive transparency and powerful spatial audio for immersive listening.',
    price: 190000,
    category: 'Audio',
    brand: 'Apple',
    stock: 15,
    rating: 4.8,
    numReviews: 470,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500'
  },
  {
    name: 'Samsung Galaxy Buds 2',
    description: 'Comfortable wireless earbuds with rich sound, active noise cancellation, and long battery life.',
    price: 95000,
    category: 'Audio',
    brand: 'Samsung',
    stock: 24,
    rating: 4.4,
    numReviews: 220,
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=500'
  },
  {
    name: 'JBL Flip 6',
    description: 'Portable waterproof Bluetooth speaker with bold sound, long battery life, and rugged build.',
    price: 92000,
    category: 'Audio',
    brand: 'JBL',
    stock: 26,
    rating: 4.5,
    numReviews: 260,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
  },
  {
    name: 'Bose QuietComfort 45',
    description: 'Comfortable noise cancelling headphones with balanced audio and a lightweight, premium design.',
    price: 225000,
    category: 'Audio',
    brand: 'Bose',
    stock: 18,
    rating: 4.7,
    numReviews: 310,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'
  },
  {
    name: 'JBL Charge 5',
    description: 'Powerful waterproof Bluetooth speaker with deep bass, 20-hour playtime, and built-in power bank.',
    price: 135000,
    category: 'Audio',
    brand: 'JBL',
    stock: 19,
    rating: 4.6,
    numReviews: 175,
    image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=500'
  },
  {
    name: 'Sony WF-1000XM4 Earbuds',
    description: 'Wireless earbuds with excellent noise cancellation, premium sound, and a compact charging case.',
    price: 180000,
    category: 'Audio',
    brand: 'Sony',
    stock: 16,
    rating: 4.7,
    numReviews: 220,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
  },
  {
    name: 'Bose SoundLink Flex',
    description: 'Durable Bluetooth speaker with deep stereo sound, IP67 waterproof rating, and 12-hour battery life.',
    price: 140000,
    category: 'Audio',
    brand: 'Bose',
    stock: 17,
    rating: 4.5,
    numReviews: 125,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
  },
  {
    name: 'Apple AirPods 3rd Gen',
    description: 'Lightweight earbuds offering spatial audio, sweat resistance, and up to 30 hours of total listening time.',
    price: 160000,
    category: 'Audio',
    brand: 'Apple',
    stock: 22,
    rating: 4.6,
    numReviews: 310,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500'
  },
  {
    name: 'Sony SRS-XB33 Speaker',
    description: 'Portable speaker with extra bass, party lights, and a rugged waterproof design for outdoor use.',
    price: 110000,
    category: 'Audio',
    brand: 'Sony',
    stock: 21,
    rating: 4.4,
    numReviews: 185,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
  },
  {
    name: 'Logitech MX Master 3 Mouse',
    description: 'Premium ergonomic mouse with precise tracking, customizable buttons, and fast MagSpeed scrolling.',
    price: 95000,
    category: 'Accessories',
    brand: 'Logitech',
    stock: 20,
    rating: 4.8,
    numReviews: 340,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
  },
  {
    name: 'Anker 65W GaN Charger',
    description: 'Compact GaN charger delivering 65W fast charging across USB-C ports for laptops, phones, and tablets.',
    price: 42000,
    category: 'Accessories',
    brand: 'Anker',
    stock: 28,
    rating: 4.5,
    numReviews: 190,
    image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=500'
  },
  {
    name: 'Samsung T7 1TB SSD',
    description: 'Portable SSD with blistering transfer speeds, durable metal casing, and 1TB storage capacity.',
    price: 145000,
    category: 'Accessories',
    brand: 'Samsung',
    stock: 18,
    rating: 4.7,
    numReviews: 260,
    image: 'https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?w=500'
  },
  {
    name: 'Logitech MX Keys Keyboard',
    description: 'Premium wireless keyboard with comfortable low-profile keys, smart backlighting, and multi-device support.',
    price: 140000,
    category: 'Accessories',
    brand: 'Logitech',
    stock: 13,
    rating: 4.7,
    numReviews: 215,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  },
  {
    name: 'Anker PowerBank 26800mAh',
    description: 'High-capacity portable battery pack with fast charging and enough power for multiple smartphone recharges.',
    price: 72000,
    category: 'Accessories',
    brand: 'Anker',
    stock: 24,
    rating: 4.4,
    numReviews: 180,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'
  },
  {
    name: 'Baseus 100W USB-C Cable',
    description: 'Durable nylon-braided cable delivering high-speed charging and data transfer for USB-C devices.',
    price: 22000,
    category: 'Accessories',
    brand: 'Baseus',
    stock: 30,
    rating: 4.3,
    numReviews: 120,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
  },
  {
    name: 'Belkin Wireless Charger',
    description: 'Fast wireless charging pad with sleek design and compatibility for Qi-enabled phones and earbuds.',
    price: 56000,
    category: 'Accessories',
    brand: 'Belkin',
    stock: 18,
    rating: 4.5,
    numReviews: 140,
    image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=500'
  },
  {
    name: 'Logitech C920 Webcam',
    description: 'HD webcam with crisp video quality, autofocus, and built-in stereo microphones for meetings and streaming.',
    price: 82000,
    category: 'Accessories',
    brand: 'Logitech',
    stock: 17,
    rating: 4.6,
    numReviews: 205,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500'
  },
  {
    name: 'Kingston 32GB USB Flash Drive',
    description: 'Compact USB flash drive offering reliable storage, fast transfers, and easy portability.',
    price: 12000,
    category: 'Accessories',
    brand: 'Kingston',
    stock: 30,
    rating: 4.2,
    numReviews: 80,
    image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=500'
  },
  {
    name: 'Razer DeathAdder V3 Mouse',
    description: 'High-precision gaming mouse with ergonomic design, fast switches, and customizable RGB lighting.',
    price: 128000,
    category: 'Accessories',
    brand: 'Razer',
    stock: 15,
    rating: 4.7,
    numReviews: 175,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
  }
];

const seedData = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log('✅ Sample products seeded successfully');
    } else {
      console.log(`ℹ️  Database already has ${count} products, skipping seed`);
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

module.exports = seedData;