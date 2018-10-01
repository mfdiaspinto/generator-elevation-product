
import * as jquery from '@primavera/corejs/ng/jquery';
import * as signalr from '@primavera/corejs/ng/signalr';
import * as bs from '@primavera/corejs/ng/bootstrap';
import * as moment from '@primavera/corejs/ng/moment';
import * as chart from '@primavera/corejs/ng/Chart';

import { AttachmentsModule } from '@primavera/attachments';
import { PrintingModule } from '@primavera/printing';
import { NotificationsModule } from '@primavera/notifications';
import { ComponentsModule } from '@primavera/components';
import { qbuilderModule } from '@primavera/qbuilder';
import * as datetimepicker from '@primavera/corejs/ng/datetimepicker';
import * as html2canvas from 'html2canvas';
import * as jqueryhotkeys from 'jquery.hotkeys';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef, Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule, UrlHandlingStrategy, UrlTree } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, DecimalPipe, CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';

import * as angular from '@primavera/corejs/ng/angular';
import * as angularresource from '@primavera/corejs/ng/angular-resource';
import * as angularsanitize from '@primavera/corejs/ng/angular-sanitize';
import * as angularanimate from '@primavera/corejs/ng/angular-animate';
import uirouter from '@uirouter/angularjs';
import * as uibootstrap from 'angular-ui-bootstrap';

import { PrimaveraCoreModule, EventComponent, PrimaveraI18nModule, I18nConfig, RecordSelectorComponent } from '@primavera/ngcore';


console.log(angular);
console.log(uirouter);

//import { SignalRModule } from 'ng2-signalr';
//import { SignalRConfiguration } from 'ng2-signalr';

import * as coreJs from '@primavera/corejs';
import * as authentication from '@primavera/corejs/auth/';
import * as shell from '@primavera/corejs/shell/index';
import * as dashboard from '@primavera/corejs/dashboard/';

import * as identity from '@primavera/identity';
import * as operations from '@primavera/operations';
import * as corePatterns from '@primavera/corepatterns';
import * as querybuilder from '@primavera/querybuilder';
import * as kendo from '@primavera/querybuilder/kendo';
import * as reporting from '@primavera/reporting';
import * as rzslider from '@primavera/reporting/rzslider';
import * as colorpicker from '@primavera/reporting/bootstrap-colorpicker';

import * as bootstrapwysiwyg from 'bootstrap-wysiwyg/src/bootstrap-wysiwyg';

import { UpgradeAdapter } from '@angular/upgrade';
//import { UpgradeModule } from '@angular/upgrade/static';
import { appRoutes, customRoutes } from './app.routes';

export class HybridUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree) {

    var surl: string = url.toString();

    var ignore: boolean = false;

    for (var i = 0; i < customRoutes.length; i++) {
      ignore = surl.startsWith(customRoutes[i]);

      if (ignore) {
        break;
      }
    }

    if (!ignore) {
      ignore = surl.indexOf("?list") > 0 || surl.indexOf("editaccessgroup") > 0 || surl.indexOf("createaccessgroup") > 0 || surl.indexOf("dashboards") > 0;
    }

    console.log('STATE: ' + surl, ignore);

    return !ignore;
  }
  extract(url: UrlTree) {
    return url;
  }
  merge(url: UrlTree, whole: UrlTree) { return url; }
}

// v2.0.0
/*
export function createConfig(): SignalRConfiguration {
    const c = new SignalRConfiguration();
    c.hubName = 'applicationHub';
    //c.qs = { user: 'bob' };
    //c.url = 'http://localhost:51913/';
    c.logging = true;
    c.withCredentials = true;
    return c;
}
*/

let configSources: string[] = [
  'notifications.components.lang',
  'attachments.components.lang',
  'printing.components.lang',
  'ngcore.components.lang'
]

