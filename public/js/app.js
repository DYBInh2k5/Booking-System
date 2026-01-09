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
    
    // Form validation for booking
    const bookingForm = document.querySelector('form[action="/bookings"]');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const checkinInput = this.querySelector('input[name="check_in_date"]');
            const checkoutInput = this.querySelector('input[name="check_out_date"]');
            
            if (checkinInput && checkoutInput) {
                const checkin = new Date(checkinInput.value);
                const checkout = new Date(checkoutInput.value);
                
                if (checkout <= checkin) {
                    e.preventDefault();
                    showAlert('Ngày trả phòng/về phải sau ngày nhận phòng/khởi hành', 'danger');
                    return false;
                }
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

function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert-dismissible');
    existingAlerts.forEach(alert => alert.remove());
    
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