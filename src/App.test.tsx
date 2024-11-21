import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
test('render', () => {
  render(<form>
    <div>test</div>
    <input type="text" />
    <button>submit</button>
  </form>);
  screen.debug();
})