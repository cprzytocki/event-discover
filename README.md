# Event Discover

This is a simple event discovery app that allows users to search for events by a given location and date by leveraging the [ticketmaster api](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/).

It is hosted on Vercel, check it out at [https://event-discover.vercel.app](https://event-discover.vercel.app)

## Prerequisite

This project uses [pnpm](https://pnpm.io/installation#using-npm) as the package manager. You can install it globally using npm:

```bash
npm install -g pnpm
```

The project also includes a .tool-versions file for [asdf](https://asdf-vm.com/#/core-manage-asdf-vm) if that is preferred.

## Getting Started

#### 1. Install dependencies

```bash
pnpm install
```

#### 2. Add your ticketmaster `Consumer Key` to the root `.env.local` file

```
TICKETMASTER_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### 3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

#### 4. Unit tests can be ran using:

```bash
pnpm test
# or
pnpm test:cov # produces coverage reports
```

## Learn More

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [React Server Components](https://react.dev/reference/rsc/server-components) are leveraged to improve performance
- [Jest](https://jestjs.io/) is used for unit testing
- [tailwindcss](https://tailwindcss.com/) is used as the CSS framework
- [shadcn](https://ui.shadcn.com/docs) is used as a base for some UI components
