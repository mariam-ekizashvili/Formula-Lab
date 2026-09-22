document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScrollTop = 0;
    const scrollThreshold = 50;
    const drawerCheckbox = document.getElementById('my-drawer-1');

    window.addEventListener('scroll', function() {
        
        if (drawerCheckbox && drawerCheckbox.checked) return;

        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll <= 0) {
            navbar.classList.remove('-translate-y-full');
            return;
        }

        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            
            navbar.classList.add('-translate-y-full');
        } else if (currentScroll < lastScrollTop) {
            
            navbar.classList.remove('-translate-y-full');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);


    if (drawerCheckbox) {
        drawerCheckbox.addEventListener('change', function() {
            if (this.checked) {
                
                navbar.classList.remove('-translate-y-full');
            }
        });
    }
});