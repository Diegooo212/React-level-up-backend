import React, { useState } from 'react';
import { categories as initialCategories } from '../../data/categories';
import { Category } from '../../types/Category';
import '../../style/adminCategories.css';

const emptyCategory: Category = {
  id: '',
  name: '',
  img: '', 
  link: '', 
  description: '' 
};

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddNew = () => {
    setCurrentCategory(emptyCategory);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleDelete = (categoryId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      setCategories(prevCategories =>
        prevCategories.filter(c => c.id !== categoryId)
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCategory(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentCategory) return;
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!currentCategory) return;

    const isEditing = categories.some(c => c.id === currentCategory.id);

    if (isEditing) {
      setCategories(prevCategories =>
        prevCategories.map(c =>
          c.id === currentCategory.id ? currentCategory : c
        )
      );
    } else {
      const newCategory = {
        ...currentCategory,
        id: `cat-${Date.now()}` 
      };
      setCategories(prevCategories => [newCategory, ...prevCategories]);
    }
    handleCloseModal();
  };

  return (
    <div className="admin-page-container">
      
      <div className="admin-page-header">
        <h1>Gestión de Categorías ({categories.length})</h1>
        <button onClick={handleAddNew} className="admin-add-btn">
          + Agregar Nueva Categoría
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-categories-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre de Categoría</th>
              <th>ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>
                  <img src={category.img} alt={category.name} className="table-category-img" />
                </td>
                <td>{category.name}</td>
                <td>{category.id}</td>
                <td>
                  <button onClick={() => handleEdit(category)} className="admin-edit-btn">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="admin-delete-btn">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === MODAL PARA CREAR/EDITAR === */}
      {showModal && currentCategory && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{currentCategory.id === '' ? 'Agregar Categoría' : 'Editar Categoría'}</h2>
            
            
            <form className="modal-form" autoComplete="off">
              <div className="form-group">
                <label htmlFor="name">Nombre de la Categoría</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentCategory.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="img">URL de Imagen</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={currentCategory.img}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="link">Ruta del Link (ej: /productos/monitores)</label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={currentCategory.link}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={currentCategory.description}
                  onChange={handleChange}
                  rows={3} 
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-cancel">
                  Cancelar
                </button>
                
                
                <button 
                  type="button" 
                  onClick={handleSubmit} 
                  className="btn-save"
                >
                  {currentCategory.id === '' ? 'Guardar' : 'Actualizar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;