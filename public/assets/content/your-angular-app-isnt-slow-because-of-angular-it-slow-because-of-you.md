# Your Angular App Isn't Slow Because of Angular. It's Slow Because of You.

![image](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*ieA9clf6yJpQ6hT1nBQGvA.png)

_The one system design mental model that separates junior Angular devs from senior ones_

---

Most Angular tutorials teach you syntax. Decorators, directives, dependency injection. What they don't teach you is how to _think_ about an app once it has 200 components, 40 routes, and three engineers stepping on each other's toes.

That's a system design problem, not a syntax problem. And it comes down to one core idea: **unidirectional data flow**, enforced through component architecture, change detection, state boundaries, and module boundaries. Get this right early, and your app scales. Get it wrong, and you'll be debugging "why did this re-render 40 times" at 11pm.

Here's the concept broken into five pieces, each with a concrete example.

---

## 1. Smart (Container) vs. Dumb (Presentational) Components

**The idea:** Split every feature into components that _know things_ and components that _display things_. Never mix the two.

- **Smart components** fetch data, hold state, call services, make decisions.
- **Dumb components** just take `@Input()`, render UI, and emit `@Output()` events. No HTTP calls, no business logic, no injected services beyond maybe a formatting pipe.

**Example:**

```typescript
// Smart component knows WHERE the data comes from
@Component({
  selector: "app-user-list-page",
  template: `<app-user-card *ngFor="let user of users$ | async" [user]="user" (deleteUser)="onDelete($event)"> </app-user-card>`,
})
export class UserListPageComponent {
  users$ = this.userService.getUsers();

  constructor(private userService: UserService) {}

  onDelete(id: string) {
    this.userService.deleteUser(id).subscribe();
  }
}
```

```typescript
// Dumb component knows nothing about WHERE, only WHAT to show
@Component({
  selector: "app-user-card",
  template: `
    <div class="card">
      <span>{{ user.name }}</span>
      <button (click)="deleteUser.emit(user.id)">Delete</button>
    </div>
  `,
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<string>();
}
```

Notice: `UserCardComponent` could be dropped into any page, tested with a fake `User` object, and never needs a mock `HttpClient`. That's the payoff.

---

## 2. Change Detection Strategy (`OnPush`)

**The idea:** By default, Angular checks _every_ component in the tree on _every_ browser event clicks, timers, HTTP responses, all of it. Fine for a small app. Brutal for a big one.

`OnPush` tells Angular: "only re-check this component if an `@Input()` reference changed, an event fired inside it, or an observable it's subscribed to (via `async` pipe) emitted."

**Example:**

```typescript
@Component({
  selector: "app-user-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div>{{ user.name }}</div>`,
})
export class UserCardComponent {
  @Input() user!: User;
}
```

The catch: if you mutate the object instead of replacing it, `OnPush` won't notice.

```typescript
// ❌ Won't trigger re-render under OnPush
this.user.name = "New Name";

// ✅ Will trigger re-render new reference
this.user = { ...this.user, name: "New Name" };
```

This single rule _always create new references, never mutate_ is the difference between an app that feels instant and one that lags on every keystroke.

---

## 3. State Management Layers

**The idea:** Not all state deserves the same weight. Match the tool to the scope of the state, don't reach for the biggest hammer by default.

| Scope                                | Tool                        | Example                                              |
| ------------------------------------ | --------------------------- | ---------------------------------------------------- |
| Local to one component               | Component field             | A toggle for "show password"                         |
| Shared across a feature              | Service + `BehaviorSubject` | Shopping cart shared between cart icon and cart page |
| Shared across the whole app, complex | NgRx / Signals store        | Auth state, feature flags, undo/redo history         |

**Example the service-with-a-subject pattern (covers 80% of real apps):**

```typescript
@Injectable({ providedIn: "root" })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  addItem(item: CartItem) {
    this.itemsSubject.next([...this.itemsSubject.value, item]);
  }
}
```

Any component the navbar cart icon, the checkout page, a "recently added" widget subscribes to `items$` and stays in sync automatically. No prop drilling, no NgRx boilerplate for what's fundamentally a simple shared value.

Reach for NgRx only when you have state touched by many unrelated features, complex derived state, or you need time-travel debugging. Using it for a single dropdown's open/closed state is over-engineering.

---

## 4. Module Boundaries and Lazy Loading

**The idea:** Features shouldn't reach into each other's internals, and users shouldn't download code for pages they haven't visited yet.

**Example:**

```typescript
const routes: Routes = [
  {
    path: "admin",
    loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "billing",
    loadChildren: () => import("./billing/billing.module").then((m) => m.BillingModule),
  },
];
```

A user landing on the homepage never downloads the `AdminModule` bundle. It loads only when they navigate to `/admin`. At scale, this is the difference between a 200KB initial bundle and a 3MB one.

The same boundary discipline applies with standalone components today group by feature, export only what other features need, and resist the urge to import a component from a sibling feature just because it's "right there."

---

## 5. Reactive Data Flow with RxJS + the `async` Pipe

**The idea:** Services expose observables. Components subscribe ideally through the `async` pipe, so Angular manages the subscription lifecycle for you (no manual `unsubscribe()`, no memory leaks).

**Example:**

```typescript
@Component({
  selector: "app-dashboard",
  template: `
    <div *ngIf="stats$ | async as stats">
      <p>Total sales: {{ stats.totalSales }}</p>
    </div>
  `,
})
export class DashboardComponent {
  stats$ = this.dashboardService.getStats();
}
```

No `ngOnInit`, no `subscribe()`, no `ngOnDestroy` cleanup. The `async` pipe subscribes when the component renders and unsubscribes when it's destroyed. This is what actually makes `OnPush` + smart/dumb components click together the observable emits, the pipe marks the component dirty, Angular re-renders just that piece.

---

## Putting It Together

None of these five ideas work in isolation. `OnPush` is safe _because_ dumb components only receive immutable inputs. State layers stay simple _because_ services expose observables instead of components polling each other. Lazy loading works _because_ feature boundaries are already clean.

This is system design for Angular: not "which framework feature exists," but "how do these pieces compose so the app doesn't collapse under its own weight at 200 components."

If you only take one thing from this: **default to `OnPush`, keep components dumb until proven otherwise, and never mutate state replace it.** Everything else follows from there.