let locale = JSON.parse(document.getElementById("appContextModel").innerHTML).user.culture;
let i18nConfig: I18nConfig = {
  locale: locale,
  sources: configSources
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AttachmentsModule,
    NotificationsModule,
    PrintingModule,
    ComponentsModule,
    qbuilderModule,
    ReactiveFormsModule,
    PrimaveraCoreModule.forRoot(),
    PrimaveraI18nModule.forRoot(i18nConfig),

    // SignalRModule.forRoot(createConfig),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: DecimalPipe, useClass: DecimalPipe },
    { provide: CurrencyPipe, useClass: CurrencyPipe },

    { provide: UrlHandlingStrategy, useClass: HybridUrlHandlingStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

angular.module('angular2', [
  angularresource,
  angularsanitize,
  angularanimate,
  uirouter,
  uibootstrap]);

angular.module('angular2')
  //.directive('dynamicFormComponent', upgradeAdapter.downgradeNg2Component(DynamicFormUpdateComponent))
  //.directive('dynamicFormCreateComponent', upgradeAdapter.downgradeNg2Component(DynamicFormCreateComponent))
  //.directive('entitydynamicFormComponent', upgradeAdapter.downgradeNg2Component(EntityDynamicFormComponent))
  //.directive('entitydynamicFormCreateComponent', upgradeAdapter.downgradeNg2Component(EntityDynamicFormCreateComponent))
  .directive('recordSelector', upgradeAdapter.downgradeNg2Component(RecordSelectorComponent))
  .directive('priEventComponent', upgradeAdapter.downgradeNg2Component(EventComponent));
//.directive('dynamicFormActionsComponent', upgradeAdapter.downgradeNg2Component(DynamicFormActionsComponent));


/* force lib import */

var bw = bootstrapwysiwyg;

console.log(jquery);
console.log(chart);
console.log(moment);
console.log(datetimepicker);
console.log(signalr);
console.log(colorpicker);
console.log(bs);
console.log(jqueryhotkeys);

var app = angular.module('app', ['angular2',
  angularresource,
  angularsanitize,
  angularanimate,
  uirouter,
  uibootstrap,
  kendo,
  coreJs,
  authentication,
  dashboard,
  identity,
  corePatterns,
  querybuilder,
  operations,
  shell,
  reporting,
  rzslider,
]);

// Gets executed during the provider registrations and configuration phase. Only providers and constants can be
// injected here. This is to prevent accidental instantiation of services before they have been fully configured.
app.config(['$stateProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', 'resourcesServiceProvider', '$httpProvider', '$tooltipProvider', '$sceDelegateProvider',
  function ($stateProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, resourcesServiceProvider, $httpProvider, $tooltipProvider, $sceDelegateProvider) {


    $stateProvider
      .state('Identity_CreateAccessGroup_NG4', {
        parent: 'create',
        reloadOnSearch: false,
        url: '/identity/accessGroups/createaccessgroup?id',
        template: `<div class="pri-editor-view" style="position: relative">
                        <div>
                            <div class="row clearfix">
                                <div class="col-xs-12 pri-editor-view-form-container">
                                    <entitydynamic-form-create-component module="identity" service="accessgroups" operation="createaccessgroup"></dynamic-form-component>
                                </div>
                            </div>
                      </div>
                    </div>`,
        controller: function () {
        }
      });

    $stateProvider
      .state('Identity_EditAccessGroup_NG4', {
        parent: 'create',
        reloadOnSearch: false,
        url: '/identity/accessGroups/editaccessgroup?id',
        template: `<div  class="pri-editor-view" style="position: relative">
                        <div ng-cloak>
                            <div class="row clearfix">
                                <div class="col-xs-12 pri-editor-view-form-container">
                                    <entitydynamic-form-component module="identity" service="accessgroups" operation="editaccessgroup"></dynamic-form-component>
                                </div>
                            </div>
                      </div>
                    </div>`,
        controller: function () {
        }
      });


    $stateProvider.state('empty', {
      url: '/:module/:service/:operation?id',
      template: '',
    });

    var prefixParts = window.location.pathname.split('/');
    if (prefixParts[0] == '') {
      prefixParts.shift();
    }

    resourcesServiceProvider.config({
      localeSupported: [
        'en-US'
        , 'pt-PT'
      ],
      localeFallbacks: {
        'en': 'en-US'
        , 'pt': 'pt-PT'
      },
      basePath: prefixParts[0] + '/' + prefixParts[1] + '/_/Resources',
      fileExtension: '.lang.json'
    });

    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.cache = false;

    $tooltipProvider.options({
      appendToBody: true
    });

    // without the following line there are IE issues with ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Sat, 01 Jan 2000 00:00:00 GMT';
    // we need to figure out what is the best way to handle the ajax request

    // this will allow to embebed videos
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.youtube.com/**'
    ]);
  }]);

//// Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
//// can be injected here. This is to prevent further system configuration during application run time.
app.run(['$templateCache', '$rootScope', '$state', '$stateParams', '$window', 'shellService', 'messagesService', 'authenticationService', '$timeout',
  function ($templateCache, $rootScope, $state, $stateParams, $window, shellService, messagesService, authenticationService, $timeout) {

    // <ui-view> contains a pre-rendered template for the current view
    // caching it will prevent a round-trip to a server at the first page load
    var view = angular.element('#ui-view');
    $templateCache.put(view.data('tmpl-url'), view.html());

    // Allows to retrieve UI Router state information from inside templates
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // when state change start 
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState && toState.resolve && shellService) {
        if (angular.isUndefined(toState.data) || !toState.data.isPartial) {
          shellService.isLoadingState = true;
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {

      // dismiss error toasts on state change
      messagesService.dismissMessages();

      if (toState.resolve && shellService) {
        $timeout(function () {
          shellService.isLoadingState = false;
        }, 1000);
      }

      // Sets the layout name, which can be used to display different layouts (header, footer etc.)
      // based on which page the user is located
      $rootScope.layout = toState.layout;

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();

      shellService.isLoadingState = false;
      if (authenticationService.isAuthenticated()) {

        // Handle 403 Forbidden status - View authorization failed

        if (!angular.isUndefined(error) && error != null) {
          messagesService.showModal({
            html: error.data,
            type: 'error'
          });
        }
        else {

          // Generic error message

          var errorMessage = 'X';
          var tryAgain = 'c';

          if (errorMessage === "" || errorMessage === null || errorMessage === undefined) {
            errorMessage = "Connection Problems!";
          }

          messagesService.showMessage({
            detail: errorMessage,
            type: 'warning',
            icon: 'icon-message-sync',
            customAction: {
              header: tryAgain,
              callback: function () {
                $state.go(toState);
              },
            },
          });
        }
      }
      else {
        $window.location.href = $window.location.protocol + "//" + $window.location.host + "/login";
      }
    });

    // HACK : if the url does not end with the last slash the UI-Router routes will not work correctly
    // and the call to the home state will not get the Shell view action.
    if (!($window.location.href.indexOf('/#/') !== -1) &&
      $window.location.href.indexOf('/', $window.location.href.length - 1) === -1) {
      $window.location.href = $window.location.href + '/';
    }

    //$state.transitionTo('home');
  }]);


upgradeAdapter.bootstrap(document.body, ['app'], {
  strictDi: true
});

window['html2canvas'] = html2canvas;
