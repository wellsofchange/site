// i18next and localization functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language data with flags and native names
    const languageData = {
        'en': { flag: '🇺🇸', name: 'English' },
        'pt-BR': { flag: '🇧🇷', name: 'Português' },
        'fr': { flag: '🇫🇷', name: 'Français' },
        'es': { flag: '🇪🇸', name: 'Español' }
    };

    // Determine if we're on GitHub Pages or local
    const isGitHubPages = location.hostname.includes('github.io');

    // Set the base URL for translations based on environment
    const baseUrl = isGitHubPages ? '/wellsofchange/site' : '';

    // Initialize i18next
    i18next
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
            // Make i18next globally available
            window.i18next = i18next;
            // Update content with translations
            updateContent();
        });

    // Update all content with translations
    function updateContent() {
        try {
            const currentLang = i18next.language;
            const langInfo = languageData[currentLang] || languageData['en'];

            // Update FAB display
            const currentLanguageDisplay = document.getElementById('current-language-display');
            if (currentLanguageDisplay) {
                currentLanguageDisplay.textContent = `${langInfo.flag} ${langInfo.name}`;
            }

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
            document.title = i18next.t('title');

        } catch (error) {
            console.error('Error updating content:', error);
        }
    }

    // Helper function to translate an element by ID
    function translateElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = i18next.t(id);
        }
    }

    // Helper function to translate a button by ID
    function translateButton(id) {
        const button = document.getElementById(id);
        if (button) {
            const label = button.querySelector('.mdc-button__label');
            if (label) {
                label.textContent = i18next.t(id);
            }
        }
    }
    
    function changeLang(lng) {
        i18next.changeLanguage(lng, function(err, t) {
            if (err) {
                console.error('Error changing language:', err);
            }
            updateContent();
        });
    }

    // Make changeLang function globally available
    window.changeLang = changeLang;

    // Language FAB toggle
    const languageFabButton = document.querySelector('.language-fab-button');
    const languageMenu = document.getElementById('language-menu');

    languageFabButton.addEventListener('click', () => {
        languageMenu.classList.toggle('open');
    });

    // Close language menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!languageFabButton.contains(event.target) && !languageMenu.contains(event.target)) {
            languageMenu.classList.remove('open');
        }
    });

    // Language selector event listeners
    document.querySelectorAll('.language-selector').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const lang = this.getAttribute('data-lang');
            const flag = this.getAttribute('data-flag');

            // Change language
            changeLang(lang);

            // Update FAB display immediately for better UX
            document.getElementById('current-language-display').textContent = `${flag} ${this.querySelector('.mdc-button__label').textContent}`;

            // Close the menu
            languageMenu.classList.remove('open');
        });
    });

    // Initialize the active language button based on default language ('en')
    // (This avoids the i18next reference error by not using it directly)
    const defaultLanguage = 'en';
    const initialLangButton = document.querySelector(`.language-selector[data-lang="${defaultLanguage}"]`);
    if (initialLangButton) {
        initialLangButton.classList.remove('mdc-button--outlined');
        initialLangButton.classList.add('mdc-button--raised');
    }
});
