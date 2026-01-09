import Rails from "@rails/ujs"
import Turbo from "@hotwired/turbo-rails"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbo.start()
ActiveStorage.start()

// AJAX form handling
document.addEventListener('DOMContentLoaded', function() {
  // Handle flight search (both home and search page)
  const flightSearchForms = document.querySelectorAll('#flight-search-form, #advanced-flight-search');
  flightSearchForms.forEach(form => {
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoading();
        
        const formData = new FormData(this);
        
        fetch('/search/flights', {
          method: 'POST',
          headers: {
            'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
          },
          body: formData
        })
        .then(response => response.text())
        .then(html => {
          hideLoading();
          displayResults(html);
        })
        .catch(error => {
          console.error('Error:', error);
          hideLoading();
          showAlert('Có lỗi xảy ra khi tìm kiếm chuyến bay', 'danger');
        });
      });
    }
  });
  
  // Handle hotel search (both home and search page)
  const hotelSearchForms = document.querySelectorAll('#hotel-search-form, #advanced-hotel-search');
  hotelSearchForms.forEach(form => {
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoading();
        
        const formData = new FormData(this);
        
        fetch('/search/hotels', {
          method: 'POST',
          headers: {
            'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
          },
          body: formData
        })
        .then(response => response.text())
        .then(html => {
          hideLoading();
          displayResults(html);
        })
        .catch(error => {
          console.error('Error:', error);
          hideLoading();
          showAlert('Có lỗi xảy ra khi tìm kiếm khách sạn', 'danger');
        });
      });
    }
  });
  
  // Auto-update checkout date when checkin date changes
  const checkinDate = document.querySelector('#advanced-hotel-search input[name="check_in_date"]');
  const checkoutDate = document.querySelector('#advanced-hotel-search input[name="check_out_date"]');
  
  if (checkinDate && checkoutDate) {
    checkinDate.addEventListener('change', function() {
      const checkinValue = new Date(this.value);
      const minCheckout = new Date(checkinValue);
      minCheckout.setDate(minCheckout.getDate() + 1);
      
      checkoutDate.min = minCheckout.toISOString().split('T')[0];
      
      if (checkoutDate.value && new Date(checkoutDate.value) <= checkinValue) {
        checkoutDate.value = minCheckout.toISOString().split('T')[0];
      }
    });
  }
});

function displayResults(html) {
  const resultsContainer = document.getElementById('search-results');
  if (resultsContainer) {
    resultsContainer.innerHTML = html;
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

function showLoading() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  }
}

function hideLoading() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'});
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const mainContainer = document.querySelector('main');
  if (mainContainer) {
    mainContainer.insertBefore(alertDiv, mainContainer.firstChild);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }
}