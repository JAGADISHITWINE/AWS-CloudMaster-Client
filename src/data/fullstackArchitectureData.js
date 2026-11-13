/**
 * Dedicated Architecture SVGs and Flow Diagrams for Full-Stack Modules 21, 22, 23, and 24
 */

export const fullstackArchitecture = {
  // -------------------------------------------------------------------------
  // MODULE 21: ANGULAR ENTERPRISE FRONTEND ARCHITECTURE
  // -------------------------------------------------------------------------
  'angular-core-components-lifecycle-databinding': {
    moduleNumber: 21,
    title: "Angular Standalone Architecture, Ivy Bytecode & Lifecycle Flow",
    category: "Frontend Component Architecture",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Angular Ivy Component Compilation & Scoped Rendering Pipeline',
    realDiagramCaption: 'Template transformation into static bytecode instructions, Emulated CSS scoping attributes, and lifecycle execution hooks.',
    description: "Ivy compiler transforms component templates into static creation/update instructions. Emulated ViewEncapsulation scopes styles using generated attributes (_nghost/_ngcontent), and lifecycle hooks execute deterministically from constructor to ngOnDestroy.",
    flowSteps: ["Ivy Template Compilation", "Emulated Style Scoping Injection", "Property & Event Data Binding", "Lifecycle Sequence Execution"],
    stepByStep: [
      { step: 1, component: "Angular Ivy Compiler", role: "Compiles HTML templates into static JavaScript instructions (ɵɵelementStart, ɵɵproperty).", why: "Enables tree-shaking of unused template features and eliminates runtime parsing overhead." },
      { step: 2, component: "Emulated ViewEncapsulation", role: "Appends unique _nghost-ng-c* and _ngcontent-ng-c* attributes to elements and CSS selectors.", why: "Prevents component styles from leaking into the global document without native Shadow DOM overhead." },
      { step: 3, component: "Four-Way Data Binding", role: "Synchronizes component state and DOM via Interpolation, Property, Event, and Two-Way binding.", why: "Provides clean separation between UI presentation and TypeScript controller logic." },
      { step: 4, component: "Lifecycle Hooks Pipeline", role: "Executes constructor -> ngOnChanges -> ngOnInit -> ngAfterViewInit -> ngOnDestroy.", why: "Ensures deterministic initialization, view synchronization, and memory leak cleanup." }
    ],
    interRelationships: [
      { from: "TypeScript Controller", to: "Ivy Bytecode", relation: "Compiled into static ɵɵ instructions executed by Angular runtime.", protocol: "Ivy AST" },
      { from: "Ivy Runtime", to: "Scoped DOM Elements", relation: "Injects _ngcontent-* attributes and binds reactive listeners.", protocol: "DOM API" },
      { from: "Lifecycle Hooks", to: "Garbage Collector", relation: "DestroyRef and ngOnDestroy release subscriptions and timers.", protocol: "V8 Engine" }
    ],
    endToEndFlow: [
      { stage: "1. Compilation", action: "Ivy Template Generation", details: "Template HTML transformed into static creation and update phase functions." },
      { stage: "2. Scoping", action: "CSS Attribute Mangling", details: "CSS selectors rewritten with host and content unique attribute hashes." },
      { stage: "3. Instantiation", action: "Lifecycle Bootstrap", details: "Constructor resolves DI, ngOnChanges binds inputs, ngOnInit initializes state." },
      { stage: "4. Teardown", action: "DestroyRef Execution", details: "Component unmounted, DOM detached, event listeners and subscriptions terminated." }
    ],
    moduleContext: {
      prevModule: "Module 20: CI/CD Pipeline Automation",
      thisModule: "Module 21: Angular Enterprise Frontend Architecture",
      nextModule: "Module 22: Node.js Scalable Backend Architecture",
      connectionReason: "Standalone components and Ivy compilation form the foundation for scalable, high-performance web applications before integrating backend APIs."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="angGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#angGrad)" stroke="#312e81" stroke-width="2"/>
      
      <!-- Tier 1: Template & Ivy -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#dd0031" stroke-width="1.5"/>
        <text x="90" y="24" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">1. IVY COMPILER</text>
        <rect x="15" y="38" width="150" height="40" rx="4" fill="#0f172a" stroke="#dd0031" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fda4af" font-size="8" font-family="monospace" text-anchor="middle">Template HTML</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Parsed to Ivy AST</text>
        <rect x="15" y="86" width="150" height="46" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="90" y="102" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">ɵɵelementStart / ɵɵtext</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Static Bytecode Instructions</text>
        <rect x="15" y="140" width="150" height="32" rx="4" fill="#0f172a"/>
        <text x="90" y="156" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Tree-Shakable Runtime</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#f43f5e" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#f43f5e"/>
      
      <!-- Tier 2: ViewEncapsulation -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="90" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">2. VIEW ENCAPSULATION</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="90" y="54" fill="#93c5fd" font-size="8" font-family="monospace" text-anchor="middle">Emulated Mode</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">_nghost / _ngcontent</text>
        <rect x="15" y="88" width="150" height="42" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="0.8"/>
        <text x="90" y="104" fill="#c084fc" font-size="8" font-family="monospace" text-anchor="middle">Scoped CSS Rules</text>
        <text x="90" y="118" fill="#94a3b8" font-size="7" text-anchor="middle">.card[_ngcontent-c12]</text>
        <rect x="15" y="138" width="150" height="34" rx="4" fill="#0f172a"/>
        <text x="90" y="154" fill="#38bdf8" font-size="8" text-anchor="middle">Zero Global Style Leak</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#3b82f6" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#3b82f6"/>
      
      <!-- Tier 3: 4-Way Data Binding -->
      <g transform="translate(465, 35)">
        <rect width="170" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="85" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. 4-WAY BINDING</text>
        <text x="85" y="50" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">{{ interpolation }}</text>
        <text x="85" y="75" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">[propertyBinding]</text>
        <text x="85" y="100" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">(eventBinding)="fn()"</text>
        <text x="85" y="125" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">[(bananaInABox)]</text>
        <rect x="12" y="145" width="146" height="28" rx="4" fill="#0f172a"/>
        <text x="85" y="162" fill="#fbbf24" font-size="7.5" text-anchor="middle">Unidirectional Data Flow</text>
      </g>
      
      <path d="M 640 130 L 665 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="670,130 660,125 660,135" fill="#f59e0b"/>
      
      <!-- Tier 4: Lifecycle Hooks -->
      <g transform="translate(675, 35)">
        <rect width="150" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="75" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. LIFECYCLE HOOKS</text>
        <text x="75" y="48" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">constructor()</text>
        <text x="75" y="70" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">ngOnChanges()</text>
        <text x="75" y="92" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">ngOnInit()</text>
        <text x="75" y="114" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">ngAfterViewInit()</text>
        <text x="75" y="136" fill="#f43f5e" font-size="8" font-family="monospace" text-anchor="middle">ngOnDestroy()</text>
        <rect x="10" y="152" width="130" height="24" rx="4" fill="#0f172a"/>
        <text x="75" y="167" fill="#10b981" font-size="7" font-weight="bold" text-anchor="middle">DestroyRef Teardown</text>
      </g>
    </svg>`
  },

  'angular-rxjs-services-dependency-injection': {
    moduleNumber: 21,
    title: "Hierarchical Dependency Injection & RxJS Reactive Stream Pipeline",
    category: "Frontend State & Reactive Streams",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Angular Multi-Branch Injector Tree and RxJS Pipeline Flow',
    realDiagramCaption: 'Element vs Environment injectors, BehaviorSubject state store, switchMap cancellation, and takeUntilDestroyed leak prevention.',
    description: "Angular's two-branch DI hierarchy resolves dependencies from Element Injectors up through Environment, Root, and Platform injectors. RxJS higher-order operators manage concurrency, and takeUntilDestroyed prevents memory leaks.",
    flowSteps: ["DI Resolution Traversal", "BehaviorSubject State Store", "RxJS Mapping Operators", "takeUntilDestroyed Teardown"],
    stepByStep: [
      { step: 1, component: "Element Injector Tree", role: "Resolves component-level and directive-level providers declared locally.", why: "Allows isolated component state instances that do not leak to parent views." },
      { step: 2, component: "Root Environment Injector", role: "Provides application-wide singletons via providedIn: 'root'.", why: "Ensures single shared state store across all lazy-loaded routes." },
      { step: 3, component: "RxJS Higher-Order Operators", role: "Pipelines data using switchMap, concatMap, mergeMap, and exhaustMap.", why: "Handles race conditions, request cancellations, and prevents duplicate button clicks." },
      { step: 4, component: "takeUntilDestroyed Operator", role: "Binds Observable lifecycle to host component DestroyRef.", why: "Automatically terminates subscriptions, preventing memory leaks and orphaned DOM nodes." }
    ],
    interRelationships: [
      { from: "Component", to: "Root Injector", relation: "Injects shared UserStateService singleton.", protocol: "Angular DI" },
      { from: "UserStateService", to: "BehaviorSubject", relation: "Maintains current immutable state value and emits to observers.", protocol: "RxJS Stream" },
      { from: "Search Input", to: "switchMap", relation: "Cancels previous pending HTTP request when new keystroke arrives.", protocol: "Observable Pipe" }
    ],
    endToEndFlow: [
      { stage: "1. Injection", action: "DI Lookup", details: "Component calls inject(UserStateService); Angular traverses Element -> Environment -> Root." },
      { stage: "2. State Stream", action: "Subject Emission", details: "Service emits immutable state snapshot to private BehaviorSubject." },
      { stage: "3. Transformation", action: "Operator Piping", details: "Stream piped through debounceTime(300), distinctUntilChanged(), and switchMap()." },
      { stage: "4. Auto-Teardown", action: "DestroyRef Trigger", details: "takeUntilDestroyed cleanly unsubscribes when component view unmounts." }
    ],
    moduleContext: {
      prevModule: "Module 21.1: Angular Components & Lifecycle",
      thisModule: "Module 21.2: Angular DI & RxJS Reactive Streams",
      nextModule: "Module 21.3: Routing, Forms, OnPush & Signals",
      connectionReason: "Mastering DI and RxJS reactive streams is essential before building complex multi-route enterprise applications with OnPush change detection."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="rxjsGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1329"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#rxjsGrad)" stroke="#4338ca" stroke-width="2"/>
      
      <!-- Tier 1: Injector Hierarchy -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
        <text x="90" y="24" fill="#818cf8" font-size="11" font-weight="bold" text-anchor="middle">1. INJECTOR TREE</text>
        <rect x="15" y="38" width="150" height="32" rx="4" fill="#0f172a" stroke="#ec4899" stroke-width="0.8"/>
        <text x="90" y="54" fill="#f472b6" font-size="8" font-family="monospace" text-anchor="middle">Element Injector</text>
        <rect x="15" y="78" width="150" height="32" rx="4" fill="#0f172a" stroke="#8b5cf6" stroke-width="0.8"/>
        <text x="90" y="94" fill="#a78bfa" font-size="8" font-family="monospace" text-anchor="middle">Environment Injector</text>
        <rect x="15" y="118" width="150" height="32" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="90" y="134" fill="#60a5fa" font-size="8" font-family="monospace" text-anchor="middle">Root Injector (Singleton)</text>
        <text x="90" y="172" fill="#94a3b8" font-size="7.5" text-anchor="middle">Terminates at NullInjector</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#818cf8" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#818cf8"/>
      
      <!-- Tier 2: BehaviorSubject -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#ec4899" stroke-width="1.5"/>
        <text x="90" y="24" fill="#f472b6" font-size="11" font-weight="bold" text-anchor="middle">2. REACTIVE STATE</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#ec4899" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fb7185" font-size="8" font-family="monospace" text-anchor="middle">BehaviorSubject&lt;State&gt;</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Holds current value snapshot</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="106" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">asObservable()</text>
        <text x="90" y="120" fill="#94a3b8" font-size="7" text-anchor="middle">Exposes readonly stream</text>
        <text x="90" y="162" fill="#e2e8f0" font-size="8" text-anchor="middle">Unidirectional Data Flow</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#ec4899" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#ec4899"/>
      
      <!-- Tier 3: Higher-Order Operators -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. OPERATOR PIPELINE</text>
        <text x="90" y="50" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">switchMap()</text>
        <text x="90" y="64" fill="#94a3b8" font-size="7" text-anchor="middle">Cancels previous request</text>
        <text x="90" y="88" fill="#a78bfa" font-size="8" font-family="monospace" text-anchor="middle">concatMap()</text>
        <text x="90" y="102" fill="#94a3b8" font-size="7" text-anchor="middle">Sequences in strict FIFO order</text>
        <text x="90" y="126" fill="#f43f5e" font-size="8" font-family="monospace" text-anchor="middle">exhaustMap()</text>
        <text x="90" y="140" fill="#94a3b8" font-size="7" text-anchor="middle">Ignores clicks while active</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#f59e0b"/>
      
      <!-- Tier 4: Memory Teardown -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="70" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. AUTO TEARDOWN</text>
        <rect x="10" y="42" width="120" height="46" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="70" y="58" fill="#6ee7b7" font-size="7.5" font-family="monospace" text-anchor="middle">takeUntilDestroyed()</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">Binds to DestroyRef</text>
        <rect x="10" y="100" width="120" height="46" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="70" y="116" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">async Pipe</text>
        <text x="70" y="132" fill="#94a3b8" font-size="7" text-anchor="middle">Template auto-unsub</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">0 Active Leaks</text>
      </g>
    </svg>`
  },

  'angular-routing-forms-change-detection-signals': {
    moduleNumber: 21,
    title: "Angular Signals Reactivity, OnPush Pruning & Functional Routing Pipeline",
    category: "Frontend Performance & Routing",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'OnPush Tree Pruning, Signal Graph & Functional Router Guards',
    realDiagramCaption: 'Zoneless fine-grained reactivity using Signals, OnPush change detection pruning, and functional CanActivateFn guards.',
    description: "Angular Signals (signal, computed, effect) introduce fine-grained reactive state without Zone.js overhead. OnPush skips unchanged component branches based on reference identity, and functional guards protect routes cleanly.",
    flowSteps: ["Functional CanActivateFn Guard", "Dynamic FormArray Validation", "OnPush Change Detection Pruning", "Angular Signals Fine-Grained Update"],
    stepByStep: [
      { step: 1, component: "Functional CanActivateFn", role: "Lightweight route guard using inject() to enforce authentication and permissions.", why: "Eliminates class boilerplate and prevents unauthorized child route navigation." },
      { step: 2, component: "Reactive Forms & FormArray", role: "Manages nested form trees and dynamic form controls with async validators.", why: "Provides immutable form state, debounced validation, and type-safe value changes." },
      { step: 3, component: "ChangeDetectionStrategy.OnPush", role: "Prunes component subtrees from change detection unless @Input reference changes.", why: "Eliminates redundant Zone.js dirty-checking cycles in large tabular views." },
      { step: 4, component: "Angular Signals Graph", role: "Synchronous reactive primitives (signal, computed, effect) that notify bound DOM nodes directly.", why: "Enables glitch-free reactivity and sets the stage for zoneless Angular performance." }
    ],
    interRelationships: [
      { from: "CanActivateFn", to: "Router UrlTree", relation: "Redirects unauthenticated traffic to /login with returnUrl query params.", protocol: "Angular Router" },
      { from: "signal()", to: "computed()", relation: "Automatically tracks dependencies and recomputes only when source signal mutates.", protocol: "Signal Graph" },
      { from: "OnPush Component", to: "ChangeDetectorRef", relation: "Calls markForCheck() when external async events update state.", protocol: "Zone.js Engine" }
    ],
    endToEndFlow: [
      { stage: "1. Navigation", action: "Guard Execution", details: "Router resolves functional canActivate and canActivateChild guards before loading component." },
      { stage: "2. Form Input", action: "Async Validation", details: "User types; timer(400) debounces async username check before updating form status." },
      { stage: "3. State Update", action: "Signal Set/Update", details: "count.update(n => n + 1) updates Signal node and recalculates dependent computed() values." },
      { stage: "4. DOM Patch", action: "Fine-Grained Mutation", details: "Only the exact bound DOM text node updates, bypassing top-down component tree scans." }
    ],
    moduleContext: {
      prevModule: "Module 21.2: Angular DI & RxJS Streams",
      thisModule: "Module 21.3: Routing, Forms, OnPush & Signals",
      nextModule: "Module 22.1: Node.js V8 Runtime & Event Loop",
      connectionReason: "Completes enterprise frontend architecture, enabling high-performance frontend interfaces ready to communicate with scalable Node.js backends."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#sigGrad)" stroke="#6366f1" stroke-width="2"/>
      
      <!-- Tier 1: Functional Routing -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="90" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">1. FUNCTIONAL ROUTER</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="90" y="54" fill="#93c5fd" font-size="8" font-family="monospace" text-anchor="middle">CanActivateFn</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">inject(AuthService)</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="102" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">HttpInterceptorFn</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Bearer token injection</text>
        <text x="90" y="156" fill="#38bdf8" font-size="8" text-anchor="middle">Returns UrlTree on 401</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#3b82f6" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#3b82f6"/>
      
      <!-- Tier 2: Dynamic Forms -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. REACTIVE FORMS</text>
        <rect x="15" y="38" width="150" height="40" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">FormArray Dynamics</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Add/remove controls</text>
        <rect x="15" y="88" width="150" height="40" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="104" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">Async Validator</text>
        <text x="90" y="118" fill="#94a3b8" font-size="7" text-anchor="middle">Debounced username check</text>
        <text x="90" y="156" fill="#94a3b8" font-size="7.5" text-anchor="middle">Strict Type Safety</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#10b981" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#10b981"/>
      
      <!-- Tier 3: OnPush Pruning -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. ONPUSH OPTIMIZATION</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fde047" font-size="8" font-family="monospace" text-anchor="middle">Reference Immutability</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Checks with strict ===</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">Prunes Subtrees</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Skips 5,000 unchanged rows</text>
        <text x="90" y="156" fill="#10b981" font-size="8" text-anchor="middle">Sub-16ms Frame Rates</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#f59e0b"/>
      
      <!-- Tier 4: Angular Signals -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#ec4899" stroke-width="1.5"/>
        <text x="70" y="24" fill="#f472b6" font-size="11" font-weight="bold" text-anchor="middle">4. ANGULAR SIGNALS</text>
        <text x="70" y="50" fill="#f472b6" font-size="8" font-family="monospace" text-anchor="middle">signal(0)</text>
        <text x="70" y="66" fill="#94a3b8" font-size="7" text-anchor="middle">Mutable source node</text>
        <text x="70" y="90" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">computed()</text>
        <text x="70" y="106" fill="#94a3b8" font-size="7" text-anchor="middle">Derived memoized state</text>
        <text x="70" y="130" fill="#a78bfa" font-size="8" font-family="monospace" text-anchor="middle">effect()</text>
        <text x="70" y="146" fill="#94a3b8" font-size="7" text-anchor="middle">Auto-tracking side effects</text>
        <text x="70" y="172" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Zoneless Reactivity</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 22: NODE.JS SCALABLE BACKEND ARCHITECTURE
  // -------------------------------------------------------------------------
  'nodejs-event-loop-libuv-async-programming': {
    moduleNumber: 22,
    title: "Node.js V8 Call Stack, libuv Event Loop & Microtask Queues",
    category: "Backend Runtime & Concurrency",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Node.js libuv 6-Phase Event Loop and Microtask Precedence',
    realDiagramCaption: 'V8 single-threaded call stack, microtask queue draining (nextTick > Promise), libuv phases, and C++ thread pool offloading.',
    description: "Node.js coordinates the V8 engine, the libuv 6-phase event loop, microtask queues, and an off-thread pool to execute thousands of concurrent I/O operations without multi-threading overhead.",
    flowSteps: ["V8 Synchronous Call Stack", "Microtask Drain (nextTick & Promise)", "libuv 6-Phase Event Loop", "Thread Pool Delegation"],
    stepByStep: [
      { step: 1, component: "V8 Call Stack", role: "Executes synchronous JavaScript byte-code on a single main thread.", why: "Ensures thread-safe memory execution without locking primitives." },
      { step: 2, component: "Microtask Queue", role: "Executes process.nextTick followed by Promise.then microtasks at tick boundaries.", why: "Provides highest-priority execution before the event loop advances to the next phase." },
      { step: 3, component: "libuv Event Loop", role: "Cycles through Timers -> Pending -> Idle -> Poll -> Check -> Close callbacks.", why: "Multiplexes asynchronous non-blocking I/O operations via OS epoll/kqueue." },
      { step: 4, component: "libuv Thread Pool", role: "Pool of 4-1024 worker threads executing blocking operations (fs, crypto, zlib, DNS).", why: "Prevents blocking system calls from stalling the main V8 event loop." }
    ],
    interRelationships: [
      { from: "V8 Stack", to: "Microtask Queue", relation: "Schedules nextTick and Promise resolutions drained between tick boundaries.", protocol: "V8 Microtasks" },
      { from: "Poll Phase", to: "OS Kernel", relation: "Waits for incoming TCP connection packets and file descriptor ready events.", protocol: "Linux epoll" },
      { from: "libuv Thread Pool", to: "Check Phase", relation: "Completes crypto/fs operations and pushes callbacks to event loop queues.", protocol: "POSIX Threads" }
    ],
    endToEndFlow: [
      { stage: "1. Synchronous", action: "Call Stack Execution", details: "V8 executes script from top to bottom; schedules timers, promises, and I/O handlers." },
      { stage: "2. Microtask Turn", action: "Tick Boundary Drain", details: "process.nextTick queue drained completely, followed by Promise microtasks." },
      { stage: "3. Loop Phases", action: "Event Loop Cycling", details: "Timers fire -> Poll waits for I/O -> Check executes setImmediate -> Close tears down." },
      { stage: "4. Offloading", action: "Thread Pool Processing", details: "bcrypt/fs operations execute in background libuv threads; results post back to loop." }
    ],
    moduleContext: {
      prevModule: "Module 21: Angular Enterprise Frontend Architecture",
      thisModule: "Module 22.1: Node.js V8 Runtime & Event Loop",
      nextModule: "Module 22.2: Node.js Streams & Buffers",
      connectionReason: "Understanding the single-threaded event loop and microtask queues is prerequisite to building high-throughput, non-blocking backend services."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#022c22"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#nodeGrad)" stroke="#059669" stroke-width="2"/>
      
      <!-- Tier 1: V8 Call Stack -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">1. V8 CALL STACK</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Synchronous JS</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Single main execution thread</text>
        <rect x="15" y="86" width="150" height="42" rx="4" fill="#0f172a" stroke="#f43f5e" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f43f5e" font-size="8" font-family="monospace" text-anchor="middle">DON'T BLOCK!</text>
        <text x="90" y="116" fill="#fda4af" font-size="7" text-anchor="middle">Sync loops freeze all I/O</text>
        <text x="90" y="156" fill="#94a3b8" font-size="7.5" text-anchor="middle">Managed by Google V8</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#10b981" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#10b981"/>
      
      <!-- Tier 2: Microtask Queues -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">2. MICROTASK QUEUES</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="54" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">process.nextTick()</text>
        <text x="90" y="68" fill="#fca5a5" font-size="7" text-anchor="middle">Priority 1 (Drained First)</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="90" y="106" fill="#60a5fa" font-size="8" font-family="monospace" text-anchor="middle">Promise.then()</text>
        <text x="90" y="120" fill="#93c5fd" font-size="7" text-anchor="middle">Priority 2 (Microtasks)</text>
        <text x="90" y="158" fill="#e2e8f0" font-size="8" text-anchor="middle">Runs on every tick boundary</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#f59e0b"/>
      
      <!-- Tier 3: libuv Event Loop 6 Phases -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">3. LIBUV EVENT LOOP</text>
        <text x="90" y="46" fill="#93c5fd" font-size="7.5" font-family="monospace" text-anchor="middle">1. Timers (setTimeout)</text>
        <text x="90" y="64" fill="#94a3b8" font-size="7.5" font-family="monospace" text-anchor="middle">2. Pending Callbacks</text>
        <text x="90" y="82" fill="#94a3b8" font-size="7.5" font-family="monospace" text-anchor="middle">3. Idle, Prepare</text>
        <text x="90" y="100" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">4. Poll (Incoming I/O)</text>
        <text x="90" y="118" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">5. Check (setImmediate)</text>
        <text x="90" y="136" fill="#f87171" font-size="7.5" font-family="monospace" text-anchor="middle">6. Close Callbacks</text>
        <text x="90" y="162" fill="#38bdf8" font-size="8" text-anchor="middle">Continuous circular polling</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#38bdf8"/>
      
      <!-- Tier 4: libuv Thread Pool -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
        <text x="70" y="24" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">4. THREAD POOL</text>
        <rect x="10" y="38" width="120" height="42" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="0.8"/>
        <text x="70" y="54" fill="#e9d5ff" font-size="8" font-family="monospace" text-anchor="middle">libuv Threads (4)</text>
        <text x="70" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">fs, crypto, zlib, DNS</text>
        <rect x="10" y="90" width="120" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="70" y="106" fill="#a7f3d0" font-size="8" font-family="monospace" text-anchor="middle">worker_threads</text>
        <text x="70" y="120" fill="#94a3b8" font-size="7" text-anchor="middle">Parallel CPU Tasks</text>
        <text x="70" y="162" fill="#c084fc" font-size="7.5" text-anchor="middle">UV_THREADPOOL_SIZE</text>
      </g>
    </svg>`
  },

  'nodejs-streams-buffer-file-handling': {
    moduleNumber: 22,
    title: "Node.js Streams, Off-Heap Buffers & Backpressure Flow Control",
    category: "Backend I/O & Memory Management",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Node.js Stream Pipeline, Backpressure & Buffer Architecture',
    realDiagramCaption: 'Fast producer to slow consumer backpressure flow, highWaterMark buffer threshold, and stream.promises.pipeline cleanup.',
    description: "Node.js streams process datasets chunk-by-chunk using raw off-heap Buffers. When the writable stream's internal buffer exceeds highWaterMark, write() returns false to signal backpressure until the 'drain' event fires.",
    flowSteps: ["Off-Heap Buffer Allocation", "Readable Stream Ingestion", "Backpressure & highWaterMark Guard", "Pipeline Auto-Teardown"],
    stepByStep: [
      { step: 1, component: "Off-Heap Buffer", role: "Allocates raw binary memory outside the V8 garbage-collected heap via C++ bindings.", why: "Prevents V8 GC compaction pauses when transferring multi-gigabyte files." },
      { step: 2, component: "Readable Stream", role: "Emits data chunks asynchronously from disk, socket, or database.", why: "Maintains constant ~25MB memory footprint regardless of file size." },
      { step: 3, component: "Backpressure Flow Control", role: "writable.write() returns false when highWaterMark buffer fills; resumes on 'drain'.", why: "Prevents fast producers from overwhelming slow network consumers." },
      { step: 4, component: "stream.promises.pipeline", role: "Chains streams with automatic error propagation and resource destruction.", why: "Eliminates file descriptor leaks common in legacy readable.pipe() calls." }
    ],
    interRelationships: [
      { from: "Readable Stream", to: "Transform Stream", relation: "Pipes raw binary chunks for on-the-fly compression or masking.", protocol: "Stream Pipeline" },
      { from: "Writable Stream", to: "Readable Stream", relation: "Emits 'drain' event to resume reading when buffer falls below highWaterMark.", protocol: "EventEmitter" },
      { from: "Pipeline", to: "File Descriptors", relation: "Destroys intermediate streams and closes open descriptors upon error.", protocol: "POSIX Handles" }
    ],
    endToEndFlow: [
      { stage: "1. Chunk Read", action: "Stream Emission", details: "Readable reads 64KB chunk into off-heap Buffer; pushes to pipeline." },
      { stage: "2. Transform", action: "Gzip Compression", details: "Transform stream compresses chunk in-memory without buffering entire file." },
      { stage: "3. Backpressure", action: "Buffer Check", details: "If socket buffer full, write() returns false; readable pauses until drain event." },
      { stage: "4. Completion", action: "Pipeline Cleanup", details: "All streams flushed; file descriptors closed; Promise resolves successfully." }
    ],
    moduleContext: {
      prevModule: "Module 22.1: Node.js V8 Runtime & Event Loop",
      thisModule: "Module 22.2: Node.js Streams & Buffers",
      nextModule: "Module 22.3: Express Middleware & Caching",
      connectionReason: "Streaming and backpressure management guarantee Node.js backends handle massive exports and uploads without crashing from out-of-memory errors."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#022c22"/><stop offset="100%" stop-color="#064e3b"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#streamGrad)" stroke="#10b981" stroke-width="2"/>
      
      <!-- Tier 1: Off-Heap Buffer -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">1. OFF-HEAP BUFFER</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Buffer.alloc()</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Direct C++ memory</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="90" y="102" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">Bypasses V8 Heap</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">0 GC Compaction Pauses</text>
        <text x="90" y="156" fill="#34d399" font-size="8" text-anchor="middle">Fixed Size Binary Chunks</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#10b981" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#10b981"/>
      
      <!-- Tier 2: Stream Pipeline -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">2. STREAM PIPELINE</text>
        <text x="90" y="50" fill="#93c5fd" font-size="8" font-family="monospace" text-anchor="middle">ReadableStream</text>
        <text x="90" y="66" fill="#94a3b8" font-size="7" text-anchor="middle">Emits chunk by chunk</text>
        <text x="90" y="90" fill="#a78bfa" font-size="8" font-family="monospace" text-anchor="middle">Transform (Gzip/Mask)</text>
        <text x="90" y="106" fill="#94a3b8" font-size="7" text-anchor="middle">Real-time processing</text>
        <text x="90" y="130" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">WritableStream</text>
        <text x="90" y="146" fill="#94a3b8" font-size="7" text-anchor="middle">Disk / Network destination</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#38bdf8"/>
      
      <!-- Tier 3: Backpressure Mechanism -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. BACKPRESSURE</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fde047" font-size="8" font-family="monospace" text-anchor="middle">highWaterMark (16KB)</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Internal buffer threshold</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">write() === false</text>
        <text x="90" y="116" fill="#fda4af" font-size="7" text-anchor="middle">Signals consumer overload</text>
        <rect x="15" y="132" width="150" height="28" rx="4" fill="#0f172a"/>
        <text x="90" y="148" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Resumes on 'drain' event</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#f59e0b"/>
      
      <!-- Tier 4: Pipeline Promises -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="70" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. PIPELINE SAFETY</text>
        <rect x="10" y="42" width="120" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="70" y="58" fill="#6ee7b7" font-size="7.5" font-family="monospace" text-anchor="middle">stream/promises</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">pipeline()</text>
        <rect x="10" y="96" width="120" height="42" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="70" y="112" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">Auto-Destruction</text>
        <text x="70" y="128" fill="#94a3b8" font-size="7" text-anchor="middle">Closes descriptors</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Zero Memory Spikes</text>
      </g>
    </svg>`
  },

  'express-middleware-security-performance-caching': {
    moduleNumber: 22,
    title: "Express Enterprise Pipeline: Security, Redis Caching & Multi-Process Clustering",
    category: "Backend API Architecture",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Express Middleware Pipeline, Redis Cache-Aside & Process Clustering',
    realDiagramCaption: 'Strictly ordered middleware chain, Redis response caching with X-Cache headers, and multi-core process clustering.',
    description: "Production Express applications execute middleware in strict sequence: Correlation ID -> Security (Helmet/CORS) -> Body Parsers -> Rate Limiting -> Redis Caching -> Business Routes -> Centralized 4-parameter error handler.",
    flowSteps: ["Correlation & Security Injection", "Rate Limiter & In-Memory Cache", "Business Logic Handlers", "Clustered Multi-Core Scaling"],
    stepByStep: [
      { step: 1, component: "Correlation & Security Middleware", role: "Attaches X-Correlation-ID and security headers via Helmet and CORS.", why: "Protects against XSS/clickjacking and provides end-to-end request tracing." },
      { step: 2, component: "Redis Cache-Aside Middleware", role: "Checks Redis before route execution; serves 200 with X-Cache: HIT on match.", why: "Reduces database query load by up to 90% for idempotent read endpoints." },
      { step: 3, component: "Centralized Error Handler", role: "Catches operational errors using 4 parameters (err, req, res, next) and formats RFC 7807 JSON.", why: "Hides stack traces in production and prevents uncaught promise rejections from crashing the server." },
      { step: 4, component: "Node.js Cluster Scaling", role: "Primary process forks worker processes matching CPU cores sharing the same TCP port.", why: "Saturates all server CPU cores and auto-restarts workers on failure." }
    ],
    interRelationships: [
      { from: "Nginx Load Balancer", to: "Primary Cluster Socket", relation: "Distributes incoming HTTP traffic across Node worker processes.", protocol: "Round-Robin TCP" },
      { from: "Cache Middleware", to: "Redis Server", relation: "Stores and retrieves serialized JSON response bodies with TTL.", protocol: "RESP / TCP" },
      { from: "Route Handlers", to: "Centralized Error Handler", relation: "Delegates uncaught errors via next(new AppError(...)).", protocol: "Express Pipeline" }
    ],
    endToEndFlow: [
      { stage: "1. Edge Ingress", action: "Header Sanitization", details: "Helmet applies HSTS and CSP; CORS whitelists origin; correlation ID assigned." },
      { stage: "2. Cache Evaluation", action: "Redis Lookup", details: "GET request checked in Redis. Cache hit returns sub-5ms response; miss proceeds." },
      { stage: "3. Execution", action: "Route Logic", details: "Controllers query database, format response, and populate Redis cache." },
      { stage: "4. Error Normalization", action: "RFC 7807 Mapping", details: "Exceptions mapped to HTTP status codes with correlation ID and invalidParams." }
    ],
    moduleContext: {
      prevModule: "Module 22.2: Node.js Streams & Buffers",
      thisModule: "Module 22.3: Express Middleware & Caching",
      nextModule: "Module 23.1: REST API Design & HTTP Protocols",
      connectionReason: "A resilient Express middleware pipeline and multi-core clustering provide the runtime backbone for hosting enterprise REST APIs."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="expGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#022c22"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#expGrad)" stroke="#10b981" stroke-width="2"/>
      
      <!-- Tier 1: Security & Tracing -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="90" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">1. SECURITY &amp; TRACE</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="90" y="54" fill="#93c5fd" font-size="8" font-family="monospace" text-anchor="middle">X-Correlation-ID</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Distributed trace UUID</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="102" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">Helmet &amp; CORS</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Origin whitelist / HSTS</text>
        <text x="90" y="156" fill="#38bdf8" font-size="8" text-anchor="middle">Body Parser (100kb limit)</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#3b82f6" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#3b82f6"/>
      
      <!-- Tier 2: Redis Caching -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
        <text x="90" y="24" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">2. REDIS CACHE-ASIDE</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fda4af" font-size="8" font-family="monospace" text-anchor="middle">GET Cache Lookup</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Hit: X-Cache: HIT (2ms)</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="106" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">TTL Expiration</text>
        <text x="90" y="120" fill="#94a3b8" font-size="7" text-anchor="middle">Auto-evict on mutation</text>
        <text x="90" y="158" fill="#e2e8f0" font-size="8" text-anchor="middle">Sliding Window Rate Limit</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#ef4444" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#ef4444"/>
      
      <!-- Tier 3: Error Handler -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. ERROR HANDLER</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fde047" font-size="8" font-family="monospace" text-anchor="middle">(err, req, res, next)</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">4-Parameter signature</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="102" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">RFC 7807 Format</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">application/problem+json</text>
        <text x="90" y="156" fill="#94a3b8" font-size="7.5" text-anchor="middle">Hides stack in production</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#f59e0b"/>
      
      <!-- Tier 4: Clustering -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="70" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. CLUSTERING</text>
        <rect x="10" y="42" width="120" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="70" y="58" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">cluster.fork()</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">1 Worker per CPU core</text>
        <rect x="10" y="96" width="120" height="42" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="70" y="112" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">Auto Self-Healing</text>
        <text x="70" y="128" fill="#94a3b8" font-size="7" text-anchor="middle">Forks replacement on exit</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">100% CPU Saturation</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 23: RESTFUL APIS, INTEGRATION, SECURITY & PERFORMANCE
  // -------------------------------------------------------------------------
  'rest-api-design-http-protocol-idempotency': {
    moduleNumber: 23,
    title: "RESTful Architectural Protocol, Idempotency-Key & Conditional ETag Caching",
    category: "API Architecture & Protocols",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'REST Architectural Constraints, Idempotency Locking & ETag Flow',
    realDiagramCaption: 'Resource modeling, safe & idempotent methods, Redis Idempotency-Key locking, and 304 Not Modified caching.',
    description: "RESTful APIs adhere to Fielding's 6 constraints. Safe methods (GET, HEAD) cause no side effects. Idempotency-Key headers prevent duplicate financial transactions, and conditional ETag headers eliminate redundant payload downloads.",
    flowSteps: ["REST Resource URI Routing", "HTTP Method Semantics (PUT vs PATCH)", "Idempotency-Key Redis Lock", "Conditional ETag Validation"],
    stepByStep: [
      { step: 1, component: "RESTful Resource URIs", role: "Hierarchical nouns representing entities (/api/v1/orders/:id/items).", why: "Ensures intuitive, standardized resource navigation without embedding verbs in URLs." },
      { step: 2, component: "Idempotent HTTP Verbs", role: "Enforces safe semantics: PUT replaces completely; PATCH mutates partially; DELETE removes.", why: "Guarantees repeatable executions without unintended state distortion." },
      { step: 3, component: "Idempotency-Key Header", role: "Locks incoming POST transactions in Redis with SET NX; caches completed result.", why: "Protects against double billing and network retry race conditions." },
      { step: 4, component: "ETag & 304 Not Modified", role: "Evaluates If-None-Match hash; returns 304 with 0-byte body if unmodified.", why: "Saves up to 95% of bandwidth and speeds up repeat client page loads." }
    ],
    interRelationships: [
      { from: "Mobile Client", to: "Idempotency Middleware", relation: "Sends unique UUID in Idempotency-Key header on checkout.", protocol: "HTTP/1.1 Header" },
      { from: "Idempotency Middleware", to: "Redis Store", relation: "Executes atomic SET key IN_FLIGHT NX to lock concurrent duplicates.", protocol: "RESP Protocol" },
      { from: "Reverse Proxy", to: "Browser Cache", relation: "Validates If-None-Match ETag and returns 304 Not Modified.", protocol: "RFC 7232 Caching" }
    ],
    endToEndFlow: [
      { stage: "1. Request Ingress", action: "URI & Method Matching", details: "Router inspects resource noun and HTTP method (POST, PUT, PATCH)." },
      { stage: "2. Lock Verification", action: "Idempotency Check", details: "If Idempotency-Key exists, return cached body; if currently processing, return 409." },
      { stage: "3. Mutation", action: "Resource Update", details: "Database mutates record; response body saved to Redis cache with 24hr TTL." },
      { stage: "4. Caching", action: "ETag Calculation", details: "MD5 hash generated and returned in ETag header for client validation." }
    ],
    moduleContext: {
      prevModule: "Module 22: Node.js Scalable Backend Architecture",
      thisModule: "Module 23.1: REST API Design & HTTP Protocols",
      nextModule: "Module 23.2: API Security & JWT Lifecycle",
      connectionReason: "Establishing strict REST conventions and idempotency semantics is required before securing API endpoints with JWT tokens and RBAC."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="restGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c4a6e"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#restGrad)" stroke="#0284c7" stroke-width="2"/>
      
      <!-- Tier 1: REST Resource Model -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. RESOURCE MODEL</text>
        <text x="90" y="50" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">GET    /api/v1/orders</text>
        <text x="90" y="70" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">POST   /api/v1/orders</text>
        <text x="90" y="90" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">PUT    /api/v1/orders/:id</text>
        <text x="90" y="110" fill="#c084fc" font-size="8" font-family="monospace" text-anchor="middle">PATCH  /api/v1/orders/:id</text>
        <text x="90" y="130" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">DELETE /api/v1/orders/:id</text>
        <text x="90" y="165" fill="#94a3b8" font-size="7.5" text-anchor="middle">Plural Nouns (Zero Verbs)</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#38bdf8"/>
      
      <!-- Tier 2: Safe & Idempotent -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. METHOD SEMANTICS</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">GET / HEAD: Safe</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Zero server side-effects</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="102" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">PUT / DELETE: Idempotent</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">N calls === 1 call state</text>
        <text x="90" y="156" fill="#f43f5e" font-size="8" text-anchor="middle">POST: Non-Idempotent</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#10b981" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#10b981"/>
      
      <!-- Tier 3: Idempotency Key -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. IDEMPOTENCY KEY</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fde047" font-size="7.5" font-family="monospace" text-anchor="middle">Idempotency-Key: &lt;UUID&gt;</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Attached to checkout POST</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">Redis SET NX Lock</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Prevents double charge</text>
        <text x="90" y="156" fill="#10b981" font-size="8" text-anchor="middle">Replays Cached Response</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#f59e0b"/>
      
      <!-- Tier 4: ETag Caching -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="70" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">4. CONDITIONAL ETAG</text>
        <rect x="10" y="42" width="120" height="42" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="70" y="58" fill="#7dd3fc" font-size="7.5" font-family="monospace" text-anchor="middle">ETag: W/"md5hash"</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">Entity validator</text>
        <rect x="10" y="96" width="120" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="70" y="112" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">304 Not Modified</text>
        <text x="70" y="128" fill="#94a3b8" font-size="7" text-anchor="middle">0 Byte payload transfer</text>
        <text x="70" y="168" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">95% Bandwidth Savings</text>
      </g>
    </svg>`
  },

  'api-security-jwt-rbac-rate-limiting-cors': {
    moduleNumber: 23,
    title: "Enterprise Dual-Token JWT Auth, Refresh Token Rotation & CORS Defense",
    category: "API Security & Identity",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Dual-Token Architecture, Refresh Rotation & RBAC Authorization Flow',
    realDiagramCaption: 'Short-lived access tokens, httpOnly refresh cookies, token family reuse detection, and Redis revocation list.',
    description: "Enterprise security architecture: Short-lived access tokens (15m) combined with Refresh Token Rotation (RTR) stored in httpOnly, Secure, SameSite cookies. Token reuse triggers family revocation, and RBAC middleware enforces role permissions.",
    flowSteps: ["Dual-Token Generation", "httpOnly Cookie Storage", "Refresh Token Rotation (RTR)", "RBAC Role Verification"],
    stepByStep: [
      { step: 1, component: "RS256 JWT Access Token", role: "Short-lived (15 min) digitally signed token containing user claims and roles.", why: "Enables stateless authorization across microservices without hitting primary DB." },
      { step: 2, component: "httpOnly Refresh Cookie", role: "Long-lived (7 day) cryptographically random token stored in httpOnly cookie.", why: "Completely immune to client-side JavaScript theft (XSS attacks)." },
      { step: 3, component: "Refresh Token Rotation (RTR)", role: "Each refresh token is single-use; issuing a new access token burns the old refresh token.", why: "Detects token theft automatically; replay revokes the entire token family." },
      { step: 4, component: "RBAC Middleware & CORS", role: "Validates roles against required route permissions and enforces origin whitelist.", why: "Guarantees least privilege and blocks unauthorized cross-origin requests." }
    ],
    interRelationships: [
      { from: "Angular HTTP Interceptor", to: "Access Token", relation: "Attaches Authorization: Bearer <token> on API requests.", protocol: "HTTP Header" },
      { from: "Auth Service", to: "httpOnly Cookie", relation: "Sets Set-Cookie: refresh_token=...; HttpOnly; Secure; SameSite=Strict.", protocol: "RFC 6265 Cookies" },
      { from: "API Gateway", to: "Redis Revocation List", relation: "Checks token version or JTI blacklist in sub-millisecond cache check.", protocol: "In-Memory Lookup" }
    ],
    endToEndFlow: [
      { stage: "1. Login Auth", action: "Credential Validation", details: "Node backend validates password hash; issues 15m access token & 7d refresh token." },
      { stage: "2. API Call", action: "Stateless Verification", details: "Gateway verifies JWT signature with public key; extracts roles and executes RBAC." },
      { stage: "3. Token Expiry", action: "Silent Refresh", details: "Client interceptor intercepts 401; calls /auth/refresh with cookie; receives new token pair." },
      { stage: "4. Breach Defense", action: "Family Invalidation", details: "If old refresh token re-presented, server invalidates all sessions for that family." }
    ],
    moduleContext: {
      prevModule: "Module 23.1: REST API Design & HTTP Protocols",
      thisModule: "Module 23.2: API Security & JWT Lifecycle",
      nextModule: "Module 23.3: API Validation, Pagination & Errors",
      connectionReason: "Securing authentication and authorization guarantees that subsequent validation, pagination, and data retrieval operate within safe boundaries."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="secGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#450a0a"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#secGrad)" stroke="#ef4444" stroke-width="2"/>
      
      <!-- Tier 1: Dual Token Architecture -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="90" y="24" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">1. DUAL-TOKEN MODEL</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#f43f5e" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fda4af" font-size="8" font-family="monospace" text-anchor="middle">Access Token (JWT)</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">15m TTL / In-Memory</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="106" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">Refresh Token (Cookie)</text>
        <text x="90" y="120" fill="#94a3b8" font-size="7" text-anchor="middle">7d TTL / httpOnly Secure</text>
        <text x="90" y="160" fill="#e2e8f0" font-size="8" text-anchor="middle">Immune to XSS Infiltration</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#f43f5e" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#f43f5e"/>
      
      <!-- Tier 2: Refresh Token Rotation -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">2. REFRESH ROTATION (RTR)</text>
        <rect x="15" y="38" width="150" height="40" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fde047" font-size="8" font-family="monospace" text-anchor="middle">Single-Use Guarantee</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Old token burned immediately</text>
        <rect x="15" y="88" width="150" height="40" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="104" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">Reuse Breach Defense</text>
        <text x="90" y="118" fill="#fca5a5" font-size="7" text-anchor="middle">Replay revokes token family</text>
        <text x="90" y="158" fill="#38bdf8" font-size="8" text-anchor="middle">Issues New Token Pair</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#f59e0b"/>
      
      <!-- Tier 3: RBAC Authorization -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="90" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">3. RBAC AUTHORIZATION</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="90" y="54" fill="#93c5fd" font-size="8" font-family="monospace" text-anchor="middle">Role Verification</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">['Admin', 'Manager'] check</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">401 vs 403 Status</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Unauth vs Forbidden</text>
        <text x="90" y="156" fill="#10b981" font-size="8" text-anchor="middle">Least Privilege Guardrail</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#3b82f6" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#3b82f6"/>
      
      <!-- Tier 4: CORS Policy -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="70" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. CORS DEFENSE</text>
        <rect x="10" y="42" width="120" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="70" y="58" fill="#6ee7b7" font-size="7.5" font-family="monospace" text-anchor="middle">Explicit Origin</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">Never allow * with creds</text>
        <rect x="10" y="96" width="120" height="42" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="70" y="112" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">Preflight Caching</text>
        <text x="70" y="128" fill="#94a3b8" font-size="7" text-anchor="middle">Max-Age: 86400 (24hr)</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Zero CSRF Vulnerability</text>
      </g>
    </svg>`
  },

  'api-validation-pagination-filtering-error-handling': {
    moduleNumber: 23,
    title: "Keyset Cursor Pagination Engine & RFC 7807 Problem Details Standard",
    category: "API Data Engineering",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Cursor Pagination B-Tree Seeks vs OFFSET Degradation & Error Standards',
    realDiagramCaption: 'Keyset pagination using B-Tree indexed seeks, schema validation at the edge, and standardized RFC 7807 problem details.',
    description: "Keyset / Cursor pagination queries records using indexed comparison (WHERE id > cursor), maintaining constant O(log N) latency regardless of dataset size. Request schemas validate payloads at the edge, and RFC 7807 Problem Details standardizes error communication.",
    flowSteps: ["Edge Schema Validation (Zod/Joi)", "B-Tree Keyset Cursor Seek", "Dynamic Query Filter/Sort Parser", "RFC 7807 Problem Details Response"],
    stepByStep: [
      { step: 1, component: "Schema Validation Guard", role: "Validates input structure and strips unexpected properties to prevent mass assignment.", why: "Protects against SQL/NoSQL injection and prototype pollution before controllers run." },
      { step: 2, component: "Keyset Cursor Pagination", role: "Uses base64-encoded record offsets (WHERE id > :cursor LIMIT :limit).", why: "Eliminates the O(N) scan-and-discard penalty of OFFSET pagination on large tables." },
      { step: 3, component: "Query Filter & Sort Parser", role: "Parses ?status=active&sort=-created_at against strict whitelist.", why: "Prevents full table scans and ensures database queries utilize existing composite indexes." },
      { step: 4, component: "RFC 7807 Error Formatter", role: "Formats errors with type, title, status, detail, instance, and correlationId.", why: "Enables client HTTP interceptors to render structured, accessible UI error alerts." }
    ],
    interRelationships: [
      { from: "Client Request", to: "Validation Middleware", relation: "Sends JSON payload validated against Zod schema; returns 422 on failure.", protocol: "JSON Schema" },
      { from: "Cursor Query", to: "B-Tree Index", relation: "Executes indexed range seek avoiding full table scan.", protocol: "SQL Engine" },
      { from: "RFC 7807 Error", to: "Angular Toast Service", relation: "Interceptor parses error.title and error.detail for user notifications.", protocol: "HTTP Interceptor" }
    ],
    endToEndFlow: [
      { stage: "1. Payload Guard", action: "Schema Verification", details: "Zod checks fields; returns 422 Unprocessable Entity with invalidParams if invalid." },
      { stage: "2. Cursor Decode", action: "Offset Extraction", details: "Base64URL cursor decoded to extract timestamp and UUID of last retrieved record." },
      { stage: "3. B-Tree Seek", action: "Query Execution", details: "Database seeks directly to offset in <1ms; fetches N+1 rows to evaluate hasMore." },
      { stage: "4. Response", action: "Envelope Assembly", details: "Returns items and pagination metadata { limit, hasMore, nextCursor }." }
    ],
    moduleContext: {
      prevModule: "Module 23.2: API Security & JWT Lifecycle",
      thisModule: "Module 23.3: API Validation, Pagination & Errors",
      nextModule: "Module 24.1: SQL vs NoSQL Schema Modeling",
      connectionReason: "Mastering cursor pagination and schema validation directly prepares developers for enterprise database schema modeling and query optimization."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="pageGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0c4a6e"/><stop offset="100%" stop-color="#082f49"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#pageGrad)" stroke="#0ea5e9" stroke-width="2"/>
      
      <!-- Tier 1: Schema Validation -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. SCHEMA VALIDATION</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="90" y="54" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">Zod / Joi Schema</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Type &amp; boundary checks</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#f43f5e" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f43f5e" font-size="8" font-family="monospace" text-anchor="middle">Strip Unknown Fields</text>
        <text x="90" y="116" fill="#fda4af" font-size="7" text-anchor="middle">Prevents mass assignment</text>
        <text x="90" y="156" fill="#10b981" font-size="8" text-anchor="middle">HTTP 422 on Failure</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#38bdf8"/>
      
      <!-- Tier 2: Keyset Cursor Pagination -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. KEYSET CURSOR</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">WHERE id &gt; :cursor</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Direct B-Tree index seek</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="106" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">NO OFFSET Penalty</text>
        <text x="90" y="120" fill="#fca5a5" font-size="7" text-anchor="middle">Avoids O(N) scan &amp; discard</text>
        <text x="90" y="158" fill="#e2e8f0" font-size="8" text-anchor="middle">Constant Sub-2ms Performance</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#10b981" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#10b981"/>
      
      <!-- Tier 3: Query Filter & Sort -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. FILTER &amp; SORT</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fde047" font-size="8" font-family="monospace" text-anchor="middle">?sort=-created_at</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Multi-direction parser</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="102" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">Whitelist Guard</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Discards unindexed fields</text>
        <text x="90" y="156" fill="#38bdf8" font-size="8" text-anchor="middle">Prevents Query Injection</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#f59e0b"/>
      
      <!-- Tier 4: RFC 7807 Error Format -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#ec4899" stroke-width="1.5"/>
        <text x="70" y="24" fill="#f472b6" font-size="11" font-weight="bold" text-anchor="middle">4. RFC 7807 ERRORS</text>
        <rect x="10" y="42" width="120" height="42" rx="4" fill="#0f172a" stroke="#ec4899" stroke-width="0.8"/>
        <text x="70" y="58" fill="#fda4af" font-size="7.5" font-family="monospace" text-anchor="middle">type / title / status</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">Standard problem fields</text>
        <rect x="10" y="96" width="120" height="42" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="70" y="112" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">correlationId</text>
        <text x="70" y="128" fill="#94a3b8" font-size="7" text-anchor="middle">Traceable to APM logs</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Universal UI Toasts</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 24: DATABASE ENGINEERING, QUERY OPTIMIZATION & SYSTEM DESIGN
  // -------------------------------------------------------------------------
  'sql-nosql-schema-modeling-indexing': {
    moduleNumber: 24,
    title: "Relational 3NF vs Document Modeling, B-Tree Indexes & ACID Isolation",
    category: "Database Architecture",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'SQL 3NF vs MongoDB Document Modeling, B-Tree Nodes & ACID Isolation',
    realDiagramCaption: 'Relational normalized schema, MongoDB embedded vs referenced patterns, B-Tree Leftmost Prefix rule, and ACID transactions.',
    description: "Database engineering principles: Normalizing data to 3NF in relational databases versus bounded embedding in MongoDB document stores. B-Tree indexes provide O(log N) lookup adhering to the Leftmost Prefix rule, and ACID isolation levels prevent anomalies.",
    flowSteps: ["Relational 3NF Normalization", "MongoDB Document Embedding", "B-Tree Leftmost Prefix Rule", "ACID Transaction Isolation"],
    stepByStep: [
      { step: 1, component: "Relational 3NF Normalization", role: "Eliminates duplicate columns and enforces foreign key referential integrity.", why: "Guarantees strong data consistency and eliminates update anomalies." },
      { step: 2, component: "MongoDB Document Embedding", role: "Embeds 1:Few bounded sub-documents within parent documents.", why: "Enables single-query atomic reads without costly cross-collection joins." },
      { step: 3, component: "B-Tree Indexing Structure", role: "Balanced tree navigating root -> branch -> leaf nodes in O(log N) operations.", why: "Accelerates equality filters and range scans adhering to the Leftmost Prefix rule." },
      { step: 4, component: "ACID Concurrency Engine", role: "Enforces Atomicity, Consistency, Isolation, and Durability across transactions.", why: "Prevents dirty reads, non-repeatable reads, and inventory overselling during concurrent updates." }
    ],
    interRelationships: [
      { from: "Orders Table", to: "Users Table", relation: "Foreign key references parent user record with ON DELETE RESTRICT.", protocol: "SQL FK Constraint" },
      { from: "Composite Index", to: "Query Planner", relation: "Satisfies queries matching leading columns of index (A, B).", protocol: "Leftmost Prefix" },
      { from: "BEGIN Transaction", to: "WAL Log", relation: "Writes changes to Write-Ahead Log before committing to table blocks.", protocol: "ACID Durability" }
    ],
    endToEndFlow: [
      { stage: "1. Data Modeling", action: "Schema Architecture", details: "Evaluate data access patterns; choose relational 3NF or NoSQL document embedding." },
      { stage: "2. Index Design", action: "Composite Indexing", details: "Create composite B-Tree indexes ordering high-cardinality equality fields first." },
      { stage: "3. Concurrency", action: "Transaction Isolation", details: "Execute atomic transfer with SELECT FOR UPDATE row locking or atomic UPDATE WHERE." },
      { stage: "4. Commitment", action: "WAL Flush & Commit", details: "Database flushes changes to disk WAL journal and releases transaction locks." }
    ],
    moduleContext: {
      prevModule: "Module 23: RESTful APIs, Security & Performance",
      thisModule: "Module 24.1: SQL vs NoSQL Schema Modeling",
      nextModule: "Module 24.2: Query Optimization & EXPLAIN ANALYZE",
      connectionReason: "Sound database schema modeling and index selection form the critical prerequisite for query tuning, execution plan optimization, and caching."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="dbGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#311042"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#dbGrad)" stroke="#a855f7" stroke-width="2"/>
      
      <!-- Tier 1: Relational 3NF -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
        <text x="90" y="24" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">1. RELATIONAL 3NF</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="0.8"/>
        <text x="90" y="54" fill="#e9d5ff" font-size="8" font-family="monospace" text-anchor="middle">PostgreSQL / MySQL</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Foreign Keys &amp; Constraints</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="102" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">ON DELETE RESTRICT</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Referential Integrity</text>
        <text x="90" y="156" fill="#c084fc" font-size="8" text-anchor="middle">Eliminates Data Redundancy</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#a855f7" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#a855f7"/>
      
      <!-- Tier 2: Document Modeling -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. DOCUMENT MODELING</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Embedded (1:Few)</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Addresses in User doc</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="106" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">Referenced (1:Millions)</text>
        <text x="90" y="120" fill="#94a3b8" font-size="7" text-anchor="middle">Logs/Comments separated</text>
        <text x="90" y="158" fill="#e2e8f0" font-size="8" text-anchor="middle">&lt; 16MB BSON Document Limit</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#10b981" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#10b981"/>
      
      <!-- Tier 3: B-Tree Index Mechanics -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">3. B-TREE INDEXING</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="90" y="54" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">O(log N) Tree Seek</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Root -> Branch -> Leaf</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">Leftmost Prefix Rule</text>
        <text x="90" y="116" fill="#fda4af" font-size="7" text-anchor="middle">(A, B) cannot index B alone</text>
        <text x="90" y="156" fill="#10b981" font-size="8" text-anchor="middle">Doubly-Linked Leaf Nodes</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#38bdf8"/>
      
      <!-- Tier 4: ACID Concurrency -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="70" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">4. ACID ISOLATION</text>
        <text x="70" y="48" fill="#94a3b8" font-size="7.5" font-family="monospace" text-anchor="middle">Read Committed</text>
        <text x="70" y="68" fill="#38bdf8" font-size="7.5" font-family="monospace" text-anchor="middle">Repeatable Read</text>
        <text x="70" y="88" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">Serializable</text>
        <rect x="10" y="105" width="120" height="42" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="70" y="121" fill="#fde047" font-size="7.5" font-family="monospace" text-anchor="middle">SELECT FOR UPDATE</text>
        <text x="70" y="137" fill="#94a3b8" font-size="7" text-anchor="middle">Row-level locking</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Zero Overselling</text>
      </g>
    </svg>`
  },

  'query-optimization-execution-plans-caching': {
    moduleNumber: 24,
    title: "Database Query Tuning: EXPLAIN ANALYZE, Joins & Cache-Aside Invalidation",
    category: "Database Performance",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'EXPLAIN ANALYZE Cost Profiling, Join Types & Cache-Aside Invalidation',
    realDiagramCaption: 'Detecting Sequential Scans, eliminating N+1 ORM queries via eager loading, and Redis cache stampede prevention.',
    description: "Database query tuning: Inspecting EXPLAIN (ANALYZE, BUFFERS) execution plans to eliminate sequential table scans. Eliminating N+1 queries via SQL JOINs, selecting between Nested Loop, Hash, and Merge Joins, and preventing Redis cache stampedes with mutex locks.",
    flowSteps: ["EXPLAIN ANALYZE Profiling", "N+1 Elimination & Eager JOIN", "Relational Join Algorithm Selection", "Cache-Aside & Stampede Defense"],
    stepByStep: [
      { step: 1, component: "EXPLAIN ANALYZE Engine", role: "Measures actual execution time, startup/total cost, and shared buffer RAM cache hits.", why: "Identifies whether queries execute fast Index Scans or slow disk-thrashing Sequential Scans." },
      { step: 2, component: "N+1 Query Elimination", role: "Replaces N+1 loop queries with a single eager JOIN or DataLoader batched IN query.", why: "Reduces database network round trips and query latency from seconds to milliseconds." },
      { step: 3, component: "Relational Join Optimizer", role: "Selects Nested Loop (indexed lookups), Hash Join (large unsorted), or Merge Join (sorted).", why: "Ensures optimal CPU and memory work_mem utilization during multi-table aggregations." },
      { step: 4, component: "Cache-Aside & Mutex Locking", role: "Serves reads from Redis; uses distributed lock (Redlock) during cache misses.", why: "Prevents thundering herd cache stampedes from crashing database instances on TTL expiration." }
    ],
    interRelationships: [
      { from: "Query Planner", to: "Buffer Cache", relation: "Reads cached 8KB disk blocks from shared memory buffers.", protocol: "Shared Buffers" },
      { from: "ORM Entity", to: "SQL JOIN", relation: "Fetches parent and child relations in a single eager round trip.", protocol: "SQL Connection" },
      { from: "Redis Cache", to: "Distributed Mutex", relation: "Locks cache key so only one worker queries DB on cache expiration.", protocol: "Redis SET NX" }
    ],
    endToEndFlow: [
      { stage: "1. Diagnosis", action: "Execution Plan Analysis", details: "Run EXPLAIN ANALYZE; spot 'Seq Scan' on million-row table and high buffer reads." },
      { stage: "2. Indexing", action: "Covering Index Addition", details: "Create composite index with INCLUDE clause; scan transitions to Index Only Scan." },
      { stage: "3. Eager Loading", action: "Query Restructuring", details: "Replace loop queries with LEFT JOIN; reduce query count from 101 to 1." },
      { stage: "4. Caching", action: "Cache-Aside Population", details: "Store aggregated payload in Redis with 60s TTL; subsequent reads resolve in 3ms." }
    ],
    moduleContext: {
      prevModule: "Module 24.1: SQL vs NoSQL Schema Modeling",
      thisModule: "Module 24.2: Query Optimization & EXPLAIN ANALYZE",
      nextModule: "Module 24.3: Full-Stack Enterprise System Design",
      connectionReason: "Optimizing database queries and implementing robust cache invalidation guarantees sub-50ms latencies required for large-scale full-stack systems."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="optGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#optGrad)" stroke="#6366f1" stroke-width="2"/>
      
      <!-- Tier 1: EXPLAIN ANALYZE -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. EXPLAIN ANALYZE</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">Index Scan (Optimal)</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Direct B-Tree path (0.05ms)</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="102" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">Seq Scan (Danger!)</text>
        <text x="90" y="116" fill="#fda4af" font-size="7" text-anchor="middle">Reads entire table from disk</text>
        <text x="90" y="156" fill="#38bdf8" font-size="8" text-anchor="middle">Buffers: shared hit vs read</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#38bdf8"/>
      
      <!-- Tier 2: N+1 Elimination -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="90" y="24" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">2. N+1 ELIMINATION</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="90" y="54" fill="#f87171" font-size="8" font-family="monospace" text-anchor="middle">Anti-Pattern (101 Queries)</text>
        <text x="90" y="68" fill="#fca5a5" font-size="7" text-anchor="middle">1 parent + N child loop calls</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="106" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">Eager JOIN / DataLoader</text>
        <text x="90" y="120" fill="#94a3b8" font-size="7" text-anchor="middle">Single batched query (1 round trip)</text>
        <text x="90" y="158" fill="#e2e8f0" font-size="8" text-anchor="middle">O(1) Round Trip Efficiency</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#f43f5e" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#f43f5e"/>
      
      <!-- Tier 3: Relational Joins -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. 3 JOIN ALGORITHMS</text>
        <text x="90" y="48" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle">Nested Loop Join</text>
        <text x="90" y="62" fill="#94a3b8" font-size="7" text-anchor="middle">Small outer + indexed inner</text>
        <text x="90" y="86" fill="#10b981" font-size="8" font-family="monospace" text-anchor="middle">Hash Join</text>
        <text x="90" y="100" fill="#94a3b8" font-size="7" text-anchor="middle">Large unsorted table pairs</text>
        <text x="90" y="124" fill="#c084fc" font-size="8" font-family="monospace" text-anchor="middle">Merge Join</text>
        <text x="90" y="138" fill="#94a3b8" font-size="7" text-anchor="middle">Both sets pre-sorted on key</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#f59e0b"/>
      
      <!-- Tier 4: Cache Stampede Defense -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="70" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. STAMPEDE DEFENSE</text>
        <rect x="10" y="42" width="120" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="70" y="58" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Redis Mutex</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">SET NX Distributed Lock</text>
        <rect x="10" y="96" width="120" height="42" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="70" y="112" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">XFetch Probabilistic</text>
        <text x="70" y="128" fill="#94a3b8" font-size="7" text-anchor="middle">Pre-computes near TTL</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Zero DB Spikes</text>
      </g>
    </svg>`
  },

  'fullstack-system-design-angular-node-integration': {
    moduleNumber: 24,
    title: "Full-Stack Enterprise Topology: Angular + Node.js + WebSockets + Nginx",
    category: "Full-Stack System Design",
    realDiagramUrl: '/images/aws-account/16-root-mfa-security-checklist.png',
    realDiagramTitle: 'Multi-Tier Enterprise Architecture: Edge, Proxy, Cluster, WebSockets & DB',
    realDiagramCaption: 'Cloudflare CDN, Nginx reverse proxy, Node.js cluster, Redis Pub/Sub WebSocket adapter, and PostgreSQL Primary/Replica.',
    description: "Complete full-stack enterprise architecture: Cloudflare edge terminates DDoS/TLS, Nginx handles load balancing and WebSocket upgrades, Node.js worker clusters serve REST APIs and real-time Socket.io events via Redis Pub/Sub, backed by PostgreSQL read replicas.",
    flowSteps: ["Cloudflare Edge & TLS Termination", "Nginx Load Balancing & Reverse Proxy", "Node.js API & WebSocket Clusters", "Redis Pub/Sub & PostgreSQL Replicas"],
    stepByStep: [
      { step: 1, component: "Cloudflare Edge CDN", role: "Terminates TLS 1.3, caches static Angular bundles, and mitigates L3/L7 DDoS attacks.", why: "Accelerates worldwide client loading and shields internal servers from attack traffic." },
      { step: 2, component: "Nginx Reverse Proxy", role: "Terminates internal SSL, serves Angular SPA, proxies /api, and upgrades /socket.io.", why: "Provides single ingress URL and distributes requests across Node backend instances." },
      { step: 3, component: "Node.js Cluster & WebSockets", role: "Executes Express REST services and Socket.io real-time bi-directional events.", why: "Provides scalable microservice logic utilizing all server CPU cores." },
      { step: 4, component: "Redis Pub/Sub & PostgreSQL", role: "Redis broadcasts WebSocket events across workers; PostgreSQL ensures ACID persistence with read replicas.", why: "Decouples stateful WebSockets horizontally and scales read query capacity." }
    ],
    interRelationships: [
      { from: "Angular SPA", to: "Cloudflare CDN", relation: "Loads pre-compiled static JavaScript, CSS, and asset bundles.", protocol: "HTTPS / Brotli" },
      { from: "Nginx Proxy", to: "Node Worker Pool", relation: "Proxies HTTP requests and upgrades WebSocket TCP sockets.", protocol: "HTTP/1.1 Upstream" },
      { from: "Node WebSocket Server", to: "Redis Pub/Sub", relation: "Broadcasts room events across multiple Node cluster nodes.", protocol: "Redis Adapter" }
    ],
    endToEndFlow: [
      { stage: "1. Client Boot", action: "Static Bundle Fetch", details: "Browser downloads Angular SPA from Cloudflare edge in <100ms." },
      { stage: "2. Handshake", action: "WebSocket Upgrade", details: "Angular opens WSS socket; Nginx upgrades HTTP connection to Node cluster." },
      { stage: "3. Mutation & Real-Time", action: "State Broadcast", details: "Client updates Task; backend mutates DB and publishes event to Redis Pub/Sub." },
      { stage: "4. Propagation", action: "Multi-Client Patch", details: "All connected Angular clients receive ORDER_UPDATE event and patch Signal state." }
    ],
    moduleContext: {
      prevModule: "Module 24.2: Query Optimization & Caching",
      thisModule: "Module 24.3: Full-Stack Enterprise System Design",
      nextModule: "Capstone: Enterprise Interview Mastery",
      connectionReason: "Unifies Angular frontend, Node.js backend, REST APIs, WebSockets, Redis, and PostgreSQL into a coherent, production-ready system architecture."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="sysGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#090d16"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#sysGrad)" stroke="#4338ca" stroke-width="2"/>
      
      <!-- Tier 1: Cloudflare & Clients -->
      <g transform="translate(25, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="90" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">1. CLOUDFLARE EDGE</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="54" fill="#fde047" font-size="8" font-family="monospace" text-anchor="middle">Edge CDN &amp; WAF</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Static Angular Bundles</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="102" fill="#34d399" font-size="8" font-family="monospace" text-anchor="middle">TLS 1.3 Termination</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">DDoS Shielding</text>
        <text x="90" y="156" fill="#38bdf8" font-size="8" text-anchor="middle">100,000+ Angular Clients</text>
      </g>
      
      <path d="M 210 130 L 235 130" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="240,130 230,125 230,135" fill="#f59e0b"/>
      
      <!-- Tier 2: Nginx Reverse Proxy -->
      <g transform="translate(245, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. NGINX REVERSE PROXY</text>
        <rect x="15" y="38" width="150" height="42" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="0.8"/>
        <text x="90" y="54" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">try_files $uri /index.html</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">SPA deep route fallback</text>
        <rect x="15" y="90" width="150" height="42" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="90" y="106" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">WebSocket Upgrade</text>
        <text x="90" y="120" fill="#94a3b8" font-size="7" text-anchor="middle">Connection "Upgrade"</text>
        <text x="90" y="158" fill="#e2e8f0" font-size="8" text-anchor="middle">Round-Robin Load Balancer</text>
      </g>
      
      <path d="M 430 130 L 455 130" stroke="#10b981" stroke-width="2"/>
      <polygon points="460,130 450,125 450,135" fill="#10b981"/>
      
      <!-- Tier 3: Node.js Cluster & WebSockets -->
      <g transform="translate(465, 35)">
        <rect width="180" height="190" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="90" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">3. NODE.JS CLUSTER</text>
        <rect x="15" y="38" width="150" height="38" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8"/>
        <text x="90" y="54" fill="#7dd3fc" font-size="8" font-family="monospace" text-anchor="middle">Express REST Workers</text>
        <text x="90" y="68" fill="#94a3b8" font-size="7" text-anchor="middle">Stateless microservices</text>
        <rect x="15" y="86" width="150" height="38" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="0.8"/>
        <text x="90" y="102" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">Socket.io Instances</text>
        <text x="90" y="116" fill="#94a3b8" font-size="7" text-anchor="middle">Real-time bi-directional</text>
        <text x="90" y="156" fill="#10b981" font-size="8" text-anchor="middle">AsyncLocalStorage Tracing</text>
      </g>
      
      <path d="M 650 130 L 675 130" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="680,130 670,125 670,135" fill="#38bdf8"/>
      
      <!-- Tier 4: Redis & PostgreSQL -->
      <g transform="translate(685, 35)">
        <rect width="140" height="190" rx="10" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
        <text x="70" y="24" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">4. PERSISTENCE</text>
        <rect x="10" y="42" width="120" height="42" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="0.8"/>
        <text x="70" y="58" fill="#fda4af" font-size="8" font-family="monospace" text-anchor="middle">Redis Pub/Sub</text>
        <text x="70" y="74" fill="#94a3b8" font-size="7" text-anchor="middle">Cross-worker broadcast</text>
        <rect x="10" y="96" width="120" height="42" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="70" y="112" fill="#93c5fd" font-size="8" font-family="monospace" text-anchor="middle">PostgreSQL HA</text>
        <text x="70" y="128" fill="#94a3b8" font-size="7" text-anchor="middle">Primary + Read Replicas</text>
        <text x="70" y="168" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">High Availability Tier</text>
      </g>
    </svg>`
  }
};
