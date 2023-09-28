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
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminModule-c155e7474671c72897e0409be87e5e3d147907da7b5d89e979dc0369f7bfb44a197f512973cc9254943bee52a113e142684ee19e76dc8be95223ee739bb74e1f"' : 'data-bs-target="#xs-components-links-module-AdminModule-c155e7474671c72897e0409be87e5e3d147907da7b5d89e979dc0369f7bfb44a197f512973cc9254943bee52a113e142684ee19e76dc8be95223ee739bb74e1f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-c155e7474671c72897e0409be87e5e3d147907da7b5d89e979dc0369f7bfb44a197f512973cc9254943bee52a113e142684ee19e76dc8be95223ee739bb74e1f"' :
                                            'id="xs-components-links-module-AdminModule-c155e7474671c72897e0409be87e5e3d147907da7b5d89e979dc0369f7bfb44a197f512973cc9254943bee52a113e142684ee19e76dc8be95223ee739bb74e1f"' }>
                                            <li class="link">
                                                <a href="components/AdminHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-cb0d787190e2322eb58d047916bdcd6c1ed314933a4e39e5017a158e599f1c97cc69b75f2c4a44767fd2923f2b74b3f7adeafa06c96329404150cf336b640ac0"' : 'data-bs-target="#xs-components-links-module-AppModule-cb0d787190e2322eb58d047916bdcd6c1ed314933a4e39e5017a158e599f1c97cc69b75f2c4a44767fd2923f2b74b3f7adeafa06c96329404150cf336b640ac0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-cb0d787190e2322eb58d047916bdcd6c1ed314933a4e39e5017a158e599f1c97cc69b75f2c4a44767fd2923f2b74b3f7adeafa06c96329404150cf336b640ac0"' :
                                            'id="xs-components-links-module-AppModule-cb0d787190e2322eb58d047916bdcd6c1ed314933a4e39e5017a158e599f1c97cc69b75f2c4a44767fd2923f2b74b3f7adeafa06c96329404150cf336b640ac0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-a33493e9fcd8dc7d921e30af4f17780de65e18bca016dd6eca68939b72dafff886a92502ddc7e47a265cc4172b6de22102e83f614ded59d130aa1d80693fcd5b"' : 'data-bs-target="#xs-components-links-module-AuthModule-a33493e9fcd8dc7d921e30af4f17780de65e18bca016dd6eca68939b72dafff886a92502ddc7e47a265cc4172b6de22102e83f614ded59d130aa1d80693fcd5b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-a33493e9fcd8dc7d921e30af4f17780de65e18bca016dd6eca68939b72dafff886a92502ddc7e47a265cc4172b6de22102e83f614ded59d130aa1d80693fcd5b"' :
                                            'id="xs-components-links-module-AuthModule-a33493e9fcd8dc7d921e30af4f17780de65e18bca016dd6eca68939b72dafff886a92502ddc7e47a265cc4172b6de22102e83f614ded59d130aa1d80693fcd5b"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PostModule-3a01aff603127e8d775692d8f56d8ceed58c618d1687ee4c085b4c73bdc8dea931bc261a23806bc994e9e269213d4e0e27469963780790e31d8a7da593dc1c2e"' : 'data-bs-target="#xs-components-links-module-PostModule-3a01aff603127e8d775692d8f56d8ceed58c618d1687ee4c085b4c73bdc8dea931bc261a23806bc994e9e269213d4e0e27469963780790e31d8a7da593dc1c2e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PostModule-3a01aff603127e8d775692d8f56d8ceed58c618d1687ee4c085b4c73bdc8dea931bc261a23806bc994e9e269213d4e0e27469963780790e31d8a7da593dc1c2e"' :
                                            'id="xs-components-links-module-PostModule-3a01aff603127e8d775692d8f56d8ceed58c618d1687ee4c085b4c73bdc8dea931bc261a23806bc994e9e269213d4e0e27469963780790e31d8a7da593dc1c2e"' }>
                                            <li class="link">
                                                <a href="components/PostAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PostIndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostIndexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostRoutingModule.html" data-type="entity-link" >PostRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link" >PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PublicModule-54529ec589b744ce32896300bcc591b8943534115e5512868019c18243f9039c19bbc8794c0ada89df4e0683e9007a4f85e4a74d8d888a9d78496d03a9d8ea71"' : 'data-bs-target="#xs-components-links-module-PublicModule-54529ec589b744ce32896300bcc591b8943534115e5512868019c18243f9039c19bbc8794c0ada89df4e0683e9007a4f85e4a74d8d888a9d78496d03a9d8ea71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-54529ec589b744ce32896300bcc591b8943534115e5512868019c18243f9039c19bbc8794c0ada89df4e0683e9007a4f85e4a74d8d888a9d78496d03a9d8ea71"' :
                                            'id="xs-components-links-module-PublicModule-54529ec589b744ce32896300bcc591b8943534115e5512868019c18243f9039c19bbc8794c0ada89df4e0683e9007a4f85e4a74d8d888a9d78496d03a9d8ea71"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileOtherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileOtherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublicHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PublicLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublicRoutingModule.html" data-type="entity-link" >PublicRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-6e7b50d2941f34ab7182494eda6e1222d845f165fdb7b34400fd8f05ede4fb124ac6f6217b2d48ce73c8d52888c8a0f6810c656fcc13ec70f61cc2573b3ded25"' : 'data-bs-target="#xs-components-links-module-UserModule-6e7b50d2941f34ab7182494eda6e1222d845f165fdb7b34400fd8f05ede4fb124ac6f6217b2d48ce73c8d52888c8a0f6810c656fcc13ec70f61cc2573b3ded25"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-6e7b50d2941f34ab7182494eda6e1222d845f165fdb7b34400fd8f05ede4fb124ac6f6217b2d48ce73c8d52888c8a0f6810c656fcc13ec70f61cc2573b3ded25"' :
                                            'id="xs-components-links-module-UserModule-6e7b50d2941f34ab7182494eda6e1222d845f165fdb7b34400fd8f05ede4fb124ac6f6217b2d48ce73c8d52888c8a0f6810c656fcc13ec70f61cc2573b3ded25"' }>
                                            <li class="link">
                                                <a href="components/UserAddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserIndexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserIndexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link" >UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/Error403Component.html" data-type="entity-link" >Error403Component</a>
                            </li>
                            <li class="link">
                                <a href="components/Error404Component.html" data-type="entity-link" >Error404Component</a>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});