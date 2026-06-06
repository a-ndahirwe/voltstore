const Product = require('../models/Product');

const products = [
  {
    name: 'Samsung Galaxy A54',
    description: '6.4" Super AMOLED display, 5000mAh battery, 128GB storage, 50MP camera. Perfect for everyday use.',
    price: 280000,
    category: 'Phones',
    brand: 'Samsung',
    stock: 15,
    rating: 4.5,
    numReviews: 120,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
  },
  {
    name: 'iPhone 14',
    description: 'Apple A15 Bionic chip, 6.1" Super Retina XDR display, 12MP dual camera. Premium smartphone experience.',
    price: 850000,
    category: 'Phones',
    brand: 'Apple',
    stock: 8,
    rating: 4.8,
    numReviews: 340,
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400'
  },
  {
    name: 'Tecno Spark 20',
    description: '6.6" HD+ display, 5000mAh battery, 128GB ROM, 8GB RAM. Affordable smartphone for everyone.',
    price: 120000,
    category: 'Phones',
    brand: 'Tecno',
    stock: 25,
    rating: 4.1,
    numReviews: 85,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
  },
  {
    name: 'HP Pavilion 15',
    description: 'Intel Core i5 12th Gen, 8GB RAM, 512GB SSD, 15.6" FHD display. Ideal for students and professionals.',
    price: 680000,
    category: 'Laptops',
    brand: 'HP',
    stock: 10,
    rating: 4.3,
    numReviews: 95,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
  },
  {
    name: 'MacBook Air M2',
    description: 'Apple M2 chip, 8GB RAM, 256GB SSD, 13.6" Liquid Retina display. Incredibly thin and powerful.',
    price: 1450000,
    category: 'Laptops',
    brand: 'Apple',
    stock: 5,
    rating: 4.9,
    numReviews: 430,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400'
  },
  {
    name: 'Dell Inspiron 15',
    description: 'AMD Ryzen 5, 8GB RAM, 256GB SSD, Windows 11. Reliable performance for daily computing tasks.',
    price: 590000,
    category: 'Laptops',
    brand: 'Dell',
    stock: 12,
    rating: 4.2,
    numReviews: 78,
    image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400'
  },
  {
    name: 'Samsung 43" 4K Smart TV',
    description: '43-inch 4K UHD, HDR10+, Smart TV with Netflix & YouTube, 3 HDMI ports.',
    price: 450000,
    category: 'TVs',
    brand: 'Samsung',
    stock: 7,
    rating: 4.6,
    numReviews: 155,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'
  },
  {
    name: 'LG 50" OLED Smart TV',
    description: '50-inch OLED 4K, Dolby Vision, webOS Smart TV, built-in Google Assistant.',
    price: 780000,
    category: 'TVs',
    brand: 'LG',
    stock: 4,
    rating: 4.7,
    numReviews: 88,
    image: 'https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400'
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation, 30-hour battery, multipoint connection. Premium wireless headphones.',
    price: 195000,
    category: 'Audio',
    brand: 'Sony',
    stock: 18,
    rating: 4.8,
    numReviews: 512,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
  },
  {
    name: 'JBL Flip 6',
    description: 'IP67 waterproof Bluetooth speaker, 12 hours playtime, bold JBL Original Pro Sound.',
    price: 75000,
    category: 'Audio',
    brand: 'JBL',
    stock: 22,
    rating: 4.5,
    numReviews: 230,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'
  },
  {
    name: 'Anker 65W USB-C Charger',
    description: 'GaN fast charger, 65W PD, dual USB-C ports. Charges laptop, phone and tablet simultaneously.',
    price: 28000,
    category: 'Accessories',
    brand: 'Anker',
    stock: 30,
    rating: 4.4,
    numReviews: 175,
    image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'
  },
  {
    name: 'Logitech MX Master 3',
    description: 'Advanced wireless mouse, MagSpeed scrolling, ergonomic design. Perfect for productivity.',
    price: 85000,
    category: 'Accessories',
    brand: 'Logitech',
    stock: 14,
    rating: 4.6,
    numReviews: 390,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
  },
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