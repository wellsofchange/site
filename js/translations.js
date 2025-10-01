// i18next and localization functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language data with flags and native names
    const languageData = {
        'en': { flag: '🇺🇸', name: 'English' },
        'pt-BR': { flag: '🇧🇷', name: 'Português' },
        'fr': { flag: '🇫🇷', name: 'Français' },
        'es': { flag: '🇪🇸', name: 'Español' }
    };

    // Initialize Material Design menu
    const menu = new mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));
    const menuButton = document.querySelector('.language-menu-button');

    menuButton.addEventListener('click', function() {
        menu.open = !menu.open;
    });

    // Initialize i18next
    i18next
        .use(i18nextHttpBackend)
        .init({
            lng: 'en',
            fallbackLng: 'en',
            debug: false,
            backend: {
                loadPath: 'locales/{{lng}}/translation.json'
            },
        }, function(err, t) {
            updateContent();
        });

    // Update all content with translations
    function updateContent() {
        const currentLang = i18next.language;
        const langInfo = languageData[currentLang] || languageData['en'];

        // Update FAB display
        document.getElementById('current-language-display').textContent = `${langInfo.flag} ${langInfo.name}`;

        // Close language menu
        document.getElementById('language-menu').classList.remove('open');

        // Navigation and general elements
        document.getElementById('title').textContent = i18next.t('title');
        document.getElementById('title_footer').textContent = i18next.t('title');

        // Desktop navigation
        document.getElementById('nav_about').querySelector('.mdc-button__label').textContent = i18next.t('nav_about');
        document.getElementById('nav_projects').querySelector('.mdc-button__label').textContent = i18next.t('nav_projects');
        document.getElementById('nav_impact').querySelector('.mdc-button__label').textContent = i18next.t('nav_impact');
        document.getElementById('nav_contact').querySelector('.mdc-button__label').textContent = i18next.t('nav_contact');
        
        // Mobile navigation
        if (document.getElementById('mobile_nav_about')) {
            document.getElementById('mobile_nav_about').querySelector('.mdc-button__label').textContent = i18next.t('nav_about');
            document.getElementById('mobile_nav_projects').querySelector('.mdc-button__label').textContent = i18next.t('nav_projects');
            document.getElementById('mobile_nav_impact').querySelector('.mdc-button__label').textContent = i18next.t('nav_impact');
            document.getElementById('mobile_nav_contact').querySelector('.mdc-button__label').textContent = i18next.t('nav_contact');
        }

        // Hero section
        document.getElementById('hero_title').textContent = i18next.t('hero_title');
        document.getElementById('hero_subtitle').textContent = i18next.t('hero_subtitle');
        document.getElementById('hero_cta').querySelector('.mdc-button__label').textContent = i18next.t('hero_cta');
        
        // Stats section
        document.getElementById('stats_wells').textContent = i18next.t('stats_wells');
        document.getElementById('stats_wells_label').textContent = i18next.t('stats_wells_label');
        document.getElementById('stats_lives').textContent = i18next.t('stats_lives');
        document.getElementById('stats_lives_label').textContent = i18next.t('stats_lives_label');
        document.getElementById('stats_countries').textContent = i18next.t('stats_countries');
        document.getElementById('stats_countries_label').textContent = i18next.t('stats_countries_label');
        document.getElementById('stats_funds').textContent = i18next.t('stats_funds');
        document.getElementById('stats_funds_label').textContent = i18next.t('stats_funds_label');
        
        // About section
        document.getElementById('about_title').textContent = i18next.t('about_title');
        document.getElementById('about_subtitle').textContent = i18next.t('about_subtitle');
        document.getElementById('about_text').textContent = i18next.t('about_text');
        document.getElementById('about_text_2').textContent = i18next.t('about_text_2');
        
        // Projects section
        document.getElementById('projects_title').textContent = i18next.t('projects_title');
        document.getElementById('projects_subtitle').textContent = i18next.t('projects_subtitle');
        document.getElementById('project_1_title').textContent = i18next.t('project_1_title');
        document.getElementById('project_1_desc').textContent = i18next.t('project_1_desc');
        document.getElementById('project_2_title').textContent = i18next.t('project_2_title');
        document.getElementById('project_2_desc').textContent = i18next.t('project_2_desc');
        document.getElementById('project_3_title').textContent = i18next.t('project_3_title');
        document.getElementById('project_3_desc').textContent = i18next.t('project_3_desc');
        document.getElementById('project_button_1').textContent = i18next.t('project_button');
        document.getElementById('project_button_2').textContent = i18next.t('project_button');
        document.getElementById('project_button_3').textContent = i18next.t('project_button');
        
        // Impact section
        document.getElementById('impact_title').textContent = i18next.t('impact_title');
        document.getElementById('impact_subtitle').textContent = i18next.t('impact_subtitle');
        document.getElementById('impact_1_title').textContent = i18next.t('impact_1_title');
        document.getElementById('impact_1_text').textContent = i18next.t('impact_1_text');
        document.getElementById('impact_2_title').textContent = i18next.t('impact_2_title');
        document.getElementById('impact_2_text').textContent = i18next.t('impact_2_text');
        document.getElementById('impact_3_title').textContent = i18next.t('impact_3_title');
        document.getElementById('impact_3_text').textContent = i18next.t('impact_3_text');
        
        // Contact section
        document.getElementById('contact_title').textContent = i18next.t('contact_title');
        document.getElementById('contact_text').textContent = i18next.t('contact_text');
        document.getElementById('contact_description').textContent = i18next.t('contact_description');
        document.getElementById('contact_button').querySelector('.mdc-button__label').textContent = i18next.t('contact_button');
        
        // Footer
        document.getElementById('footer_tagline').textContent = i18next.t('footer_tagline');
        document.getElementById('footer_links').textContent = i18next.t('footer_links');
        document.getElementById('footer_about').textContent = i18next.t('nav_about');
        document.getElementById('footer_projects').textContent = i18next.t('nav_projects');
        document.getElementById('footer_impact').textContent = i18next.t('nav_impact');
        document.getElementById('footer_contact').textContent = i18next.t('nav_contact');
        document.getElementById('footer_connect').textContent = i18next.t('footer_connect');
        document.getElementById('footer_copyright').textContent = i18next.t('footer_copyright');
        
        // Update the document title
        document.title = i18next.t('title');
    }
    
    function changeLang(lng) {
        i18next.changeLanguage(lng, function() {
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
