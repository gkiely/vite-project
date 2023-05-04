import '@testing-library/jest-dom/extend-expect';

// Needed for rtl with isolate: false
import { cleanup } from '@testing-library/react';
afterEach(cleanup);

// Needed for react-dom/test-utils
// global.IS_REACT_ACT_ENVIRONMENT = true;
