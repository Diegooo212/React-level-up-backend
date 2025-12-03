import React, { useState } from 'react';

// Importamos las categorías y el tipo
import { categories } from '../../data/categories';
import { Category } from '../../types/Category';

import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types/Product';
import '../../style/adminProductos.css'; 

const emptyProduct: Product = {
  id: '', 
  name: '',
  brand: '',
  category: '',
  description: '',
  price: 0,
  stock: 0,
  img: '', 
  onSale: false,
  discountPrice: 0,
};

const AdminProductos = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');

  const allBrands = products.map(p => p.brand);
  const brandSet = new Set<string>(
    allBrands.filter((brand): brand is string => typeof brand === 'string' && brand.length > 0)
  );
  const uniqueBrands = Array.from(brandSet).sort();

  const handleAddNew = () => {
    setCurrentProduct(emptyProduct); 
    setShowModal(true); 
  };
  const handleEdit = (product: Product) => {
    setCurrentProduct(product); 
    setShowModal(true); 
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProduct(null); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentProduct) return;
    const { name, value, type } = e.target;
    let finalValue: string | number | boolean = value;
    if (type === 'number') {
      finalValue = parseFloat(value);
    }
    if (name === 'onSale') {
      finalValue = (e.target as HTMLInputElement).checked;
    }
    setCurrentProduct({
      ...currentProduct,
      [name]: finalValue,
    });
  };

  const handleDelete = (productId: string | number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(productId); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    const isEditing = products.some(p => p.id === currentProduct.id);
    if (isEditing) {
      updateProduct(currentProduct); 
    } else {
      const newProduct = { ...currentProduct, id: currentProduct.id || `temp-${Date.now()}` };
      addProduct(newProduct); 
    }
    handleCloseModal(); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm)
  );


  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Gestión de Productos ({filteredProducts.length})</h1>
        
        <input
          type="text"
          placeholder="Buscar por nombre, categoría o marca..."
          className="admin-search-input" // Usaremos esta clase para el CSS
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button onClick={handleAddNew} className="admin-add-btn">
          + Agregar Nuevo Producto
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <img src={product.img} alt={product.name} className="table-product-img" />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEdit(product)} className="admin-edit-btn">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="admin-delete-btn">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && currentProduct && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{currentProduct.id === '' ? 'Agregar Producto' : 'Editar Producto'}</h2>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Nombre del Producto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Categoría</label>
                  <select
                    id="category"
                    name="category"
                    value={currentProduct.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map(cat => (
                      <option>
                        {cat.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Marca</label>
                  <select
                    id="brand"
                    name="brand"
                    value={currentProduct.brand}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una marca</option>
                    {uniqueBrands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Precio</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="img">URL de Imagen</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={currentProduct.img}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleChange}
                  rows={4}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-cancel">
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  {currentProduct.id === '' ? 'Guardar Producto' : 'Actualizar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductos;