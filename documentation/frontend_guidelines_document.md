# Frontend Guideline Document for app-ubr

This document lays out the recommended front-end setup for the **app-ubr** project. It covers architecture, design principles, styling, component structure, state management, routing, performance, testing, and more. The goal is to give everyone—from new contributors to stakeholders—a clear, practical view of how our front end is organized and why.

---

## 1. Frontend Architecture

### Overall Structure
- We build a **Single Page Application (SPA)** using **React** with **TypeScript**. This choice helps us catch type errors early and scale the codebase safely.
- We use **Vite** as our build tool and development server. Vite is fast to start, supports modern ES modules, and gives quick feedback on code changes.
- The folder layout under `src/` looks like this:
  - `components/` – reusable UI pieces (buttons, cards, inputs)
  - `pages/` – top-level views corresponding to routes (e.g., Dashboard, Settings)
  - `layouts/` – shared page wrappers (headers, sidebars)
  - `hooks/` – custom React hooks for data fetching or shared logic
  - `services/` – API calls and business logic
  - `styles/` – global styles, theme definitions, CSS utilities
  - `assets/` – images, icons, fonts

### Scalability, Maintainability, Performance
- **Scalability:** With a clear folder structure and TypeScript, we can add new features or teams without confusing dependencies.
- **Maintainability:** Small, well-named components and centralized services keep our code easy to read and modify.
- **Performance:** Vite’s fast hot-module replacement plus code-splitting (see Performance section) ensure snappy dev experience and lean production bundles.

---

## 2. Design Principles

1. **Usability**: Interfaces should be intuitive. Every button, link, or form field has a clear label and predictable behavior.
2. **Accessibility**: We follow WCAG guidelines—semantic HTML, proper ARIA attributes, keyboard navigation, and sufficient color contrast.
3. **Responsiveness**: Layouts adapt smoothly from small phones up to large desktops using CSS grid and flexbox.
4. **Consistency**: Common patterns (modals, dropdowns, notifications) look and behave the same across the app.

**How we apply them:**
- All interactive elements include focus states and `aria-` labels.
- We build mobile-first, testing breakpoints at 640px, 768px, and 1024px.
- A shared UI kit (color variables, spacing scale, typography) lives in `styles/`.

---

## 3. Styling and Theming

### CSS Methodology
- We use **Tailwind CSS** for utility-first styling. This lets us compose layouts quickly and avoid deep, custom CSS files.
- For special cases, we use CSS Modules (`*.module.css`) scoped to a component.

### Theming
- A theme file (`styles/theme.css`) declares CSS variables for primary colors, font sizes, and spacing.
- Tailwind’s configuration (`tailwind.config.js`) pulls those variables in, ensuring design consistency.

### Visual Style
- Look and feel: **Modern flat design** with subtle shadows for depth.
- Glassmorphism is out of scope until later—but we may add it to specific overlays.

### Color Palette
- Primary: #1E40AF (Deep Blue)
- Secondary: #F59E0B (Amber)
- Accent: #10B981 (Emerald)
- Neutral background: #F3F4F6 (Light Gray)
- Text main: #111827 (Near Black)
- Text muted: #6B7280 (Gray)

### Typography
- Primary font: **Inter** (sans-serif) for clarity and readability.
- Headings: Bold weight; body text: regular weight.

---

## 4. Component Structure

### Organization
- **Atoms** (buttons, icons, form fields)
- **Molecules** (input groups, card with image + text)
- **Organisms** (header, sidebar, data table)
- **Templates/Pages** (Dashboard view, Profile page)

### Reuse and Composition
- Every component lives in its own folder with:
  - `ComponentName.tsx`
  - `ComponentName.module.css` (if needed)
  - `ComponentName.test.tsx` (unit tests)
- Prop interfaces are defined in TypeScript to document expected data.

**Why component-based?**
- Encourages small, testable pieces.
- Makes sharing and updating UI patterns simple.
- Lowers the risk of unexpected side effects.

---

## 5. State Management

We use a blend of React’s **Context API** and **Redux Toolkit**:
- **Local state** (open/close modal, form inputs) stays in component-level React state.
- **Global state** (user info, feature flags) lives in a Redux slice via Redux Toolkit.
- **Data fetching**: we use **React Query** (TanStack Query) to handle caching, background refresh, and request cancellation seamlessly.

**Sharing state:**
- Context providers wrap the app at `src/index.tsx`.
- Redux store is configured with middleware (e.g., logger, thunk) and passed into the React tree.

This combination balances simplicity for small bits of state with power for cross-app data flows.

---

## 6. Routing and Navigation

- We use **React Router v6** for client-side routing.
- Routes live in `src/routes.tsx`, where each route points to a page component and optional layout.
- **Protected routes** (authenticated areas) check user status via a custom hook and redirect to `/login` if needed.
- A top-level `<NavBar>` and `<Sidebar>` handle link rendering; active routes get a highlighted style.

### Navigation Patterns
- Breadcrumbs in deep hierarchies for context.
- Lazy-load page components (see Performance section) to reduce initial bundle size.

---

## 7. Performance Optimization

1. **Code Splitting & Lazy Loading**
   - Use `React.lazy()` and `<Suspense>` to load heavy pages or rarely used components on demand.
2. **Asset Optimization**
   - Compress images (WebP where possible).
   - Serve SVG icons as inline `<svg>` or via an icon component.
3. **Build Optimizations**
   - Vite automatically tree-shakes unused code.
   - We enable gzip or Brotli compression on the production server.
4. **Caching**
   - HTTP caching headers for static assets.
   - React Query handles data caching and smart background updates.

These steps keep load times low and UX smooth.

---

## 8. Testing and Quality Assurance

### Unit & Integration Tests
- **Jest** + **React Testing Library** for components and hooks.
- Aim for at least **70% coverage** on critical UI pieces.

### End-to-End (E2E) Tests
- **Cypress** for user flows: login, form submission, navigation.
- Tests live in `cypress/` with clear scenarios and screenshots on failure.

### Linting & Formatting
- **ESLint** with TypeScript rules enforced on every commit.
- **Prettier** for consistent code style.
- A pre-commit hook (Husky) runs lint and tests to prevent bad code from landing.

---

## 9. Conclusion and Summary

- We’ve laid out a **React + TypeScript + Vite** architecture that balances speed, safety, and scalability.
- Our design principles—usability, accessibility, responsiveness, consistency—guide every UI decision.
- Tailwind CSS plus a clear theme gives us a modern flat look with minimal custom CSS.
- A strict component hierarchy, combined with Context, Redux Toolkit, and React Query, keeps state logic organized.
- React Router v6, lazy loading, and asset optimization deliver fast navigation and load times.
- Comprehensive testing (Jest, RTL, Cypress) and linting ensure code quality from day one.

By following these guidelines, **app-ubr** will be set up for smooth development, easy collaboration, and a great end-user experience. Welcome aboard, and let’s build something awesome!