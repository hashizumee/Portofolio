// ===============================================
// CONTACT FORM FUNCTIONALITY
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (!contactForm) return;
    
    // ===============================================
    // Form Validation
    // ===============================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validateForm(formData) {
        const errors = [];
        
        // Validate name
        if (formData.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        // Validate email
        if (!validateEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Validate message
        if (formData.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        return errors;
    }
    
    // ===============================================
    // Form Input Handlers
    // ===============================================
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Real-time validation feedback
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        // Remove error on input
        input.addEventListener('input', () => {
            removeError(input);
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && value === '') {
            showError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'email' && value !== '' && !validateEmail(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        
        if (input.name === 'name' && value.length > 0 && value.length < 2) {
            showError(input, 'Name must be at least 2 characters');
            return false;
        }
        
        if (input.name === 'message' && value.length > 0 && value.length < 10) {
            showError(input, 'Message must be at least 10 characters');
            return false;
        }
        
        removeError(input);
        return true;
    }
    
    function showError(input, message) {
        removeError(input);
        
        input.classList.add('border-red-500');
        input.classList.remove('border-gray-700');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-400 text-sm mt-1';
        errorDiv.textContent = message;
        
        input.parentElement.appendChild(errorDiv);
    }
    
    function removeError(input) {
        input.classList.remove('border-red-500');
        input.classList.add('border-gray-700');
        
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // ===============================================
    // Form Submission (INTEGRATED WITH FORMSPREE)
    // ===============================================
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            // Show errors
            alert(errors.join('\n'));
            return;
        }
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>Sending...</span>
        `;
        
        try {
            // KIRIM KE FORMSPREE
            const response = await fetch('https://formspree.io/f/mdaalbyj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Show success message
                contactForm.style.display = 'none';
                successMessage.classList.remove('hidden');
                successMessage.classList.add('flex');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message and show form after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    successMessage.classList.remove('flex');
                    contactForm.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 5000);
            } else {
                throw new Error('Formspree error');
            }
            
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
    
    // ===============================================
    // Character Counter for Message
    // ===============================================
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const minChars = 10;
        const maxChars = 500;
        
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'text-sm text-gray-400 mt-1 text-right';
        counter.textContent = `0 / ${maxChars} characters`;
        messageTextarea.parentElement.appendChild(counter);
        
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            counter.textContent = `${length} / ${maxChars} characters`;
            
            if (length < minChars) {
                counter.classList.add('text-yellow-400');
                counter.classList.remove('text-gray-400', 'text-green-400');
            } else if (length >= maxChars) {
                counter.classList.add('text-red-400');
                counter.classList.remove('text-gray-400', 'text-green-400');
            } else {
                counter.classList.add('text-green-400');
                counter.classList.remove('text-gray-400', 'text-yellow-400');
            }
        });
        
        // Enforce max length
        messageTextarea.setAttribute('maxlength', maxChars);
    }
});