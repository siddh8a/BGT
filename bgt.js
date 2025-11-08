// Mobile menu toggle
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Modal Logic References
const modal = document.getElementById('registration-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');

// Function to show/hide modal with smooth transitions
function toggleModal(show) {
    if (show) {
        modal.classList.remove('hidden');
        // Trigger reflow to ensure transitions work
        void modal.offsetWidth;
        modalBackdrop.classList.remove('opacity-0');
        modalContent.classList.remove('opacity-0', 'scale-95');
        modalContent.classList.add('opacity-100', 'scale-100');
    } else {
        modalBackdrop.classList.add('opacity-0');
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        // Wait for transition to finish before hiding element
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

// Mock Form Submission Handler
function handleRegistration(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const messageBox = document.getElementById('submission-message');
    
    // Show success message
    messageBox.innerHTML = `
        <div class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start space-x-3">
            <span class="text-emerald-400 text-xl">🎉</span>
            <div>
                <h4 class="text-emerald-400 font-bold">You're on the list, ${name}!</h4>
                <p class="text-emerald-400/80 text-sm mt-1">Keep practicing. We'll be in touch soon.</p>
            </div>
        </div>
    `;
    event.target.reset();
    event.target.classList.add('hidden'); // Hide form temporarily
    
    // Auto-close modal after 3 seconds
    setTimeout(() => {
        toggleModal(false);
        // Reset form visibility after modal closes
        setTimeout(() => {
            messageBox.innerHTML = '';
            event.target.classList.remove('hidden');
        }, 500);
    }, 3000);
}

// Initialize Event Listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Open modal buttons
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
        btn.addEventListener('click', () => toggleModal(true));
    });

    // Close modal buttons
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => toggleModal(false));
    });

    // Form submission
    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', handleRegistration);
    }

    // Close modal when clicking outside content area
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === modalBackdrop) {
                toggleModal(false);
            }
        });
    }
});