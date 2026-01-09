
import React, { useState } from 'react';
import { Product, BlogPost, Category, Advertisement, AppState } from '../types';

const BACKEND_URL = 'http://localhost:5000/api';

interface AdminDashboardProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state, dispatch }) => {
  const { products, blogs, categories, advertisements } = state;
  const [activeSubTab, setActiveSubTab] = useState<'inventory' | 'blogs' | 'categories' | 'ads'>('inventory');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modals visibility
  const [activeModal, setActiveModal] = useState<'product' | 'blog' | 'category' | 'ad' | null>(null);

  // Form states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [prodForm, setProdForm] = useState<Partial<Product>>({ name: '', category: '', price: 0, stock: 0, description: '', image: '' });
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({ title: '', excerpt: '', content: '', author: '', image: '', category: '', readTime: '' });
  const [catForm, setCatForm] = useState<Partial<Category>>({ name: '' });
  const [adForm, setAdForm] = useState<Partial<Advertisement>>({ title: '', subtitle: '', image: '', link: '', adType: 'hero', price: '', saleText: '' });

  const openModal = (type: 'product' | 'blog' | 'category' | 'ad', item?: any) => {
    setEditingItem(item || null);
    setActiveModal(type);
    if (type === 'product') setProdForm(item || { name: '', category: categories[0]?.name || '', price: 0, stock: 0, description: '', image: 'https://picsum.photos/400/400' });
    if (type === 'blog') setBlogForm(item || { title: '', excerpt: '', content: '', author: 'Admin', image: 'https://picsum.photos/800/400', category: 'News', readTime: '5 min' });
    if (type === 'category') setCatForm(item || { name: '' });
    if (type === 'ad') setAdForm(item || { title: '', subtitle: '', image: 'https://picsum.photos/800/400', link: '#', adType: 'hero', price: '', saleText: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let endpoint = '';
      let body: any = {};
      let actionType = '';

      if (activeModal === 'product') { endpoint = '/products'; body = prodForm; actionType = editingItem ? 'UPDATE_PRODUCT' : 'ADD_PRODUCT'; }
      if (activeModal === 'blog') { endpoint = '/blogs'; body = blogForm; actionType = editingItem ? 'UPDATE_BLOG' : 'ADD_BLOG'; }
      if (activeModal === 'category') { endpoint = '/categories'; body = catForm; actionType = editingItem ? 'UPDATE_CATEGORY' : 'ADD_CATEGORY'; }
      if (activeModal === 'ad') { endpoint = '/advertisements'; body = adForm; actionType = editingItem ? 'UPDATE_AD' : 'ADD_AD'; }

      if (!editingItem) body.id = Math.random().toString(36).substr(2, 9);

      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `${BACKEND_URL}${endpoint}/${editingItem.id}` : `${BACKEND_URL}${endpoint}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: actionType, payload: data });
        setActiveModal(null);
        alert(`${activeModal} saved successfully!`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    try {
      const endpoint = type === 'product' ? 'products' : type === 'blog' ? 'blogs' : type === 'category' ? 'categories' : 'advertisements';
      const response = await fetch(`${BACKEND_URL}/${endpoint}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        dispatch({ type: `DELETE_${type.toUpperCase()}`, payload: id });
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-[#002e5b]">Admin Command Center</h1>
            <p className="text-gray-500 font-medium">Global platform management and asset control.</p>
          </div>
          <button 
            onClick={() => {
                if(activeSubTab === 'inventory') openModal('product');
                if(activeSubTab === 'blogs') openModal('blog');
                if(activeSubTab === 'categories') openModal('category');
                if(activeSubTab === 'ads') openModal('ad');
            }}
            className="bg-[#007bff] text-white px-8 py-3 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-600 transition-all active:scale-95"
          >
            + ADD {activeSubTab.toUpperCase().slice(0, -1)}
          </button>
        </header>

        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-2xl w-fit shadow-sm">
          {[
            { id: 'inventory', label: 'Inventory' },
            { id: 'blogs', label: 'Blogs' },
            { id: 'categories', label: 'Categories' },
            { id: 'ads', label: 'Ads' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeSubTab === tab.id ? 'bg-[#002e5b] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-6">ID / Name</th>
                <th className="px-8 py-6">Status / Category</th>
                <th className="px-8 py-6">Meta</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeSubTab === 'inventory' && products.map(p => (
                <tr key={p.id} className="hover:bg-blue-50/20">
                  <td className="px-8 py-4 font-bold text-sm">{p.name} <br/><span className="text-[10px] text-gray-400">SKU: {p.id}</span></td>
                  <td className="px-8 py-4"><span className="text-xs bg-gray-100 px-3 py-1 rounded-full">{p.category}</span></td>
                  <td className="px-8 py-4 font-black text-blue-500">${p.price}</td>
                  <td className="px-8 py-4 text-right">
                    <button onClick={() => openModal('product', p)} className="text-blue-500 font-bold mr-4">Edit</button>
                    <button onClick={() => handleDelete('product', p.id)} className="text-red-500 font-bold">Delete</button>
                  </td>
                </tr>
              ))}
              {activeSubTab === 'categories' && categories.map(c => (
                <tr key={c.id}>
                  <td className="px-8 py-6 font-bold">{c.name}</td>
                  <td className="px-8 py-6 text-gray-400 text-xs">ID: {c.id}</td>
                  <td className="px-8 py-6">---</td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => openModal('category', c)} className="text-blue-500 font-bold mr-4">Edit</button>
                    <button onClick={() => handleDelete('category', c.id)} className="text-red-500 font-bold">Delete</button>
                  </td>
                </tr>
              ))}
              {activeSubTab === 'ads' && advertisements.map(ad => (
                <tr key={ad.id}>
                  <td className="px-8 py-4 font-bold text-sm">{ad.title} <br/><span className="text-[10px] text-gray-400">{ad.subtitle}</span></td>
                  <td className="px-8 py-4"><span className="text-xs bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full uppercase font-black">{ad.adType}</span></td>
                  <td className="px-8 py-4 text-xs font-medium max-w-[200px] truncate">{ad.link}</td>
                  <td className="px-8 py-4 text-right">
                    <button onClick={() => openModal('ad', ad)} className="text-blue-500 font-bold mr-4">Edit</button>
                    <button onClick={() => handleDelete('ad', ad.id)} className="text-red-500 font-bold">Delete</button>
                  </td>
                </tr>
              ))}
              {activeSubTab === 'blogs' && blogs.map(b => (
                <tr key={b.id}>
                  <td className="px-8 py-4 font-bold text-sm max-w-[300px] truncate">{b.title}</td>
                  <td className="px-8 py-4"><span className="text-xs bg-gray-100 px-3 py-1 rounded-full">{b.category}</span></td>
                  <td className="px-8 py-4 text-xs text-gray-400">{b.date}</td>
                  <td className="px-8 py-4 text-right">
                    <button onClick={() => openModal('blog', b)} className="text-blue-500 font-bold mr-4">Edit</button>
                    <button onClick={() => handleDelete('blog', b.id)} className="text-red-500 font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unified Management Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-2xl font-black text-[#002e5b] uppercase italic">Manage {activeModal}</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-red-500">Close</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {activeModal === 'product' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Product Name</label>
                        <input required value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Category</label>
                        <select value={prodForm.category} onChange={e => setProdForm({...prodForm, category: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold">
                            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Price ($)</label>
                        <input type="number" step="0.01" value={prodForm.price} onChange={e => setProdForm({...prodForm, price: parseFloat(e.target.value)})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                    </div>
                    <div className="col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Image URL</label>
                        <input value={prodForm.image} onChange={e => setProdForm({...prodForm, image: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                    </div>
                  </div>
                )}
                {activeModal === 'category' && (
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Category Name</label>
                        <input required value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                    </div>
                )}
                {activeModal === 'ad' && (
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ad Type</label>
                            <select value={adForm.adType} onChange={e => setAdForm({...adForm, adType: e.target.value as any})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold">
                                <option value="hero">Hero Main Slider</option>
                                <option value="side">Side Promo Block</option>
                                <option value="banner">Blue Full Banner</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Title</label>
                            <input value={adForm.title} onChange={e => setAdForm({...adForm, title: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Subtitle</label>
                            <input value={adForm.subtitle} onChange={e => setAdForm({...adForm, subtitle: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Image URL</label>
                            <input value={adForm.image} onChange={e => setAdForm({...adForm, image: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Target Link</label>
                            <input value={adForm.link} onChange={e => setAdForm({...adForm, link: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Price Text (Optional)</label>
                            <input value={adForm.price} onChange={e => setAdForm({...adForm, price: e.target.value})} className="w-full px-5 py-3 bg-gray-50 rounded-xl outline-none font-bold" />
                        </div>
                    </div>
                )}
                {/* Blog form logic similar to above ... */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#002e5b] text-white py-5 rounded-3xl font-black text-sm tracking-widest uppercase hover:bg-black transition-all"
                >
                  {isSubmitting ? 'PROCESSING...' : (editingItem ? 'COMMIT CHANGES' : 'CREATE ASSET')}
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
