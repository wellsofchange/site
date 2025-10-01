// i18next and localization functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language data with flags and native names
    const languageData = {
        'en': { flag: '🇺🇸', name: 'English' },
        'pt-BR': { flag: '🇧🇷', name: 'Português' },
        'fr': { flag: '🇫🇷', name: 'Français' },
        'es': { flag: '🇪🇸', name: 'Español' }
    };

    // Make changeLang function globally available immediately
    // Create a placeholder function that will be replaced once i18next is loaded
    window.changeLang = function(lng) {
        console.log('Translation system not fully loaded yet, will change to', lng, 'when ready');
        // Store the requested language to apply once i18next is loaded
        window._pendingLanguage = lng;
    };

    // Setup the language FAB functionality immediately
    setupLanguageFAB();

    // Check if i18next is already loaded
    function initializeTranslationSystem() {
        // Wait for i18next to be defined globally
        if (typeof window.i18next === 'undefined') {
            console.log('i18next not loaded yet, waiting...');
            setTimeout(initializeTranslationSystem, 100);
            return;
        }

        // Determine if we're on GitHub Pages or local
        const isGitHubPages = location.hostname.includes('github.io');

        // Set the base URL for translations based on environment
        const baseUrl = isGitHubPages ? '/wellsofchange/site' : '';

        // Initialize i18next
        window.i18next
            .use(i18nextHttpBackend)
            .init({
                lng: 'en',
                fallbackLng: 'en',
                debug: false,
                backend: {
                    loadPath: `${baseUrl}/locales/{{lng}}/translation.json`
                },
            }, function(err, t) {
                if (err) {
                    console.error('Error loading translations:', err);
                }

                // Now that i18next is loaded, replace the placeholder changeLang function
                window.changeLang = function(lng) {
                    window.i18next.changeLanguage(lng, function(err, t) {
                        if (err) {
                            console.error('Error changing language:', err);
                        }
                        updateContent();
                    });
                };

                // Check if there was a pending language change request
                if (window._pendingLanguage) {
                    window.changeLang(window._pendingLanguage);
                    delete window._pendingLanguage;
                } else {
                    // Just update the content with the default language
                    updateContent();
                }
            });
    }

    // Start the initialization process
    initializeTranslationSystem();

    // Update all content with translations
    function updateContent() {
        try {
            const currentLang = window.i18next.language;
            const langInfo = languageData[currentLang] || languageData['en'];

            // Update FAB display
            const currentLanguageDisplay = document.getElementById('current-language-display');
            if (currentLanguageDisplay) {
                currentLanguageDisplay.textContent = `${langInfo.flag} ${langInfo.name}`;
            }

            // Update active language button visual state
            updateLanguageButtonState(currentLang);

            // Translate all content by ID
            translateElement('title');
            translateElement('title_footer');
            translateElement('hero_title');
            translateElement('hero_subtitle');
            translateButton('hero_cta');

            // Stats section
            translateElement('stats_wells');
            translateElement('stats_wells_label');
            translateElement('stats_lives');
            translateElement('stats_lives_label');
            translateElement('stats_countries');
            translateElement('stats_countries_label');
            translateElement('stats_funds');
            translateElement('stats_funds_label');

            // About section
            translateElement('about_title');
            translateElement('about_subtitle');
            translateElement('about_text');
            translateElement('about_text_2');

            // Projects section
            translateElement('projects_title');
            translateElement('projects_subtitle');
            translateElement('project_1_title');
            translateElement('project_1_desc');
            translateElement('project_2_title');
            translateElement('project_2_desc');
            translateElement('project_3_title');
            translateElement('project_3_desc');
            translateElement('project_button_1');
            translateElement('project_button_2');
            translateElement('project_button_3');

            // Impact section
            translateElement('impact_title');
            translateElement('impact_subtitle');
            translateElement('impact_1_title');
            translateElement('impact_1_text');
            translateElement('impact_2_title');
            translateElement('impact_2_text');
            translateElement('impact_3_title');
            translateElement('impact_3_text');

            // Contact section
            translateElement('contact_title');
            translateElement('contact_text');
            translateElement('contact_description');
            translateButton('contact_button');

            // Footer
            translateElement('footer_tagline');
            translateElement('footer_links');
            translateElement('footer_about');
            translateElement('footer_projects');
            translateElement('footer_impact');
            translateElement('footer_contact');
            translateElement('footer_connect');
            translateElement('footer_copyright');

            // Update the document title
            document.title = window.i18next.t('title');

        } catch (error) {
            console.error('Error updating content:', error);
        }
    }

    // Helper function to translate an element by ID
    function translateElement(id) {
        const element = document.getElementById(id);
        if (element && window.i18next) {
            try {
                element.textContent = window.i18next.t(id);
            } catch (e) {
                console.warn(`Could not translate element ${id}:`, e);
            }
        }
    }

    // Helper function to translate a button by ID
    function translateButton(id) {
        const button = document.getElementById(id);
        if (button && window.i18next) {
            const label = button.querySelector('.mdc-button__label');
            if (label) {
                try {
                    label.textContent = window.i18next.t(id);
                } catch (e) {
                    console.warn(`Could not translate button ${id}:`, e);
                }
            }
        }
    }

    // Set up the language FAB and event listeners
    function setupLanguageFAB() {
        const languageFabButton = document.querySelector('.language-fab-button');
        const languageMenu = document.getElementById('language-menu');

        // Initialize ripple effect for FAB
        if (languageFabButton) {
            new mdc.ripple.MDCRipple(languageFabButton);

            languageFabButton.addEventListener('click', () => {
                languageMenu.classList.toggle('open');
            });
        }

        // Close language menu when clicking outside
        document.addEventListener('click', (event) => {
            if (languageMenu && languageFabButton && !languageFabButton.contains(event.target) && !languageMenu.contains(event.target)) {
                languageMenu.classList.remove('open');
            }
        });

        // Set up language selector buttons
        document.querySelectorAll('.language-selector').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();

                const lang = this.getAttribute('data-lang');
                const flag = this.getAttribute('data-flag');
                const name = this.querySelector('.mdc-button__label').textContent;

                // Update FAB display immediately for better UX
                const currentLanguageDisplay = document.getElementById('current-language-display');
                if (currentLanguageDisplay) {
                    currentLanguageDisplay.textContent = `${flag} ${name}`;
                }

                // Update button state
                updateLanguageButtonState(lang);

                // Change language
                window.changeLang(lang);

                // Close menu
                if (languageMenu) {
                    languageMenu.classList.remove('open');
                }
            });
        });

        // Set initial active button state
        updateLanguageButtonState('en');
    }

    // Update the visual state of language buttons
    function updateLanguageButtonState(selectedLang) {
        document.querySelectorAll('.language-selector').forEach(btn => {
            const lang = btn.getAttribute('data-lang');

            // Reset all buttons
            btn.classList.remove('mdc-button--raised');
            btn.classList.add('mdc-button--outlined');

            // Set active state for selected language
            if (lang === selectedLang) {
                btn.classList.remove('mdc-button--outlined');
                btn.classList.add('mdc-button--raised');
            }
        });
    }
});
