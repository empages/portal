// All strings used inside the code in order to prevent hardcoded strings. These strings do not include the HTML texts.
export const strings = {
    homepage: {

    },
    admin: {

    },
    clientBuilder: {
        scaffoldPageTitle: 'Scaffold modules generation',
        scaffoldPageDescription: 'Modules are populated in the table below. Each module has generation trigger in the end of the row. In addition there are provided bulk triggers grouped by instance type and target client.',
        endpointsPageTitle: 'Endpoints list',
        endpointsPageDescription: 'List of all endpoints defined by controllers decorated with [ApiEndpointsController] attribute and actions decorated with [Endpoint(typeof(ResponseModel))] attribute.',
        languagesPageTitle: 'Languages list',
        languagesPageDescription: 'List of all languages stored into the localization context. To create a new one use the form placed on the top of the page.',
        translationsPageTitle: 'Translations list',
        translationsPageDescription: 'List of all translations defined by key and translations stored into the localization content. To create a new one use the form placed on the top of the page.',
        staticContentPageTitle: 'Static content items list',
        staticContentPageDescription: 'List of all static content items defined by key and translation content stored into the localization content. To create a new one use the form placed on the top of the page.',
        moduleGenerationSucceededMessage: 'Module has been generated',
        modulesGenerationSucceededMessage: 'Modules have been generated'
    },
    general: {
        unexpectedErrorMessage: 'An unexpected error occurred'
    }
}
