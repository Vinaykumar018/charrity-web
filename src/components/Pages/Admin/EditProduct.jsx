// src/admin/EditProduct.jsx
import React from "react";
import AdminLayout from "./AdminLayout";

export default function EditProduct() {
  // local state demo (replace with API state)
  const [product, setProduct] = React.useState({
    name: "Light Blue Sweat Shirt",
    category: "Watches",
    size: "M",
    price: "1299.99",
    dealerPrice: "1299.99",
    discount: "0.75",
    weight: "180gms",
    description: "Ultra soft fabric...",
  });

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <div className="text-sm text-slate-500">Pages / Edit Product</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left column - form */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                value={product.name}
                onChange={(e) => setProduct((p) => ({ ...p, name: e.target.value }))}
                className="w-full border rounded p-3 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select
                  value={product.category}
                  onChange={(e) => setProduct((p) => ({ ...p, category: e.target.value }))}
                  className="w-full border rounded p-2 text-sm"
                >
                  <option>Watches</option>
                  <option>Clothing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Size</label>
                <select className="w-full border rounded p-2 text-sm" value={product.size}>
                  <option>M</option>
                  <option>L</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Product Description</label>
              <textarea
                rows={4}
                className="w-full border rounded p-3 text-sm"
                value={product.description}
                onChange={(e) => setProduct((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Product Features</label>
              <div className="flex gap-2 items-center">
                <select className="border rounded p-2 text-sm">
                  <option>Normal</option>
                  <option>Feature</option>
                </select>
                <input className="border rounded p-2 text-sm flex-1" placeholder="Feature value" />
                <button className="bg-purple-700 text-white px-3 py-2 rounded text-sm">Add</button>
              </div>
            </div>
          </div>

          {/* right column - meta & images */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Actual Price</label>
              <input className="w-full border rounded p-2 text-sm" value={product.price} onChange={(e)=>setProduct(p=>({...p, price: e.target.value}))}/>
            </div>
            <div>
              <label className="block text-sm mb-1">Dealer Price</label>
              <input className="w-full border rounded p-2 text-sm" value={product.dealerPrice} onChange={(e)=>setProduct(p=>({...p, dealerPrice: e.target.value}))}/>
            </div>

            <div>
              <label className="block text-sm mb-1">Product Images</label>
              <div className="border-2 border-dashed border-slate-200 rounded p-6 text-center text-sm text-slate-500">
                Drag & Drop your files or <u className="cursor-pointer">Browse</u>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Warranty Documents</label>
              <div className="border-2 border-dashed border-slate-200 rounded p-4 text-center text-sm text-slate-500">
                Drag & Drop or Browse
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Publish Date</label>
              <input type="date" className="w-full border rounded p-2 text-sm" />
            </div>

            <div className="pt-3">
              <button className="w-full bg-purple-700 text-white rounded py-2 font-semibold">Save Product</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
