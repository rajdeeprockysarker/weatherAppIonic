'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">weatherAppIonic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-09788099eafd439d3210e775b4888edb"' : 'data-target="#xs-components-links-module-AppModule-09788099eafd439d3210e775b4888edb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-09788099eafd439d3210e775b4888edb"' :
                                            'id="xs-components-links-module-AppModule-09788099eafd439d3210e775b4888edb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-09788099eafd439d3210e775b4888edb"' : 'data-target="#xs-injectables-links-module-AppModule-09788099eafd439d3210e775b4888edb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-09788099eafd439d3210e775b4888edb"' :
                                        'id="xs-injectables-links-module-AppModule-09788099eafd439d3210e775b4888edb"' }>
                                        <li class="link">
                                            <a href="injectables/BuisnessLogicService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BuisnessLogicService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OverLapGraphForWeatherPredictionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OverLapGraphForWeatherPredictionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RepositoryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RepositoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemperatureConverterService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TemperatureConverterService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UIServiceServiceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UIServiceServiceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UIToastService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UIToastService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-c7944cc75fb3e5d5c12f4a3d2d1f0196"' : 'data-target="#xs-components-links-module-HomePageModule-c7944cc75fb3e5d5c12f4a3d2d1f0196"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-c7944cc75fb3e5d5c12f4a3d2d1f0196"' :
                                            'id="xs-components-links-module-HomePageModule-c7944cc75fb3e5d5c12f4a3d2d1f0196"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BuisnessLogicService.html" data-type="entity-link">BuisnessLogicService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OverLapGraphForWeatherPredictionService.html" data-type="entity-link">OverLapGraphForWeatherPredictionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RepositoryService.html" data-type="entity-link">RepositoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemperatureConverterService.html" data-type="entity-link">TemperatureConverterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UIServiceServiceService.html" data-type="entity-link">UIServiceServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UIToastService.html" data-type="entity-link">UIToastService</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});