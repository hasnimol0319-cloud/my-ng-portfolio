# Stop Hardcoding Buttons in Every Angular Component

![Image](https://miro.medium.com/v2/resize:fit:720/format:webp/1*SLeV0Cbzf11dC5qhkX65MQ.png)

Most Angular tutorials teach you to put buttons directly in your component template, wire up `(click)` handlers, and call it a day. It works until your app has five wizard steps, three of them need a "Next" button, one needs a "Skip," and suddenly you're copy-pasting footer markup everywhere and hardcoding navigation logic inside form components that shouldn't know about routing.

Here's how to fix that properly and, just as importantly, when *not* to bother.

## The Naive Version (What Most of Us Write First)

Imagine a two-step workflow: a Vehicle Form, followed by a Customer screen. The Vehicle screen has three footer actions Discard, Save, Next. The Customer screen has two Discard, Save.

The natural first implementation looks like this:

```html
<!-- vehicle.component.html -->
<h1>Vehicle Component</h1>
<button mat-raised-button color="primary" (click)="discard()">Discard</button>
<button mat-raised-button color="primary" (click)="save()">Save</button>
<button mat-raised-button color="primary" (click)="next()">Next</button>
```

```typescript
// vehicle.component.ts
discard() {
  console.log('Discard Vehicle');
}
save() {
  console.log('Save Vehicle');
}
next() {
  console.log('Next Vehicle');
}
```

The Customer component follows the exact same pattern, minus the Next button:

```html
<!-- customer.component.html -->
<h1>Customer Component</h1>
<button mat-raised-button color="primary" (click)="discard()">Discard</button>
<button mat-raised-button color="primary" (click)="save()">Save</button>
```

```typescript
// customer.component.ts
discard() {
  console.log('discard Customer');
}
save() {
  console.log('save Customer');
}
```

It compiles. It works. It's also a problem waiting to happen.

## Why This Doesn't Scale

Three issues creep in as soon as you add a third step, reorder the flow, or need to reuse a form somewhere else:

1. **Duplicated markup.** The same three `<button>` tags, copy-pasted into every screen that needs them.
2. **No single source of truth for the footer.** There's no actual "footer component" just inline HTML repeated per screen. Want to add a loading spinner to every Save button? You're editing N files.
3. **Tight coupling.** "Next" is hardcoded into the Vehicle component's logic. If you want to reuse the Vehicle form in a flow *without* a Next button, or reorder steps, you're editing component internals instead of configuration.

The fix: make the footer a **dumb, reusable component driven by data**, and let each step **register its own actions** instead of owning the buttons itself.

## Step 1: Model an Action as Data

Instead of hardcoding buttons in markup, describe a button as a plain object:

```typescript
// footer-action.model.ts
export interface FooterAction {
  id: string;                 // 'save' | 'discard' | 'next' | custom
  label: string;
  color?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;
  loading?: boolean;
  handler: () => void;
}
```

This one shift buttons as data instead of markup is what unlocks everything else.

## Step 2: Build a Presentational Footer Component

This component knows nothing about Vehicles or Customers. It just renders whatever array of actions it's handed:

```typescript
// footer-actions.component.ts
@Component({
  selector: 'app-footer-actions',
  template: `
    <button mat-raised-button
            *ngFor="let action of actions"
            [color]="action.color ?? 'primary'"
            [disabled]="action.disabled || action.loading"
            (click)="action.handler()">
      {{ action.label }}
    </button>
  `
})
export class FooterActionsComponent {
  @Input() actions: FooterAction[] = [];
}
```

No `*ngIf` chains checking which route you're on. No knowledge of "Vehicle" or "Customer" anywhere in this file. It's pure and reusable across every wizard in your app.

## Step 3: A Service Steps Can Register Actions With

Rather than the footer reaching down into each step to ask "what buttons do you need," each step pushes its actions up when it loads:

```typescript
// wizard-actions.service.ts
@Injectable() // provided at the wizard container level, not root
export class WizardActionsService {
  private actionsSubject = new BehaviorSubject<FooterAction[]>([]);
  actions$ = this.actionsSubject.asObservable();

  setActions(actions: FooterAction[]) {
    this.actionsSubject.next(actions);
  }
}
```

Note the `@Injectable()` is provided at the *wizard* level, not root each wizard instance gets its own isolated action state.

## Step 4: Each Step Registers Its Own Actions

```typescript
// vehicle.component.ts
constructor(private wizardActions: WizardActionsService) {}

ngOnInit() {
  this.wizardActions.setActions([
    { id: 'discard', label: 'Discard', color: 'warn', handler: () => this.discard() },
    { id: 'save',    label: 'Save',    handler: () => this.save() },
    { id: 'next',    label: 'Next',    handler: () => this.next() },
  ]);
}

discard() { console.log('Discard Vehicle'); }
save()    { console.log('Save Vehicle'); }
next()    { console.log('Next Vehicle'); }
```

```typescript
// customer.component.ts
ngOnInit() {
  this.wizardActions.setActions([
    { id: 'discard', label: 'Discard', color: 'warn', handler: () => this.discard() },
    { id: 'save',    label: 'Save',    handler: () => this.save() },
  ]);
}
```

Customer simply never registers a "Next" action. No conditional logic in the footer needed it renders exactly what it's given, nothing more.

## Step 5: Wire It Together in the Wizard Shell

```typescript
// wizard.component.ts
@Component({
  selector: 'app-wizard',
  providers: [WizardActionsService], // scoped per wizard instance
  template: `
    <router-outlet></router-outlet>
    <app-footer-actions [actions]="actions$ | async"></app-footer-actions>
  `
})
export class WizardComponent {
  actions$ = this.wizardActions.actions$;
  constructor(private wizardActions: WizardActionsService) {}
}
```

Vehicle and Customer become routed children of this wizard. Each one owns its form and its own actions nothing more, nothing less.

## Why This Scales

- **Adding a step** (say, an Insurance screen) means writing a component and calling `setActions()`. No footer changes, no routing gymnastics.
- **Reordering or renaming buttons** is a data change, not a markup change.
- **Disabled and loading states become trivial** wire them reactively off the form's `statusChanges`:
  ```typescript
  { id: 'save', label: 'Save', disabled: !this.form.valid, handler: () => this.save() }
  ```
- **Testing gets easier.** You test that a component calls `setActions()` with the right config. Separately, you test that the footer renders whatever array it receives. No more testing button click behavior buried inside form logic.
- **It's a clean on-ramp to NgRx or a global store**, if your app grows into one. `handler` calls become `dispatch()` calls, and `actions$` can come from the store instead of a local `BehaviorSubject`. The footer component itself never changes.

## The Caveat That Matters More Than the Pattern

Don't over-engineer a two-screen app.

If you genuinely only ever have two static screens with fixed buttons, plain `@Input()` / `@Output()` bindings on the footer no service, no `BehaviorSubject` are simpler and entirely sufficient. This service-based registration pattern earns its complexity once you have three or more steps, dynamic step ordering, or steps that get added or removed based on business rules.

Architecture patterns aren't free. Apply them when the problem they solve actually exists in your codebase not because they look good in a blog post.

## The Takeaway

The real shift here isn't "use a service instead of `@Input()`." It's a single question: **should this component know about that?**

The footer shouldn't know about Vehicles. The Vehicle form shouldn't know about routing between steps. Once you start asking that question, this pattern shows up everywhere not just in footers.

---

*If you found this useful, follow for more Angular architecture deep-dives.*
