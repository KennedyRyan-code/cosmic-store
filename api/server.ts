
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
const SALT_ROUNDS = 10;

app.use(cors() as any);
app.use(express.json() as any);
app.get('/', (req, res) => {
  res.json({ message: 'CosmicStore API is running 🚀', status: 'OK' });
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/cosmicstore',
});

const SEED_CATEGORIES = [
  'All Categories',
  'Smartphones',
  'Laptops',
  'Headphones',
  'Cameras',
  'Tablets',
  'Accessories'
];

const formatProduct = (p: any) => ({
  ...p,
  price: parseFloat(p.price),
  originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
  rating: parseFloat(p.rating),
  reviews: p.reviews_count,
  tags: p.tags || [],
  isNew: p.stock > 0
});

const SEED_PRODUCTS = [
  {
    id: '1',
    name: 'BQ618 Bluetooth Wireless Headphone - Black',
    category: 'Headphones',
    price: 309.99,
    originalPrice: 400.00,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    rating: 4,
    reviews: 12,
    description: 'High-quality wireless sound with adaptive noise cancellation.',
    tags: ['wireless', 'audio', 'premium'],
    stock: 15
  },
  {
    id: '2',
    name: 'Samsung Galaxy J7 Prime - 5.5" - 32GB - Single SIM',
    category: 'Smartphones',
    price: 249.99,
    originalPrice: 299.99,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 156,
    description: 'Reliable smartphone with a brilliant display.',
    tags: ['mobile', 'samsung'],
    stock: 20
  },
  {
    id: '3',
    name: 'Lenovo IdeaPad 110-15ISK Laptop - 15.6"',
    category: 'Laptops',
    price: 500.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
    rating: 4,
    reviews: 48,
    description: 'Perfect for everyday computing tasks.',
    tags: ['lenovo', 'laptop', 'office'],
    stock: 10
  },
  {
    id: '4',
    name: 'Xiaomi Redmi 4X - 5" - 16GB - 2GB RAM',
    category: 'Smartphones',
    price: 99.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 83,
    description: 'Compact and powerful smartphone for value seekers.',
    tags: ['xiaomi', 'redmi'],
    stock: 35
  },
  {
    id: '5',
    name: 'Infinix (X572) Note 4 - 5.7" - 13MP Camera',
    category: 'Smartphones',
    price: 309.99,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop',
    rating: 4,
    reviews: 12,
    description: 'Large screen and great camera for the price.',
    tags: ['infinix', 'smartphone'],
    stock: 5
  },
  {
    id: '6',
    name: 'Bluedio F800 ANC Noise Cancelling Bluetooth',
    category: 'Headphones',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    reviews: 156,
    description: 'Immersive audio with active noise cancellation.',
    tags: ['bluedio', 'audio'],
    stock: 12
  }
];

const SEED_BLOGS = [
  {
    id: 'b1',
    title: 'What Can You Do To Save Your Technology From Destruction By Social Media?',
    excerpt: 'Explore the impact of social media habits on your hardware longevity and mental focus.',
    content: 'Social media can be a double-edged sword...',
    author: 'Elena Vance',
    date: 'March 24, 2024',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    category: 'Tech Safety',
    readTime: '5 min read'
  },
  {
    id: 'b2',
    title: '5 Surefire Ways Technology Will Drive Your Business Into The Ground',
    excerpt: 'A critical look at over-automation and technological dependency in modern businesses.',
    content: 'While automation increases efficiency...',
    author: 'Mark Sterling',
    date: 'March 20, 2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    category: 'Business',
    readTime: '8 min read'
  }
];

