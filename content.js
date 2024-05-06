

// Function to filter contacts based on criteria
function filterContacts(criteria) {
  const contacts = document.querySelectorAll('._210SC'); // Selector for contact elements

  contacts.forEach(contact => {
    const contactId = getContactId(contact); // Retrieve the contact ID
    const name = contact.querySelector('._3CneP').textContent.toLowerCase(); // Selector for contact name
    const status = contact.querySelector('._2z6nI').textContent.toLowerCase(); // Selector for contact status

    let display = false;

    // Check if the contact matches the default filter criteria (e.g., "online", "offline", etc.)
    if (criteria === 'online') {
      if (status.includes('online')) {
        display = true;
      }
    } else if (criteria === 'offline') {
      if (!status.includes('online')) {
        display = true;
      }
    }
    
    // Check if the contact matches any of the custom filters
    const customFilters = getCustomFilters(); // Retrieve custom filters
    customFilters.forEach(filter => {
      if (name.includes(filter.toLowerCase())) {
        display = true;
      }
    });

    // Display or hide the contact based on the matching criteria
    if (display) {
      contact.style.display = 'block'; // Show the contact
    } else {
      contact.style.display = 'none'; // Hide the contact
    }
  });
}

// Function to retrieve custom filters from local storage
function getCustomFilters() {
  const customFilters = JSON.parse(localStorage.getItem('customFilters')) || [];
  return customFilters;
}

// Function to store contact details and notes in IndexedDB
function storeContactDetails(contactDetails) {
  var request = indexedDB.open('contactsDB', 1);

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('notes', 'notes', { unique: false }); // Index for notes
  };

  request.onerror = function(event) {
    console.error('Database error: ' + event.target.errorCode);
  };

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(['contacts'], 'readwrite');
    var objectStore = transaction.objectStore('contacts');
    var request = objectStore.add(contactDetails);

    request.onsuccess = function(event) {
      console.log('Contact details stored successfully');
    };

    request.onerror = function(event) {
      console.error('Error storing contact details: ' + event.target.errorCode);
    };
  };
}

// Function to save notes for a contact in IndexedDB
function saveNotes(contactId, notes) {
  var request = indexedDB.open('contactsDB', 1);

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(['contacts'], 'readwrite');
    var objectStore = transaction.objectStore('contacts');
    var getRequest = objectStore.get(contactId);

    getRequest.onsuccess = function(event) {
      var contact = event.target.result;
      contact.notes = notes;
      objectStore.put(contact);
    };

    transaction.onerror = function(event) {
      console.error('Transaction error: ' + event.target.errorCode);
    };
  };

  request.onerror = function(event) {
    console.error('Database error: ' + event.target.errorCode);
  };
}

// Listen for messages from popup.js to trigger filtering based on custom filters
// Listen for messages from popup.js to add custom filters
// Listen for messages from popup.js to add custom filters
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'addCustomFilter') {
    // Process the custom filter and add it to the filter logic
    const customFilter = request.customFilter;
    // Implement the logic to handle the custom filter
    console.log('Custom filter added:', customFilter);
  }
});


