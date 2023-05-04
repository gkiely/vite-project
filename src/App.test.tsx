// ------------------------
// Using testing-library with isolate: true (80 - 90ms)
// ------------------------
// import { render, screen } from '@testing-library/react';
// import App from './App';
// describe('App', () => {
//   it('should render', () => {
//     render(<App />);
//     const welcome = screen.getByText(/Hello World!/i);
//     expect(welcome).toBeInTheDocument();
//   });
// });

// ------------------------
// Using testing-library with isolate: false (10 - 20ms)
// ------------------------
// import { render } from '@testing-library/react';
// import App from './App';
// describe('App 1', () => {
//   it('should render', () => {
//     const screen = render(<App />);
//     const welcome = screen.getByText(/Hello World!/i);
//     expect(welcome).toBeInTheDocument();
//   });
// });
// describe('App 2', () => {
//   it('should render', () => {
//     const screen = render(<App />);
//     const welcome = screen.getByText(/Hello World!/i);
//     expect(welcome).toBeInTheDocument();
//   });
// });

// ------------------------
// Using test-utils with isolate: false (10 - 20ms)
// ------------------------
// import { createRoot } from 'react-dom/client';
// import { act } from 'react-dom/test-utils';
// import App from './App';

// let container: HTMLDivElement | null = null;
// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });
// afterEach(() => {
//   container && document.body.removeChild(container);
//   container = null;
// });

// describe('App', () => {
//   it('should render', () => {
//     act(() => {
//       container && createRoot(container).render(<App />);
//     });
//     const welcome = container?.querySelector('h1');
//     expect(welcome).toBeInTheDocument();
//   });
// });

// describe('App 2', () => {
//   it('should render', () => {
//     act(() => {
//       container && createRoot(container).render(<App />);
//     });
//     const welcome = container?.querySelector('h1');
//     expect(welcome).toBeInTheDocument();
//   });
// });

// ------------------------
// Using bun with happy-dom (not yet supported)
// ------------------------
// import { Window } from 'happy-dom';

// // Setup happy-dom
// const window = new Window();
// // @ts-expect-error - TS doesn't know about global.window
// global.window = window;

// // Register global window extensions
// [
//   'document',
//   'Element',
//   'getComputedStyle',
//   'HTMLCanvasElement',
//   'HTMLElement',
//   'HTMLInputElement',
//   'navigator',
//   'SVGElement',
// ].forEach((key) => {
//   // @ts-expect-error - TS doesn't know about global[key]
//   global[key] = global.window[key];
// });

// import { render } from '@testing-library/react';
// import App from './App';
// describe('App 1', () => {
//   it('should render', () => {
//     const screen = render(<App />);
//     const welcome = screen.getByText(/Hello World!/i);
//     expect(welcome).toBeInTheDocument();
//   });
// });
// describe('App 2', () => {
//   it('should render', () => {
//     const screen = render(<App />);
//     const welcome = screen.getByText(/Hello World!/i);
//     expect(welcome).toBeInTheDocument();
//   });
// });