const initDb = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS advertisements (
        id VARCHAR(50) PRIMARY KEY,
        title TEXT,
        subtitle TEXT,
        image TEXT,
        link TEXT,
        ad_type VARCHAR(20),
        price TEXT,
        sale_text TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        image TEXT NOT NULL,
        description TEXT,
        stock INTEGER DEFAULT 0,
        rating DECIMAL(3, 1) DEFAULT 5.0,
        reviews_count INTEGER DEFAULT 0,
        tags TEXT[]
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(50) PRIMARY KEY,
        product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(50) PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        author TEXT,
        date TEXT,
        image TEXT,
        category TEXT,
        read_time TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY,
        name TEXT,
        password TEXT,
        role TEXT DEFAULT 'user',
        loyalty_points INTEGER DEFAULT 0,
        avatar TEXT,
        location TEXT,
        preferences JSONB DEFAULT '{}'::jsonb,
        cart JSONB DEFAULT '[]'::jsonb
      )
    `);

    // Migrations
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT`);
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT`);
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS location TEXT`);
    await client.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[]`);

    // Seed/Force Admin User
    const hashedPassword = await bcrypt.hash('Admin123', SALT_ROUNDS);
    await client.query(
      `INSERT INTO users (email, name, password, role, loyalty_points, preferences) 
       VALUES ($1, $2, $3, 'admin', 9999, '{"newsletter": false, "darkMode": true}'::jsonb)
       ON CONFLICT (email) DO UPDATE SET 
         password = EXCLUDED.password,
         role = 'admin',
         name = 'Super Admin'`,
      ['admin@cosmicstore.com', 'Super Admin', hashedPassword]
    );
    console.log('✅ Admin User Verified/Updated');

    // Seed Data if Tables are Empty
    const catCount = await client.query('SELECT COUNT(*) FROM categories');
    if (parseInt(catCount.rows[0].count) === 0) {
      console.log('Seeding Categories...');
      for (const [index, name] of SEED_CATEGORIES.entries()) {
        await client.query('INSERT INTO categories (id, name) VALUES ($1, $2)', [index.toString(), name]);
      }
    }

    const prodCount = await client.query('SELECT COUNT(*) FROM products');
    if (parseInt(prodCount.rows[0].count) === 0) {
      console.log('Seeding Products...');
      for (const p of SEED_PRODUCTS) {
        await client.query(
          'INSERT INTO products (id, name, category, price, original_price, image, description, stock, rating, reviews_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          [p.id, p.name, p.category, p.price, p.originalPrice || null, p.image, p.description, p.stock, p.rating, p.reviews]
        );
      }
    }

    const blogCount = await client.query('SELECT COUNT(*) FROM blogs');
    if (parseInt(blogCount.rows[0].count) === 0) {
      console.log('Seeding Blogs...');
      for (const b of SEED_BLOGS) {
        await client.query(
          'INSERT INTO blogs (id, title, excerpt, content, author, date, image, category, read_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [b.id, b.title, b.excerpt, b.content, b.author, b.date, b.image, b.category, b.readTime]
        );
      }
    }

    await client.query('COMMIT');
    console.log('✅ PostgreSQL Tables Initialized & Seeded');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Database Initialization Error:', error);
  } finally {
    client.release();
  }
};

initDb();

// --- Categories ---
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  const { id, name } = req.body;
  try {
    const result = await pool.query('INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *', [id, name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category' });
  }
});

// --- Advertisements ---
app.get('/api/advertisements', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM advertisements');
    res.json(result.rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      image: row.image,
      link: row.link,
      adType: row.ad_type,
      price: row.price,
      saleText: row.sale_text
    })));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advertisements' });
  }
});

app.post('/api/advertisements', async (req, res) => {
  const { id, title, subtitle, image, link, adType, price, saleText } = req.body;
  try {
    const query = `
      INSERT INTO advertisements (id, title, subtitle, image, link, ad_type, price, sale_text)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const result = await pool.query(query, [id, title, subtitle, image, link, adType, price, saleText]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ad' });
  }
});

app.put('/api/advertisements/:id', async (req, res) => {
  const { title, subtitle, image, link, adType, price, saleText } = req.body;
  try {
    const query = `
      UPDATE advertisements 
      SET title = $1, subtitle = $2, image = $3, link = $4, ad_type = $5, price = $6, sale_text = $7
      WHERE id = $8
      RETURNING *
    `;
    const result = await pool.query(query, [title, subtitle, image, link, adType, price, saleText, req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ad' });
  }
});

app.delete('/api/advertisements/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM advertisements WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting ad' });
  }
});

// --- Products ---
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows.map(formatProduct));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/api/products', async (req, res) => {
  const { id, name, category, price, originalPrice, image, description, stock, rating, reviews } = req.body;
  try {
    const query = `
      INSERT INTO products (id, name, category, price, original_price, image, description, stock, rating, reviews_count, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    const result = await pool.query(query, [id, name, category, price, originalPrice, image, description, stock, rating, reviews || 0, req.body.tags || []]);
    res.status(201).json(formatProduct(result.rows[0]));
  } catch (error) {
    res.status(400).json({ message: 'Error creating product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { name, category, price, originalPrice, image, description, stock } = req.body;
  try {
    const query = `
      UPDATE products 
      SET name = $1, category = $2, price = $3, original_price = $4, image = $5, description = $6, stock = $7
      WHERE id = $8
      RETURNING *
    `;
    const result = await pool.query(query, [name, category, price, originalPrice, image, description, stock, req.params.id]);
    res.json(formatProduct(result.rows[0]));
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product' });
  }
});

// --- Other endpoints unchanged ... ---
app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

app.post('/api/blogs', async (req, res) => {
  const { id, title, excerpt, content, author, date, image, category, readTime } = req.body;
  try {
    const query = `INSERT INTO blogs (id, title, excerpt, content, author, date, image, category, read_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const result = await pool.query(query, [id, title, excerpt, content, author, date, image, category, readTime]);
    res.status(201).json(result.rows[0]);
  } catch (error) { res.status(400).json({ message: 'Error' }); }
});

