import React from 'react';
import {render} from '@testing-library/react';
import ToDoApp from './ToDoApp';

test('renders learn react link', () => {
    const {getByText} = render(<ToDoApp/>);
    const linkElement = getByText(/Add/i);
    expect(linkElement).toBeInTheDocument();
});
