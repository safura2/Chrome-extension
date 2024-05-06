document.addEventListener('DOMContentLoaded', function() {
  const allFilterButton = document.getElementById('all-filter');
  const unreadFilterButton = document.getElementById('unread-filter');
  const awaitingReplyFilterButton = document.getElementById('awaiting-reply-filter');
  const needsReplyFilterButton = document.getElementById('needs-reply-filter');

  // Add event listener for filter buttons
  allFilterButton.addEventListener('click', function() {
    applyFilter('all');
  });

  unreadFilterButton.addEventListener('click', function() {
    applyFilter('unread');
  });

  awaitingReplyFilterButton.addEventListener('click', function() {
    applyFilter('awaiting-reply');
  });

  needsReplyFilterButton.addEventListener('click', function() {
    applyFilter('needs-reply');
  });

  // Add event listener for saving notes
  const saveNotesButton = document.getElementById('save-notes');
  saveNotesButton.addEventListener('click', function() {
    const notes = document.getElementById('notes').value; // Assuming you have an input field or textarea with id 'notes' for users to input notes
    // Send message to content script to save notes
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'saveNotes', notes: notes});
    });
  });
});

function applyFilter(filter) {
  // Send message to content script to trigger filtering based on selected filter
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'filterContacts', criteria: filter});
  });
}
