import React from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input type='checkbox'/>
    </div>
  );
}

export default SearchBar;
