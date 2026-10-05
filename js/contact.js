const whatsappNumber = '919624695831';

document.querySelectorAll('[data-wa]').forEach(a => {
  a.onclick = e => {
    e.preventDefault();
    const message = 'Hello, I would like to enquire about a table or event at Ember & Crumb.';
    window.open('https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message), '_blank');
  };
});
