const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'ropa', name: 'Ropa' },
    { id: 'zapatos', name: 'Zapatos' },
    { id: 'accesorios', name: 'Accesorios' },
  ];
  
  const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
    return (
      <div className="mb-8 justify-center items-center flex flex-col bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Filtrar por categoría:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-current={selectedCategory === category.id ? 'page' : undefined}
              aria-label={`Filtrar por ${category.name}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default CategoryFilter;