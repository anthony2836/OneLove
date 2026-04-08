 // Usamos un patrón de módulo ejecutable inmediatamente (IIFE) para no contaminar el ámbito global.
(function() {
    'use strict';

    // DATOS SIMULADOS DEL MENÚ (En un entorno real, esto vendría de una API/BD)
const menuData = {
    // CÓCTELES

    'rum-punch': {
        title: 'Jamaican Rum Punch',
        description: 'Una explosión cítrica y potente. Base de ron Jamaican Overproof (63%) balanceado con una mezcla de piña fresca, naranja y zumo de lima, finalizado con granadina de granada natural y una lluvia de nuez moscada recién rallada.',
        image: 'assets/img/Jamaican Rum Punch3.png',
        category: 'Cóctel  '
    },
    'marley-spirit': {
        title: 'Marley Spirit',
        description: 'El tributo visual al "One Love". Un cóctel trifásico de alta densidad: base vibrante de fresa macerada, corazón de zumo de naranja natural y una corona de licor de melón eléctrico, todo armonizado con ron blanco premium.',
        image: 'assets/img/Marley Spirit .png',
        category: 'Cóctel '
    },
    'blue-mountain': {
        title: 'Blue Mountain Martini',
        description: 'La máxima expresión del lujo cafetero. Shot de espresso extraído de granos Blue Mountain (100% Arábica), agitado vigorosamente con vodka de grano, licor de café artesanal y un toque sutil de sirope de caña orgánica.',
        image: 'assets/img/Blue Mountain Martini .png',
        category: 'Cóctel '
    },
    // ENTRANTES
    'beef-patty': {
        title: 'Jamaican Beef Patty',
        description: 'Hojaldre amarillo de cúrcuma relleno de carne de res sazonada con tomillo, pimienta de Jamaica y scotch bonnet.',
        image: 'assets/img/Jamaican Beef Patty.png',
        category: 'Entrante '
    },
    'stamp-go': {
        title: 'Stamp & Go',
        description: 'Frituras crujientes de bacalao desalado, cebolleta y especias. El snack callejero más popular de Jamaica.',
        image: 'assets/img/stamp and go .png',
        category: 'Entrante '
    },
    'plantain-cups': {
        title: 'Plantain Cups',
        description: 'Cestas de plátano macho verde frito (tostones) rellenas de gambas al ajillo con un toque de lima y cilantro.',
        image: 'assets/img/Plantain Cups .webp',
        category: 'Entrante  '
    },

    // PRINCIPALES
    'jerk-chicken': {
        title: 'Classic Jerk Chicken',
        description: 'Pollo marinado 24h en especias jerk y asado a la leña. Servido con "Rice and Peas" y plátano frito.',
        image: 'assets/img/Classic Jerk Chicken.png',
        category: 'Plato Principal'
    },
    'curry-goat': {
        title: 'Jamaican Curry Goat',
        description: 'Carne de cabra marinada en curry jamaiquino, cocinada lentamente hasta que se deshace. Un sabor intenso y reconfortante.',
        image: 'assets/img/Jamaican Curry Goat.jpeg',
        category: 'Plato Principal'
    },
    'ackee-saltfish': {
        title: 'Ackee & Saltfish',
        description: 'El plato nacional de Jamaica. Fruta ackee salteada con bacalao, pimientos, cebollas y especias tradicionales.',
        image: 'assets/img/Ackee and Saltfish.png',
        category: 'Plato Principal'
    }
};

    // DOCUMENT READY
    document.addEventListener('DOMContentLoaded', () => {
        initPreloader();
        initNavbar();
        initTabs();
        initScrollReveal();
        initProductDrawer();
        initReservationForm();
    });

    // 1. PRELOADER
    function initPreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            const hero = document.querySelector('.hero');
            
            setTimeout(() => {
                if(preloader) preloader.classList.add('hidden');
                document.body.classList.remove('loading');
                // Activamos animaciones del Hero
                if(hero) hero.classList.add('active');
            }, 1000);
        });
    }

    // 2. NAVBAR SCROLL EFFECT & ACTIVE LINKS
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-item');

        window.addEventListener('scroll', () => {
            // Efecto sticky/color
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Highlighting link activo al hacer scroll
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Ajuste de offset para cuándo se considera "activa" la sección
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 3. SISTEMA DE PESTAÑAS (MENÚ)
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Roles de accesibilidad
                tabBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
                btn.setAttribute('aria-selected', 'true');

                // Clases active
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    // 4. SCROLL REVEAL (Intersection Observer)
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        // Patrón senior: comprobar si el navegador soporta el observer
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Dejamos de observar una vez revelado para rendimiento
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.15, // 15% del elemento visible
                rootMargin: '0px 0px -50px 0px' // Trigger un poco antes de que llegue
            });

            revealElements.forEach(el => observer.observe(el));
        } else {
            // Fallback para navegadores antiguos
            revealElements.forEach(el => el.classList.add('active'));
        }
    }

    // 5. PRODUCT DRAWER (UX Senior Lógica)
    function initProductDrawer() {
        const drawer = document.getElementById('product-drawer');
        const menuCards = document.querySelectorAll('.menu-card');
        const closeBtns = document.querySelectorAll('[data-close-drawer]');
        
        // Elementos dentro del drawer a rellenar
        const dImg = document.getElementById('drawer-img');
        const dTitle = document.getElementById('drawer-title');
        const dDesc = document.getElementById('drawer-description');
        const dCat = document.getElementById('drawer-category');

        // Función abrir
        const openDrawer = (productId) => {
            const data = menuData[productId];
            if(!data) return; // Seguridad

            // Rellenar datos
            dImg.src = data.image;
            dImg.alt = data.title;
            dTitle.textContent = data.title;
            dDesc.textContent = data.description;
            dCat.textContent = data.category;

            // Mostrar drawer (Accesibilidad)
            drawer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Evitar scroll fondo

            // Trap focus (Patrón senior de accesibilidad, simplificado aquí)
            drawer.querySelector('.close-drawer').focus();
        };

        // Función cerrar
        const closeDrawer = () => {
            drawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Reactivar scroll
        };

        // Eventos abrir
        menuCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-product-id');
                openDrawer(id);
            });
        });

        // Eventos cerrar
        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeDrawer);
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') {
                closeDrawer();
            }
        });
    }

    // 6. FORMULARIO DE RESERVA (Lógica Funcional)
    function initReservationForm() {
        const form = document.getElementById('reservaForm');
        const messageDiv = document.getElementById('form-message');

        if(!form) return;

        // Establecer fecha mínima como "hoy" en el input date
        const dateInput = document.getElementById('fecha');
        if(dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga real
            
            // Simulación de envío (Senior feedback UX)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // UI State: Cargando
            submitBtn.textContent = 'Procesando...';
            submitBtn.disabled = true;
            messageDiv.hidden = true;
            messageDiv.className = 'form-message';

            // Recoger datos (para simular que hacemos algo con ellos)
            const formData = new FormData(form);
            const reserva = Object.fromEntries(formData.entries());

            // Simular latencia de red (1.5s)
            setTimeout(() => {
                // UI State: Éxito (Simulado siempre éxito para el ejemplo)
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                messageDiv.hidden = false;
                messageDiv.classList.add('success');
                messageDiv.textContent = `¡Gracias ${reserva.nombre}! Tu solicitud de reserva para el ${reserva.fecha} a las ${reserva.hora} ha sido enviada. Te confirmaremos por email pronto.`;

                form.reset(); // Limpiar formulario

                // Scroll suave al mensaje
                messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            }, 1500);
        });
    }

 })();