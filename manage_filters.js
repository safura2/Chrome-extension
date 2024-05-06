document.addEventListener('DOMContentLoaded', function() {
  const customFilterInput = document.getElementById('custom-filter-input');
  const addCustomFilterBtn = document.getElementById('add-custom-filter-btn');
  const customFiltersList = document.getElementById('custom-filters-list');
  
  // Load custom filters from storage on DOMContentLoaded event
  loadCustomFilters();

  addCustomFilterBtn.addEventListener('click', function() {
    const customFilter = customFilterInput.value.trim();
    if (customFilter !== '' && !isFilterDuplicate(customFilter)) {
      addFilterItem(customFilter);
      saveCustomFilters(); // Save updated custom filters to storage
      customFilterInput.value = ''; // Clear input field
    } else {
      alert('Please enter a valid, non-duplicate filter name.');
    }
  });

  // Function to load custom filters from storage
  function loadCustomFilters() {
    const savedFilters = JSON.parse(localStorage.getItem('customFilters')) || [];
    savedFilters.forEach(filter => {
      addFilterItem(filter);
    });
  }

  // Function to add a custom filter to the list
  function addFilterItem(filterName) {
    const filterItem = document.createElement('div');
    filterItem.textContent = filterName;
    
    // Add remove filter option
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
      filterItem.remove();
      saveCustomFilters(); // Save updated custom filters to storage
    });
    
    filterItem.appendChild(removeButton);
    customFiltersList.appendChild(filterItem);
  }

  // Function to save custom filters to storage
  function saveCustomFilters() {
    const customFilters = Array.from(customFiltersList.children).map(item => item.textContent.replace('Remove', '').trim());
    localStorage.setItem('customFilters', JSON.stringify(customFilters));
  }

  // Function to check if a filter is a duplicate
  function isFilterDuplicate(filterName) {
    const filterItems = customFiltersList.querySelectorAll('div');
    for (const item of filterItems) {
      if (item.textContent.trim() === filterName) {
        return true;
      }
    }
    return false;
  }
});