app.put('/api/blogs/:id', async (req, res) => {
  const { title, excerpt, content, author, image, category, readTime } = req.body;
  try {
    const query = `UPDATE blogs SET title = $1, excerpt = $2, content = $3, author = $4, image = $5, category = $6, read_time = $7 WHERE id = $8 RETURNING *`;
    const result = await pool.query(query, [title, excerpt, content, author, image, category, readTime, req.params.id]);
    res.json(result.rows[0]);
  } catch (error) { res.status(400).json({ message: 'Error' }); }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try { await pool.query('DELETE FROM blogs WHERE id = $1', [req.params.id]); res.status(204).send(); } catch (error) { res.status(400).json({ message: 'Error' }); }
});

app.post('/api/user/sync', async (req, res) => {
  const { email, cart, preferences, name } = req.body;
  try {
    const query = `INSERT INTO users (email, name, cart, preferences) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, cart = EXCLUDED.cart, preferences = EXCLUDED.preferences RETURNING *`;
    const result = await pool.query(query, [email, name, JSON.stringify(cart), JSON.stringify(preferences)]);
    // Remove password from response
    const { password, ...user } = result.rows[0];
    res.json(user);
  } catch (error) { res.status(500).json({ message: 'Error' }); }
});

// --- Auth Endpoints ---

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      res.status(400).json({ message: 'User already exists' }); 
      return; // Ensure we return here
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      `INSERT INTO users (email, name, password, role, loyalty_points, preferences) 
       VALUES ($1, $2, $3, 'user', 0, '{"newsletter": true, "darkMode": false}'::jsonb) 
       RETURNING *`,
      [email, name, hashedPassword]
    );

    const { password: _, ...user } = result.rows[0];
    res.status(201).json(user);
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const user = result.rows[0];
    // If user has no password (e.g. created via sync), they can't login this way
    if (!user.password) {
        res.status(400).json({ message: 'Please sign in with your provider or reset password' });
        return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const { password: _, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(700).json({ message: 'Error logging in' });
  }
});

app.post('/api/ai/greet', async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `Generate a short, enthusiastic, one-sentence greeting for a CosmicStore customer named ${req.body.name}. Mention their status as a premium member. Max 10 words.`,
    });
    // Docs and types suggest .text() but error says String has no call signatures.
    // This implies `response.text` (or result.text) is a property that is a String.
    // Or maybe `response.candidates[0].content.parts[0].text`?
    // Let's safe guard.
    // Inspecting the type error "Type 'String' has no call signatures" -> this confirms TS sees `response.text` as a String.
    // So just `.text`.
    
    // However, we need to be careful if `response` is the result object or the response object.
    // Based on previous error, `response` variable here matches `GenerateContentResponse`.
    
    // Let's try to access the text safely.
    let text = '';
    if (typeof (response as any).text === 'function') {
        text = (response as any).text();
    } else if (typeof (response as any).text === 'string') {
        text = (response as any).text;
    } else if ((response as any).response?.text) {
         // Maybe nested?
         const nested = (response as any).response;
         text = typeof nested.text === 'function' ? nested.text() : nested.text;
    }
    
    // If the above is too complex, let's just trust the TS error which says it IS a String non-callable.
    // So `response.text` should be it.
    
    const greetingText = (response as any).text || (response as any).response?.text?.() || '';

    res.json({ greeting: typeof greetingText === 'string' ? greetingText : String(greetingText) });
  } catch (error) { 
    console.error('AI Greet Error:', error);
    res.json({ greeting: `Welcome back, ${req.body.name}!` }); 
  }
});

app.post('/api/ai/recommend', async (req, res) => {
  try {
    const { viewedProducts, allProducts } = req.body;
    
    const viewedNames = viewedProducts.map((p: any) => p.name).join(', ');
    const allProductsContext = allProducts.map((p: any) => `${p.id}: ${p.name} (${p.category}, ${p.tags?.join(',')})`).join('\n');

    const prompt = `
      Context: A user has viewed the following products: ${viewedNames}.
      Available Products:
      ${allProductsContext}
      
      Task: Recommend 3 distinct products from the Available Products list that complement the user's viewing history.
      Return ONLY a valid JSON array of product IDs. Do not include markdown formatting or explanations.
      Example: ["1", "5", "8"]
    `;

    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    
    // Same fix here.
    const rawText = (result as any).text || (result as any).response?.text?.() || '{}';
    const text = typeof rawText === 'string' ? rawText.replace(/```json|```/g, '').trim() : String(rawText);
    
    const recommendedIds = JSON.parse(text);
    
    const recommendations = allProducts.filter((p: any) => recommendedIds.includes(p.id));
    res.json(recommendations);
  } catch (error) {
    console.error('AI Recommend Error:', error);
    // Fallback: return random products not in viewed list
    const viewedIds = req.body.viewedProducts.map((p: any) => p.id);
    const fallback = req.body.allProducts
      .filter((p: any) => !viewedIds.includes(p.id))
      .slice(0, 3);
    res.json(fallback);
  }
});

app.listen(PORT, () => { console.log(`🚀 CosmicStore Server running on http://localhost:${PORT}`); });

// Export for Vercel
module.exports = app;